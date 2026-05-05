// =====================================================
// Battle system - turn based, animated
// =====================================================

const Battle = (() => {
  let state = null;

  const elText = () => document.getElementById("battle-text");
  const elActions = () => document.getElementById("battle-actions");
  const elMoveList = () => document.getElementById("move-list");
  const elBattleUi = () => document.getElementById("battle-ui");
  const elEnemyInfo = () => document.getElementById("enemy-info");
  const elPlayerInfo = () => document.getElementById("player-info");

  // ===== Tween system with built-in easing =====
  // All animation tweens go through here. Default easing is easeOutCubic
  // (smooth deceleration) — feels much better than linear for HP drains
  // and slide-ins. Pass `ease: "linear"` to opt out, or any easing name.
  const EASINGS = {
    linear:         (t) => t,
    easeOutCubic:   (t) => 1 - Math.pow(1 - t, 3),
    easeOutQuart:   (t) => 1 - Math.pow(1 - t, 4),
    easeInOutCubic: (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
    // Spring overshoot — snappy with a tiny bounce on landing.
    easeOutBack:    (t) => {
      const c1 = 1.70158, c3 = c1 + 1;
      return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
    },
    // Strong impact deceleration — for shake / flash decay.
    easeOutExpo:    (t) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t),
  };
  function makeTween() {
    return { active: false, from: 0, to: 0, t0: 0, dur: 0, value: 0, onDone: null, easeFn: EASINGS.easeOutCubic };
  }
  function startTween(tw, from, to, dur, onDone, ease) {
    tw.active = true;
    tw.from = from;
    tw.to = to;
    tw.value = from;
    tw.t0 = performance.now();
    tw.dur = dur;
    tw.onDone = onDone || null;
    tw.easeFn = (typeof ease === "string" && EASINGS[ease]) ? EASINGS[ease]
              : (typeof ease === "function") ? ease
              : EASINGS.easeOutCubic;
  }
  function updateTween(tw, now) {
    if (!tw.active) return;
    const raw = Math.min(1, (now - tw.t0) / tw.dur);
    const eased = tw.easeFn ? tw.easeFn(raw) : raw;
    tw.value = tw.from + (tw.to - tw.from) * eased;
    if (raw >= 1) {
      tw.active = false;
      tw.value = tw.to;
      const cb = tw.onDone;
      tw.onDone = null;
      if (cb) cb();
    }
  }

  // Smooth `state.x` toward `target` with rate-limited approach. Used
  // for slide offsets and other persistent-update animations. `step` is
  // the proportion of remaining distance to close per frame at 60fps.
  function smoothApproach(current, target, lerpRate, dt) {
    // dt-aware lerp: feels the same at any framerate
    const k = 1 - Math.pow(1 - lerpRate, dt / (1000 / 60));
    return current + (target - current) * k;
  }

  function start(playerTeam, opponent, opts = {}) {
    state = {
      playerTeam,
      isTrainer: !!opts.isTrainer,
      trainerName: opts.trainerName || "",
      trainerData: opts.trainerData || null,
      enemyTeam: opts.isTrainer ? opponent : null,
      enemyIdx: 0,
      enemyMon: opts.isTrainer ? opponent[0] : opponent,
      playerIdx: Math.max(0, playerTeam.findIndex(m => m.hp > 0)),
      phase: "intro",
      messageQueue: [],
      message: "",
      typedText: "",
      typeIdx: 0,
      typeTimer: 0,
      typing: false,
      onEnd: opts.onEnd || (() => {}),
      caught: false,
      ranAway: false,
      pendingPlayerMove: null,
      pendingEnemyMove: null,
      turnOrder: [],
      turnIdx: 0,
      enemyShake: 0,
      playerShake: 0,
      enemyFlash: 0,
      playerFlash: 0,
      enemyOffsetX: 200, // slide-in from right
      playerOffsetX: -240, // slide-in from left
      enemyOffsetY: 0,
      playerOffsetY: 0,
      enemyFainted: false,
      playerFainted: false,
      enemyHpTween: makeTween(),
      playerHpTween: makeTween(),
      visualEnemyHp: 0,
      visualPlayerHp: 0,
      uiBlocked: false, // true while animation running
      attackAnimT: 0, // attacker forward bounce
      attackAnimWho: null,
      moveAnim: null,  // { family, t0, dur, fromPlayer, defenderX, defenderY, attackerX, attackerY }
      shakeMagX: 0,
      catchShakes: 0,
      catchAnimT: 0,
      // Ali's "give-up x2 then shrink ray" mechanic. Tracks how many times
      // the active refusesToFight mon has used GIVE_UP this battle. After
      // it hits 2, SHRINK_RAY becomes selectable in showMoves().
      refuseCount: 0,
    };
    state.visualEnemyHp = state.enemyMon.hp;
    state.visualPlayerHp = playerMon().hp;
    elBattleUi().classList.remove("hidden");
    elActions().classList.add("hidden");
    elMoveList().classList.add("hidden");

    Audio.play("encounter");
    // slide in
    state.uiBlocked = true;
    setTimeout(() => {
      state.enemyOffsetX = 0;
      state.playerOffsetX = 0;
      setTimeout(() => {
        state.uiBlocked = false;
        if (state.isTrainer && state.trainerData) {
          enqueue(state.trainerData.intro);
          enqueue(`${state.trainerData.name} sent out ${SPECIES[state.enemyMon.species].name}!`);
        } else {
          enqueue(`A wild ${SPECIES[state.enemyMon.species].name} appeared!`);
        }
        enqueue(`Go, ${SPECIES[playerMon().species].name}!`);
        nextMessage();
      }, 50);
    }, 600);

    refreshInfo(true);
  }

  function playerMon() { return state.playerTeam[state.playerIdx]; }

  function enqueue(msg) { state.messageQueue.push(msg); }

  function nextMessage() {
    if (!state) return;
    if (state.messageQueue.length === 0) {
      state.message = "";
      state.typedText = "";
      state.typing = false;
      onMessageEnd();
      return;
    }
    state.message = state.messageQueue.shift();
    state.typedText = "";
    state.typeIdx = 0;
    state.typeTimer = 0;
    state.typing = true;
    elText().textContent = "";
    elActions().classList.add("hidden");
    elMoveList().classList.add("hidden");
  }

  function tickTypewriter(now, dt) {
    if (!state || !state.typing) return;
    state.typeTimer += dt;
    const speed = 22; // chars per second... bumped to 30
    const charsPerMs = 0.030;
    const want = Math.floor(state.typeTimer * charsPerMs);
    while (state.typeIdx < state.message.length && state.typeIdx < want) {
      const c = state.message[state.typeIdx];
      state.typedText += c;
      state.typeIdx++;
      if (state.typeIdx % 2 === 0 && c !== " " && c !== "\n") Audio.play("text");
    }
    if (state.typeIdx >= state.message.length) state.typing = false;
    elText().textContent = state.typedText;
  }

  function fastForwardTypewriter() {
    if (!state || !state.typing) return false;
    state.typedText = state.message;
    state.typeIdx = state.message.length;
    state.typing = false;
    elText().textContent = state.typedText;
    return true;
  }

  function onMessageEnd() {
    if (!state) return;
    refreshInfo();
    switch (state.phase) {
      case "intro":
        state.phase = "menu";
        showActions();
        break;
      case "midTurn":
        if (state.enemyMon.hp <= 0) { handleEnemyFaint(); return; }
        if (playerMon().hp <= 0) { handlePlayerFaint(); return; }
        doNextTurnAction();
        break;
      case "endTurn":
      case "trainerSwap":
      case "playerSwap":
        state.phase = "menu";
        showActions();
        break;
      case "wonBattle":
      case "lostBattle":
      case "ranAway":
      case "caughtMon":
        finish();
        break;
      default:
        break;
    }
  }

  function showActions() {
    if (!state) return;
    elText().innerHTML = `What will <b>${SPECIES[playerMon().species].name}</b> do?`;
    elActions().classList.remove("hidden");
    elMoveList().classList.add("hidden");
  }

  function showMoves() {
    Audio.play("select");
    const atkSp = SPECIES[playerMon().species];
    const html = playerMon().moves.map((m, i) => {
      const mv = MOVES[m.id];
      // Ali quirk: SHRINK_RAY is locked behind 2 give-ups for refusesToFight
      // species. Render it as a greyed-out, unselectable hint until then.
      if (atkSp.refusesToFight && m.id === "SHRINK_RAY" && state.refuseCount < 2) {
        const left = 2 - state.refuseCount;
        return `<button data-move="locked" disabled style="opacity:0.45">??? <br><small>locked · give up ${left}× more</small></button>`;
      }
      return `<button data-move="${i}">${mv.name}<br><small>${mv.type} · ${m.pp}/${m.maxPp}</small></button>`;
    }).join("");
    elMoveList().innerHTML = html + `<button data-move="back">↩ BACK</button>`;
    elActions().classList.add("hidden");
    elMoveList().classList.remove("hidden");
  }

  function handleAction(action) {
    if (!state || state.phase !== "menu" || state.uiBlocked) return;
    if (action === "fight") showMoves();
    else if (action === "bag") openBagFromBattle();
    else if (action === "team") openTeamFromBattle();
    else if (action === "run") attemptRun();
  }

  function handleMove(idx) {
    if (!state) return;
    if (state.uiBlocked || state.phase !== "menu" || state.typing) return;
    if (idx === "back") { Audio.play("cancel"); showActions(); return; }
    if (idx === "locked") { Audio.play("cancel"); return; }
    const slot = playerMon().moves[+idx];
    if (!slot) return;
    if (slot.pp <= 0) {
      Audio.play("cancel");
      enqueue("No PP left for that move!");
      state.phase = "endTurn";
      nextMessage();
      return;
    }
    Audio.play("confirm");
    state.pendingPlayerMove = slot;
    state.pendingEnemyMove = pickEnemyMove();
    const playerSpd = getStat(playerMon(), "spd");
    const enemySpd = getStat(state.enemyMon, "spd");
    const playerFirst = playerSpd > enemySpd ||
      (playerSpd === enemySpd && Math.random() < 0.5);
    state.turnOrder = playerFirst ? ["player", "enemy"] : ["enemy", "player"];
    state.turnIdx = 0;
    elActions().classList.add("hidden");
    elMoveList().classList.add("hidden");
    doNextTurnAction();
  }

  function doNextTurnAction() {
    if (!state) return;
    if (state.turnIdx >= state.turnOrder.length) {
      state.phase = "endTurn";
      onMessageEnd();
      return;
    }
    const who = state.turnOrder[state.turnIdx++];
    if (who === "player") {
      if (playerMon().hp <= 0) { doNextTurnAction(); return; }
      executeMove(playerMon(), state.enemyMon, state.pendingPlayerMove, true);
    } else {
      if (state.enemyMon.hp <= 0) { doNextTurnAction(); return; }
      executeMove(state.enemyMon, playerMon(), state.pendingEnemyMove, false);
    }
    state.phase = "midTurn";
    nextMessage();
  }

  function executeMove(attacker, defender, moveSlot, isPlayer) {
    const move = MOVES[moveSlot.id];
    const atkSp = SPECIES[attacker.species];

    // ---- GIVE_UP intercept ----
    // notali (and any species with refusesToFight) just refuses. They
    // don't decrement PP, don't consume the turn's chance to act, and
    // don't trigger the attack lunge. Pure flavor — and a punishment
    // for picking the fat starter.
    if (moveSlot.id === "GIVE_UP" && atkSp.refusesToFight) {
      // Ali's signature: he gives up, instantly falls asleep for the
      // turn. After 2 of these, SHRINK_RAY unlocks for turn 3+.
      if (isPlayer) state.refuseCount = (state.refuseCount || 0) + 1;
      const remaining = Math.max(0, 2 - (state.refuseCount || 0));
      const variants = [
        `${atkSp.name}: too much worrrkkkkk...`,
        `${atkSp.name}: nah I'm good...`,
        `${atkSp.name}: bro why am I even here...`,
      ];
      enqueue(variants[Math.floor(Math.random() * variants.length)]);
      enqueue(`${atkSp.name} fell asleep. Zzz...`);
      if (remaining > 0 && isPlayer) {
        enqueue(`(give up ${remaining} more time${remaining === 1 ? "" : "s"} to wake up SHRINK RAY!)`);
      } else if (isPlayer && state.refuseCount === 2) {
        enqueue(`${atkSp.name}'s eyes flicker open. SHRINK RAY is now usable!`);
      }
      Audio.play("cancel");
      // Sleepy bob on the giver-upper
      if (isPlayer) state.playerShake = 6;
      else state.enemyShake = 6;
      return;
    }
    // Refusal fallback: enemy or non-give-up move on a refusesToFight mon
    // that still has no other choice. Just refuses without count.
    if (atkSp.refusesToFight && !MOVES[moveSlot.id]) {
      enqueue(`${atkSp.name} refuses to battle.`);
      Audio.play("cancel");
      return;
    }

    moveSlot.pp = Math.max(0, moveSlot.pp - 1);
    enqueue(`${SPECIES[attacker.species].name} used ${move.name}!`);
    // attack lunge animation
    state.attackAnimWho = isPlayer ? "player" : "enemy";
    state.attackAnimT = 1;
    // per-move family animation (drawn on battle canvas in drawMoveAnim)
    // sprite centers on the 240x160 layout: player ~ (60, 112), enemy ~ (187, 56)
    const playerCx = 60, playerCy = 112;
    const enemyCx = 187, enemyCy = 56;
    state.moveAnim = {
      family: move.family || null,
      moveId: moveSlot.id,
      t0: performance.now(),
      dur: 700,
      fromPlayer: isPlayer,
      attackerX: isPlayer ? playerCx : enemyCx,
      attackerY: isPlayer ? playerCy : enemyCy,
      defenderX: isPlayer ? enemyCx : playerCx,
      defenderY: isPlayer ? enemyCy : playerCy,
    };
    if (Math.random() > move.acc / 100) {
      enqueue("...but it missed!");
      Audio.play("miss");
      return;
    }
    if (move.cat === "status") {
      applyStatus(attacker, defender, move);
      return;
    }
    const dmg = computeDamage(attacker, defender, move);
    const before = defender.hp;
    defender.hp = Math.max(0, defender.hp - dmg.amount);
    // schedule HP tween + flash + shake
    const tween = isPlayer ? state.enemyHpTween : state.playerHpTween;
    startTween(tween, before, defender.hp, 700);
    if (isPlayer) state.visualEnemyHp = before;
    else state.visualPlayerHp = before;
    if (isPlayer) { state.enemyShake = 12; state.enemyFlash = 12; }
    else { state.playerShake = 12; state.playerFlash = 12; }
    if (dmg.amount === 0) {
      Audio.play("miss");
    } else if (dmg.eff > 1) {
      Audio.play("superHit");
      enqueue("It's super 2026 effective!");
    } else if (dmg.eff < 1 && dmg.eff > 0) {
      Audio.play("weakHit");
      enqueue("It's not very effective...");
    } else {
      Audio.play("hit");
    }
    if (dmg.eff === 0) enqueue(`It doesn't affect ${SPECIES[defender.species].name}...`);
    if (dmg.crit && dmg.amount > 0) enqueue("Critical rizz!");
  }

  function applyStatus(attacker, defender, move) {
    if (move.status === "atk_down") {
      defender.statBoosts.atk = Math.max(-6, (defender.statBoosts.atk || 0) - 1);
      enqueue(`${SPECIES[defender.species].name}'s attack fell!`);
      Audio.play("weakHit");
    } else if (move.status === "confuse") {
      defender.statusEffect = "confused";
      enqueue(`${SPECIES[defender.species].name} became confused!`);
      Audio.play("weakHit");
    } else if (move.status === "heal") {
      const healed = Math.min(attacker.maxHp - attacker.hp, Math.floor(attacker.maxHp / 2));
      const before = attacker.hp;
      attacker.hp += healed;
      const isPlayer = attacker === playerMon();
      const tween = isPlayer ? state.playerHpTween : state.enemyHpTween;
      startTween(tween, before, attacker.hp, 700);
      if (isPlayer) state.visualPlayerHp = before;
      else state.visualEnemyHp = before;
      enqueue(`${SPECIES[attacker.species].name} sipped cappuccino. Restored ${healed} HP!`);
      Audio.play("heal");
    }
  }

  function computeDamage(attacker, defender, move) {
    const atkSp = SPECIES[attacker.species];
    const defSp = SPECIES[defender.species];
    const atkStat = getStat(attacker, "atk");
    const defStat = getStat(defender, "def");
    const stab = atkSp.types.includes(move.type) ? 1.5 : 1;
    const eff = typeEffectiveness(move.type, defSp.types);
    const crit = Math.random() < 0.0625 ? 1.5 : 1;
    const rand = 0.85 + Math.random() * 0.15;
    let amount = (((2 * attacker.level) / 5 + 2) * move.power * (atkStat / Math.max(1, defStat))) / 50 + 2;
    amount = Math.floor(amount * stab * eff * crit * rand);
    if (eff === 0) amount = 0;
    return { amount, eff, crit: crit > 1 };
  }

  function pickEnemyMove() {
    const moves = state.enemyMon.moves.filter(m => m.pp > 0);
    if (moves.length === 0) return { id: "TACKLE", pp: 99, maxPp: 99 };
    return moves[Math.floor(Math.random() * moves.length)];
  }

  function handleEnemyFaint() {
    Audio.play("faint");
    state.enemyFainted = true;
    enqueue(`${SPECIES[state.enemyMon.species].name} fainted!`);
    const expGain = computeExp(state.enemyMon);
    enqueue(`${SPECIES[playerMon().species].name} gained ${expGain} XP!`);
    grantXp(playerMon(), expGain);
    if (state.isTrainer) {
      const next = state.enemyTeam.findIndex((m, i) => i > state.enemyIdx && m.hp > 0);
      if (next >= 0) {
        state.enemyIdx = next;
        state.enemyMon = state.enemyTeam[next];
        state.enemyFainted = false;
        state.enemyOffsetX = 200;
        state.visualEnemyHp = state.enemyMon.hp;
        setTimeout(() => { state.enemyOffsetX = 0; }, 100);
        enqueue(`${state.trainerData.name} sent out ${SPECIES[state.enemyMon.species].name}!`);
        state.phase = "trainerSwap";
      } else {
        enqueue(state.trainerData.defeat);
        enqueue(`You defeated ${state.trainerData.name}!`);
        Audio.play("victory");
        state.phase = "wonBattle";
      }
    } else {
      Audio.play("victory");
      state.phase = "wonBattle";
    }
    nextMessage();
  }

  function handlePlayerFaint() {
    Audio.play("faint");
    state.playerFainted = true;
    enqueue(`${SPECIES[playerMon().species].name} fainted!`);
    const next = state.playerTeam.findIndex(m => m.hp > 0);
    if (next < 0) {
      enqueue("You have no monsters left!");
      enqueue("You scurried back home, humiliated.");
      state.phase = "lostBattle";
    } else {
      state.playerIdx = next;
      state.playerFainted = false;
      state.playerOffsetX = -240;
      state.visualPlayerHp = playerMon().hp;
      setTimeout(() => { state.playerOffsetX = 0; }, 100);
      enqueue(`Go, ${SPECIES[playerMon().species].name}!`);
      state.phase = "playerSwap";
    }
    nextMessage();
  }

  function computeExp(defeated) {
    const sp = SPECIES[defeated.species];
    return Math.floor(((sp.xpYield || 60) * defeated.level) / 7);
  }

  function grantXp(mon, amount) {
    mon.xp += amount;
    while (mon.level < 50) {
      const needed = xpForLevel(mon.level + 1);
      if (mon.xp >= needed) levelUp(mon);
      else break;
    }
  }

  function levelUp(mon) {
    const sp = SPECIES[mon.species];
    const oldMax = mon.maxHp;
    mon.level++;
    mon.maxHp = maxHp(sp, mon.level);
    mon.hp += (mon.maxHp - oldMax);
    Audio.play("levelUp");
    // Trigger the visual flourish on the player mon (the only one who
    // can level up). draw() reads state.levelUpFx and renders halo +
    // sparkles + "LEVEL UP!" text floating up. Lifecycle = 1.4s.
    state.levelUpFx = {
      who: "player",
      startTime: performance.now(),
      duration: 1400,
      // Snapshot the new level so the floating text reads "Lv 12"
      // even if the same mon levels twice in one battle (rare).
      newLevel: mon.level,
    };
    enqueue(`${SPECIES[mon.species].name} grew to Lv. ${mon.level}!`);
    for (const moveId of movesLearnedAt(sp, mon.level)) {
      if (mon.moves.find(m => m.id === moveId)) continue;
      if (mon.moves.length < 4) {
        mon.moves.push({ id: moveId, pp: MOVES[moveId].pp, maxPp: MOVES[moveId].pp });
        enqueue(`${SPECIES[mon.species].name} learned ${MOVES[moveId].name}!`);
      } else {
        // Queue a "choose which to forget" prompt that the player resolves
        // after all currently-queued battle messages finish.
        enqueue(`${SPECIES[mon.species].name} wants to learn ${MOVES[moveId].name}!`);
        if (!state.pendingMoveLearns) state.pendingMoveLearns = [];
        state.pendingMoveLearns.push({ monIdx: state.playerTeam.indexOf(mon), newMoveId: moveId });
      }
    }
    if (sp.evolvesAt && mon.level >= sp.evolvesAt && sp.evolvesTo) {
      const newSp = SPECIES[sp.evolvesTo];
      Audio.play("evolve");
      enqueue(`What?! ${SPECIES[mon.species].name} is evolving!`);
      mon.species = sp.evolvesTo;
      mon.maxHp = maxHp(newSp, mon.level);
      mon.hp = mon.maxHp;
      enqueue(`${SPECIES[mon.species].name} evolved into ${newSp.name}!`);
    }
  }

  function attemptRun() {
    if (state.isTrainer) {
      enqueue("You can't run from a trainer battle!");
      enemyFreeTurn();
      return;
    }
    const ps = getStat(playerMon(), "spd");
    const es = getStat(state.enemyMon, "spd");
    const odds = (ps * 32) / Math.max(1, Math.floor(es / 4)) + 30;
    if (Math.random() * 256 < odds) {
      Audio.play("cancel");
      enqueue("Got away safely!");
      state.ranAway = true;
      state.phase = "ranAway";
      nextMessage();
    } else {
      Audio.play("bump");
      enqueue("Couldn't escape!");
      enemyFreeTurn();
    }
  }

  function enemyFreeTurn() {
    state.pendingPlayerMove = null;
    state.pendingEnemyMove = pickEnemyMove();
    state.turnOrder = ["enemy"];
    state.turnIdx = 0;
    doNextTurnAction();
  }

  function throwBraincell(itemKey = "DISCORD_INVITE") {
    if (state.isTrainer) {
      enqueue("That trainer would block your brain cells!");
      state.phase = "endTurn";
      nextMessage();
      return;
    }
    if (!game_bag_consume(itemKey)) {
      enqueue(`You're out of ${ITEMS[itemKey].name}!`);
      state.phase = "endTurn";
      nextMessage();
      return;
    }
    Audio.play("catch");
    const sp = SPECIES[state.enemyMon.species];
    const catchRate = sp.catchRate || 50;
    const mod = ITEMS[itemKey]?.catchMod || 1;
    const a = ((3 * state.enemyMon.maxHp - 2 * state.enemyMon.hp) * catchRate * mod) / (3 * state.enemyMon.maxHp);
    let success = Math.random() * 255 < a;
    if (sp.legendary && Math.random() < 0.6) success = false;
    enqueue(`You hurled a ${ITEMS[itemKey].name}!`);

    // Drive a real ball-throw + shake animation: ball flies up to the
    // enemy, mon fades, ball shakes N times, then opens (failure) or
    // sparkles (success).
    const shakes = success ? 3 : Math.max(1, Math.min(3, Math.floor((a / 255) * 4)));
    state.catchAnim = {
      itemKey,
      success,
      shakes,
      // phase: "throwing" → "shaking" → "result"
      phase: "throwing",
      t: 0,
      shakeIdx: 0,
    };

    if (success) {
      state.caught = true;
      enqueue(`Gotcha! ${sp.name} was caught!`);
      // delay the "captured" sound until the animation says so
      state.phase = "caughtMon";
    } else {
      enqueue(`(*${"shake ".repeat(shakes).trim()}*) ${sp.name} broke free!`);
    }
    // Run the animation, then advance to the next message / enemy turn.
    runCatchAnim(() => {
      if (success) {
        Audio.play("captured");
        nextMessage();
      } else {
        Audio.play("breakOut");
        enemyFreeTurn();
      }
    });
  }

  // Drive the throw → shake → result → (success: celebrate) animation
  // by stepping `state.catchAnim` through phases on a wall-clock timer.
  // Calls onDone when finished.
  function runCatchAnim(onDone) {
    const a = state.catchAnim;
    if (!a) { onDone(); return; }
    state.uiBlocked = true;
    const THROW_MS = 360;
    const PER_SHAKE_MS = 380;
    const RESULT_MS = 360;
    // After the sparkle burst on a successful catch, the ball stays
    // visible on the ground for 1.5s — gentle bob, soft glow, "CAUGHT!"
    // badge — so the moment lands instead of cutting straight to text.
    const CELEBRATE_MS = 1500;

    const start = performance.now();
    function tick(now) {
      if (!state || !state.catchAnim) { onDone(); return; }
      const elapsed = now - start;
      if (a.phase === "throwing") {
        a.t = Math.min(1, elapsed / THROW_MS);
        if (a.t >= 1) { a.phase = "shaking"; a.shakeStart = now; a.shakeIdx = 0; }
      } else if (a.phase === "shaking") {
        const sinceShake = now - a.shakeStart;
        a.shakeIdx = Math.min(a.shakes, Math.floor(sinceShake / PER_SHAKE_MS));
        a.t = (sinceShake % PER_SHAKE_MS) / PER_SHAKE_MS;
        if (sinceShake >= a.shakes * PER_SHAKE_MS) { a.phase = "result"; a.resultStart = now; }
      } else if (a.phase === "result") {
        a.t = Math.min(1, (now - a.resultStart) / RESULT_MS);
        if (a.t >= 1) {
          // Failure: ball pops open and we're done.
          // Success: linger so the player can FEEL the catch.
          if (a.success) {
            a.phase = "celebrate";
            a.celebrateStart = now;
            a.t = 0;
          } else {
            state.catchAnim = null;
            state.uiBlocked = false;
            onDone();
            return;
          }
        }
      } else if (a.phase === "celebrate") {
        a.t = Math.min(1, (now - a.celebrateStart) / CELEBRATE_MS);
        if (a.t >= 1) {
          state.catchAnim = null;
          state.uiBlocked = false;
          onDone();
          return;
        }
      }
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  function game_bag_consume(itemKey) {
    if (typeof window.__mgmBagConsume === "function") {
      return window.__mgmBagConsume(itemKey);
    }
    return true;
  }

  // Quick-heal in battle: pick the strongest heal item the player owns
  // and apply it to the active mon, all without opening the bag menu.
  function quickHeal() {
    if (!state || state.phase !== "menu" || state.uiBlocked) return;
    const mon = playerMon();
    if (mon.hp >= mon.maxHp) {
      Audio.play("cancel");
      enqueue(`${SPECIES[mon.species].name} is already at full HP.`);
      state.phase = "endTurn";
      nextMessage();
      return;
    }
    const bag = (typeof window.__mgmBagSnapshot === "function")
      ? window.__mgmBagSnapshot()
      : {};
    // Order from strongest to weakest so we use the elixir before a cappuccino.
    const ranked = ["GOLDEN_APPLE_I", "RAID_SHIELD", "ENERGY_DRINK"];
    const choice = ranked.find(k => (bag[k] || 0) > 0);
    if (!choice) {
      Audio.play("cancel");
      enqueue("No heal items in your bag!");
      state.phase = "endTurn";
      nextMessage();
      return;
    }
    useHealItemInBattle(choice);
  }

  function useHealItemInBattle(itemKey) {
    const item = ITEMS[itemKey];
    if (!item || !item.heal) return false;
    if (!game_bag_consume(itemKey)) {
      enqueue(`You're out of ${item.name}!`);
      state.phase = "endTurn";
      nextMessage();
      return true;
    }
    Audio.play("heal");
    const mon = playerMon();
    if (mon.hp >= mon.maxHp) {
      enqueue(`${SPECIES[mon.species].name} is already at full HP.`);
      state.phase = "endTurn";
      nextMessage();
      return true;
    }
    const before = mon.hp;
    mon.hp = Math.min(mon.maxHp, mon.hp + item.heal);
    state.visualPlayerHp = before;
    startTween(state.playerHpTween, before, mon.hp, 700);
    enqueue(`Used ${item.name}! Restored ${mon.hp - before} HP.`);
    enemyFreeTurn();
    return true;
  }

  function openBagFromBattle() {
    if (typeof window.__mgmOpenBag === "function") {
      window.__mgmOpenBag(true);
    }
  }

  function openTeamFromBattle() {
    if (typeof window.__mgmOpenTeam === "function") {
      window.__mgmOpenTeam(true);
    }
  }

  function switchActiveMon(idx) {
    if (idx === state.playerIdx) {
      Audio.play("cancel");
      enqueue("Already in battle!");
      state.phase = "endTurn";
      nextMessage();
      return;
    }
    if (state.playerTeam[idx].hp <= 0) {
      enqueue("That monster has fainted!");
      state.phase = "endTurn";
      nextMessage();
      return;
    }
    Audio.play("confirm");
    enqueue(`Come back, ${SPECIES[playerMon().species].name}!`);
    state.playerIdx = idx;
    state.playerOffsetX = -240;
    state.visualPlayerHp = playerMon().hp;
    setTimeout(() => { state.playerOffsetX = 0; }, 100);
    enqueue(`Go, ${SPECIES[playerMon().species].name}!`);
    enemyFreeTurn();
  }

  function refreshInfo(forceVisual) {
    if (!state) return;
    const e = state.enemyMon;
    const eSp = SPECIES[e.species];
    elEnemyInfo().querySelector(".mon-name").textContent = eSp.name;
    elEnemyInfo().querySelector(".mon-lvl").textContent = "Lv. " + e.level;
    const eShown = forceVisual ? e.hp : state.visualEnemyHp;
    const eRatio = eShown / e.maxHp;
    const eFill = elEnemyInfo().querySelector(".hp-fill");
    eFill.style.width = (Math.max(0, eRatio) * 100) + "%";
    eFill.classList.toggle("med", eRatio < 0.5 && eRatio >= 0.2);
    eFill.classList.toggle("low", eRatio < 0.2);

    const p = playerMon();
    const pSp = SPECIES[p.species];
    elPlayerInfo().querySelector(".mon-name").textContent = pSp.name;
    elPlayerInfo().querySelector(".mon-lvl").textContent = "Lv. " + p.level;
    const pShown = forceVisual ? p.hp : state.visualPlayerHp;
    const pRatio = pShown / p.maxHp;
    const pFill = elPlayerInfo().querySelector(".hp-fill");
    pFill.style.width = (Math.max(0, pRatio) * 100) + "%";
    pFill.classList.toggle("med", pRatio < 0.5 && pRatio >= 0.2);
    pFill.classList.toggle("low", pRatio < 0.2);
    elPlayerInfo().querySelector(".hp-text").textContent = `${Math.max(0, Math.round(pShown))} / ${p.maxHp}`;

    const xpBase = xpForLevel(p.level);
    const xpNext = xpForLevel(p.level + 1);
    const xpRatio = (p.xp - xpBase) / Math.max(1, xpNext - xpBase);
    elPlayerInfo().querySelector(".xp-fill").style.width = Math.min(1, Math.max(0, xpRatio)) * 100 + "%";
  }

  function finish() {
    elBattleUi().classList.add("hidden");
    elActions().classList.add("hidden");
    elMoveList().classList.add("hidden");
    const cb = state.onEnd;
    const result = {
      caught: state.caught,
      ranAway: state.ranAway,
      defeatedTrainer: state.isTrainer && (!state.enemyTeam || state.enemyTeam.every(m => m.hp <= 0)),
      enemyMon: state.enemyMon,
      pendingMoveLearns: state.pendingMoveLearns || [],
    };
    state = null;
    cb(result);
  }

  function update(now, dt) {
    if (!state) return;
    tickTypewriter(now, dt);
    // hp tweens
    updateTween(state.enemyHpTween, now);
    updateTween(state.playerHpTween, now);
    if (state.enemyHpTween.active) state.visualEnemyHp = state.enemyHpTween.value;
    if (state.playerHpTween.active) state.visualPlayerHp = state.playerHpTween.value;
    // shake
    if (state.enemyShake > 0) state.enemyShake--;
    if (state.playerShake > 0) state.playerShake--;
    if (state.enemyFlash > 0) state.enemyFlash--;
    if (state.playerFlash > 0) state.playerFlash--;
    // attack lunge animation
    if (state.attackAnimT > 0) {
      state.attackAnimT = Math.max(0, state.attackAnimT - dt / 220);
    }
    // clear per-move animation when expired
    if (state.moveAnim && now > state.moveAnim.t0 + state.moveAnim.dur) {
      state.moveAnim = null;
    }
    // Smooth slide-in offsets to 0. Lerp-rate based, so it eases out
    // (slows as it approaches the target) instead of snapping at a
    // fixed pixel-per-frame rate.
    state.enemyOffsetX = smoothApproach(state.enemyOffsetX, 0, 0.18, dt);
    state.playerOffsetX = smoothApproach(state.playerOffsetX, 0, 0.18, dt);
    // Faint slide-down: gentler curve, accelerates as gravity would
    if (state.enemyFainted) state.enemyOffsetY = smoothApproach(state.enemyOffsetY, 60, 0.07, dt);
    if (state.playerFainted) state.playerOffsetY = smoothApproach(state.playerOffsetY, 80, 0.07, dt);
    refreshInfo();
  }

  // Legacy alias kept for the catch-anim code that still calls it.
  function approach(v, target, max) {
    const d = target - v;
    if (Math.abs(d) <= max) return target;
    return v + Math.sign(d) * max;
  }

  // Per-map battle backdrop palettes — keep the gradient shape, swap colors
  // so a fight in a forest doesn't look identical to a fight in a cave.
  const BATTLE_BG = {
    pallet:    ["#3a1a5c", "#5b2d8c", "#2a8c4a"],
    route1:    ["#3a1a5c", "#5b2d8c", "#2a8c4a"],
    viridian:  ["#3a1a5c", "#5b2d8c", "#2a8c4a"],
    route2:    ["#1f3a1f", "#306030", "#5fa84a"],
    forest:    ["#0e2a14", "#1f4a2a", "#3a7a3a"],
    pewter:    ["#3a3a4a", "#5a5a6a", "#7a7a8a"],
    route3:    ["#5a3a2a", "#7a5a3a", "#a07050"],
    mt_moon:   ["#1a1430", "#3a2858", "#5a4080"],   // cave purple
    cerulean:  ["#1a3a5c", "#2d5d8c", "#4a8cd5"],   // cool blue
    route4:    ["#2a5a8c", "#4a8cd0", "#d4a043"],   // coastal
    vermilion: ["#5a1a2a", "#8c2d3a", "#d44a2a"],   // warm port
  };

  function draw(ctx, time) {
    if (!state) return;
    const W = ctx.canvas.width, H = ctx.canvas.height;
    // Pick palette based on current map id; default to original purple/green.
    const mapId = (window.__brainrot && window.__brainrot.game && window.__brainrot.game.currentMap) || "pallet";
    const palette = BATTLE_BG[mapId] || BATTLE_BG.pallet;
    const grad = ctx.createLinearGradient(0, 0, 0, H);
    grad.addColorStop(0, palette[0]);
    grad.addColorStop(0.5, palette[1]);
    grad.addColorStop(1, palette[2]);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);
    // grid floor
    ctx.strokeStyle = "rgba(255,255,255,0.1)";
    ctx.lineWidth = 1;
    for (let i = 0; i < 12; i++) {
      const yy = H * 0.55 + i * 8;
      ctx.beginPath();
      ctx.moveTo(0, yy);
      ctx.lineTo(W, yy);
      ctx.stroke();
    }
    // platforms
    ctx.fillStyle = "rgba(0,0,0,0.35)";
    ctx.beginPath();
    ctx.ellipse(W*0.25, H*0.78, 80, 12, 0, 0, Math.PI*2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(W*0.78, H*0.40, 65, 10, 0, 0, Math.PI*2);
    ctx.fill();

    // attack lunges
    let enemyLungeX = 0, playerLungeX = 0;
    if (state.attackAnimT > 0) {
      const t = state.attackAnimT;
      const lunge = Math.sin((1 - t) * Math.PI) * 18;
      if (state.attackAnimWho === "enemy") enemyLungeX = -lunge;
      else playerLungeX = lunge;
    }
    const eShakeX = state.enemyShake > 0 ? (Math.random()*3-1.5) : 0;
    const pShakeX = state.playerShake > 0 ? (Math.random()*3-1.5) : 0;

    // sized for 240x160 canvas: scale based on canvas width
    const scale = W / 240;
    const eSize = 48 * scale;
    const pSize = 64 * scale;
    // enemy mon
    const ex = W*0.78 - eSize/2 + state.enemyOffsetX + eShakeX + enemyLungeX;
    const ey = H*0.20 + state.enemyOffsetY;
    // During catch animation, fade the mon then hide once captured by ball.
    let drawEnemy = (!state.enemyFainted || state.enemyOffsetY < 50);
    if (state.catchAnim) {
      const ph = state.catchAnim.phase;
      if (ph !== "throwing") drawEnemy = false;     // mon "is in the ball"
      else { ctx.globalAlpha = 1 - state.catchAnim.t * 0.8; }
    }
    if (drawEnemy) {
      drawMonWithFlash(ctx, state.enemyMon.species, ex, ey, eSize, time, state.enemyFlash);
    }
    ctx.globalAlpha = 1;
    // Catch ball overlay
    if (state.catchAnim) drawCatchBall(ctx, ex + eSize/2, ey + eSize/2, W, H);
    // player mon
    const px = W*0.25 - pSize/2 + state.playerOffsetX + pShakeX + playerLungeX;
    const py = H*0.50 + state.playerOffsetY;
    if (!state.playerFainted || state.playerOffsetY < 70) {
      drawMonWithFlash(ctx, playerMon().species, px, py, pSize, time, state.playerFlash);
      // Level-up flourish on the player mon
      if (state.levelUpFx && state.levelUpFx.who === "player") {
        drawLevelUpFx(ctx, px + pSize/2, py + pSize/2, pSize, W, H);
      }
    }

    // per-move family animation overlay
    drawMoveAnim(ctx, time);

    // typing arrow indicator
    if (state.message && !state.typing && state.messageQueue.length >= 0) {
      const cy = H - 30;
      const cx = W - 28;
      ctx.fillStyle = "#ffcb05";
      const bob = Math.sin(time * 0.008) * 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy + bob);
      ctx.lineTo(cx + 8, cy + bob);
      ctx.lineTo(cx + 4, cy + 4 + bob);
      ctx.closePath();
      ctx.fill();
    }
  }

  // Per-move family animation. Each move has a `family` field that
  // selects which visual effect plays on top of the existing shake +
  // flash. Coordinates are in the 240x160 canvas space; we scale
  // everything via the W/240 ratio so it survives any future canvas
  // size changes without re-tuning every effect.
  function drawMoveAnim(ctx, time) {
    if (!state || !state.moveAnim) return;
    const W = ctx.canvas.width, H = ctx.canvas.height;
    const sc = W / 240;
    const a = state.moveAnim;
    const now = performance.now();
    const p = Math.max(0, Math.min(1, (now - a.t0) / a.dur));
    // Source/target in actual pixel coords for current canvas size
    const ax0 = a.attackerX * sc, ay0 = a.attackerY * sc;
    const ax1 = a.defenderX * sc, ay1 = a.defenderY * sc;
    const fam = a.family;

    ctx.save();

    if (fam === "spear") {
      // Long brown shaft + gray tip slides toward defender, peaks ~p=0.5
      const tipP = Math.sin(p * Math.PI); // 0 → 1 → 0
      const tx = ax0 + (ax1 - ax0) * tipP;
      const ty = ay0 + (ay1 - ay0) * tipP;
      const dx = ax1 - ax0, dy = ay1 - ay0;
      const len = Math.sqrt(dx*dx + dy*dy) || 1;
      const ux = dx / len, uy = dy / len;
      const shaftLen = 28 * sc;
      ctx.strokeStyle = "#7a4a1f";
      ctx.lineWidth = 3 * sc;
      ctx.beginPath();
      ctx.moveTo(tx - ux * shaftLen, ty - uy * shaftLen);
      ctx.lineTo(tx, ty);
      ctx.stroke();
      // tip
      ctx.fillStyle = "#c8c8d0";
      ctx.beginPath();
      ctx.moveTo(tx, ty);
      ctx.lineTo(tx - ux * 6 * sc - uy * 3 * sc, ty - uy * 6 * sc + ux * 3 * sc);
      ctx.lineTo(tx - ux * 6 * sc + uy * 3 * sc, ty - uy * 6 * sc - ux * 3 * sc);
      ctx.closePath();
      ctx.fill();
    } else if (fam === "shield") {
      // Bronze shield grows from attacker, slams at p=0.5
      const tipP = Math.min(1, p * 2);
      const x = ax0 + (ax1 - ax0) * tipP;
      const y = ay0 + (ay1 - ay0) * tipP;
      const r = (4 + tipP * 14) * sc;
      ctx.fillStyle = "#b07030";
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#e0a050";
      ctx.beginPath();
      ctx.arc(x, y, r * 0.6, 0, Math.PI * 2);
      ctx.fill();
      // star burst at impact
      if (p > 0.5) {
        const bp = (p - 0.5) * 2;
        ctx.strokeStyle = `rgba(255,230,150,${1 - bp})`;
        ctx.lineWidth = 2 * sc;
        for (let i = 0; i < 6; i++) {
          const ang = (i / 6) * Math.PI * 2;
          const rr = (8 + bp * 14) * sc;
          ctx.beginPath();
          ctx.moveTo(ax1, ay1);
          ctx.lineTo(ax1 + Math.cos(ang) * rr, ay1 + Math.sin(ang) * rr);
          ctx.stroke();
        }
      }
    } else if (fam === "slash") {
      // Diagonal white-yellow crescent lines across defender, p=0.3..0.7
      if (p > 0.2 && p < 0.8) {
        const sp = (p - 0.2) / 0.6;
        for (let i = 0; i < 4; i++) {
          const off = (i - 1.5) * 6 * sc;
          const a0 = sp - i * 0.06;
          if (a0 < 0 || a0 > 1) continue;
          ctx.strokeStyle = `rgba(255,255,200,${1 - a0})`;
          ctx.lineWidth = (3 - i * 0.5) * sc;
          ctx.beginPath();
          const r = 18 * sc;
          ctx.arc(ax1 + off, ay1, r, Math.PI * 0.2, Math.PI * 0.8);
          ctx.stroke();
        }
      }
    } else if (fam === "buff") {
      // 6 gold sparkles rising from attacker
      for (let i = 0; i < 6; i++) {
        const seed = i / 6;
        const localT = (p * 1.4 - seed) % 1;
        if (localT < 0 || localT > 1) continue;
        const sx = ax0 + Math.sin(localT * 6 + i) * 8 * sc;
        const sy = ay0 - localT * 30 * sc;
        const al = (1 - localT) * 0.95;
        ctx.fillStyle = `rgba(255,220,100,${al})`;
        ctx.fillRect(sx - 1.5 * sc, sy - 1.5 * sc, 3 * sc, 3 * sc);
        ctx.fillStyle = `rgba(255,255,200,${al})`;
        ctx.fillRect(sx - 0.5 * sc, sy - 3 * sc, 1 * sc, 6 * sc);
        ctx.fillRect(sx - 3 * sc, sy - 0.5 * sc, 6 * sc, 1 * sc);
      }
    } else if (fam === "ray") {
      // Pink/cyan beam attacker→defender, grows then shrinks
      const w = Math.sin(p * Math.PI) * 6 * sc;
      const dx = ax1 - ax0, dy = ay1 - ay0;
      const len = Math.sqrt(dx*dx + dy*dy) || 1;
      const nx = -dy / len, ny = dx / len;
      ctx.fillStyle = `rgba(255,120,220,${0.85})`;
      ctx.beginPath();
      ctx.moveTo(ax0 + nx * w, ay0 + ny * w);
      ctx.lineTo(ax1 + nx * w, ay1 + ny * w);
      ctx.lineTo(ax1 - nx * w, ay1 - ny * w);
      ctx.lineTo(ax0 - nx * w, ay0 - ny * w);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = `rgba(150,255,255,0.9)`;
      ctx.beginPath();
      ctx.moveTo(ax0 + nx * w * 0.5, ay0 + ny * w * 0.5);
      ctx.lineTo(ax1 + nx * w * 0.5, ay1 + ny * w * 0.5);
      ctx.lineTo(ax1 - nx * w * 0.5, ay1 - ny * w * 0.5);
      ctx.lineTo(ax0 - nx * w * 0.5, ay0 - ny * w * 0.5);
      ctx.closePath();
      ctx.fill();
    } else if (fam === "bomb") {
      // Black ball arcs to defender, then explodes with orange rings
      if (p < 0.7) {
        const fp = p / 0.7;
        const x = ax0 + (ax1 - ax0) * fp;
        const y = ay0 + (ay1 - ay0) * fp - Math.sin(fp * Math.PI) * 30 * sc;
        ctx.fillStyle = "#1a1a1a";
        ctx.beginPath();
        ctx.arc(x, y, 4 * sc, 0, Math.PI * 2);
        ctx.fill();
        // fuse spark
        ctx.fillStyle = "#ffaa00";
        ctx.fillRect(x - 0.5 * sc, y - 7 * sc, 1 * sc, 2 * sc);
      } else {
        const ep = (p - 0.7) / 0.3;
        for (let i = 0; i < 3; i++) {
          const r = (4 + ep * 18 + i * 3) * sc;
          ctx.strokeStyle = `rgba(255,${140 - i * 40},40,${1 - ep})`;
          ctx.lineWidth = 2 * sc;
          ctx.beginPath();
          ctx.arc(ax1, ay1, r, 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.fillStyle = `rgba(255,200,80,${(1 - ep) * 0.6})`;
        ctx.beginPath();
        ctx.arc(ax1, ay1, 8 * sc, 0, Math.PI * 2);
        ctx.fill();
      }
    } else if (fam === "sword") {
      // Diamond-blue swipe across defender + cyan trail particles
      const sp = Math.sin(p * Math.PI);
      const off = (p - 0.5) * 40 * sc;
      ctx.strokeStyle = `rgba(180,230,255,${sp})`;
      ctx.lineWidth = 4 * sc;
      ctx.beginPath();
      ctx.moveTo(ax1 - 14 * sc + off * 0.3, ay1 - 14 * sc);
      ctx.lineTo(ax1 + 14 * sc + off * 0.3, ay1 + 14 * sc);
      ctx.stroke();
      ctx.strokeStyle = `rgba(255,255,255,${sp})`;
      ctx.lineWidth = 1.5 * sc;
      ctx.stroke();
      // trail particles
      for (let i = 0; i < 5; i++) {
        const seed = i / 5;
        const localT = (p * 1.3 - seed * 0.3);
        if (localT < 0 || localT > 1) continue;
        const sx = ax1 - 14 * sc + 28 * sc * localT + (Math.random() - 0.5) * 4 * sc;
        const sy = ay1 - 14 * sc + 28 * sc * localT + (Math.random() - 0.5) * 4 * sc;
        ctx.fillStyle = `rgba(150,220,255,${1 - localT})`;
        ctx.fillRect(sx - 1, sy - 1, 2, 2);
      }
    } else if (fam === "pickaxe") {
      // Iron pickaxe falls from above onto defender, then sparks
      if (p < 0.6) {
        const fp = p / 0.6;
        const x = ax1;
        const y = ay1 - 40 * sc + fp * 40 * sc;
        // handle
        ctx.strokeStyle = "#8a5a2a";
        ctx.lineWidth = 3 * sc;
        ctx.beginPath();
        ctx.moveTo(x, y - 10 * sc);
        ctx.lineTo(x, y);
        ctx.stroke();
        // head
        ctx.fillStyle = "#888898";
        ctx.fillRect(x - 8 * sc, y - 13 * sc, 16 * sc, 4 * sc);
      } else {
        const ep = (p - 0.6) / 0.4;
        for (let i = 0; i < 8; i++) {
          const ang = (i / 8) * Math.PI * 2;
          const r = ep * 16 * sc;
          const sx = ax1 + Math.cos(ang) * r;
          const sy = ay1 + Math.sin(ang) * r;
          ctx.fillStyle = `rgba(255,230,150,${1 - ep})`;
          ctx.fillRect(sx - 1, sy - 1, 2, 2);
        }
      }
    } else if (fam === "arrow") {
      // Brown shaft + arrowhead flying straight from attacker to defender
      const fp = Math.min(1, p * 1.4);
      const tx = ax0 + (ax1 - ax0) * fp;
      const ty = ay0 + (ay1 - ay0) * fp;
      const dx = ax1 - ax0, dy = ay1 - ay0;
      const len = Math.sqrt(dx*dx + dy*dy) || 1;
      const ux = dx / len, uy = dy / len;
      ctx.strokeStyle = "#7a4a1f";
      ctx.lineWidth = 1.5 * sc;
      ctx.beginPath();
      ctx.moveTo(tx - ux * 14 * sc, ty - uy * 14 * sc);
      ctx.lineTo(tx, ty);
      ctx.stroke();
      // arrowhead
      ctx.fillStyle = "#cccccc";
      ctx.beginPath();
      ctx.moveTo(tx, ty);
      ctx.lineTo(tx - ux * 4 * sc - uy * 2 * sc, ty - uy * 4 * sc + ux * 2 * sc);
      ctx.lineTo(tx - ux * 4 * sc + uy * 2 * sc, ty - uy * 4 * sc - ux * 2 * sc);
      ctx.closePath();
      ctx.fill();
      // fletching
      ctx.fillStyle = "#dd5050";
      const fx = tx - ux * 14 * sc, fy = ty - uy * 14 * sc;
      ctx.fillRect(fx - 1, fy - 1, 3, 3);
    } else if (fam === "explosion") {
      // Big orange/red shockwave expanding from defender, all duration
      const r = (6 + p * 28) * sc;
      const a1 = 1 - p;
      ctx.fillStyle = `rgba(255,180,40,${a1 * 0.6})`;
      ctx.beginPath();
      ctx.arc(ax1, ay1, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = `rgba(255,80,30,${a1})`;
      ctx.lineWidth = 3 * sc;
      ctx.beginPath();
      ctx.arc(ax1, ay1, r, 0, Math.PI * 2);
      ctx.stroke();
      ctx.strokeStyle = `rgba(255,230,160,${a1 * 0.8})`;
      ctx.lineWidth = 1.5 * sc;
      ctx.beginPath();
      ctx.arc(ax1, ay1, r * 0.6, 0, Math.PI * 2);
      ctx.stroke();
    } else if (fam === "teleport") {
      // Purple sparkle ring at attacker + purple glow on defender
      const ringR = (4 + p * 18) * sc;
      ctx.strokeStyle = `rgba(180,80,255,${1 - p})`;
      ctx.lineWidth = 2 * sc;
      ctx.beginPath();
      ctx.arc(ax0, ay0, ringR, 0, Math.PI * 2);
      ctx.stroke();
      for (let i = 0; i < 8; i++) {
        const ang = (i / 8) * Math.PI * 2 + p * 4;
        const sx = ax0 + Math.cos(ang) * ringR;
        const sy = ay0 + Math.sin(ang) * ringR;
        ctx.fillStyle = `rgba(220,160,255,${1 - p})`;
        ctx.fillRect(sx - 1, sy - 1, 2, 2);
      }
      // purple wash on defender
      const dGlow = Math.sin(p * Math.PI);
      ctx.fillStyle = `rgba(160,60,220,${dGlow * 0.45})`;
      ctx.beginPath();
      ctx.arc(ax1, ay1, 18 * sc, 0, Math.PI * 2);
      ctx.fill();
    } else if (fam === "fireball") {
      // Orange-red ball arcs to defender, fire splash on impact
      if (p < 0.7) {
        const fp = p / 0.7;
        const x = ax0 + (ax1 - ax0) * fp;
        const y = ay0 + (ay1 - ay0) * fp - Math.sin(fp * Math.PI) * 24 * sc;
        ctx.fillStyle = "#ffaa30";
        ctx.beginPath();
        ctx.arc(x, y, 5 * sc, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#ffee80";
        ctx.beginPath();
        ctx.arc(x, y, 2.5 * sc, 0, Math.PI * 2);
        ctx.fill();
        // tail
        ctx.fillStyle = `rgba(255,80,30,0.6)`;
        ctx.beginPath();
        ctx.arc(x - (ax1-ax0)*0.05, y - (ay1-ay0)*0.05 + 2*sc, 3 * sc, 0, Math.PI * 2);
        ctx.fill();
      } else {
        const ep = (p - 0.7) / 0.3;
        for (let i = 0; i < 8; i++) {
          const ang = (i / 8) * Math.PI * 2 + ep;
          const r = (3 + ep * 14) * sc;
          ctx.fillStyle = `rgba(255,${120 + i * 12},30,${1 - ep})`;
          ctx.beginPath();
          ctx.arc(ax1 + Math.cos(ang) * r, ay1 + Math.sin(ang) * r, 3 * sc, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    } else if (fam === "lava") {
      // Lava blob falls from above onto defender, drips
      const fp = Math.min(1, p * 1.3);
      const x = ax1;
      const y = ay1 - 30 * sc + fp * 30 * sc;
      ctx.fillStyle = "#dd4010";
      ctx.beginPath();
      ctx.arc(x, y, 7 * sc, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#ffaa30";
      ctx.beginPath();
      ctx.arc(x, y, 4 * sc, 0, Math.PI * 2);
      ctx.fill();
      if (p > 0.5) {
        // drips
        for (let i = 0; i < 3; i++) {
          const dripT = Math.min(1, (p - 0.5) * 2 + i * 0.1);
          const dx = ax1 + (i - 1) * 6 * sc;
          const dy = ay1 + dripT * 14 * sc;
          ctx.fillStyle = "#dd4010";
          ctx.beginPath();
          ctx.arc(dx, dy, (2 + (1 - dripT) * 1.5) * sc, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    } else if (fam === "potion") {
      // Glass bottle arcs to defender, shatters with green/purple cloud
      if (p < 0.6) {
        const fp = p / 0.6;
        const x = ax0 + (ax1 - ax0) * fp;
        const y = ay0 + (ay1 - ay0) * fp - Math.sin(fp * Math.PI) * 26 * sc;
        ctx.fillStyle = "rgba(180,230,255,0.85)";
        ctx.fillRect(x - 3 * sc, y - 4 * sc, 6 * sc, 8 * sc);
        ctx.fillStyle = "#9050d0";
        ctx.fillRect(x - 2 * sc, y - 2 * sc, 4 * sc, 5 * sc);
        ctx.fillStyle = "#888";
        ctx.fillRect(x - 1 * sc, y - 6 * sc, 2 * sc, 2 * sc);
      } else {
        const ep = (p - 0.6) / 0.4;
        for (let i = 0; i < 8; i++) {
          const ang = (i / 8) * Math.PI * 2;
          const r = ep * 16 * sc;
          const sx = ax1 + Math.cos(ang) * r;
          const sy = ay1 + Math.sin(ang) * r - ep * 6 * sc;
          ctx.fillStyle = i % 2 === 0
            ? `rgba(80,220,80,${1 - ep})`
            : `rgba(180,80,220,${1 - ep})`;
          ctx.beginPath();
          ctx.arc(sx, sy, (3 - ep) * sc, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    } else if (fam === "heal") {
      // Green plus signs floating up from attacker
      for (let i = 0; i < 5; i++) {
        const seed = i / 5;
        const localT = (p * 1.3 - seed) % 1;
        if (localT < 0 || localT > 1) continue;
        const sx = ax0 + Math.sin(localT * 4 + i) * 8 * sc;
        const sy = ay0 - localT * 28 * sc;
        const al = (1 - localT);
        ctx.fillStyle = `rgba(80,220,80,${al})`;
        ctx.fillRect(sx - 0.5 * sc, sy - 3 * sc, 1 * sc, 6 * sc);
        ctx.fillRect(sx - 3 * sc, sy - 0.5 * sc, 6 * sc, 1 * sc);
        ctx.fillStyle = `rgba(180,255,180,${al})`;
        ctx.fillRect(sx - 0.5 * sc, sy - 1.5 * sc, 1 * sc, 3 * sc);
      }
    } else if (fam === "snowball") {
      // White ball flies to defender, splat on impact
      if (p < 0.7) {
        const fp = p / 0.7;
        const x = ax0 + (ax1 - ax0) * fp;
        const y = ay0 + (ay1 - ay0) * fp - Math.sin(fp * Math.PI) * 18 * sc;
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(x, y, 5 * sc, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#cce0ff";
        ctx.beginPath();
        ctx.arc(x - 1 * sc, y - 1 * sc, 2.5 * sc, 0, Math.PI * 2);
        ctx.fill();
      } else {
        const ep = (p - 0.7) / 0.3;
        for (let i = 0; i < 10; i++) {
          const ang = (i / 10) * Math.PI * 2;
          const r = ep * 14 * sc;
          ctx.fillStyle = `rgba(255,255,255,${1 - ep})`;
          ctx.beginPath();
          ctx.arc(ax1 + Math.cos(ang) * r, ay1 + Math.sin(ang) * r, (2 - ep) * sc, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    } else if (fam === "trident") {
      // 3-pronged trident thrusts horizontally
      const tipP = Math.sin(p * Math.PI);
      const tx = ax0 + (ax1 - ax0) * tipP;
      const ty = ay0 + (ay1 - ay0) * tipP;
      const dx = ax1 - ax0, dy = ay1 - ay0;
      const len = Math.sqrt(dx*dx + dy*dy) || 1;
      const ux = dx / len, uy = dy / len;
      const nx = -uy, ny = ux;
      // shaft
      ctx.strokeStyle = "#5a3a1a";
      ctx.lineWidth = 3 * sc;
      ctx.beginPath();
      ctx.moveTo(tx - ux * 22 * sc, ty - uy * 22 * sc);
      ctx.lineTo(tx, ty);
      ctx.stroke();
      // 3 prongs
      ctx.strokeStyle = "#c8c8d0";
      ctx.lineWidth = 2 * sc;
      for (let i = -1; i <= 1; i++) {
        const off = i * 5 * sc;
        ctx.beginPath();
        ctx.moveTo(tx + nx * off, ty + ny * off);
        ctx.lineTo(tx + nx * off + ux * 6 * sc, ty + ny * off + uy * 6 * sc);
        ctx.stroke();
      }
    } else if (fam === "beam") {
      // Wide yellow beam from sky lands on defender, crackling edges
      const w = (10 + Math.sin(p * Math.PI) * 6) * sc;
      const beamA = Math.sin(p * Math.PI);
      const grad = ctx.createLinearGradient(ax1, 0, ax1, ay1);
      grad.addColorStop(0, `rgba(255,255,160,0)`);
      grad.addColorStop(1, `rgba(255,240,80,${beamA})`);
      ctx.fillStyle = grad;
      ctx.fillRect(ax1 - w, 0, w * 2, ay1);
      // crackle
      for (let i = 0; i < 5; i++) {
        const yy = (i / 5) * ay1 + (Math.random() - 0.5) * 6 * sc;
        ctx.strokeStyle = `rgba(255,255,255,${beamA})`;
        ctx.lineWidth = 1 * sc;
        ctx.beginPath();
        ctx.moveTo(ax1 - w + (Math.random() - 0.5) * 4 * sc, yy);
        ctx.lineTo(ax1 + w + (Math.random() - 0.5) * 4 * sc, yy);
        ctx.stroke();
      }
    } else if (fam === "swoop") {
      // Gray angular wings sweep past defender
      const fp = Math.min(1, p * 1.3);
      const x = ax1 - 30 * sc + fp * 60 * sc;
      const y = ay1 + Math.sin(fp * Math.PI) * -8 * sc;
      ctx.fillStyle = "rgba(150,150,170,0.9)";
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x - 14 * sc, y - 8 * sc);
      ctx.lineTo(x - 8 * sc, y + 2 * sc);
      ctx.closePath();
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + 14 * sc, y - 8 * sc);
      ctx.lineTo(x + 8 * sc, y + 2 * sc);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = "rgba(80,80,100,0.9)";
      ctx.fillRect(x - 1 * sc, y - 4 * sc, 2 * sc, 8 * sc);
    } else if (fam === "notification") {
      // Discord-style "@" + red dot pings at defender
      const a1 = 1 - p;
      ctx.font = `bold ${Math.floor(20 * sc)}px monospace`;
      ctx.textAlign = "center";
      ctx.fillStyle = `rgba(90,120,250,${a1})`;
      ctx.fillText("@", ax1, ay1 + 5 * sc);
      ctx.textAlign = "start";
      // 4 red ping dots
      for (let i = 0; i < 4; i++) {
        const ang = (i / 4) * Math.PI * 2 + p * 2;
        const r = (8 + p * 14) * sc;
        ctx.fillStyle = `rgba(240,60,60,${a1})`;
        ctx.beginPath();
        ctx.arc(ax1 + Math.cos(ang) * r, ay1 + Math.sin(ang) * r, 2.5 * sc, 0, Math.PI * 2);
        ctx.fill();
      }
    } else if (fam === "hammer") {
      // Big gold hammer slams down from above
      if (p < 0.7) {
        const fp = p / 0.7;
        const x = ax1;
        const y = ay1 - 40 * sc + fp * 40 * sc;
        ctx.strokeStyle = "#7a5a2a";
        ctx.lineWidth = 3 * sc;
        ctx.beginPath();
        ctx.moveTo(x, y - 12 * sc);
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.fillStyle = "#e0c040";
        ctx.fillRect(x - 10 * sc, y - 16 * sc, 20 * sc, 8 * sc);
        ctx.fillStyle = "#a08020";
        ctx.fillRect(x - 10 * sc, y - 16 * sc, 20 * sc, 2 * sc);
      } else {
        const ep = (p - 0.7) / 0.3;
        // shockwave
        ctx.strokeStyle = `rgba(255,220,80,${1 - ep})`;
        ctx.lineWidth = 2 * sc;
        ctx.beginPath();
        ctx.arc(ax1, ay1, ep * 22 * sc, 0, Math.PI * 2);
        ctx.stroke();
      }
    } else if (fam === "confuse") {
      // Spiral question marks orbiting defender
      ctx.font = `bold ${Math.floor(10 * sc)}px monospace`;
      ctx.textAlign = "center";
      for (let i = 0; i < 3; i++) {
        const ang = p * Math.PI * 4 + (i / 3) * Math.PI * 2;
        const r = 14 * sc;
        const sx = ax1 + Math.cos(ang) * r;
        const sy = ay1 - 10 * sc + Math.sin(ang) * r * 0.6;
        ctx.fillStyle = `rgba(255,200,80,0.9)`;
        ctx.fillText("?", sx, sy);
      }
      ctx.textAlign = "start";
    } else if (fam === "spam") {
      // Random colored circles + faces popping around defender
      const colors = ["#ff5050", "#ffaa30", "#50dd50", "#5090ff", "#dd60dd", "#ffee30"];
      for (let i = 0; i < 8; i++) {
        const seed = (i * 0.7) % 1;
        const localT = (p * 1.3 - seed * 0.6);
        if (localT < 0 || localT > 1) continue;
        const ang = (i / 8) * Math.PI * 2 + i;
        const r = localT * 16 * sc;
        const sx = ax1 + Math.cos(ang) * r;
        const sy = ay1 + Math.sin(ang) * r;
        ctx.globalAlpha = 1 - localT;
        ctx.fillStyle = colors[i % colors.length];
        ctx.beginPath();
        ctx.arc(sx, sy, 3 * sc, 0, Math.PI * 2);
        ctx.fill();
        // tiny face dots
        ctx.fillStyle = "#000";
        ctx.fillRect(sx - 1.2 * sc, sy - 0.8 * sc, 0.6 * sc, 0.6 * sc);
        ctx.fillRect(sx + 0.6 * sc, sy - 0.8 * sc, 0.6 * sc, 0.6 * sc);
        ctx.globalAlpha = 1;
      }
    } else if (fam === "fade") {
      // Translucent gray rectangle washes over defender
      const al = Math.sin(p * Math.PI) * 0.7;
      ctx.fillStyle = `rgba(120,120,130,${al})`;
      ctx.fillRect(ax1 - 18 * sc, ay1 - 18 * sc, 36 * sc, 36 * sc);
    } else if (fam === "emoji-burst") {
      // 7 colored emoji-circles erupting from defender
      const colors = ["#ff5050", "#ffaa30", "#50dd50", "#5090ff", "#dd60dd", "#ffee30", "#30ddee"];
      for (let i = 0; i < 7; i++) {
        const ang = (i / 7) * Math.PI * 2;
        const r = p * 22 * sc;
        const sx = ax1 + Math.cos(ang) * r;
        const sy = ay1 + Math.sin(ang) * r;
        ctx.fillStyle = colors[i];
        ctx.globalAlpha = 1 - p;
        ctx.beginPath();
        ctx.arc(sx, sy, 4 * sc, 0, Math.PI * 2);
        ctx.fill();
        // smile
        ctx.fillStyle = "#000";
        ctx.fillRect(sx - 1.5 * sc, sy - 1 * sc, 0.6 * sc, 0.6 * sc);
        ctx.fillRect(sx + 1 * sc, sy - 1 * sc, 0.6 * sc, 0.6 * sc);
        ctx.globalAlpha = 1;
      }
    } else if (fam === "give-up") {
      // Big "Z" letter floats up from attacker, fade out
      const t = p;
      const al = 1 - t;
      const y = ay0 - 8 * sc - t * 28 * sc;
      ctx.font = `bold ${Math.floor(20 * sc)}px monospace`;
      ctx.textAlign = "center";
      ctx.fillStyle = `rgba(0,0,0,${al * 0.6})`;
      ctx.fillText("Z", ax0 + 1, y + 1);
      ctx.fillStyle = `rgba(180,210,255,${al})`;
      ctx.fillText("Z", ax0, y);
      ctx.textAlign = "start";
    } else {
      // Fallback: small orange burst at defender
      const r = (3 + p * 12) * sc;
      ctx.fillStyle = `rgba(255,160,40,${1 - p})`;
      ctx.beginPath();
      ctx.arc(ax1, ay1, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = `rgba(255,220,120,${1 - p})`;
      ctx.lineWidth = 1.5 * sc;
      ctx.beginPath();
      ctx.arc(ax1, ay1, r, 0, Math.PI * 2);
      ctx.stroke();
    }

    ctx.restore();
  }

  // Render the catch-ball animation overlay in front of the enemy slot.
  // Throwing → ball arcs from off-screen left to enemy position.
  // Shaking → ball wobbles side-to-side at enemy position; flash on hit.
  // Result success → sparkle burst; failure → ball "pops open" (briefly grows).
  function drawCatchBall(ctx, ex, ey, W, H) {
    const a = state.catchAnim;
    if (!a) return;
    const r = Math.max(6, W * 0.018);
    let x = ex, y = ey;

    if (a.phase === "throwing") {
      // arc from lower-left toward enemy
      const startX = -r * 2, startY = H * 0.55;
      x = startX + (ex - startX) * a.t;
      y = startY + (ey - startY) * a.t - Math.sin(a.t * Math.PI) * H * 0.25;
      drawBall(ctx, x, y, r);
      return;
    }

    if (a.phase === "shaking") {
      const sw = Math.sin(a.t * Math.PI * 4) * r * 0.5 * (1 - a.t);
      x = ex + sw;
      y = ey + r * 1.2;
      drawBall(ctx, x, y, r);
      return;
    }

    if (a.phase === "result") {
      y = ey + r * 1.2;
      if (a.success) {
        // captured: small sparkle burst around the ball + halo grow
        for (let i = 0; i < 8; i++) {
          const ang = (i / 8) * Math.PI * 2;
          const dist = a.t * r * 4;
          ctx.fillStyle = `rgba(255,215,0,${1 - a.t})`;
          ctx.fillRect(x + Math.cos(ang) * dist - 1, y + Math.sin(ang) * dist - 1, 2, 2);
        }
        drawBall(ctx, x, y, r);
        return;
      } else {
        // failed: ball "opens" — grow slightly then fade
        const grow = 1 + a.t * 0.6;
        ctx.globalAlpha = 1 - a.t;
        drawBall(ctx, x, y, r * grow);
        ctx.globalAlpha = 1;
        return;
      }
    }

    if (a.phase === "celebrate") {
      // The CAPTURE-MOMENT: ball sits proudly on the ground with a
      // gentle bob, soft gold halo pulse, slow rotating sparkles, and
      // a "✓ CAUGHT!" badge floating up. Lasts ~1.5s so the player
      // actually feels the win.
      const t = a.t;
      const bobOffset = Math.sin(performance.now() * 0.006) * (r * 0.18);
      y = ey + r * 1.2 + bobOffset;

      // Soft gold halo around the ball, expanding as the celebrate
      // settles in
      const haloR = r * (2.0 + t * 1.5);
      const haloA = 0.45 * (1 - t * 0.5);
      const grad = ctx.createRadialGradient(x, y, r * 0.4, x, y, haloR);
      grad.addColorStop(0, `rgba(255,215,0,${haloA})`);
      grad.addColorStop(0.6, `rgba(255,138,0,${haloA * 0.5})`);
      grad.addColorStop(1, "rgba(255,138,0,0)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(x, y, haloR, 0, Math.PI * 2);
      ctx.fill();

      // Slow orbiting sparkles
      const orbitT = performance.now() * 0.001;
      for (let i = 0; i < 6; i++) {
        const ang = orbitT + i * (Math.PI / 3);
        const orbitR = r * 1.8;
        const sx = x + Math.cos(ang) * orbitR;
        const sy = y + Math.sin(ang) * orbitR * 0.6;
        ctx.fillStyle = `rgba(255,255,210,${0.85 - t * 0.5})`;
        ctx.fillRect(sx - 1, sy - 1, 2, 2);
        ctx.fillStyle = `rgba(255,215,0,${0.6 - t * 0.4})`;
        ctx.fillRect(sx - 2, sy, 4, 1);
        ctx.fillRect(sx, sy - 2, 1, 4);
      }

      // Small periodic upward burst sparkles (every ~280ms)
      const burstPhase = (performance.now() % 280) / 280;
      if (burstPhase < 0.4) {
        const burstY = y - burstPhase * r * 4;
        for (let i = 0; i < 3; i++) {
          const sx = x + (i - 1) * r * 0.6;
          ctx.fillStyle = `rgba(255,255,255,${1 - burstPhase * 2})`;
          ctx.fillRect(sx - 0.5, burstY, 1, 1);
        }
      }

      // The ball itself, with a slight scale-up to read as a "trophy"
      const ballScale = 1 + Math.sin(t * Math.PI) * 0.08;
      drawBall(ctx, x, y, r * ballScale);

      // "CAUGHT!" badge floating up above the ball
      const badgeY = y - r * 3 - t * r * 1.2;
      const badgeOpacity = t < 0.85 ? 1 : Math.max(0, (1 - t) / 0.15);
      const badgeText = "✓ CAUGHT!";
      ctx.font = `bold ${Math.floor(r * 1.4)}px monospace`;
      ctx.textAlign = "center";
      // Drop shadow
      ctx.fillStyle = `rgba(0,0,0,${badgeOpacity * 0.7})`;
      ctx.fillText(badgeText, x + 1, badgeY + 1);
      // Gold gradient text
      ctx.fillStyle = `rgba(255,215,0,${badgeOpacity})`;
      ctx.fillText(badgeText, x, badgeY);
      ctx.textAlign = "start";
      return;
    }
  }

  // Two-tone catch ball (red top, white bottom, black band, button).
  function drawBall(ctx, cx, cy, r) {
    // top half — red
    ctx.fillStyle = "#d83a3a";
    ctx.beginPath();
    ctx.arc(cx, cy, r, Math.PI, 0, false);
    ctx.fill();
    // bottom half — white
    ctx.fillStyle = "#f4f4f4";
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI, false);
    ctx.fill();
    // center band
    ctx.fillStyle = "#1a1a1a";
    ctx.fillRect(cx - r, cy - 1, r * 2, 2);
    // button
    ctx.fillStyle = "#1a1a1a";
    ctx.beginPath();
    ctx.arc(cx, cy, r * 0.32, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#f4f4f4";
    ctx.beginPath();
    ctx.arc(cx, cy, r * 0.18, 0, Math.PI * 2);
    ctx.fill();
    // outline
    ctx.strokeStyle = "#1a1a1a";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();
  }

  function drawMonWithFlash(ctx, species, x, y, size, time, flash) {
    SpriteRenderer.drawMon(ctx, species, x, y, size, time);
    if (flash > 0) {
      ctx.globalCompositeOperation = "lighter";
      ctx.fillStyle = `rgba(255,255,255,${flash / 24})`;
      ctx.fillRect(x, y, size, size);
      ctx.globalCompositeOperation = "source-over";
    }
  }

  // Level-up flourish: gold halo pulsing out, ring of rising sparkles,
  // and a "LEVEL UP!" badge floating up. Cleaned up automatically once
  // state.levelUpFx.duration elapses.
  function drawLevelUpFx(ctx, cx, cy, size, W, H) {
    const fx = state.levelUpFx;
    if (!fx) return;
    const t = (performance.now() - fx.startTime) / fx.duration;
    if (t >= 1) {
      state.levelUpFx = null;
      return;
    }
    // Halo expands and fades out
    const haloR = size * (0.55 + t * 0.5);
    const haloA = (1 - t) * 0.55;
    const grad = ctx.createRadialGradient(cx, cy, size * 0.2, cx, cy, haloR);
    grad.addColorStop(0, `rgba(255,255,170,${haloA})`);
    grad.addColorStop(0.5, `rgba(255,215,0,${haloA * 0.7})`);
    grad.addColorStop(1, "rgba(255,138,0,0)");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(cx, cy, haloR, 0, Math.PI * 2);
    ctx.fill();

    // 12 rising sparkles staggered by index
    for (let i = 0; i < 12; i++) {
      const seed = i / 12;
      const localT = (t * 1.4 - seed) % 1;
      if (localT < 0 || localT > 1) continue;
      const ang = seed * Math.PI * 2;
      const rNow = size * 0.30 + localT * size * 0.45;
      const sx = cx + Math.cos(ang) * rNow;
      const sy = cy + Math.sin(ang) * rNow * 0.7 - localT * size * 0.4;
      const sa = (1 - localT) * 0.95;
      // 4-pixel cross sparkle
      ctx.fillStyle = `rgba(255,255,210,${sa})`;
      ctx.fillRect(sx - 0.5, sy - 0.5, 1, 1);
      ctx.fillStyle = `rgba(255,215,0,${sa * 0.8})`;
      ctx.fillRect(sx - 2, sy, 4, 1);
      ctx.fillRect(sx, sy - 2, 1, 4);
    }

    // Floating "LEVEL UP! Lv N" badge above the mon
    const badgeY = cy - size * 0.45 - t * size * 0.35;
    const badgeOpacity = t < 0.85 ? 1 : Math.max(0, (1 - t) / 0.15);
    const fontSize = Math.max(10, Math.floor(size * 0.13));
    const text = `LEVEL UP! · Lv ${fx.newLevel}`;
    ctx.font = `bold ${fontSize}px monospace`;
    ctx.textAlign = "center";
    // Drop shadow
    ctx.fillStyle = `rgba(0,0,0,${badgeOpacity * 0.7})`;
    ctx.fillText(text, cx + 1, badgeY + 1);
    // Gold text
    ctx.fillStyle = `rgba(255,215,0,${badgeOpacity})`;
    ctx.fillText(text, cx, badgeY);
    ctx.textAlign = "start";
  }

  function handleKey(key) {
    if (!state) return false;
    if (state.uiBlocked) return true;
    // typewriter fast-forward
    if (state.typing) {
      if (key === "z" || key === "Enter" || key === " ") {
        fastForwardTypewriter();
        return true;
      }
      return true;
    }
    if (state.phase === "menu") {
      if (key === "z" || key === "Enter") { handleAction("fight"); return true; }
      if (key === "x") { handleAction("run"); return true; }
      // Quick-heal: H uses the strongest available heal item on the active mon.
      if (key === "h") { quickHeal(); return true; }
      return true;
    }
    if (key === "z" || key === "Enter" || key === " ") {
      nextMessage();
      return true;
    }
    return true;
  }

  function isActive() { return state !== null; }
  function isMessageDone() { return state && !state.typing && state.messageQueue.length === 0; }

  return {
    start, draw, update, handleKey, isActive, handleAction, handleMove, refreshInfo,
    switchActiveMon, useHealItemInBattle, throwBraincell,
  };
})();
