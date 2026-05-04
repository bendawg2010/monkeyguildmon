// =====================================================
// Chiptune audio - simple Web Audio API wrappers
// =====================================================

const Audio = (() => {
  let ctx = null;
  let masterGain = null;
  // Default master volume (also our "unmuted" target).
  const MASTER_VOL = 0.18;
  // Restore previous mute preference on page load so the player doesn't
  // have to mute every single visit.
  let muted = false;
  try { muted = localStorage.getItem("monkeyguildmon_muted") === "1"; } catch (e) {}
  let unlocked = false;

  function ensure() {
    if (ctx) return;
    try {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
      masterGain = ctx.createGain();
      // Honor the saved mute state immediately so we don't briefly play
      // sound on a muted reload.
      masterGain.gain.value = muted ? 0 : MASTER_VOL;
      masterGain.connect(ctx.destination);
    } catch(e) { ctx = null; }
  }

  // Hard-silence the entire audio graph by ramping master gain to 0.
  // Sample-accurate, takes effect on the next audio render quantum,
  // and silences notes that were scheduled minutes into the future.
  function applyMute() {
    if (!ctx || !masterGain) return;
    const t = ctx.currentTime;
    masterGain.gain.cancelScheduledValues(t);
    masterGain.gain.setValueAtTime(muted ? 0 : MASTER_VOL, t);
  }

  function unlock() {
    ensure();
    if (!ctx) return;
    if (ctx.state === "suspended") ctx.resume();
    unlocked = true;
  }

  function tone({ freq = 440, duration = 0.08, type = "square", vol = 0.3, attack = 0.005, release = 0.04, slide = 0 } = {}) {
    if (!unlocked || muted || !ctx) return;
    const t0 = ctx.currentTime;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t0);
    if (slide) osc.frequency.linearRampToValueAtTime(freq + slide, t0 + duration);
    g.gain.setValueAtTime(0, t0);
    g.gain.linearRampToValueAtTime(vol, t0 + attack);
    g.gain.linearRampToValueAtTime(0, t0 + duration + release);
    osc.connect(g);
    g.connect(masterGain);
    osc.start(t0);
    osc.stop(t0 + duration + release + 0.02);
  }

  function noise({ duration = 0.1, vol = 0.3, freq = 1000 } = {}) {
    if (!unlocked || muted || !ctx) return;
    const t0 = ctx.currentTime;
    const buf = ctx.createBuffer(1, ctx.sampleRate * duration, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = (Math.random()*2-1) * Math.exp(-i/d.length * 4);
    const src = ctx.createBufferSource();
    src.buffer = buf;
    const f = ctx.createBiquadFilter();
    f.type = "bandpass";
    f.frequency.value = freq;
    const g = ctx.createGain();
    g.gain.value = vol;
    src.connect(f); f.connect(g); g.connect(masterGain);
    src.start(t0);
  }

  // sound presets
  const SFX = {
    select: () => tone({ freq: 880, duration: 0.04, vol: 0.25 }),
    cancel: () => tone({ freq: 220, duration: 0.06, vol: 0.25 }),
    confirm: () => { tone({ freq: 660, duration: 0.05, vol: 0.3 }); setTimeout(()=>tone({ freq: 880, duration: 0.06, vol: 0.3 }), 60); },
    text: () => tone({ freq: 1200, duration: 0.012, vol: 0.08, type: "square" }),
    step: () => tone({ freq: 200 + Math.random()*40, duration: 0.03, vol: 0.1, type: "triangle" }),
    hit: () => { tone({ freq: 220, duration: 0.06, vol: 0.4, type: "sawtooth", slide: -100 }); noise({ duration: 0.08, vol: 0.2, freq: 800 }); },
    superHit: () => { for (let i = 0; i < 3; i++) setTimeout(()=>tone({ freq: 180-i*30, duration: 0.07, vol: 0.4, type: "sawtooth", slide: -80 }), i*40); },
    weakHit: () => tone({ freq: 300, duration: 0.05, vol: 0.2, type: "triangle" }),
    miss: () => tone({ freq: 440, duration: 0.1, vol: 0.2, type: "sine", slide: -200 }),
    faint: () => { for (let i = 0; i < 5; i++) setTimeout(()=>tone({ freq: 400-i*60, duration: 0.1, vol: 0.3, type: "square" }), i*80); },
    levelUp: () => { [523,659,784,1046].forEach((f,i)=>setTimeout(()=>tone({ freq: f, duration: 0.1, vol: 0.3, type: "square" }), i*80)); },
    catch: () => { [440,550,660].forEach((f,i)=>setTimeout(()=>tone({ freq: f, duration: 0.06, vol: 0.3 }), i*60)); },
    captured: () => { [523,659,784,1046,1318].forEach((f,i)=>setTimeout(()=>tone({ freq: f, duration: 0.12, vol: 0.3, type: "square" }), i*100)); },
    breakOut: () => { tone({ freq: 200, duration: 0.15, vol: 0.3, type: "sawtooth", slide: -100 }); },
    encounter: () => {
      [200, 280, 360, 480, 640].forEach((f,i)=>setTimeout(()=>tone({ freq: f, duration: 0.1, vol: 0.35, type: "square", slide: 80 }), i*60));
    },
    heal: () => { [659,784,988].forEach((f,i)=>setTimeout(()=>tone({ freq: f, duration: 0.12, vol: 0.3 }), i*100)); },
    evolve: () => { for (let i = 0; i < 8; i++) setTimeout(()=>tone({ freq: 400 + i*60, duration: 0.06, vol: 0.3, type: "square" }), i*50); },
    victory: () => { [523, 659, 784, 1046, 784, 1046, 1318].forEach((f,i)=>setTimeout(()=>tone({ freq: f, duration: 0.15, vol: 0.3, type: "square" }), i*150)); },
    bump: () => tone({ freq: 100, duration: 0.06, vol: 0.2, type: "square" }),
    open: () => { tone({ freq: 660, duration: 0.04, vol: 0.2 }); setTimeout(()=>tone({ freq: 880, duration: 0.04, vol: 0.2 }), 30); },
  };

  return {
    unlock,
    play: (k) => { if (SFX[k]) SFX[k](); },
    setMuted: (m) => {
      muted = m;
      try { localStorage.setItem("monkeyguildmon_muted", m ? "1" : "0"); } catch (e) {}
      // Single source of truth: master gain. 0 = inaudible (everything,
      // SFX + music + scheduled-ahead notes), default = audible.
      applyMute();
      if (m) {
        Music.stop();
      } else {
        // Game's update loop calls Music.start() on the next frame
        // anyway (idempotent), so we don't need to re-trigger here.
        // We just need to make sure the next start() actually works.
        Music._wasPlaying = false;
      }
    },
    isMuted: () => muted,
    _ctx: () => ctx,
    _master: () => masterGain,
    _isUnlocked: () => unlocked,
    _isMuted: () => muted,
  };
})();

// =====================================================
// Background music — simple chiptune loops
// =====================================================
const Music = (() => {
  // OVERWORLD: cheerful, tracker-style 4/4 tune
  // notes are [pitch (Hz), duration in beats]
  const NOTE = (n) => 440 * Math.pow(2, (n - 69) / 12);
  // Simple cheerful melody (lead) + bass
  const overworldLead = [
    [NOTE(72), 0.5], [NOTE(76), 0.5], [NOTE(79), 0.5], [NOTE(76), 0.5],
    [NOTE(74), 0.5], [NOTE(77), 0.5], [NOTE(72), 0.5], [0, 0.5],
    [NOTE(74), 0.5], [NOTE(77), 0.5], [NOTE(81), 0.5], [NOTE(77), 0.5],
    [NOTE(76), 0.5], [NOTE(72), 0.5], [NOTE(69), 1.0],
    [NOTE(72), 0.5], [NOTE(76), 0.5], [NOTE(79), 0.5], [NOTE(83), 0.5],
    [NOTE(81), 0.5], [NOTE(79), 0.5], [NOTE(77), 1.0],
    [NOTE(76), 0.5], [NOTE(74), 0.5], [NOTE(72), 0.5], [NOTE(69), 0.5],
    [NOTE(72), 1.0], [0, 1.0],
  ];
  const overworldBass = [
    [NOTE(48), 1.0], [NOTE(52), 1.0], [NOTE(55), 1.0], [NOTE(52), 1.0],
    [NOTE(50), 1.0], [NOTE(53), 1.0], [NOTE(48), 1.0], [NOTE(48), 1.0],
    [NOTE(48), 1.0], [NOTE(52), 1.0], [NOTE(55), 1.0], [NOTE(59), 1.0],
    [NOTE(57), 1.0], [NOTE(53), 1.0], [NOTE(48), 1.0], [NOTE(48), 1.0],
  ];

  let timer = null;
  let currentScheduler = null;
  let _wasPlaying = false;

  function start() {
    // Music disabled per user preference — only walking + talking SFX.
    // Leaving the scheduler infra intact in case anyone wants to flip
    // it back on later.
    return;
    // (unreachable: original logic below)
    // eslint-disable-next-line no-unreachable
    if (_wasPlaying) return;
    if (Audio._isMuted && Audio._isMuted()) return;
    const ctx = Audio._ctx && Audio._ctx();
    if (!ctx) return;
    if (!Audio._isUnlocked || !Audio._isUnlocked()) return;
    _wasPlaying = true;
    const bpm = 144;
    const beat = 60 / bpm;
    const master = Audio._master();
    const musicGain = ctx.createGain();
    musicGain.gain.value = 0.30;
    musicGain.connect(master);
    let leadAt = ctx.currentTime + 0.05;
    let bassAt = ctx.currentTime + 0.05;
    // schedule a few seconds ahead, then loop
    function schedule() {
      const horizon = ctx.currentTime + 1.5;
      while (leadAt < horizon) {
        for (const [freq, dur] of overworldLead) {
          if (leadAt >= horizon) break;
          if (freq > 0) playNote(ctx, musicGain, freq, leadAt, dur * beat * 0.95, "square", 0.3);
          leadAt += dur * beat;
        }
      }
      while (bassAt < horizon) {
        for (const [freq, dur] of overworldBass) {
          if (bassAt >= horizon) break;
          if (freq > 0) playNote(ctx, musicGain, freq, bassAt, dur * beat * 0.95, "triangle", 0.4);
          bassAt += dur * beat;
        }
      }
    }
    schedule();
    timer = setInterval(schedule, 800);
    currentScheduler = { stop: () => { clearInterval(timer); timer = null; try { musicGain.disconnect(); } catch(e) {} } };
  }

  function playNote(ctx, dest, freq, t, dur, type, vol) {
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t);
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(vol, t + 0.01);
    g.gain.linearRampToValueAtTime(vol * 0.7, t + dur * 0.7);
    g.gain.linearRampToValueAtTime(0, t + dur);
    osc.connect(g);
    g.connect(dest);
    osc.start(t);
    osc.stop(t + dur + 0.05);
  }

  function stop() {
    if (currentScheduler) { currentScheduler.stop(); currentScheduler = null; }
    _wasPlaying = false;
  }

  return {
    start, stop,
    get _wasPlaying() { return _wasPlaying; },
    set _wasPlaying(v) { _wasPlaying = v; },
  };
})();
