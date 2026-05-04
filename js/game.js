// =====================================================
// Main game loop, input, state management
// =====================================================

(() => {
  const canvas = document.getElementById("game");
  const ctx = canvas.getContext("2d");
  ctx.imageSmoothingEnabled = false;

  // ----- DESKTOP EDITION detection -----
  // Set by play.command / BrainrotMonsters.app / play.bat passing ?desktop=1
  // in the launch URL. Stored in sessionStorage so a soft reload keeps it on.
  const urlIsDesktop = new URLSearchParams(location.search).get("desktop") === "1";
  if (urlIsDesktop) {
    try { sessionStorage.setItem("monkeyguildmon_desktop", "1"); } catch (e) {}
  }
  const IS_DESKTOP = (() => {
    try { return sessionStorage.getItem("monkeyguildmon_desktop") === "1"; }
    catch (e) { return urlIsDesktop; }
  })();
  window.__mgmDesktop = IS_DESKTOP;
  // ?embed=1 means we're being shown inside an iframe (e.g. for the
  // marketing video). Suppress all overlays so the host frame controls
  // the visuals.
  const isEmbed = new URLSearchParams(location.search).get("embed") === "1";
  if (IS_DESKTOP && !isEmbed) {
    document.getElementById("desktop-splash").classList.remove("hidden");
    document.getElementById("desktop-badge").classList.remove("hidden");
    // Auto-dismiss splash after CSS animation finishes
    setTimeout(() => {
      const sp = document.getElementById("desktop-splash");
      if (sp) sp.classList.add("hidden");
    }, 2400);
  }

  // ----- Save-protection warning -----
  // Only relevant when the player is on a real hosted domain — clearing
  // site data is a real risk there. We skip it on file://, localhost,
  // and the desktop edition (those have implicit persistence guarantees).
  function shouldShowSaveWarning() {
    const host = location.hostname;
    if (!host) return false;                       // file://
    if (host === "localhost" || host === "127.0.0.1") return false;
    if (IS_DESKTOP) return false;
    try { return localStorage.getItem("monkeyguildmon_warn_seen") !== "1"; }
    catch (e) { return false; }
  }
  if (shouldShowSaveWarning()) {
    const warn = document.getElementById("save-warning");
    if (warn) {
      warn.classList.remove("hidden");
      const ok = document.getElementById("save-warning-ok");
      if (ok) ok.addEventListener("click", () => {
        try { localStorage.setItem("monkeyguildmon_warn_seen", "1"); } catch (e) {}
        warn.classList.add("hidden");
      });
    }
  }

  // ----- Demo / deep-link scenes -----
  // ?scene=title|starter|overworld|battle|catch jumps the game directly
  // to a specific state on load. Used by the marketing video (Remotion
  // ad) to embed the live game in iframes showing each scene. Also useful
  // for screenshots and debugging. ?scene=anything also implicitly hides
  // the save-warning banner (assumed not the player's primary save).
  const sceneParam = new URLSearchParams(location.search).get("scene");
  if (sceneParam) {
    // Hide save warning since this is a demo/embed
    const warnEl = document.getElementById("save-warning");
    if (warnEl) warnEl.classList.add("hidden");
    // Use a different localStorage key so demos don't write to player's save
    sessionStorage.setItem("monkeyguildmon_demo_mode", "1");
    setTimeout(() => bootIntoScene(sceneParam), 100);
  }

  function bootIntoScene(scene) {
    // Skip the title screen entirely
    document.getElementById("title-screen").classList.add("hidden");
    Audio.unlock();
    const isTouch = matchMedia("(pointer: coarse)").matches;
    if (isTouch) document.getElementById("touch-controls").classList.remove("hidden");

    if (scene === "title") {
      // Show title without starting
      document.getElementById("title-screen").classList.remove("hidden");
      return;
    }

    // For all gameplay scenes, set up a starter team so the game has state
    if (scene === "starter") {
      game.mode = "starter";
      game.starterIdx = 0;
      showStarterDom(true);
      // Auto-cycle through starters every 1.5s for demo eye-candy
      let idx = 0;
      setInterval(() => {
        idx = (idx + 1) % 3;
        game.starterIdx = idx;
        if (typeof refreshStarterDom === "function") refreshStarterDom();
      }, 1500);
      return;
    }

    // Need a team for the rest — give them all three starters at L10
    game.team = [
      makeMon("NOTALI", 10),
      makeMon("MXRIO", 9),
      makeMon("STEEL", 9),
    ];
    game.mode = "overworld";
    Music.start();

    if (scene === "overworld") {
      // Walk into Route 1 with tall grass visible
      World.setCurrentMap("route1");
      game.currentMap = "route1";
      game.player.tileX = 8;
      game.player.tileY = 6;
      game.player.pixelX = 8 * 16;
      game.player.pixelY = 6 * 16;
      game.player.facing = "down";
      // Fake-walk demo: every 8 frames toggle key state
      let walkPhase = 0;
      setInterval(() => {
        walkPhase = (walkPhase + 1) % 4;
        // Hold ArrowDown briefly so player walks
      }, 200);
      return;
    }

    if (scene === "battle") {
      // Force a wild Glorbo encounter
      World.setCurrentMap("route2");
      game.currentMap = "route2";
      game.player.tileX = 8; game.player.tileY = 6;
      game.player.pixelX = 8 * 16; game.player.pixelY = 6 * 16;
      // Trigger a battle directly with Glorbo
      const enemy = makeMon("GLORBO", 12);
      game.mode = "battle";
      Battle.start(game.team, enemy, {
        isTrainer: false,
        onEnd: () => { game.mode = "overworld"; },
      });
      return;
    }

    if (scene === "catch") {
      // Same as battle but at low HP so we can see the catch screen quickly
      World.setCurrentMap("route2");
      game.currentMap = "route2";
      const enemy = makeMon("GLORBO", 12);
      enemy.hp = 5;  // weakened
      game.bag.BRAINCELL = 9;
      game.mode = "battle";
      Battle.start(game.team, enemy, {
        isTrainer: false,
        onEnd: () => { game.mode = "overworld"; },
      });
      // Auto-throw a Brain Cell after a beat
      setTimeout(() => Battle.throwBraincell("DISCORD_INVITE"), 1200);
      return;
    }
  }

  const game = {
    mode: "title", // title | starter | overworld | battle | dialog | menu | team | bag | shop
    player: {
      tileX: 8, tileY: 14,
      pixelX: 8 * 16, pixelY: 14 * 16,
      facing: "down",
      moving: false,
      moveProgress: 0,
      moveSpeed: 2,
      animFrame: 0,
      stepCounter: 0,
    },
    currentMap: "pallet",
    mapBanner: { text: "", t: 0 },
    team: [],
    box: [],
    // Desktop Edition starts with one of each new PP-restore item as a
    // small "thanks for installing the app" bonus.
    bag: (() => {
      const b = { DISCORD_INVITE: 8, NITRO_INVITE: 1, ENERGY_DRINK: 3 };
      try {
        if (new URLSearchParams(location.search).get("desktop") === "1" ||
            sessionStorage.getItem("monkeyguildmon_desktop") === "1") {
          b.ETEREO = 1; b.PASTATONIC = 1;
        }
      } catch (e) {}
      return b;
    })(),
    money: 500,
    dex: { seen: {}, caught: {} },
    cam: { x: 0, y: 0 },
    dialog: null,
    dialogTyping: { active: false, text: "", target: "", t: 0 },
    starterIdx: 0,
    encounterCooldown: 0,
    flashTime: 0,
    badges: 0,
    healFx: 0,            // ticks down while heal sparkle is animating
    saveToast: 0,         // ticks down while "Saved!" toast is on screen
    // stats.totalPlayMs accumulates across all sessions; sessionStart is
    // reset every page load so we can show "this session" separately.
    stats: { steps: 0, battlesWon: 0, monsCaught: 0, totalPlayMs: 0, sessionStart: Date.now() },
    // story.beat is the highest story beat the player has cleared. Cult
    // trainers carry storyBeat=N which they push into here on defeat.
    // Used by the Lore Journal menu to gate which entries are unlocked.
    story: { beat: 0 },
  };

  const keys = {};
  let lastTime = 0;
  let nowTime = 0;

  window.addEventListener("keydown", (e) => {
    if (["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"," ","Enter","z","x","Z","X","Escape","f","F","h","H","r","R","w","W","a","A","s","S","d","D","q","Q","e","E"].includes(e.key)) {
      e.preventDefault();
    }
    if (e.key === "f" || e.key === "F") { toggleFullscreen(); return; }
    keys[e.key.toLowerCase()] = true;
    keys[e.key] = true;
    Audio.unlock();
    onKeyDown(e.key);
  });

  function toggleFullscreen() {
    const el = document.documentElement;
    if (!document.fullscreenElement) {
      (el.requestFullscreen || el.webkitRequestFullscreen || el.msRequestFullscreen).call(el);
    } else {
      (document.exitFullscreen || document.webkitExitFullscreen || document.msExitFullscreen).call(document);
    }
  }
  window.addEventListener("keyup", (e) => {
    keys[e.key.toLowerCase()] = false;
    keys[e.key] = false;
  });

  document.querySelectorAll("#touch-controls button").forEach(btn => {
    const k = btn.dataset.key;
    const press = (e) => { e.preventDefault(); Audio.unlock(); keys[k] = true; onKeyDown(k); };
    const release = (e) => { e.preventDefault(); keys[k] = false; };
    btn.addEventListener("touchstart", press, {passive: false});
    btn.addEventListener("touchend", release, {passive: false});
    btn.addEventListener("mousedown", press);
    btn.addEventListener("mouseup", release);
    btn.addEventListener("mouseleave", release);
  });

  document.querySelectorAll("#battle-actions button").forEach(btn => {
    btn.addEventListener("click", () => { Audio.unlock(); Battle.handleAction(btn.dataset.action); });
  });
  document.getElementById("move-list").addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") { Audio.unlock(); Battle.handleMove(e.target.dataset.move); }
  });

  document.getElementById("title-screen").addEventListener("click", (e) => {
    // Don't treat clicks on the reset button as "start game"
    if (e.target && e.target.id === "reset-save-btn") return;
    Audio.unlock();
    if (game.mode === "title") startGame();
  });
  document.getElementById("title-screen").addEventListener("touchstart", (e) => {
    if (e.target && e.target.id === "reset-save-btn") return;
    e.preventDefault();
    Audio.unlock();
    if (game.mode === "title") startGame();
  });
  // Wipe-save-and-restart button
  const resetBtn = document.getElementById("reset-save-btn");
  if (resetBtn) {
    resetBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      Audio.unlock();
      const hadSave = !!localStorage.getItem("monkeyguildmon_save_v1");
      const ok = confirm(hadSave
        ? "Delete your save and start a brand-new game? This cannot be undone."
        : "No save found. Start a new game now?");
      if (!ok) return;
      try { localStorage.removeItem("monkeyguildmon_save_v1"); } catch (e2) {}
      // Restart cleanly so module-level state is fresh
      location.reload();
    });
  }

  function onKeyDown(key) {
    // Q acts as a Z alias (confirm/A) and E as an X alias (cancel/B/menu)
    // for players who already have one hand on WASD.
    if (key === "q" || key === "Q") key = "z";
    else if (key === "e" || key === "E") key = "x";
    const k = key.length === 1 ? key.toLowerCase() : key;
    if (game.mode === "title") {
      if (key === "Enter" || k === "z" || key === " ") startGame();
      return;
    }
    if (game.mode === "starter") {
      if (key === "ArrowLeft") { Audio.play("select"); cycleStarter(-1); }
      else if (key === "ArrowRight") { Audio.play("select"); cycleStarter(1); }
      else if (key === "Enter" || k === "z") confirmStarter();
      return;
    }
    if (game.mode === "battle") {
      Battle.handleKey(k);
      return;
    }
    if (game.mode === "dialog") {
      if (k === "z" || key === "Enter" || key === " ") advanceDialog();
      return;
    }
    if (game.mode === "menu") {
      if (k === "x" || key === "Escape") { Audio.play("cancel"); closeMenu(); }
      else if (key === "ArrowUp") { Audio.play("select"); menuMove(-1); }
      else if (key === "ArrowDown") { Audio.play("select"); menuMove(1); }
      else if (key === "Enter" || k === "z") menuSelect();
      return;
    }
    if (game.mode === "team") {
      if (k === "x" || key === "Escape") { Audio.play("cancel"); closeTeamMenu(); }
      else if (key === "ArrowUp") { Audio.play("select"); teamMenuMove(-1); }
      else if (key === "ArrowDown") { Audio.play("select"); teamMenuMove(1); }
      else if (key === "Enter" || k === "z") teamMenuSelect();
      return;
    }
    if (game.mode === "bag") {
      if (k === "x" || key === "Escape") { Audio.play("cancel"); closeBagMenu(); }
      else if (key === "ArrowUp") { Audio.play("select"); bagMenuMove(-1); }
      else if (key === "ArrowDown") { Audio.play("select"); bagMenuMove(1); }
      else if (key === "Enter" || k === "z") bagMenuSelect();
      return;
    }
    if (game.mode === "shop") {
      if (k === "x" || key === "Escape") { Audio.play("cancel"); closeShop(); }
      else if (key === "ArrowUp") { Audio.play("select"); shopMove(-1); }
      else if (key === "ArrowDown") { Audio.play("select"); shopMove(1); }
      else if (key === "Enter" || k === "z") shopBuy();
      return;
    }
    if (game.mode === "dex") {
      if (k === "x" || key === "Escape") { Audio.play("cancel"); closeDex(); }
      else if (key === "ArrowUp") { Audio.play("select"); dexMove(-1); }
      else if (key === "ArrowDown") { Audio.play("select"); dexMove(1); }
      else if (key === "ArrowLeft") { Audio.play("select"); dexCycleFilter(-1); }
      else if (key === "ArrowRight") { Audio.play("select"); dexCycleFilter(1); }
      return;
    }
    if (game.mode === "box") {
      if (k === "x" || key === "Escape") { Audio.play("cancel"); closeBox(); }
      else if (key === "ArrowUp") { Audio.play("select"); boxMove(-1); }
      else if (key === "ArrowDown") { Audio.play("select"); boxMove(1); }
      else if (key === "ArrowLeft") { Audio.play("select"); boxSwitchPanel(-1); }
      else if (key === "ArrowRight") { Audio.play("select"); boxSwitchPanel(1); }
      else if (key === "Enter" || k === "z") boxSelect();
      else if (k === "r") boxRelease();
      return;
    }
    if (game.mode === "moveLearn") {
      if (key === "ArrowUp") { Audio.play("select"); moveLearnMove(-1); }
      else if (key === "ArrowDown") { Audio.play("select"); moveLearnMove(1); }
      else if (key === "Enter" || k === "z") moveLearnConfirm();
      else if (k === "x" || key === "Escape") moveLearnSkip();
      return;
    }
    if (game.mode === "overworld") {
      if (k === "x" || key === "Escape") openMenu();
      else if (k === "z" || key === "Enter") interact();
    }
  }

  function startGame() {
    Audio.play("confirm");
    document.getElementById("title-screen").classList.add("hidden");
    const isTouch = matchMedia("(pointer: coarse)").matches;
    if (isTouch) document.getElementById("touch-controls").classList.remove("hidden");

    if (loadSave()) {
      game.mode = "overworld";
      Music.start();
      showDialog([`Welcome back!\nYou have ${game.team.length} monster${game.team.length===1?'':'s'} in your team.`], () => {});
      return;
    }
    game.mode = "starter";
    game.starterIdx = 0;
    showDialog([
      "PROFESSOR PARMIGIANO:",
      "Ah! A new challenger! In this world, brain rot creatures roam the lands.",
      "Capture them. Train them. Climb the Espresso Four.\nDefeat the Brainrot Queen.",
      "Pick your starter, my dear traveler:",
    ], () => {
      game.mode = "starter";
      showStarterDom(true);
    });
  }

  const STARTERS = ["NOTALI", "MXRIO", "STEEL"];
  const STARTER_INFO = {
    NOTALI: "Lurker — refuses to fight. Says 'too much worrrkkkkk'.",
    MXRIO:  "Gamer — balanced bruiser with a Minecraft toolkit.",
    STEEL:  "Bot/Mod — slow but tanky. Big shield + ban hammer.",
  };

  function cycleStarter(d) {
    game.starterIdx = (game.starterIdx + d + STARTERS.length) % STARTERS.length;
    refreshStarterDom();
  }

  function refreshStarterDom() {
    const sel = STARTERS[game.starterIdx];
    const sp = SPECIES[sel];
    const nameEl = document.getElementById("starter-name");
    const flavorEl = document.getElementById("starter-flavor");
    const infoEl = document.getElementById("starter-info");
    if (nameEl) nameEl.textContent = sp.name;
    if (flavorEl) flavorEl.textContent = `"${sp.flavor}"`;
    if (infoEl) infoEl.textContent = STARTER_INFO[sel];
  }
  function showStarterDom(show) {
    const el = document.getElementById("starter-screen");
    if (!el) return;
    el.classList.toggle("hidden", !show);
    if (show) refreshStarterDom();
  }

  function confirmStarter() {
    Audio.play("confirm");
    showStarterDom(false);
    const id = STARTERS[game.starterIdx];
    const mon = makeMon(id, 5);
    game.team.push(mon);
    markDexCaught(id);
    game.mode = "dialog";
    showDialog([
      `You chose ${SPECIES[id].name}!`,
      `"${SPECIES[id].flavor}"`,
      "Professor: Now go! And remember — when in doubt, say 'tralalero'.",
      "═══ HOW TO PLAY ═══",
      "▶ ARROW KEYS — walk around\n▶ Z — talk / confirm / fight\n▶ X — open menu / cancel",
      "▶ WALK INTO tall dark-green grass to find wild memes!",
      "▶ Walk up to the Cappuccino Bar (red cross) to FULLY HEAL.\nA Bar is just NORTH of where you start.",
      "▶ Beat 5 GYM LEADERS for badges, then face the Champion!",
      "When you face an NPC, a [Z] bubble appears above them. Press Z to talk!",
      "Good luck, trainer!",
    ], () => {
      game.mode = "overworld";
      Music.start();
      saveGame();
    });
  }

  // ----- Dialog with typewriter -----
  function showDialog(lines, onEnd) {
    game.mode = "dialog";
    game.dialog = { lines: [...lines], idx: 0, onEnd: onEnd || (() => {}) };
    const el = document.getElementById("dialog");
    el.classList.remove("hidden");
    startTypewriter(lines[0]);
  }

  function startTypewriter(text) {
    game.dialogTyping.active = true;
    game.dialogTyping.text = "";
    game.dialogTyping.target = text;
    game.dialogTyping.t = 0;
    document.getElementById("dialog-text").textContent = "";
    document.getElementById("dialog-arrow").style.opacity = 0;
  }

  function tickDialogTypewriter(dt) {
    if (!game.dialogTyping.active) return;
    game.dialogTyping.t += dt;
    const want = Math.floor(game.dialogTyping.t * 0.030);
    while (game.dialogTyping.text.length < game.dialogTyping.target.length && game.dialogTyping.text.length < want) {
      const c = game.dialogTyping.target[game.dialogTyping.text.length];
      game.dialogTyping.text += c;
      if (game.dialogTyping.text.length % 2 === 0 && c !== " " && c !== "\n") Audio.play("text");
    }
    document.getElementById("dialog-text").textContent = game.dialogTyping.text;
    if (game.dialogTyping.text.length >= game.dialogTyping.target.length) {
      game.dialogTyping.active = false;
      document.getElementById("dialog-arrow").style.opacity = 1;
    }
  }

  function fastForwardDialog() {
    if (!game.dialogTyping.active) return false;
    game.dialogTyping.text = game.dialogTyping.target;
    game.dialogTyping.active = false;
    document.getElementById("dialog-text").textContent = game.dialogTyping.text;
    document.getElementById("dialog-arrow").style.opacity = 1;
    return true;
  }

  function advanceDialog() {
    if (!game.dialog) return;
    if (fastForwardDialog()) return;
    Audio.play("text");
    game.dialog.idx++;
    if (game.dialog.idx >= game.dialog.lines.length) {
      const cb = game.dialog.onEnd;
      game.dialog = null;
      document.getElementById("dialog").classList.add("hidden");
      cb();
      if (game.mode === "dialog") game.mode = "overworld";
    } else {
      startTypewriter(game.dialog.lines[game.dialog.idx]);
    }
  }

  // ----- Pause Menu -----
  let menuState = null;
  function openMenu() {
    Audio.play("open");
    menuState = { items: ["MEMEDEX", "TEAM", "BOX", "BAG", "LORE", "STATS", "TUTORIAL", "SAVE", "MUTE", "CLOSE"], idx: 0 };
    game.mode = "menu";
    renderMenu();
    document.getElementById("menu").classList.remove("hidden");
  }
  function closeMenu() {
    document.getElementById("menu").classList.add("hidden");
    menuState = null;
    game.mode = "overworld";
  }
  function menuMove(d) {
    if (!menuState) return;
    menuState.idx = (menuState.idx + d + menuState.items.length) % menuState.items.length;
    renderMenu();
  }
  function renderMenu() {
    const ul = document.getElementById("menu-list");
    const cash = `$${game.money}  Badge:${game.badges}`;
    ul.innerHTML = `<li class="header">${cash}</li>` + menuState.items.map((it, i) => {
      const label = it === "MUTE" ? (Audio.isMuted() ? "UNMUTE" : "MUTE") : it;
      return `<li class="${i === menuState.idx ? "selected" : ""}">${label}</li>`;
    }).join("");
  }
  function menuSelect() {
    Audio.play("confirm");
    const choice = menuState.items[menuState.idx];
    if (choice === "CLOSE") { closeMenu(); return; }
    if (choice === "SAVE") {
      saveGame();
      closeMenu();
      showDialog(["Game saved successfully!"], () => {});
      return;
    }
    if (choice === "MUTE") {
      Audio.setMuted(!Audio.isMuted());
      renderMenu();
      return;
    }
    if (choice === "TEAM") { closeMenu(); openTeamMenu(false); return; }
    if (choice === "BAG") { closeMenu(); openBagMenu(false); return; }
    if (choice === "MEMEDEX") { closeMenu(); openDex(); return; }
    if (choice === "BOX") { closeMenu(); openBox(); return; }
    if (choice === "STATS") { closeMenu(); showStatsDialog(); return; }
    if (choice === "TUTORIAL") { closeMenu(); showTutorial(); return; }
    if (choice === "LORE") { closeMenu(); showLoreJournal(); return; }
  }

  // Lore Journal — entries unlock as the player clears Cult of Glorbo
  // story beats. game.story.beat is the highest cleared beat.
  // Beats: 0 (none), 2 (Velvelo / first cultist), 3 (Lt. Gorm),
  // 4 (Captain Vessi), 5 (Leader Vibrius), 6 (Champion / Glorbnoxion).
  function showLoreJournal() {
    const beat = (game.story && game.story.beat) || 0;
    const entries = [];
    entries.push("═══ LORE JOURNAL ═══");
    entries.push(
      "PROFESSOR PARMIGIANO'S NOTES:\n" +
      "The brainrot creatures are a 2026 phenomenon — born of memes, " +
      "amplified by the algorithm, given form by something deeper. " +
      "I suspect a sentient cosmic force is involved."
    );
    if (beat >= 2) entries.push(
      "BEAT 2 — CULTIST VELVELO:\n" +
      "A man in purple robes shouted GLORBO and attacked. " +
      "On defeat he dropped a torn page that read: \"the call grows louder.\""
    );
    if (beat >= 3) entries.push(
      "BEAT 3 — LIEUTENANT GORM, CERULEAN:\n" +
      "The Cult of Glorbo is real and structured. Gorm called the " +
      "brainrot a CALL, not a curse. Said Glorbo HEARS US."
    );
    if (beat >= 4) entries.push(
      "BEAT 4 — CAPTAIN VESSI, ROUTE 4 BEACH:\n" +
      "They tried to summon Glorbnoxion at the tide. The Tralalero " +
      "pods sang back. Vessi mentioned a 'vessel.' She didn't say who."
    );
    if (beat >= 5) entries.push(
      "BEAT 5 — CULT LEADER VIBRIUS, VERMILION:\n" +
      "Glorbnoxion is awake. The vessel is sealed. Vibrius said the " +
      "vessel is 'at the top.' The only thing at the top is the Champion."
    );
    if (game.beatenChampion) entries.push(
      "FINAL — THE BRAINROT QUEEN:\n" +
      "She was the vessel. She is also Glorbnoxion. On her defeat " +
      "the cosmic force withdrew — the world kept its brainrots, " +
      "but the world stayed the world."
    );
    if (entries.length === 1) entries.push("(No story beats unlocked yet.\nDefeat Cultist Velvelo in Viridian Forest to begin.)");
    showDialog(entries, () => {});
  }

  function showTutorial() {
    showDialog([
      "═══ HOW TO PLAY ═══",
      "▶ ARROWS or WASD — walk around\n▶ Z or Q — talk / confirm / fight\n▶ X or E — open menu / cancel",
      "▶ WALK INTO tall dark-green grass to find wild memes!",
      "▶ Walk up to the Cappuccino Bar (red cross) to FULLY HEAL.",
      "▶ Beat 5 GYM LEADERS for badges, then face the Champion!",
      "▶ In battle: H = quick-heal with strongest item.",
      "▶ Catch wild memes — if your team is full (6), they go to your BOX.",
      "▶ Open the BOX or LORE from this menu anytime.",
    ], () => {});
  }

  function showStatsDialog() {
    const s = game.stats;
    const sessionMs = Date.now() - (s.sessionStart || Date.now());
    const totalMs = (s.totalPlayMs || 0) + sessionMs;
    const fmt = (ms) => {
      const mins = Math.floor(ms / 60000);
      const hrs = Math.floor(mins / 60);
      return hrs > 0 ? `${hrs}h ${mins % 60}m` : `${mins}m`;
    };
    const seenCount = Object.keys(game.dex.seen || {}).length;
    const caughtCount = Object.keys(game.dex.caught || {}).length;
    showDialog([
      "═══ TRAINER STATS ═══",
      `Steps walked: ${s.steps}\nBattles won: ${s.battlesWon}\nMons caught: ${s.monsCaught}`,
      `Memedex: ${seenCount} seen / ${caughtCount} caught\nBadges: ${game.badges}/5`,
      `This session: ${fmt(sessionMs)}\nTotal playtime: ${fmt(totalMs)}\nMoney: $${game.money}`,
    ], () => {});
  }

  // ----- Memedex -----
  let dexState = null;
  // filter modes the player can cycle with ←/→
  const DEX_FILTERS = ["ALL", "SEEN", "CAUGHT", "MISSING"];
  function openDex() {
    Audio.play("open");
    dexState = { idx: 0, filter: 0 };
    rebuildDexIds();
    game.mode = "dex";
    renderDex();
    document.getElementById("menu").classList.remove("hidden");
  }
  function closeDex() {
    document.getElementById("menu").classList.add("hidden");
    dexState = null;
    game.mode = "overworld";
  }
  function rebuildDexIds() {
    const all = Object.keys(SPECIES);
    const f = DEX_FILTERS[dexState.filter];
    if (f === "SEEN")    dexState.ids = all.filter(id => game.dex.seen[id]);
    else if (f === "CAUGHT")  dexState.ids = all.filter(id => game.dex.caught[id]);
    else if (f === "MISSING") dexState.ids = all.filter(id => !game.dex.caught[id]);
    else                      dexState.ids = all;
    if (dexState.ids.length === 0) dexState.ids = all;  // fallback so we never have empty
    if (dexState.idx >= dexState.ids.length) dexState.idx = 0;
  }
  function dexCycleFilter(d) {
    dexState.filter = (dexState.filter + d + DEX_FILTERS.length) % DEX_FILTERS.length;
    dexState.idx = 0;
    rebuildDexIds();
    renderDex();
  }
  function dexMove(d) {
    if (!dexState) return;
    dexState.idx = (dexState.idx + d + dexState.ids.length) % dexState.ids.length;
    renderDex();
  }
  function renderDex() {
    const ul = document.getElementById("menu-list");
    const ids = dexState.ids;
    const all = Object.keys(SPECIES);
    const seenCount = all.filter(id => game.dex.seen[id]).length;
    const caughtCount = all.filter(id => game.dex.caught[id]).length;
    const filterName = DEX_FILTERS[dexState.filter];
    const start = Math.max(0, Math.min(Math.max(0, ids.length - 8), dexState.idx - 3));
    const visible = ids.slice(start, start + 8);
    let html = `<li class="header">MEMEDEX [${filterName}] · ${seenCount}/${all.length} seen · ${caughtCount} caught</li>`;
    visible.forEach((id, off) => {
      const i = start + off;
      const sp = SPECIES[id];
      const seen = game.dex.seen[id];
      const caught = game.dex.caught[id];
      const num = String(all.indexOf(id) + 1).padStart(3, "0");
      const name = seen ? sp.name : "??????";
      const status = caught ? "✦" : seen ? "·" : " ";
      html += `<li class="${i === dexState.idx ? "selected" : ""}">
        <b>#${num}</b> ${status} <span>${name}</span>
        ${seen ? `<small style="opacity:.7"> · ${sp.types.join("/")}</small>` : ""}
      </li>`;
    });
    // detail panel for selected
    const sel = ids[dexState.idx];
    const selSp = SPECIES[sel];
    if (sel && game.dex.seen[sel]) {
      html += `<li class="dex-detail"><b>${selSp.name}</b> — ${selSp.types.join(" / ")}<br>
        <small>${game.dex.caught[sel] ? selSp.flavor : "(caught one to read full lore)"}</small><br>
        <small>HP:${selSp.base.hp}  ATK:${selSp.base.atk}  DEF:${selSp.base.def}  SPD:${selSp.base.spd}</small></li>`;
    } else {
      html += `<li class="dex-detail"><small>Not yet encountered.</small></li>`;
    }
    html += `<li class="footer"><small>↑↓ scroll · ←→ filter · X = back</small></li>`;
    ul.innerHTML = html;
  }

  // ----- Move-learn prompt (when a mon learns a 5th move) -----
  // Replaces the old silent "auto-replace slot 4" behavior with a real
  // pick-one-to-forget UI. Drained after every battle.
  let moveLearnState = null;
  let moveLearnQueue = [];
  function enqueueMoveLearns(items) {
    for (const it of items) moveLearnQueue.push(it);
    drainMoveLearns();
  }
  function drainMoveLearns() {
    if (moveLearnState) return;       // already showing one
    if (game.mode !== "overworld") return;  // wait for overworld
    const next = moveLearnQueue.shift();
    if (!next) return;
    const mon = game.team[next.monIdx];
    if (!mon) { drainMoveLearns(); return; }
    moveLearnState = { mon, newMoveId: next.newMoveId, idx: 0 };
    game.mode = "moveLearn";
    renderMoveLearn();
    document.getElementById("menu").classList.remove("hidden");
  }
  function renderMoveLearn() {
    const ul = document.getElementById("menu-list");
    const mon = moveLearnState.mon;
    const newMv = MOVES[moveLearnState.newMoveId];
    let html = `<li class="header">${SPECIES[mon.species].name} wants to learn ${newMv.name}!</li>`;
    html += `<li><b>NEW: ${newMv.name}</b><br><small>${newMv.type} · pwr ${newMv.power} · ${newMv.pp} PP</small></li>`;
    html += `<li class="dex-detail"><small>Pick a move to forget (or X to skip and not learn ${newMv.name}):</small></li>`;
    mon.moves.forEach((slot, i) => {
      const mv = MOVES[slot.id];
      html += `<li class="${i === moveLearnState.idx ? "selected" : ""}">
        <b>${mv.name}</b><br><small>${mv.type} · pwr ${mv.power} · ${slot.pp}/${slot.maxPp} PP</small>
      </li>`;
    });
    html += `<li class="footer"><small>↑↓ pick · Z = forget+learn · X = skip</small></li>`;
    ul.innerHTML = html;
  }
  function moveLearnMove(d) {
    moveLearnState.idx = (moveLearnState.idx + d + moveLearnState.mon.moves.length) % moveLearnState.mon.moves.length;
    renderMoveLearn();
  }
  function moveLearnConfirm() {
    Audio.play("confirm");
    const mon = moveLearnState.mon;
    const newId = moveLearnState.newMoveId;
    const oldId = mon.moves[moveLearnState.idx].id;
    mon.moves[moveLearnState.idx] = { id: newId, pp: MOVES[newId].pp, maxPp: MOVES[newId].pp };
    closeMoveLearn();
    showDialog([`${SPECIES[mon.species].name} forgot ${MOVES[oldId].name} and learned ${MOVES[newId].name}!`], () => {
      drainMoveLearns();
    });
  }
  function moveLearnSkip() {
    Audio.play("cancel");
    const mon = moveLearnState.mon;
    const newId = moveLearnState.newMoveId;
    closeMoveLearn();
    showDialog([`${SPECIES[mon.species].name} did not learn ${MOVES[newId].name}.`], () => {
      drainMoveLearns();
    });
  }
  function closeMoveLearn() {
    document.getElementById("menu").classList.add("hidden");
    moveLearnState = null;
    game.mode = "overworld";
  }

  // ----- BOX (PC storage) -----
  // Two panels: TEAM (left) and BOX (right). ↑↓ move within current panel,
  // ←→ switch panels, Z = swap selected slot (team↔box), R = release.
  let boxState = null;
  function openBox() {
    Audio.play("open");
    boxState = { panel: 1, idx: 0 };  // start on box panel
    if (game.box.length === 0) boxState.panel = 0;
    if (game.team.length === 0) boxState.panel = 1;
    game.mode = "box";
    renderBox();
    document.getElementById("menu").classList.remove("hidden");
  }
  function closeBox() {
    document.getElementById("menu").classList.add("hidden");
    boxState = null;
    game.mode = "overworld";
  }
  function boxCurrentList() {
    return boxState.panel === 0 ? game.team : game.box;
  }
  function boxMove(d) {
    const list = boxCurrentList();
    if (list.length === 0) return;
    boxState.idx = (boxState.idx + d + list.length) % list.length;
    renderBox();
  }
  function boxSwitchPanel(d) {
    boxState.panel = (boxState.panel + d + 2) % 2;
    boxState.idx = 0;
    renderBox();
  }
  function boxSelect() {
    Audio.play("confirm");
    const list = boxCurrentList();
    if (list.length === 0) return;
    if (boxState.panel === 0) {
      // Move team mon → box (must keep at least 1 mon in team)
      if (game.team.length <= 1) {
        showDialogOver(["You must keep at least one mon in your team!"], () => { renderBox(); });
        return;
      }
      const mon = game.team.splice(boxState.idx, 1)[0];
      game.box.push(mon);
      if (boxState.idx >= game.team.length) boxState.idx = Math.max(0, game.team.length - 1);
      saveGame();
      renderBox();
    } else {
      // Move box mon → team (only if team has space)
      if (game.team.length >= 6) {
        showDialogOver(["Your team is full (6/6). Move a team mon to the box first."], () => { renderBox(); });
        return;
      }
      const mon = game.box.splice(boxState.idx, 1)[0];
      game.team.push(mon);
      if (boxState.idx >= game.box.length) boxState.idx = Math.max(0, game.box.length - 1);
      saveGame();
      renderBox();
    }
  }
  function boxRelease() {
    if (boxState.panel !== 1) {
      showDialogOver(["You can only release mons from the BOX, not the team."], () => { renderBox(); });
      return;
    }
    if (game.box.length === 0) return;
    const mon = game.box[boxState.idx];
    if (!mon) return;
    // Use a tiny native confirm — keeps the box menu visible behind it.
    const ok = confirm(`Release ${SPECIES[mon.species].name} (Lv.${mon.level})? This cannot be undone.`);
    if (!ok) return;
    game.box.splice(boxState.idx, 1);
    if (boxState.idx >= game.box.length) boxState.idx = Math.max(0, game.box.length - 1);
    Audio.play("cancel");
    saveGame();
    renderBox();
  }
  function renderBox() {
    const ul = document.getElementById("menu-list");
    const team = game.team, box = game.box;
    const panelLabel = boxState.panel === 0 ? "TEAM" : "BOX";
    const otherLabel = boxState.panel === 0 ? "BOX" : "TEAM";
    let html = `<li class="header">${panelLabel} · ${(boxState.panel === 0 ? team.length : box.length)} mons · ←→ to ${otherLabel}</li>`;
    const list = boxCurrentList();
    if (list.length === 0) {
      html += `<li><small>(empty)</small></li>`;
    } else {
      list.forEach((m, i) => {
        const sp = SPECIES[m.species];
        const hpRatio = m.hp / m.maxHp;
        const hpColor = hpRatio < 0.2 ? "#ff5e5e" : hpRatio < 0.5 ? "#ffe070" : "#5cd765";
        const fainted = m.hp <= 0 ? " ❌" : "";
        const sel = i === boxState.idx;
        html += `<li class="${sel ? "selected" : ""}">
          <b>${sp.name}</b>${fainted} <small>Lv.${m.level}</small><br>
          <span style="color:${hpColor}">HP: ${m.hp}/${m.maxHp}</span>
          <small style="opacity:.7"> · ${sp.types.join("/")}</small>
        </li>`;
      });
    }
    const action = boxState.panel === 0 ? "send to BOX" : "bring to TEAM";
    html += `<li class="footer"><small>X = back · Z = ${action} · R = release (box only)</small></li>`;
    ul.innerHTML = html;
  }

  // ----- TEAM Menu -----
  let teamMenuState = null;
  function openTeamMenu(fromBattle) {
    if (game.team.length === 0) return;
    Audio.play("open");
    teamMenuState = { idx: 0, fromBattle, swapMode: fromBattle, useItem: null };
    game.mode = "team";
    renderTeamMenu();
    document.getElementById("menu").classList.remove("hidden");
  }
  function closeTeamMenu() {
    document.getElementById("menu").classList.add("hidden");
    if (teamMenuState && teamMenuState.fromBattle) {
      // returning to battle UI
      game.mode = "battle";
      teamMenuState = null;
      return;
    }
    teamMenuState = null;
    game.mode = "overworld";
  }
  function teamMenuMove(d) {
    if (!teamMenuState) return;
    teamMenuState.idx = (teamMenuState.idx + d + game.team.length) % game.team.length;
    renderTeamMenu();
  }
  function renderTeamMenu() {
    const ul = document.getElementById("menu-list");
    const t = game.team;
    ul.innerHTML = `<li class="header">YOUR TEAM</li>` + t.map((m, i) => {
      const sp = SPECIES[m.species];
      const hpRatio = m.hp / m.maxHp;
      const hpColor = hpRatio < 0.2 ? "#ff5e5e" : hpRatio < 0.5 ? "#ffe070" : "#5cd765";
      const fainted = m.hp <= 0 ? " ❌" : "";
      return `<li class="${i === teamMenuState.idx ? "selected" : ""}">
        <b>${sp.name}</b>${fainted} <small>Lv.${m.level}</small><br>
        <span style="color:${hpColor}">HP: ${m.hp}/${m.maxHp}</span>
        <small style="opacity:.7"> · ${sp.types.join("/")}</small>
      </li>`;
    }).join("") + `<li class="footer"><small>X = back · Z = ${teamMenuState.swapMode ? "switch" : (teamMenuState.useItem ? "use here" : "details")}</small></li>`;
  }
  function teamMenuSelect() {
    if (!teamMenuState) return;
    const idx = teamMenuState.idx;
    Audio.play("confirm");
    if (teamMenuState.useItem) {
      const item = ITEMS[teamMenuState.useItem];
      const mon = game.team[idx];
      if (!item) {
        teamMenuState.useItem = null;
        renderTeamMenu();
        return;
      }
      if ((game.bag[teamMenuState.useItem] || 0) <= 0) {
        showDialogOver(["You're out of that item."], () => { renderTeamMenu(); });
        return;
      }
      // PP-restore items take a different path
      if (item.ppHeal) {
        const totalMissing = mon.moves.reduce((s, mv) => s + (mv.maxPp - mv.pp), 0);
        if (totalMissing === 0) {
          showDialogOver(["All moves are already at full PP."], () => { renderTeamMenu(); });
          return;
        }
        let restored = 0;
        for (const mv of mon.moves) {
          const give = Math.min(mv.maxPp - mv.pp, item.ppHeal);
          mv.pp += give;
          restored += give;
        }
        game.bag[teamMenuState.useItem]--;
        Audio.play("heal");
        teamMenuState.useItem = null;
        saveGame();
        showDialogOver([`${SPECIES[mon.species].name}'s moves recovered ${restored} PP total!`], () => { renderTeamMenu(); });
        return;
      }
      // HP-heal items
      if (!item.heal) {
        teamMenuState.useItem = null;
        renderTeamMenu();
        return;
      }
      if (mon.hp >= mon.maxHp) {
        showDialogOver(["That monster is at full HP."], () => { renderTeamMenu(); });
        return;
      }
      if (mon.hp <= 0 && item.heal < 999) {
        showDialogOver(["That monster has fainted. Use a stronger heal."], () => { renderTeamMenu(); });
        return;
      }
      game.bag[teamMenuState.useItem]--;
      const before = mon.hp;
      mon.hp = Math.min(mon.maxHp, mon.hp + item.heal);
      Audio.play("heal");
      teamMenuState.useItem = null;
      saveGame();
      showDialogOver([`Healed ${SPECIES[mon.species].name} by ${mon.hp - before} HP!`], () => { renderTeamMenu(); });
      return;
    }
    if (teamMenuState.swapMode) {
      // attempt to switch active mon in battle
      Battle.switchActiveMon(idx);
      document.getElementById("menu").classList.add("hidden");
      teamMenuState = null;
      game.mode = "battle";
      return;
    }
    // details
    const m = game.team[idx];
    const sp = SPECIES[m.species];
    const lines = [
      `${sp.name} — Lv.${m.level}`,
      `Type: ${sp.types.join(" / ")}\n"${sp.flavor}"`,
      `HP: ${m.hp}/${m.maxHp}\nXP to next: ${Math.max(0, xpForLevel(m.level + 1) - m.xp)}`,
      `Moves:\n${m.moves.map(mv => `· ${MOVES[mv.id].name} (${mv.pp}/${mv.maxPp})`).join("\n")}`,
    ];
    showDialogOver(lines, () => { renderTeamMenu(); });
  }
  // dialog while menu is open
  function showDialogOver(lines, onEnd) {
    const prevMode = game.mode;
    game.mode = "dialog";
    game.dialog = {
      lines: [...lines], idx: 0,
      onEnd: () => { game.mode = prevMode; if (onEnd) onEnd(); },
    };
    document.getElementById("dialog").classList.remove("hidden");
    startTypewriter(lines[0]);
  }

  // ----- BAG Menu -----
  let bagMenuState = null;
  function openBagMenu(fromBattle) {
    Audio.play("open");
    const items = Object.entries(game.bag).filter(([k, v]) => v > 0);
    bagMenuState = { idx: 0, fromBattle, items };
    if (items.length === 0) {
      bagMenuState = null;
      showDialog(["Bag is empty."], () => {});
      return;
    }
    game.mode = "bag";
    renderBagMenu();
    document.getElementById("menu").classList.remove("hidden");
  }
  function closeBagMenu() {
    document.getElementById("menu").classList.add("hidden");
    if (bagMenuState && bagMenuState.fromBattle) {
      game.mode = "battle";
      bagMenuState = null;
      return;
    }
    bagMenuState = null;
    game.mode = "overworld";
  }
  function bagMenuMove(d) {
    if (!bagMenuState) return;
    bagMenuState.idx = (bagMenuState.idx + d + bagMenuState.items.length) % bagMenuState.items.length;
    renderBagMenu();
  }
  function renderBagMenu() {
    const ul = document.getElementById("menu-list");
    const items = bagMenuState.items;
    const totalCount = items.reduce((s, [, v]) => s + v, 0);
    const rows = items.map(([k, v], i) => {
      const it = ITEMS[k];
      const tag = it.heal ? `<span style="color:#5cd765">[HEAL]</span>`
                : it.ppHeal ? `<span style="color:#9aa5ff">[PP]</span>`
                : it.catchMod ? `<span style="color:#ffe070">[CATCH]</span>`
                : "";
      return `<li class="${i === bagMenuState.idx ? "selected" : ""}">
        <b>${it.name}</b> ${tag} <small style="float:right">×${v}</small><br>
        <small>${it.desc}</small>
      </li>`;
    }).join("");
    ul.innerHTML = `<li class="header">BAG · ${totalCount} items · $${game.money}</li>` + rows + `<li class="footer"><small>X = back · Z = use</small></li>`;
  }
  function bagMenuSelect() {
    if (!bagMenuState) return;
    Audio.play("confirm");
    const [key] = bagMenuState.items[bagMenuState.idx];
    const item = ITEMS[key];
    if (bagMenuState.fromBattle) {
      // catch ball or heal
      if (key === "DISCORD_INVITE" || key === "NITRO_INVITE" || key === "HYPESQUAD") {
        document.getElementById("menu").classList.add("hidden");
        bagMenuState = null;
        game.mode = "battle";
        Battle.throwBraincell(key);
        return;
      }
      if (item && item.heal) {
        document.getElementById("menu").classList.add("hidden");
        bagMenuState = null;
        game.mode = "battle";
        Battle.useHealItemInBattle(key);
        return;
      }
      return;
    }
    // overworld use: heal or PP-restore items
    if (item && (item.heal || item.ppHeal)) {
      document.getElementById("menu").classList.add("hidden");
      const itemKey = key;
      bagMenuState = null;
      Audio.play("open");
      teamMenuState = { idx: 0, fromBattle: false, swapMode: false, useItem: itemKey };
      game.mode = "team";
      renderTeamMenu();
      document.getElementById("menu").classList.remove("hidden");
      return;
    }
    showDialogOver(["You can't use that here."], () => { renderBagMenu(); });
  }

  // ----- SHOP -----
  let shopState = null;
  function openShop() {
    Audio.play("open");
    shopState = { idx: 0, items: SHOP_ITEMS };
    game.mode = "shop";
    renderShop();
    document.getElementById("menu").classList.remove("hidden");
  }
  function closeShop() {
    document.getElementById("menu").classList.add("hidden");
    shopState = null;
    game.mode = "overworld";
  }
  function shopMove(d) {
    if (!shopState) return;
    shopState.idx = (shopState.idx + d + shopState.items.length) % shopState.items.length;
    renderShop();
  }
  function renderShop() {
    const ul = document.getElementById("menu-list");
    const rows = shopState.items.map((it, i) => {
      const item = ITEMS[it.key];
      const owned = game.bag[it.key] || 0;
      const ownedTag = owned > 0 ? ` <small style="opacity:.7">(have ${owned})</small>` : "";
      const cantAfford = game.money < it.price;
      const priceColor = cantAfford ? "#ff8a8a" : "#ffe070";
      return `<li class="${i === shopState.idx ? "selected" : ""}">
        <b>${item.name}</b> <span style="color:${priceColor}">— $${it.price}</span>${ownedTag}<br>
        <small>${item.desc}</small>
      </li>`;
    }).join("");
    ul.innerHTML = `<li class="header">SHOP · $${game.money}</li>` + rows + `<li class="footer"><small>X = leave · Z = buy</small></li>`;
  }
  function shopBuy() {
    if (!shopState) return;
    const it = shopState.items[shopState.idx];
    if (game.money < it.price) {
      Audio.play("cancel");
      showDialogOver(["Not enough cash!"], () => { renderShop(); });
      return;
    }
    Audio.play("confirm");
    game.money -= it.price;
    game.bag[it.key] = (game.bag[it.key] || 0) + 1;
    saveGame();
    renderShop();
  }

  // ----- Interact -----
  function interact() {
    const p = game.player;
    let tx = p.tileX, ty = p.tileY;
    if (p.facing === "up") ty--;
    else if (p.facing === "down") ty++;
    else if (p.facing === "left") tx--;
    else if (p.facing === "right") tx++;
    const npc = World.npcAt(tx, ty);
    if (!npc) {
      // No NPC there. If we're staring at a building door, offer a hint
      // so the player isn't confused by an unresponsive doorway.
      const tile = World.tileAt(tx, ty);
      if (tile === World.T.D) {
        showDialog(["The door is locked from the outside.\nWalk around the building to find an entrance."], () => {});
        return;
      }
      // Likewise for shop / heal floors approached from outside
      if (tile === World.T.SHOP_FLOOR) {
        showDialog(["This is the Brain Cell Mart.\nLook for the shopkeeper inside."], () => {});
        return;
      }
      if (tile === World.T.HEAL_SIGN) {
        showDialog(["Cappuccino Bar — full restore inside.\nLook for the barista (pink hair)."], () => {});
        return;
      }
      return;
    }
    if (npc) {
      if (npc.type === "trainer") {
        if (npc.defeated) {
          Audio.play("cancel");
          showDialog([`${npc.dialog[0].split(":")[0]}: I have been bested. Move along.`], () => {});
          return;
        }
        const block = trainerBlocksAccess(npc);
        if (block) {
          Audio.play("cancel");
          showDialog([`${npc.dialog[0].split(":")[0]}: ...not yet.`, block], () => {});
          return;
        }
        Audio.play("encounter");
        showDialog(npc.dialog, () => {
          startTrainerBattle(npc);
        });
      } else if (npc.type === "healer") {
        Audio.play("heal");
        // trigger sparkle animation (rendered in render() below)
        game.healFx = 90;
        showDialog(npc.dialog, () => {
          let restored = 0;
          for (const m of game.team) {
            restored += (m.maxHp - m.hp);
            m.hp = m.maxHp;
            for (const mv of m.moves) mv.pp = mv.maxPp;
          }
          // friendlier confirmation showing what was healed
          if (restored > 0) {
            showDialog([`Your team is fighting fit again!\n(+${restored} HP, all PP restored)`], () => {});
          }
          saveGame();
        });
      } else if (npc.type === "shop") {
        showDialog(npc.dialog, () => { openShop(); });
      } else if (npc.type === "ferry") {
        // Post-game ferry: gated by beating the Champion
        if (!game.beatenChampion) {
          showDialog(["Ferry Captain: I don't sail for trainers without a Champion ribbon.\nCome back when you've beaten the Brainrot Queen."], () => {});
          return;
        }
        showDialog(npc.dialog, () => {
          if (!npc.ferryTo) return;
          doMapTransition(npc.ferryTo);
        });
      } else if (npc.type === "item") {
        if (npc.consumed) return;
        Audio.play("captured");
        showDialog(npc.dialog, () => {
          game.bag[npc.itemKey] = (game.bag[npc.itemKey] || 0) + 1;
          npc.consumed = true;
          saveGame();
        });
      } else if (npc.type === "sign" || npc.type === "npc") {
        showDialog(npc.dialog || ["..."], () => {});
      }
    }
  }

  function startTrainerBattle(npc) {
    Audio.play("encounter");
    const data = TRAINERS[npc.trainerKey];
    const team = data.team.map(({id, lvl}) => {
      markDexSeen(id);
      return makeMon(id, lvl);
    });
    game.mode = "battle";
    Battle.start(game.team, team, {
      isTrainer: true,
      trainerName: data.name,
      trainerData: data,
      onEnd: (result) => {
        // Drain any "wants to learn move" prompts queued during the fight.
        if (result.pendingMoveLearns && result.pendingMoveLearns.length) {
          enqueueMoveLearns(result.pendingMoveLearns);
        }
        if (result.defeatedTrainer) {
          npc.defeated = true;
          game.stats.battlesWon++;
          // Story beat: Cult trainers carry storyBeat=N. We only ever
          // raise the bar so re-fights don't reset progress.
          if (data.storyBeat && data.storyBeat > (game.story.beat || 0)) {
            game.story.beat = data.storyBeat;
          }
          if (data.reward) game.money += data.reward;
          const lines = [];
          if (data.reward) lines.push(`You earned $${data.reward}!`);
          if (data.badge) {
            game.badges = Math.max(game.badges, data.badge);
            lines.push(`You earned the ${data.badgeName}!  (Badge ${data.badge})`);
          }
          if (data.isChampion) {
            game.beatenChampion = true;
            lines.push("You defeated the BRAINROT QUEEN!");
            lines.push("You are the Brainrot Champion!");
            lines.push("...The credits would roll, but the lore continues.");
            lines.push("Legendaries (Tralatitan, Braincore, Ohio) appear in deep grass now. Hunt them!");
          }
          if (lines.length) showDialog(lines, () => {});
        }
        game.mode = "overworld";
        saveGame();
      },
    });
  }

  function trainerBlocksAccess(npc) {
    const data = TRAINERS[npc.trainerKey];
    if (!data || !data.requiresBadge) return null;
    if (game.badges >= data.requiresBadge) return null;
    return `You need at least ${data.requiresBadge} badge${data.requiresBadge>1?'s':''} to challenge here.`;
  }

  function startWildBattle() {
    if (game.team.every(m => m.hp <= 0)) {
      whiteOut();
      return;
    }
    Audio.play("encounter");
    const tableId = World.encounterTable() || "GENERAL_CHAT";
    const table = ENCOUNTERS[tableId] || ENCOUNTERS.ROUTE_1;
    const total = table.reduce((s, e) => s + e.weight, 0);
    let r = Math.random() * total;
    let chosen = table[0];
    for (const e of table) { r -= e.weight; if (r <= 0) { chosen = e; break; } }
    const lvl = chosen.minLvl + Math.floor(Math.random() * (chosen.maxLvl - chosen.minLvl + 1));
    const enemy = makeMon(chosen.id, lvl);
    markDexSeen(enemy.species);
    game.mode = "battle";
    game.flashTime = 12;
    Battle.start(game.team, enemy, {
      isTrainer: false,
      onEnd: (result) => {
        if (result.pendingMoveLearns && result.pendingMoveLearns.length) {
          enqueueMoveLearns(result.pendingMoveLearns);
        }
        if (result.caught) {
          markDexCaught(result.enemyMon.species);
          game.stats.monsCaught++;
          if (game.team.length < 6) game.team.push(result.enemyMon);
          else game.box.push(result.enemyMon);
        }
        game.mode = "overworld";
        if (game.team.every(m => m.hp <= 0)) {
          whiteOut();
        } else {
          saveGame();
        }
      },
    });
  }

  function whiteOut() {
    const lost = Math.floor(game.money / 2);
    game.money -= lost;
    for (const m of game.team) {
      m.hp = m.maxHp;
      for (const mv of m.moves) mv.pp = mv.maxPp;
    }
    World.setCurrentMap("pallet");
    game.currentMap = "pallet";
    game.player.tileX = 8;
    game.player.tileY = 14;
    game.player.pixelX = 8 * 16;
    game.player.pixelY = 14 * 16;
    game.player.facing = "down";
    game.player.moving = false;
    game.encounterCooldown = 8;
    game.flashTime = 18;
    Audio.play("faint");
    saveGame();
    showDialog([
      "You blacked out!",
      "...",
      `You lost $${lost} from your panic.`,
      "A kind passerby dragged you to the Cappuccino Bar.\nYour team has been fully restored.",
    ], () => {});
  }

  function markDexSeen(speciesId) {
    if (!game.dex.seen[speciesId]) {
      game.dex.seen[speciesId] = true;
    }
  }
  function markDexCaught(speciesId) {
    game.dex.seen[speciesId] = true;
    game.dex.caught[speciesId] = true;
  }

  // ----- Movement -----
  function tryStartMove() {
    const p = game.player;
    if (p.moving) return;
    let dx = 0, dy = 0, facing = p.facing;
    // Accept WASD as well as the arrow keys for movement.
    if (keys["ArrowUp"] || keys["w"]) { dy = -1; facing = "up"; }
    else if (keys["ArrowDown"] || keys["s"]) { dy = 1; facing = "down"; }
    else if (keys["ArrowLeft"] || keys["a"]) { dx = -1; facing = "left"; }
    else if (keys["ArrowRight"] || keys["d"]) { dx = 1; facing = "right"; }
    else return;
    p.facing = facing;
    const nx = p.tileX + dx, ny = p.tileY + dy;
    if (!World.isWalkable(nx, ny)) {
      Audio.play("bump");
      return;
    }
    p.targetX = nx;
    p.targetY = ny;
    p.moving = true;
    p.moveProgress = 0;
    p.dx = dx;
    p.dy = dy;
    Audio.play("step");
  }

  function updateMovement() {
    const p = game.player;
    if (!p.moving) return;
    p.moveProgress += p.moveSpeed;
    p.pixelX = p.tileX * 16 + p.dx * p.moveProgress;
    p.pixelY = p.tileY * 16 + p.dy * p.moveProgress;
    if (p.moveProgress >= 16) {
      p.tileX = p.targetX;
      p.tileY = p.targetY;
      p.pixelX = p.tileX * 16;
      p.pixelY = p.tileY * 16;
      p.moving = false;
      p.stepCounter++;
      game.stats.steps++;
      // 4-frame walk cycle: contact-L → left-lead → contact-R → right-lead
      p.animFrame = (p.animFrame + 1) % 4;
      // map transition?
      const portal = World.portalAt(p.tileX, p.tileY);
      if (portal) {
        doMapTransition(portal.to);
        return;
      }
      if (World.isEncounterTile(p.tileX, p.tileY)) {
        if (game.encounterCooldown <= 0 && Math.random() < 0.10) {
          game.encounterCooldown = 4;
          startWildBattle();
          return;
        }
      }
      if (game.encounterCooldown > 0) game.encounterCooldown--;
    }
  }

  function doMapTransition(dest) {
    Audio.play("step");
    World.setCurrentMap(dest.map);
    game.currentMap = dest.map;
    const p = game.player;
    p.tileX = dest.x;
    p.tileY = dest.y;
    p.pixelX = p.tileX * 16;
    p.pixelY = p.tileY * 16;
    p.moving = false;
    game.mapBanner = { text: World.getMapName(), t: 90 };
    game.flashTime = 6;
    saveGame();
  }

  function updateCamera() {
    const p = game.player;
    const W = canvas.width, H = canvas.height;
    let cx = p.pixelX + 8 - W / 2;
    let cy = p.pixelY + 8 - H / 2;
    const mw = World.getMapWidth() * 16;
    const mh = World.getMapHeight() * 16;
    cx = Math.max(0, Math.min(Math.max(0, mw - W), cx));
    cy = Math.max(0, Math.min(Math.max(0, mh - H), cy));
    game.cam.x = cx;
    game.cam.y = cy;
  }

  function saveGame() {
    // collect all defeated/consumed NPCs across all maps
    const defeated = [];
    const consumed = [];
    for (const m of World.allMaps()) {
      for (const n of m.npcs || []) {
        if (n.defeated) defeated.push({ map: m.id, id: n.id });
        if (n.consumed) consumed.push({ map: m.id, id: n.id });
      }
    }
    // Roll the current session's elapsed time into totalPlayMs at save time
    // so the persisted "total playtime" never lags behind real play.
    const liveStats = Object.assign({}, game.stats, {
      totalPlayMs: (game.stats.totalPlayMs || 0) + (Date.now() - (game.stats.sessionStart || Date.now())),
      sessionStart: Date.now(),
    });
    game.stats = liveStats;
    const data = {
      team: game.team,
      box: game.box,
      bag: game.bag,
      money: game.money,
      currentMap: game.currentMap,
      player: { tileX: game.player.tileX, tileY: game.player.tileY, facing: game.player.facing },
      badges: game.badges,
      dex: game.dex,
      beatenChampion: !!game.beatenChampion,
      stats: liveStats,
      story: game.story,
      defeated, consumed,
    };
    try { localStorage.setItem("monkeyguildmon_save_v1", JSON.stringify(data)); } catch(e) {}
    // Surface a tiny "Saved!" toast on every save so the player has feedback.
    game.saveToast = 60;
  }
  function loadSave() {
    try {
      const raw = localStorage.getItem("monkeyguildmon_save_v1");
      if (!raw) return false;
      const data = JSON.parse(raw);
      if (!data.team || data.team.length === 0) return false;
      game.team = data.team;
      game.box = data.box || [];
      game.bag = data.bag || { DISCORD_INVITE: 8 };
      game.money = data.money ?? 500;
      game.currentMap = data.currentMap || "pallet";
      World.setCurrentMap(game.currentMap);
      game.player.tileX = data.player.tileX;
      game.player.tileY = data.player.tileY;
      game.player.pixelX = game.player.tileX * 16;
      game.player.pixelY = game.player.tileY * 16;
      game.player.facing = data.player.facing || "down";
      game.badges = data.badges || 0;
      game.dex = data.dex || { seen: {}, caught: {} };
      if (!game.dex.seen) game.dex.seen = {};
      if (!game.dex.caught) game.dex.caught = {};
      for (const m of [...game.team, ...game.box]) {
        markDexSeen(m.species);
        markDexCaught(m.species);
      }
      game.beatenChampion = !!data.beatenChampion;
      if (data.stats) {
        game.stats = {
          steps: data.stats.steps || 0,
          battlesWon: data.stats.battlesWon || 0,
          monsCaught: data.stats.monsCaught || 0,
          // Migrate old saves that used `startedAt` as totalPlayMs proxy.
          totalPlayMs: data.stats.totalPlayMs || 0,
          sessionStart: Date.now(),
        };
      }
      if (data.story) game.story = { beat: data.story.beat || 0 };
      const defs = data.defeated || [];
      const cons = data.consumed || [];
      for (const m of World.allMaps()) {
        for (const n of m.npcs || []) {
          if (defs.find(d => d.map === m.id && d.id === n.id)) n.defeated = true;
          if (cons.find(d => d.map === m.id && d.id === n.id)) n.consumed = true;
        }
      }
      return true;
    } catch(e) { return false; }
  }

  window.__mgm = { game, saveGame, loadSave, World, SPECIES, makeMon, Battle, Audio };

  window.__mgmBagConsume = function(itemKey) {
    if ((game.bag[itemKey] || 0) <= 0) return false;
    game.bag[itemKey]--;
    return true;
  };
  window.__mgmBagSnapshot = function() {
    return Object.assign({}, game.bag);
  };
  window.__mgmOpenBag = function(fromBattle) { openBagMenu(fromBattle); };
  window.__mgmOpenTeam = function(fromBattle) { openTeamMenu(fromBattle); };

  // ----- Title screen drawing (animated mons) -----
  function drawTitleAnimation(time) {
    // animated mons floating across title bg (drawn behind DOM title-screen)
  }

  function drawStarterScreen(time) {
    // Background — sprites stay on the canvas (pixel-art crispness preserved).
    // All text is rendered by the DOM #starter-screen overlay (sharp CSS text).
    ctx.fillStyle = "#0d0d18";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < 20; i++) {
      const t = time * 0.0005 + i;
      const x = ((Math.sin(t) * 0.5 + 0.5) * canvas.width);
      const y = ((Math.cos(t * 1.3 + i) * 0.5 + 0.5) * canvas.height);
      ctx.fillStyle = `rgba(255,203,5,${0.04 + (i%3)*0.02})`;
      ctx.fillRect(x, y, 1, 1);
    }
    const slots = [
      { x: canvas.width/2 - 80 },
      { x: canvas.width/2 - 24 },
      { x: canvas.width/2 + 32 },
    ];
    for (let i = 0; i < STARTERS.length; i++) {
      const s = slots[i];
      const isSel = i === game.starterIdx;
      const bob = isSel ? Math.sin(time * 0.005) * 2 : 0;
      if (isSel) {
        ctx.fillStyle = "rgba(255,203,5,0.2)";
        ctx.fillRect(s.x - 4, 18, 56, 56);
        ctx.strokeStyle = "#ffcb05";
        ctx.lineWidth = 1;
        ctx.strokeRect(s.x - 4, 18, 56, 56);
      }
      SpriteRenderer.drawMon(ctx, STARTERS[i], s.x, 24 + bob, 48, time);
    }
  }

  function wrapText(ctx, text, x, y, maxW, lh) {
    const words = text.split(" ");
    let line = "";
    let yy = y;
    for (const w of words) {
      const test = line + w + " ";
      if (ctx.measureText(test).width > maxW) {
        ctx.fillText(line, x, yy);
        line = w + " ";
        yy += lh;
      } else line = test;
    }
    ctx.fillText(line, x, yy);
  }

  // animated title background
  const titleMons = [];
  function setupTitleMons() {
    const ids = Object.keys(SPECIES);
    // Desktop edition gets a denser, more elaborate background drift.
    const count = IS_DESKTOP ? 18 : 8;
    for (let i = 0; i < count; i++) {
      titleMons.push({
        id: ids[Math.floor(Math.random() * ids.length)],
        x: Math.random() * 480,
        y: Math.random() * 320,
        vx: (Math.random()-0.5) * 0.4,
        vy: (Math.random()-0.5) * 0.4,
        size: 32 + Math.random() * 32,
        op: 0.2 + Math.random() * 0.3,
      });
    }
  }
  setupTitleMons();
  function drawTitleScreen(time) {
    ctx.fillStyle = "#0d0625";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // mons drifting
    ctx.globalAlpha = 0.5;
    for (const m of titleMons) {
      m.x += m.vx;
      m.y += m.vy;
      if (m.x < -64) m.x = 480;
      if (m.x > 480) m.x = -64;
      if (m.y < -64) m.y = 320;
      if (m.y > 320) m.y = -64;
      ctx.globalAlpha = m.op;
      SpriteRenderer.drawMon(ctx, m.id, m.x, m.y, m.size, time);
    }
    ctx.globalAlpha = 1;
  }

  function loop(t) {
    const dt = Math.min(80, t - lastTime);
    lastTime = t;
    nowTime = t;
    update(t, dt);
    render(t);
    requestAnimationFrame(loop);
  }

  function update(time, dt) {
    if (game.mode === "overworld") {
      tryStartMove();
      updateMovement();
      updateCamera();
    }
    if (game.mode === "battle") {
      Battle.update(time, dt);
    }
    if (game.mode === "dialog") tickDialogTypewriter(dt);
    if (game.flashTime > 0) game.flashTime--;
    if (game.healFx > 0) game.healFx--;
    if (game.saveToast > 0) game.saveToast--;
    updateHudOverlays();
    // try to keep overworld music alive
    if ((game.mode === "overworld" || game.mode === "menu" || game.mode === "team" ||
         game.mode === "bag" || game.mode === "dex" || game.mode === "shop") &&
        !Audio.isMuted()) {
      Music.start();
    }
  }

  function render(time) {
    if (game.mode === "title") {
      drawTitleScreen(time);
      return;
    }
    if (game.mode === "starter") { drawStarterScreen(time); return; }
    if (game.mode === "battle") { Battle.draw(ctx, time); Battle.refreshInfo(); return; }
    World.draw(ctx, game.cam, time);
    // While mid-step, alternate between contact and lead frame so legs visibly move.
    let drawFrame = game.player.animFrame;
    if (game.player.moving) {
      // halfway through the step, show the lead frame; ends on the next contact.
      const halfway = game.player.moveProgress >= 8;
      // current foot phase: even animFrame (0,2) = contact, odd (1,3) = lead
      const baseIsContact = (game.player.animFrame % 2 === 0);
      drawFrame = baseIsContact && halfway
        ? (game.player.animFrame === 0 ? 1 : 3)
        : game.player.animFrame;
    }
    SpriteRenderer.drawPlayer(
      ctx,
      game.player.pixelX - game.cam.x,
      game.player.pixelY - game.cam.y,
      game.player.facing,
      drawFrame
    );
    if (game.flashTime > 0) {
      ctx.fillStyle = `rgba(255,255,255,${game.flashTime / 12})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    // Healing sparkles around the player
    if (game.healFx > 0) {
      const px = game.player.pixelX - game.cam.x + 8;
      const py = game.player.pixelY - game.cam.y + 8;
      const phase = (90 - game.healFx) / 90;
      // soft green glow halo
      const glowA = Math.max(0, 0.35 * (1 - phase));
      ctx.fillStyle = `rgba(120,255,180,${glowA})`;
      ctx.beginPath();
      ctx.arc(px, py, 14, 0, Math.PI * 2);
      ctx.fill();
      // 6 orbiting sparkles spiraling outward
      for (let i = 0; i < 6; i++) {
        const a = (game.healFx * 0.06) + (i * Math.PI / 3);
        const r = 4 + phase * 14;
        const sx = px + Math.cos(a) * r;
        const sy = py + Math.sin(a) * r * 0.6 - phase * 6;
        const sa = Math.max(0, 1 - phase);
        ctx.fillStyle = `rgba(255,255,255,${sa})`;
        ctx.fillRect(sx - 0.5, sy - 0.5, 1, 1);
        ctx.fillStyle = `rgba(120,255,180,${sa * 0.8})`;
        ctx.fillRect(sx - 1, sy, 2, 1);
        ctx.fillRect(sx, sy - 1, 1, 2);
      }
    }
    // floating Z prompt above NPC the player faces
    drawInteractionPrompt(time);

    // All HUD text is now rendered as DOM overlays for sharp text;
    // see updateHudOverlays() called from update().
    if (game.mapBanner.t > 0) game.mapBanner.t--;
  }

  // ----- Sharp DOM HUD overlays -----
  // These mirror the game state into DOM elements that sit over the
  // canvas. Updated once per frame from update(). The previous canvas-
  // rendered text was readable but blurry due to CSS upscaling.
  // Lazy because update() (which calls into here) is hoisted as a
  // function declaration but runs before module-level `const` lines
  // would otherwise initialize. Querying on first call also tolerates
  // older index.html files that don't have these overlay elements yet.
  let HUD_EL = null;
  function getHudEl() {
    if (HUD_EL) return HUD_EL;
    const hud = document.getElementById("overlay-hud");
    if (!hud) return null;
    HUD_EL = {
      hud,
      badges: document.getElementById("overlay-hud-badges"),
      money: document.getElementById("overlay-hud-money"),
      team: document.getElementById("overlay-hud-team"),
      mapName: document.getElementById("overlay-map-name"),
      hint: document.getElementById("overlay-hint"),
      hintText: document.getElementById("overlay-hint-text"),
      banner: document.getElementById("overlay-banner"),
      bannerText: document.getElementById("overlay-banner-text"),
      saveToast: document.getElementById("overlay-save-toast"),
    };
    return HUD_EL;
  }

  function updateHudOverlays() {
    const E = getHudEl();
    if (!E) return;
    const showOverworld =
      game.mode === "overworld" ||
      game.mode === "menu" ||
      game.mode === "team" ||
      game.mode === "bag" ||
      game.mode === "dex" ||
      game.mode === "shop" ||
      game.mode === "box" ||
      game.mode === "moveLearn";
    const visible = showOverworld;

    E.hud.classList.toggle("hidden", !visible);
    E.mapName.classList.toggle("hidden", !visible);
    E.hint.classList.toggle("hidden", !visible);

    if (visible) {
      E.badges.textContent = `Bdg:${game.badges}/5`;
      E.money.textContent = `$${game.money}`;
      E.team.textContent = `T:${game.team.length}/6`;
      E.mapName.textContent = World.getMapName();
      const grassHere = World.isEncounterTile(game.player.tileX, game.player.tileY);
      if (grassHere) {
        E.hint.classList.add("grass");
        E.hintText.textContent = "! TALL GRASS — WILD MEMES MAY APPEAR !";
      } else {
        E.hint.classList.remove("grass");
        E.hintText.textContent = "Z = Talk · X = Menu · Walk INTO tall grass to fight";
      }
    }

    // Map banner: fade in/out using game.mapBanner.t (0..90 lifecycle)
    const bt = game.mapBanner.t || 0;
    if (bt > 0 && visible) {
      const a = bt < 30 ? bt / 30 : (bt > 60 ? (90 - bt) / 30 : 1);
      E.banner.classList.remove("hidden");
      E.banner.style.opacity = String(Math.max(0, Math.min(1, a)));
      E.bannerText.textContent = game.mapBanner.text || "";
    } else {
      E.banner.classList.add("hidden");
    }

    // Save toast: lifecycle 0..60
    if (game.saveToast > 0 && visible) {
      const a = game.saveToast < 15 ? game.saveToast / 15 : 1;
      E.saveToast.classList.remove("hidden");
      E.saveToast.style.opacity = String(Math.max(0, Math.min(1, a)));
    } else {
      E.saveToast.classList.add("hidden");
    }
  }

  function drawInteractionPrompt(time) {
    const p = game.player;
    if (p.moving) return;
    let tx = p.tileX, ty = p.tileY;
    if (p.facing === "up") ty--;
    else if (p.facing === "down") ty++;
    else if (p.facing === "left") tx--;
    else if (p.facing === "right") tx++;
    const npc = World.npcAt(tx, ty);
    if (!npc) return;
    if (npc.consumed) return;
    // bobbing Z indicator
    const sx = npc.x * 16 - game.cam.x;
    const sy = npc.y * 16 - game.cam.y;
    const bob = Math.sin(time * 0.008) * 1;
    // bubble
    ctx.fillStyle = "#fff";
    ctx.fillRect(sx + 4, sy - 8 + bob, 8, 7);
    ctx.fillStyle = "#000";
    ctx.fillRect(sx + 4, sy - 8 + bob, 8, 1);
    ctx.fillRect(sx + 4, sy - 2 + bob, 8, 1);
    ctx.fillRect(sx + 4, sy - 8 + bob, 1, 7);
    ctx.fillRect(sx + 11, sy - 8 + bob, 1, 7);
    // tail
    ctx.fillStyle = "#fff";
    ctx.fillRect(sx + 7, sy - 1 + bob, 2, 1);
    ctx.fillStyle = "#000";
    ctx.fillRect(sx + 7, sy + bob, 2, 1);
    // letter Z
    ctx.fillStyle = "#000";
    ctx.font = "bold 5px monospace";
    ctx.textAlign = "center";
    ctx.fillText("Z", sx + 8, sy - 3 + bob);
  }

  requestAnimationFrame(loop);
})();
