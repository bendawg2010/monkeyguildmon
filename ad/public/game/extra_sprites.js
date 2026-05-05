// =====================================================
// extra_sprites.js
// Hand-drawn SPECIAL sprite functions for the remaining
// 54 monkey guild members. Loaded after sprites.js;
// drawMon() in sprites.js checks window.__mgmExtraSprites
// before falling through to the parametric avatar renderer.
//
// Structure: each function takes (ctx, sp, x, y, s, t) and
// uses local px/shadow helpers defined at the top of the
// IIFE. PFP details are baked into each sprite based on
// the actual Discord avatar.
// =====================================================
(function () {
  function px(ctx, x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
  }
  function shadow(ctx, cx, cy, rx, ry) {
    ctx.fillStyle = "rgba(0,0,0,0.25)";
    ctx.beginPath();
    ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  window.__mgmExtraSprites = {
    // ===== MODS / TOP-LIST =====
    CHRISTIAN(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t / 320) * 1.6;
      shadow(ctx, x+s/2, y+s-4, s*0.34, 5);
      // green round head
      px(ctx, x+s*0.18, y+s*0.20+bob, s*0.64, s*0.55, '#8bc34a');
      px(ctx, x+s*0.22, y+s*0.18+bob, s*0.56, s*0.10, '#9ed856');
      px(ctx, x+s*0.14, y+s*0.30+bob, s*0.06, s*0.30, '#7cb342');
      px(ctx, x+s*0.80, y+s*0.30+bob, s*0.06, s*0.30, '#7cb342');
      // eyes
      px(ctx, x+s*0.32, y+s*0.36+bob, s*0.07, s*0.09, '#000');
      px(ctx, x+s*0.61, y+s*0.36+bob, s*0.07, s*0.09, '#000');
      px(ctx, x+s*0.34, y+s*0.37+bob, s*0.02, s*0.03, '#fff');
      px(ctx, x+s*0.63, y+s*0.37+bob, s*0.02, s*0.03, '#fff');
      // orange duck bill
      px(ctx, x+s*0.30, y+s*0.52+bob, s*0.40, s*0.14, '#ff9800');
      px(ctx, x+s*0.32, y+s*0.66+bob, s*0.36, s*0.04, '#e07d00');
      // small smile under bill
      px(ctx, x+s*0.42, y+s*0.72+bob, s*0.16, s*0.02, '#5b8a2a');
      // flame icon below
      px(ctx, x+s*0.46, y+s*0.86, s*0.08, s*0.10, '#ff5722');
      px(ctx, x+s*0.48, y+s*0.84, s*0.04, s*0.04, '#ffeb3b');
    },
    LSM253(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t / 320) * 1.6;
      shadow(ctx, x+s/2, y+s-4, s*0.34, 5);
      // peach face
      px(ctx, x+s*0.20, y+s*0.26+bob, s*0.60, s*0.52, '#f3c39a');
      px(ctx, x+s*0.18, y+s*0.34+bob, s*0.04, s*0.32, '#dca581');
      px(ctx, x+s*0.78, y+s*0.34+bob, s*0.04, s*0.32, '#dca581');
      // brown spiky hair
      px(ctx, x+s*0.18, y+s*0.16+bob, s*0.64, s*0.16, '#5a3a1d');
      px(ctx, x+s*0.24, y+s*0.10+bob, s*0.08, s*0.10, '#5a3a1d');
      px(ctx, x+s*0.40, y+s*0.08+bob, s*0.08, s*0.10, '#6e4a25');
      px(ctx, x+s*0.58, y+s*0.10+bob, s*0.10, s*0.10, '#5a3a1d');
      // small eyes
      px(ctx, x+s*0.32, y+s*0.38+bob, s*0.06, s*0.04, '#000');
      px(ctx, x+s*0.62, y+s*0.38+bob, s*0.06, s*0.04, '#000');
      // big open smile
      px(ctx, x+s*0.30, y+s*0.54+bob, s*0.40, s*0.14, '#3a1a0a');
      px(ctx, x+s*0.32, y+s*0.56+bob, s*0.36, s*0.06, '#fff');
      px(ctx, x+s*0.40, y+s*0.56+bob, s*0.02, s*0.06, '#ddd');
      px(ctx, x+s*0.50, y+s*0.56+bob, s*0.02, s*0.06, '#ddd');
      px(ctx, x+s*0.60, y+s*0.56+bob, s*0.02, s*0.06, '#ddd');
      // black shirt at bottom
      px(ctx, x+s*0.16, y+s*0.84, s*0.68, s*0.16, '#1a1a1a');
    },
    MYSELF(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t / 320) * 1.0;
      shadow(ctx, x+s/2, y+s-4, s*0.34, 5);
      // dark navy bg
      px(ctx, x, y, s, s, '#0a0e2e');
      const pulse = 0.6 + Math.sin(t/200) * 0.4;
      // electric sparks/rays
      ctx.fillStyle = `rgba(120,200,255,${0.5*pulse})`;
      ctx.fillRect(x+s*0.48, y+s*0.05, s*0.04, s*0.18);
      ctx.fillRect(x+s*0.48, y+s*0.77, s*0.04, s*0.18);
      ctx.fillRect(x+s*0.05, y+s*0.48, s*0.18, s*0.04);
      ctx.fillRect(x+s*0.77, y+s*0.48, s*0.18, s*0.04);
      ctx.fillRect(x+s*0.18, y+s*0.20, s*0.08, s*0.04);
      ctx.fillRect(x+s*0.74, y+s*0.76, s*0.08, s*0.04);
      // diamond shape
      const cx = x+s*0.5, cy = y+s*0.5+bob;
      ctx.fillStyle = '#1ea7e8';
      ctx.beginPath();
      ctx.moveTo(cx, cy-s*0.22);
      ctx.lineTo(cx+s*0.18, cy);
      ctx.lineTo(cx, cy+s*0.22);
      ctx.lineTo(cx-s*0.18, cy);
      ctx.closePath();
      ctx.fill();
      // bright core
      ctx.fillStyle = `rgba(255,255,255,${pulse})`;
      ctx.beginPath();
      ctx.moveTo(cx, cy-s*0.10);
      ctx.lineTo(cx+s*0.08, cy);
      ctx.lineTo(cx, cy+s*0.10);
      ctx.lineTo(cx-s*0.08, cy);
      ctx.closePath();
      ctx.fill();
    },
    STEEL_GAMER(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t / 320) * 1.6;
      shadow(ctx, x+s/2, y+s-4, s*0.34, 5);
      // big curly dark hair silhouette
      px(ctx, x+s*0.10, y+s*0.18+bob, s*0.80, s*0.50, '#2b1a14');
      px(ctx, x+s*0.06, y+s*0.30+bob, s*0.10, s*0.36, '#2b1a14');
      px(ctx, x+s*0.84, y+s*0.30+bob, s*0.10, s*0.36, '#2b1a14');
      // curls bumps
      px(ctx, x+s*0.14, y+s*0.14+bob, s*0.14, s*0.10, '#1f120e');
      px(ctx, x+s*0.36, y+s*0.10+bob, s*0.14, s*0.10, '#1f120e');
      px(ctx, x+s*0.58, y+s*0.12+bob, s*0.14, s*0.10, '#1f120e');
      px(ctx, x+s*0.74, y+s*0.16+bob, s*0.12, s*0.10, '#1f120e');
      // pale face
      px(ctx, x+s*0.26, y+s*0.36+bob, s*0.48, s*0.36, '#f0d4c0');
      // sunglasses lenses
      px(ctx, x+s*0.30, y+s*0.46+bob, s*0.16, s*0.10, '#000');
      px(ctx, x+s*0.54, y+s*0.46+bob, s*0.16, s*0.10, '#000');
      px(ctx, x+s*0.46, y+s*0.49+bob, s*0.08, s*0.02, '#000');
      // neutral mouth
      px(ctx, x+s*0.42, y+s*0.66+bob, s*0.16, s*0.02, '#9c5a4a');
    },

    // ===== MINECRAFT MAINS =====
    SZS(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t / 320) * 1.4;
      shadow(ctx, x+s/2, y+s-4, s*0.34, 5);
      // purple/pink gradient bg via stripes
      px(ctx, x, y, s, s, '#3a1758');
      px(ctx, x, y, s*0.6, s, '#5a1f7a');
      px(ctx, x, y, s*0.3, s, '#7e2698');
      // diagonal pink stripe
      for (let i = 0; i < 12; i++) {
        px(ctx, x+s*(0.10+i*0.05), y+s*(i*0.06), s*0.06, s*0.10, '#d05fbe');
      }
      // dark silhouette figure
      px(ctx, x+s*0.40, y+s*0.18+bob, s*0.16, s*0.16, '#0a0a0a');
      px(ctx, x+s*0.34, y+s*0.34+bob, s*0.30, s*0.30, '#0a0a0a');
      px(ctx, x+s*0.38, y+s*0.62+bob, s*0.24, s*0.30, '#0a0a0a');
      px(ctx, x+s*0.30, y+s*0.42+bob, s*0.06, s*0.20, '#0a0a0a');
      px(ctx, x+s*0.64, y+s*0.42+bob, s*0.06, s*0.20, '#0a0a0a');
    },
    KAPARKING(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t / 320) * 1.0;
      shadow(ctx, x+s/2, y+s-4, s*0.34, 5);
      // blocky head
      px(ctx, x+s*0.26, y+s*0.10+bob, s*0.48, s*0.26, '#5a7a8a');
      px(ctx, x+s*0.28, y+s*0.12+bob, s*0.44, s*0.06, '#6f8d9d');
      // glowing cyan eyes
      px(ctx, x+s*0.34, y+s*0.20+bob, s*0.10, s*0.08, '#00ffff');
      px(ctx, x+s*0.56, y+s*0.20+bob, s*0.10, s*0.08, '#00ffff');
      px(ctx, x+s*0.36, y+s*0.22+bob, s*0.06, s*0.04, '#aaffff');
      px(ctx, x+s*0.58, y+s*0.22+bob, s*0.06, s*0.04, '#aaffff');
      // mouth grill
      px(ctx, x+s*0.36, y+s*0.30+bob, s*0.28, s*0.04, '#2a3a48');
      // body
      px(ctx, x+s*0.22, y+s*0.38+bob, s*0.56, s*0.46, '#4a6878');
      px(ctx, x+s*0.24, y+s*0.40+bob, s*0.52, s*0.06, '#6a8898');
      // arms hanging down
      px(ctx, x+s*0.08, y+s*0.40+bob, s*0.16, s*0.46, '#3e5868');
      px(ctx, x+s*0.76, y+s*0.40+bob, s*0.16, s*0.46, '#3e5868');
      px(ctx, x+s*0.10, y+s*0.42+bob, s*0.04, s*0.40, '#557788');
      px(ctx, x+s*0.78, y+s*0.42+bob, s*0.04, s*0.40, '#557788');
      // chest panel
      px(ctx, x+s*0.42, y+s*0.52+bob, s*0.16, s*0.10, '#2a3a48');
    },
    NIT(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t / 320) * 1.6;
      shadow(ctx, x+s/2, y+s-4, s*0.34, 5);
      // green hair flopping
      px(ctx, x+s*0.12, y+s*0.10+bob, s*0.76, s*0.30, '#4caf50');
      px(ctx, x+s*0.08, y+s*0.20+bob, s*0.10, s*0.30, '#3e9a45');
      px(ctx, x+s*0.82, y+s*0.20+bob, s*0.10, s*0.30, '#3e9a45');
      px(ctx, x+s*0.20, y+s*0.06+bob, s*0.16, s*0.10, '#5cc25e');
      px(ctx, x+s*0.50, y+s*0.04+bob, s*0.16, s*0.12, '#5cc25e');
      // pale face
      px(ctx, x+s*0.22, y+s*0.32+bob, s*0.56, s*0.42, '#fae0d0');
      // big crying eyes
      px(ctx, x+s*0.30, y+s*0.40+bob, s*0.14, s*0.14, '#fff');
      px(ctx, x+s*0.56, y+s*0.40+bob, s*0.14, s*0.14, '#fff');
      px(ctx, x+s*0.34, y+s*0.46+bob, s*0.06, s*0.06, '#3a6a3a');
      px(ctx, x+s*0.60, y+s*0.46+bob, s*0.06, s*0.06, '#3a6a3a');
      // tears streaming
      const tearY = (t/8) % (s*0.2);
      px(ctx, x+s*0.34, y+s*0.56+bob+tearY, s*0.04, s*0.10, '#5fc8ff');
      px(ctx, x+s*0.62, y+s*0.56+bob+tearY, s*0.04, s*0.10, '#5fc8ff');
      // wail mouth
      px(ctx, x+s*0.40, y+s*0.62+bob, s*0.20, s*0.12, '#7a2020');
      px(ctx, x+s*0.42, y+s*0.66+bob, s*0.16, s*0.04, '#d04060');
    },
    ALXROAR(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t / 320) * 0.6;
      shadow(ctx, x+s/2, y+s-4, s*0.34, 5);
      // night bg
      px(ctx, x, y, s, s, '#0a1828');
      // logs crossed
      px(ctx, x+s*0.20, y+s*0.74, s*0.60, s*0.10, '#5a3a1a');
      px(ctx, x+s*0.22, y+s*0.76, s*0.56, s*0.04, '#7a4e22');
      px(ctx, x+s*0.30, y+s*0.68, s*0.10, s*0.18, '#4a2e10');
      px(ctx, x+s*0.60, y+s*0.68, s*0.10, s*0.18, '#4a2e10');
      // flame
      const f = Math.sin(t/120) * 1.5;
      px(ctx, x+s*0.36, y+s*0.42+f+bob, s*0.28, s*0.30, '#ff7020');
      px(ctx, x+s*0.40, y+s*0.50+f+bob, s*0.20, s*0.20, '#ffc020');
      px(ctx, x+s*0.44, y+s*0.56+f+bob, s*0.12, s*0.10, '#ffffaa');
      px(ctx, x+s*0.42, y+s*0.34+f+bob, s*0.16, s*0.12, '#ff5010');
      // sparks
      const sp1 = (t/100) % (s*0.4);
      px(ctx, x+s*0.30, y+s*0.40-sp1, s*0.03, s*0.03, '#ffeb3b');
      px(ctx, x+s*0.66, y+s*0.50-sp1*0.7, s*0.03, s*0.03, '#ff9020');
      px(ctx, x+s*0.50, y+s*0.30-sp1*0.5, s*0.02, s*0.02, '#ffd060');
    },
    RANGERWILL(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t / 320) * 1.6;
      shadow(ctx, x+s/2, y+s-4, s*0.34, 5);
      // antennas
      px(ctx, x+s*0.30, y+s*0.06+bob, s*0.04, s*0.10, '#222');
      px(ctx, x+s*0.66, y+s*0.06+bob, s*0.04, s*0.10, '#222');
      px(ctx, x+s*0.27, y+s*0.04+bob, s*0.10, s*0.06, '#222');
      px(ctx, x+s*0.63, y+s*0.04+bob, s*0.10, s*0.06, '#222');
      // yellow round head/body
      px(ctx, x+s*0.16, y+s*0.18+bob, s*0.68, s*0.66, '#ffd54a');
      px(ctx, x+s*0.20, y+s*0.16+bob, s*0.60, s*0.06, '#ffe070');
      px(ctx, x+s*0.10, y+s*0.30+bob, s*0.08, s*0.40, '#e6b830');
      px(ctx, x+s*0.82, y+s*0.30+bob, s*0.08, s*0.40, '#e6b830');
      // bee stripes
      px(ctx, x+s*0.18, y+s*0.50+bob, s*0.64, s*0.08, '#1a1a1a');
      px(ctx, x+s*0.18, y+s*0.68+bob, s*0.64, s*0.08, '#1a1a1a');
      // big eyes
      px(ctx, x+s*0.28, y+s*0.32+bob, s*0.12, s*0.12, '#fff');
      px(ctx, x+s*0.60, y+s*0.32+bob, s*0.12, s*0.12, '#fff');
      px(ctx, x+s*0.32, y+s*0.36+bob, s*0.06, s*0.08, '#000');
      px(ctx, x+s*0.64, y+s*0.36+bob, s*0.06, s*0.08, '#000');
      // small smile
      px(ctx, x+s*0.42, y+s*0.46+bob, s*0.16, s*0.02, '#7a4a10');
    },
    CARRIED(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t / 320) * 0.6;
      shadow(ctx, x+s/2, y+s-4, s*0.34, 5);
      // grey/white bg
      px(ctx, x, y, s, s, '#d8d8d8');
      px(ctx, x, y+s*0.7, s, s*0.3, '#9a9a9a');
      px(ctx, x, y+s*0.68, s, s*0.02, '#7a7a7a');
      // sitting figure side view
      // legs (knees up)
      px(ctx, x+s*0.36, y+s*0.50+bob, s*0.20, s*0.22, '#3a3a4a');
      px(ctx, x+s*0.34, y+s*0.66+bob, s*0.24, s*0.08, '#2a2a3a');
      // body bent forward
      px(ctx, x+s*0.40, y+s*0.40+bob, s*0.18, s*0.20, '#5a5a7a');
      // head down
      px(ctx, x+s*0.42, y+s*0.30+bob, s*0.16, s*0.14, '#e6c8a8');
      // hair
      px(ctx, x+s*0.42, y+s*0.28+bob, s*0.16, s*0.06, '#3a2a1a');
      // arms wrapped on knees
      px(ctx, x+s*0.34, y+s*0.46+bob, s*0.06, s*0.16, '#5a5a7a');
    },
    _KEE_(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t / 320) * 1.4;
      shadow(ctx, x+s/2, y+s-4, s*0.34, 5);
      // red hood big
      px(ctx, x+s*0.10, y+s*0.14+bob, s*0.80, s*0.70, '#c41e1e');
      px(ctx, x+s*0.14, y+s*0.10+bob, s*0.72, s*0.10, '#e63030');
      px(ctx, x+s*0.06, y+s*0.30+bob, s*0.10, s*0.50, '#9a1010');
      px(ctx, x+s*0.84, y+s*0.30+bob, s*0.10, s*0.50, '#9a1010');
      // hood inner edge shadow
      px(ctx, x+s*0.22, y+s*0.36+bob, s*0.56, s*0.04, '#7a0a0a');
      // small face peeking, shadowed
      px(ctx, x+s*0.30, y+s*0.40+bob, s*0.40, s*0.26, '#3a2820');
      px(ctx, x+s*0.34, y+s*0.46+bob, s*0.32, s*0.16, '#5a3e30');
      // hint of mouth
      px(ctx, x+s*0.44, y+s*0.58+bob, s*0.12, s*0.02, '#8a4a3a');
      // hood point top
      px(ctx, x+s*0.42, y+s*0.06+bob, s*0.16, s*0.10, '#c41e1e');
    },
    _WISHRAM_(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t / 320) * 1.6;
      shadow(ctx, x+s/2, y+s-4, s*0.34, 5);
      // ears
      px(ctx, x+s*0.18, y+s*0.16+bob, s*0.16, s*0.16, '#d4a880');
      px(ctx, x+s*0.66, y+s*0.16+bob, s*0.16, s*0.16, '#d4a880');
      px(ctx, x+s*0.22, y+s*0.20+bob, s*0.08, s*0.08, '#f0c0a0');
      px(ctx, x+s*0.70, y+s*0.20+bob, s*0.08, s*0.08, '#f0c0a0');
      // round face
      px(ctx, x+s*0.16, y+s*0.26+bob, s*0.68, s*0.58, '#e8c4a0');
      px(ctx, x+s*0.20, y+s*0.24+bob, s*0.60, s*0.06, '#f4d4b4');
      px(ctx, x+s*0.12, y+s*0.36+bob, s*0.06, s*0.36, '#d4a880');
      px(ctx, x+s*0.82, y+s*0.36+bob, s*0.06, s*0.36, '#d4a880');
      // big eyes
      px(ctx, x+s*0.28, y+s*0.42+bob, s*0.12, s*0.14, '#1a1a1a');
      px(ctx, x+s*0.60, y+s*0.42+bob, s*0.12, s*0.14, '#1a1a1a');
      px(ctx, x+s*0.32, y+s*0.44+bob, s*0.04, s*0.04, '#fff');
      px(ctx, x+s*0.64, y+s*0.44+bob, s*0.04, s*0.04, '#fff');
      // pink nose
      px(ctx, x+s*0.46, y+s*0.60+bob, s*0.08, s*0.06, '#ff8aa0');
      // pink cheeks
      px(ctx, x+s*0.22, y+s*0.58+bob, s*0.08, s*0.06, '#ffb8c8');
      px(ctx, x+s*0.70, y+s*0.58+bob, s*0.08, s*0.06, '#ffb8c8');
      // tiny mouth
      px(ctx, x+s*0.44, y+s*0.68+bob, s*0.12, s*0.02, '#7a3a3a');
    },
    JUST_MILES(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t / 320) * 0.8;
      shadow(ctx, x+s/2, y+s-4, s*0.34, 5);
      // dark sky bg
      px(ctx, x, y, s, s, '#0e0e3e');
      px(ctx, x, y, s, s*0.5, '#1a1050');
      // crescent moon top-right
      px(ctx, x+s*0.62, y+s*0.12, s*0.22, s*0.22, '#fffae0');
      px(ctx, x+s*0.66, y+s*0.10, s*0.18, s*0.20, '#fff8d0');
      px(ctx, x+s*0.58, y+s*0.16, s*0.16, s*0.16, '#0e0e3e');
      // twinkle stars
      const tw = (Math.sin(t/300) + 1) / 2;
      const tw2 = (Math.sin(t/500 + 1) + 1) / 2;
      ctx.fillStyle = `rgba(255,255,255,${0.6 + tw*0.4})`;
      ctx.fillRect(x+s*0.10, y+s*0.16, s*0.04, s*0.04);
      ctx.fillRect(x+s*0.30, y+s*0.30, s*0.03, s*0.03);
      ctx.fillRect(x+s*0.20, y+s*0.50, s*0.04, s*0.04);
      ctx.fillStyle = `rgba(255,255,200,${0.5 + tw2*0.5})`;
      ctx.fillRect(x+s*0.50, y+s*0.40, s*0.03, s*0.03);
      ctx.fillRect(x+s*0.80, y+s*0.56, s*0.04, s*0.04);
      ctx.fillRect(x+s*0.16, y+s*0.66, s*0.03, s*0.03);
      ctx.fillRect(x+s*0.40, y+s*0.20, s*0.02, s*0.02);
      // tiny silhouette at bottom
      px(ctx, x+s*0.44, y+s*0.80+bob, s*0.12, s*0.16, '#000');
      px(ctx, x+s*0.46, y+s*0.74+bob, s*0.08, s*0.08, '#000');
    },

    DUDEGUY(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t*0.003) * (s*0.012);
      shadow(ctx, x+s/2, y+s-4, s*0.34, 5);
      // photo frame (white)
      ctx.fillStyle = "#fff";
      ctx.fillRect(x+s*0.10, y+s*0.10+bob, s*0.80, s*0.74);
      // inner border
      ctx.fillStyle = "#dadce0";
      ctx.fillRect(x+s*0.12, y+s*0.12+bob, s*0.76, s*0.04);
      ctx.fillRect(x+s*0.12, y+s*0.78+bob, s*0.76, s*0.04);
      // 3 small face panels
      // panel 1 — top-left, brown hair, blue shirt
      ctx.fillStyle = "#7fdcff";
      ctx.fillRect(x+s*0.14, y+s*0.18+bob, s*0.34, s*0.30);
      ctx.fillStyle = "#ffd0a8";
      ctx.beginPath(); ctx.arc(x+s*0.31, y+s*0.30+bob, s*0.10, 0, Math.PI*2); ctx.fill();
      ctx.fillStyle = "#7a4828";
      px(ctx, x+s*0.22, y+s*0.22+bob, s*0.18, s*0.06, "#7a4828");
      ctx.fillStyle = "#1a1a1a";
      ctx.beginPath(); ctx.arc(x+s*0.27, y+s*0.30+bob, s*0.012, 0, Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(x+s*0.35, y+s*0.30+bob, s*0.012, 0, Math.PI*2); ctx.fill();
      // panel 2 — top-right, blonde hair, green shirt
      ctx.fillStyle = "#7fdc6a";
      ctx.fillRect(x+s*0.52, y+s*0.18+bob, s*0.34, s*0.30);
      ctx.fillStyle = "#ffd0a8";
      ctx.beginPath(); ctx.arc(x+s*0.69, y+s*0.30+bob, s*0.10, 0, Math.PI*2); ctx.fill();
      ctx.fillStyle = "#ffd86a";
      px(ctx, x+s*0.60, y+s*0.22+bob, s*0.18, s*0.06, "#ffd86a");
      ctx.fillStyle = "#1a1a1a";
      ctx.beginPath(); ctx.arc(x+s*0.65, y+s*0.30+bob, s*0.012, 0, Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(x+s*0.73, y+s*0.30+bob, s*0.012, 0, Math.PI*2); ctx.fill();
      // panel 3 — bottom (wide), dark hair, red shirt
      ctx.fillStyle = "#ed4245";
      ctx.fillRect(x+s*0.14, y+s*0.50+bob, s*0.72, s*0.26);
      ctx.fillStyle = "#ffd0a8";
      ctx.beginPath(); ctx.arc(x+s*0.50, y+s*0.60+bob, s*0.10, 0, Math.PI*2); ctx.fill();
      ctx.fillStyle = "#1a1a1a";
      px(ctx, x+s*0.41, y+s*0.52+bob, s*0.18, s*0.06, "#1a1a1a");
      ctx.beginPath(); ctx.arc(x+s*0.46, y+s*0.60+bob, s*0.012, 0, Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(x+s*0.54, y+s*0.60+bob, s*0.012, 0, Math.PI*2); ctx.fill();
      // smiles on each
      ctx.strokeStyle = "#1a1a1a";
      ctx.lineWidth = Math.max(1, s*0.008);
      ctx.beginPath(); ctx.arc(x+s*0.31, y+s*0.34+bob, s*0.020, Math.PI*0.15, Math.PI*0.85); ctx.stroke();
      ctx.beginPath(); ctx.arc(x+s*0.69, y+s*0.34+bob, s*0.020, Math.PI*0.15, Math.PI*0.85); ctx.stroke();
      ctx.beginPath(); ctx.arc(x+s*0.50, y+s*0.64+bob, s*0.020, Math.PI*0.15, Math.PI*0.85); ctx.stroke();
      // JUST badge
      ctx.fillStyle = "#5865f2";
      ctx.fillRect(x+s*0.40, y+s*0.86+bob, s*0.20, s*0.06);
      ctx.fillStyle = "#fff";
      ctx.font = `bold ${Math.floor(s*0.045)}px monospace`;
      ctx.textAlign = "center";
      ctx.fillText("JUST", x+s*0.50, y+s*0.905+bob);
      ctx.textAlign = "start";
          // === auto-flourish: identifier overlay ===
      try {
        ctx.save();
        const __fb = Math.sin(t*0.0035) * (s*0.008);
        // Tier-glow username label (below sprite)
        ctx.font = `bold ${Math.max(7, Math.floor(s*0.060))}px monospace`;
        ctx.textAlign = "center";
        ctx.fillStyle = "rgba(0,0,0,0.55)";
        ctx.fillRect(x+s*0.10, y+s*0.965, s*0.80, s*0.075);
        ctx.fillStyle = "#7fdc6a";
        ctx.shadowColor = "#7fdc6a";
        ctx.shadowBlur = Math.max(2, s*0.012);
        ctx.fillText("Dudeguy", x+s*0.50, y+s*1.020);
        ctx.shadowBlur = 0;
        // Floating role badge tag (top-right corner)
        const __bx = x+s*0.66, __by = y+s*0.05+__fb;
        const __bw = s*0.32, __bh = s*0.10;
        ctx.fillStyle = "#fee75c";
        ctx.fillRect(__bx, __by, __bw, __bh);
        ctx.strokeStyle = "#7fdc6a";
        ctx.lineWidth = Math.max(1, s*0.008);
        ctx.strokeRect(__bx, __by, __bw, __bh);
        ctx.fillStyle = "#0a0a14";
        ctx.font = `bold ${Math.max(7, Math.floor(s*0.058))}px monospace`;
        ctx.fillText("JUST", __bx+__bw/2, __by+__bh*0.74);
        ctx.textAlign = "start";
        ctx.fillStyle = "#7fdc6a";
        ctx.beginPath(); ctx.arc(x+s*0.06, y+s*0.10, s*0.022, 0, Math.PI*2); ctx.fill();
        ctx.fillStyle = "#1a1a1a";
        ctx.beginPath(); ctx.arc(x+s*0.06-s*0.008, y+s*0.10-s*0.005, s*0.003, 0, Math.PI*2); ctx.fill();
        ctx.beginPath(); ctx.arc(x+s*0.06+s*0.008, y+s*0.10-s*0.005, s*0.003, 0, Math.PI*2); ctx.fill();
        ctx.restore();
      } catch(__e) { /* flourish fail-safe */ }
},

    IOIO(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t*0.003) * (s*0.012);
      shadow(ctx, x+s/2, y+s-4, s*0.34, 5);
      // red open vest body
      ctx.fillStyle = "#ed4245";
      ctx.beginPath();
      ctx.moveTo(x+s*0.22, y+s*0.54+bob);
      ctx.lineTo(x+s*0.20, y+s*0.96+bob);
      ctx.lineTo(x+s*0.80, y+s*0.96+bob);
      ctx.lineTo(x+s*0.78, y+s*0.54+bob);
      ctx.closePath();
      ctx.fill();
      // skin chest
      ctx.fillStyle = "#ffd0a8";
      ctx.fillRect(x+s*0.40, y+s*0.54+bob, s*0.20, s*0.20);
      // arms
      px(ctx, x+s*0.10, y+s*0.56+bob, s*0.12, s*0.20, "#ed4245");
      px(ctx, x+s*0.78, y+s*0.56+bob, s*0.12, s*0.20, "#ed4245");
      // face
      ctx.fillStyle = "#ffd0a8";
      ctx.beginPath();
      ctx.ellipse(x+s*0.5, y+s*0.42+bob, s*0.18, s*0.20, 0, 0, Math.PI*2);
      ctx.fill();
      // black hair under hat
      ctx.fillStyle = "#1a1a1a";
      px(ctx, x+s*0.34, y+s*0.34+bob, s*0.32, s*0.06, "#1a1a1a");
      // straw hat
      ctx.fillStyle = "#ffd86a";
      ctx.beginPath();
      ctx.ellipse(x+s*0.50, y+s*0.24+bob, s*0.32, s*0.06, 0, 0, Math.PI*2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(x+s*0.50, y+s*0.16+bob, s*0.20, s*0.10, 0, 0, Math.PI*2);
      ctx.fill();
      // red ribbon band
      ctx.fillStyle = "#ed4245";
      ctx.fillRect(x+s*0.30, y+s*0.22+bob, s*0.40, s*0.04);
      // scar with stitches under left eye
      ctx.strokeStyle = "#a01020";
      ctx.lineWidth = Math.max(1, s*0.012);
      ctx.beginPath(); ctx.moveTo(x+s*0.40, y+s*0.46+bob); ctx.lineTo(x+s*0.46, y+s*0.50+bob); ctx.stroke();
      // stitch marks
      ctx.beginPath();
      for (let i = 0; i < 3; i++) {
        ctx.moveTo(x+s*(0.41+i*0.018), y+s*0.46+bob);
        ctx.lineTo(x+s*(0.41+i*0.018), y+s*0.50+bob);
      }
      ctx.stroke();
      // big eyes
      ctx.fillStyle = "#fff";
      ctx.beginPath(); ctx.arc(x+s*0.43, y+s*0.42+bob, s*0.030, 0, Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(x+s*0.57, y+s*0.42+bob, s*0.030, 0, Math.PI*2); ctx.fill();
      ctx.fillStyle = "#1a1a1a";
      ctx.beginPath(); ctx.arc(x+s*0.43, y+s*0.42+bob, s*0.014, 0, Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(x+s*0.57, y+s*0.42+bob, s*0.014, 0, Math.PI*2); ctx.fill();
      // big toothy grin
      ctx.fillStyle = "#1a1a1a";
      ctx.beginPath();
      ctx.ellipse(x+s*0.50, y+s*0.52+bob, s*0.10, s*0.04, 0, 0, Math.PI*2);
      ctx.fill();
      // teeth
      ctx.fillStyle = "#fff";
      ctx.fillRect(x+s*0.42, y+s*0.50+bob, s*0.16, s*0.02);
      // FM badge
      ctx.fillStyle = "#5865f2";
      ctx.fillRect(x+s*0.42, y+s*0.86+bob, s*0.16, s*0.06);
      ctx.fillStyle = "#fff";
      ctx.font = `bold ${Math.floor(s*0.045)}px monospace`;
      ctx.textAlign = "center";
      ctx.fillText("FM", x+s*0.50, y+s*0.905+bob);
      ctx.textAlign = "start";
          // === auto-flourish: identifier overlay ===
      try {
        ctx.save();
        const __fb = Math.sin(t*0.0035) * (s*0.008);
        // Tier-glow username label (below sprite)
        ctx.font = `bold ${Math.max(7, Math.floor(s*0.060))}px monospace`;
        ctx.textAlign = "center";
        ctx.fillStyle = "rgba(0,0,0,0.55)";
        ctx.fillRect(x+s*0.10, y+s*0.965, s*0.80, s*0.075);
        ctx.fillStyle = "#7fdc6a";
        ctx.shadowColor = "#7fdc6a";
        ctx.shadowBlur = Math.max(2, s*0.012);
        ctx.fillText("ioio", x+s*0.50, y+s*1.020);
        ctx.shadowBlur = 0;
        // Floating role badge tag (top-right corner)
        const __bx = x+s*0.66, __by = y+s*0.05+__fb;
        const __bw = s*0.32, __bh = s*0.10;
        ctx.fillStyle = "#ed4245";
        ctx.fillRect(__bx, __by, __bw, __bh);
        ctx.strokeStyle = "#7fdc6a";
        ctx.lineWidth = Math.max(1, s*0.008);
        ctx.strokeRect(__bx, __by, __bw, __bh);
        ctx.fillStyle = "#0a0a14";
        ctx.font = `bold ${Math.max(7, Math.floor(s*0.058))}px monospace`;
        ctx.fillText("FM", __bx+__bw/2, __by+__bh*0.74);
        ctx.textAlign = "start";
        ctx.fillStyle = "#f0d090";
        ctx.beginPath();
        ctx.ellipse(x+s*0.06, y+s*0.10, s*0.030, s*0.010, 0, 0, Math.PI*2);
        ctx.fill();
        ctx.fillRect(x+s*0.06-s*0.014, y+s*0.10-s*0.018, s*0.028, s*0.018);
        ctx.restore();
      } catch(__e) { /* flourish fail-safe */ }
},
    XL_MATTHEW100(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t / 320) * 1.6;
      shadow(ctx, x+s/2, y+s-4, s*0.34, 5);
      // wild dark hair
      px(ctx, x+s*0.12, y+s*0.10+bob, s*0.76, s*0.26, '#3a2818');
      px(ctx, x+s*0.18, y+s*0.04+bob, s*0.10, s*0.10, '#2a1e10');
      px(ctx, x+s*0.36, y+s*0.02+bob, s*0.12, s*0.10, '#4a3424');
      px(ctx, x+s*0.56, y+s*0.04+bob, s*0.10, s*0.10, '#2a1e10');
      px(ctx, x+s*0.72, y+s*0.06+bob, s*0.10, s*0.10, '#4a3424');
      // pale round face
      px(ctx, x+s*0.20, y+s*0.28+bob, s*0.60, s*0.50, '#f4d8c4');
      px(ctx, x+s*0.16, y+s*0.36+bob, s*0.06, s*0.30, '#d8b894');
      px(ctx, x+s*0.78, y+s*0.36+bob, s*0.06, s*0.30, '#d8b894');
      // round black-frame glasses
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(x+s*0.36, y+s*0.48+bob, s*0.10, 0, Math.PI*2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(x+s*0.64, y+s*0.48+bob, s*0.10, 0, Math.PI*2);
      ctx.stroke();
      px(ctx, x+s*0.46, y+s*0.47+bob, s*0.08, s*0.02, '#000');
      // eyes inside glasses
      px(ctx, x+s*0.34, y+s*0.46+bob, s*0.04, s*0.04, '#1a1a1a');
      px(ctx, x+s*0.62, y+s*0.46+bob, s*0.04, s*0.04, '#1a1a1a');
      // small pink mouth
      px(ctx, x+s*0.44, y+s*0.66+bob, s*0.12, s*0.04, '#d06a78');
    },

    // ===== MEMERS / STREAMERS / CODERS =====
    FORGBEAR1(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t / 320) * 1.6;
      shadow(ctx, x+s/2, y+s-4, s*0.34, 5);
      // dark suit collar
      px(ctx, x+s*0.18, y+s*0.78+bob, s*0.64, s*0.22, '#1a1a22');
      px(ctx, x+s*0.42, y+s*0.82+bob, s*0.16, s*0.12, '#e8e0d0');
      // peach face
      px(ctx, x+s*0.22, y+s*0.28+bob, s*0.56, s*0.5, '#f5c9a0');
      px(ctx, x+s*0.18, y+s*0.4+bob, s*0.06, s*0.3, '#f5c9a0');
      px(ctx, x+s*0.76, y+s*0.4+bob, s*0.06, s*0.3, '#f5c9a0');
      // dark hair combed forward
      px(ctx, x+s*0.2, y+s*0.2+bob, s*0.6, s*0.16, '#2a1810');
      px(ctx, x+s*0.28, y+s*0.16+bob, s*0.44, s*0.08, '#2a1810');
      px(ctx, x+s*0.32, y+s*0.34+bob, s*0.36, s*0.04, '#2a1810');
      // raised eyebrows
      px(ctx, x+s*0.3, y+s*0.42+bob, s*0.12, s*0.04, '#2a1810');
      px(ctx, x+s*0.58, y+s*0.42+bob, s*0.12, s*0.04, '#2a1810');
      // big wide eyes
      px(ctx, x+s*0.3, y+s*0.5+bob, s*0.12, s*0.1, '#fff');
      px(ctx, x+s*0.58, y+s*0.5+bob, s*0.12, s*0.1, '#fff');
      px(ctx, x+s*0.34, y+s*0.53+bob, s*0.05, s*0.06, '#1a1208');
      px(ctx, x+s*0.62, y+s*0.53+bob, s*0.05, s*0.06, '#1a1208');
      // mouth slightly open
      px(ctx, x+s*0.42, y+s*0.66+bob, s*0.16, s*0.06, '#5a3020');
      px(ctx, x+s*0.44, y+s*0.67+bob, s*0.12, s*0.02, '#fff');
    },
    WALKINGGHEAD(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t / 320) * 1.6;
      shadow(ctx, x+s/2, y+s-4, s*0.36, 5);
      // bright yellow round head
      px(ctx, x+s*0.14, y+s*0.18+bob, s*0.72, s*0.7, '#ffd83a');
      px(ctx, x+s*0.08, y+s*0.28+bob, s*0.06, s*0.5, '#ffd83a');
      px(ctx, x+s*0.86, y+s*0.28+bob, s*0.06, s*0.5, '#ffd83a');
      px(ctx, x+s*0.22, y+s*0.12+bob, s*0.56, s*0.06, '#ffd83a');
      px(ctx, x+s*0.22, y+s*0.88+bob, s*0.56, s*0.06, '#ffd83a');
      // shadow on yellow
      px(ctx, x+s*0.14, y+s*0.74+bob, s*0.72, s*0.14, '#e8b820');
      // huge white eyes
      px(ctx, x+s*0.2, y+s*0.26+bob, s*0.22, s*0.22, '#fff');
      px(ctx, x+s*0.58, y+s*0.26+bob, s*0.22, s*0.22, '#fff');
      // pupils
      px(ctx, x+s*0.28, y+s*0.34+bob, s*0.08, s*0.08, '#000');
      px(ctx, x+s*0.66, y+s*0.34+bob, s*0.08, s*0.08, '#000');
      // huge open mouth
      px(ctx, x+s*0.22, y+s*0.56+bob, s*0.56, s*0.26, '#c01838');
      // teeth band on top
      px(ctx, x+s*0.22, y+s*0.56+bob, s*0.56, s*0.06, '#fff');
      // tooth lines
      px(ctx, x+s*0.36, y+s*0.56+bob, s*0.02, s*0.06, '#d0d0d0');
      px(ctx, x+s*0.5, y+s*0.56+bob, s*0.02, s*0.06, '#d0d0d0');
      px(ctx, x+s*0.64, y+s*0.56+bob, s*0.02, s*0.06, '#d0d0d0');
    },
    RONIC(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t / 320) * 1.6;
      shadow(ctx, x+s/2, y+s-4, s*0.34, 5);
      // greyscale background
      px(ctx, x, y, s, s, '#1a1a1a');
      // grey-brown skin face
      px(ctx, x+s*0.26, y+s*0.32+bob, s*0.48, s*0.5, '#5a4a40');
      px(ctx, x+s*0.22, y+s*0.42+bob, s*0.06, s*0.3, '#5a4a40');
      px(ctx, x+s*0.72, y+s*0.42+bob, s*0.06, s*0.3, '#5a4a40');
      // dreadlock silhouette
      px(ctx, x+s*0.18, y+s*0.16+bob, s*0.64, s*0.22, '#0a0a0a');
      px(ctx, x+s*0.14, y+s*0.22+bob, s*0.08, s*0.3, '#0a0a0a');
      px(ctx, x+s*0.78, y+s*0.22+bob, s*0.08, s*0.3, '#0a0a0a');
      // dread coils as small dots
      px(ctx, x+s*0.22, y+s*0.18+bob, s*0.06, s*0.06, '#1a1a1a');
      px(ctx, x+s*0.36, y+s*0.14+bob, s*0.06, s*0.06, '#1a1a1a');
      px(ctx, x+s*0.54, y+s*0.14+bob, s*0.06, s*0.06, '#1a1a1a');
      px(ctx, x+s*0.7, y+s*0.18+bob, s*0.06, s*0.06, '#1a1a1a');
      // confident eyes
      px(ctx, x+s*0.34, y+s*0.48+bob, s*0.08, s*0.04, '#fff');
      px(ctx, x+s*0.58, y+s*0.48+bob, s*0.08, s*0.04, '#fff');
      px(ctx, x+s*0.36, y+s*0.48+bob, s*0.04, s*0.04, '#1a1208');
      px(ctx, x+s*0.6, y+s*0.48+bob, s*0.04, s*0.04, '#1a1208');
      // mouth
      px(ctx, x+s*0.42, y+s*0.66+bob, s*0.16, s*0.04, '#2a1a14');
      // hand near chin
      px(ctx, x+s*0.6, y+s*0.74+bob, s*0.18, s*0.14, '#5a4a40');
    },
    BLACK_JACK(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t / 320) * 1.6;
      shadow(ctx, x+s/2, y+s-4, s*0.34, 5);
      // dark purple bg
      px(ctx, x, y, s, s, '#2a1438');
      // branches in corners
      px(ctx, x, y+s*0.1, s*0.2, s*0.04, '#3a2820');
      px(ctx, x+s*0.18, y+s*0.04, s*0.04, s*0.18, '#3a2820');
      px(ctx, x+s*0.8, y+s*0.1, s*0.2, s*0.04, '#3a2820');
      px(ctx, x+s*0.78, y+s*0.04, s*0.04, s*0.18, '#3a2820');
      // silhouette head
      px(ctx, x+s*0.26, y+s*0.28+bob, s*0.48, s*0.54, '#1a0a24');
      px(ctx, x+s*0.22, y+s*0.4+bob, s*0.06, s*0.34, '#1a0a24');
      px(ctx, x+s*0.74, y+s*0.4+bob, s*0.06, s*0.34, '#1a0a24');
      // dim eyes
      px(ctx, x+s*0.36, y+s*0.5+bob, s*0.06, s*0.04, '#5a3060');
      px(ctx, x+s*0.58, y+s*0.5+bob, s*0.06, s*0.04, '#5a3060');
      // cherry blossoms scattered
      px(ctx, x+s*0.08, y+s*0.3, s*0.04, s*0.04, '#ff9ec0');
      px(ctx, x+s*0.12, y+s*0.5, s*0.03, s*0.03, '#ffb8d0');
      px(ctx, x+s*0.86, y+s*0.34, s*0.04, s*0.04, '#ff9ec0');
      px(ctx, x+s*0.9, y+s*0.56, s*0.03, s*0.03, '#ffb8d0');
      px(ctx, x+s*0.5, y+s*0.06, s*0.04, s*0.04, '#ff9ec0');
      px(ctx, x+s*0.3, y+s*0.92, s*0.03, s*0.03, '#ffb8d0');
      px(ctx, x+s*0.7, y+s*0.94, s*0.03, s*0.03, '#ff9ec0');
    },
    WILLIAM_GREGORY(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t / 320) * 1.6;
      shadow(ctx, x+s/2, y+s-4, s*0.34, 5);
      // dark moody bg
      px(ctx, x, y, s, s, '#181818');
      // weathered grey face
      px(ctx, x+s*0.24, y+s*0.3+bob, s*0.52, s*0.52, '#5a5048');
      px(ctx, x+s*0.2, y+s*0.42+bob, s*0.06, s*0.32, '#5a5048');
      px(ctx, x+s*0.76, y+s*0.42+bob, s*0.06, s*0.32, '#5a5048');
      // grey hair
      px(ctx, x+s*0.22, y+s*0.18+bob, s*0.56, s*0.16, '#7a7570');
      px(ctx, x+s*0.28, y+s*0.14+bob, s*0.44, s*0.06, '#7a7570');
      px(ctx, x+s*0.3, y+s*0.32+bob, s*0.4, s*0.04, '#6a6560');
      // dark serious eyes
      px(ctx, x+s*0.32, y+s*0.5+bob, s*0.1, s*0.04, '#1a1a1a');
      px(ctx, x+s*0.58, y+s*0.5+bob, s*0.1, s*0.04, '#1a1a1a');
      // grey beard
      px(ctx, x+s*0.3, y+s*0.66+bob, s*0.4, s*0.16, '#8a8580');
      px(ctx, x+s*0.34, y+s*0.78+bob, s*0.32, s*0.06, '#7a7570');
      // no smile (flat mouth line)
      px(ctx, x+s*0.42, y+s*0.66+bob, s*0.16, s*0.02, '#2a2018');
      // shadowing
      px(ctx, x+s*0.24, y+s*0.7+bob, s*0.06, s*0.1, '#403830');
      px(ctx, x+s*0.7, y+s*0.7+bob, s*0.06, s*0.1, '#403830');
    },
    LASERFIRE(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t / 320) * 1.6;
      const pulse = 0.7 + Math.sin(t / 280) * 0.3;
      shadow(ctx, x+s/2, y+s-4, s*0.34, 5);
      // dark bg
      px(ctx, x, y, s, s, '#1a1218');
      // cherry branches bg
      px(ctx, x+s*0.04, y+s*0.2, s*0.04, s*0.3, '#3a2820');
      px(ctx, x+s*0.88, y+s*0.16, s*0.04, s*0.34, '#3a2820');
      px(ctx, x+s*0.06, y+s*0.24, s*0.04, s*0.04, '#ff9ec0');
      px(ctx, x+s*0.06, y+s*0.42, s*0.04, s*0.04, '#ffb8d0');
      px(ctx, x+s*0.9, y+s*0.28, s*0.04, s*0.04, '#ff9ec0');
      px(ctx, x+s*0.9, y+s*0.46, s*0.04, s*0.04, '#ffb8d0');
      // pale face
      px(ctx, x+s*0.28, y+s*0.34+bob, s*0.44, s*0.5, '#f0e0d8');
      px(ctx, x+s*0.24, y+s*0.46+bob, s*0.06, s*0.3, '#f0e0d8');
      px(ctx, x+s*0.7, y+s*0.46+bob, s*0.06, s*0.3, '#f0e0d8');
      // black hair flopping forward
      px(ctx, x+s*0.22, y+s*0.18+bob, s*0.6, s*0.22, '#0a0810');
      px(ctx, x+s*0.18, y+s*0.26+bob, s*0.06, s*0.24, '#0a0810');
      px(ctx, x+s*0.76, y+s*0.26+bob, s*0.06, s*0.24, '#0a0810');
      // hair flop over forehead
      px(ctx, x+s*0.32, y+s*0.36+bob, s*0.18, s*0.06, '#0a0810');
      px(ctx, x+s*0.54, y+s*0.34+bob, s*0.16, s*0.04, '#0a0810');
      // mysterious eyes
      px(ctx, x+s*0.34, y+s*0.5+bob, s*0.08, s*0.04, '#2a2030');
      px(ctx, x+s*0.58, y+s*0.5+bob, s*0.08, s*0.04, '#2a2030');
      // small mouth
      px(ctx, x+s*0.46, y+s*0.7+bob, s*0.08, s*0.02, '#a06070');
      // online green dot pulsing
      ctx.fillStyle = `rgba(60, 220, 80, ${pulse})`;
      ctx.fillRect(x+s*0.78, y+s*0.78, s*0.1, s*0.1);
    },
    F503N(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t / 320) * 1.6;
      shadow(ctx, x+s/2, y+s-4, s*0.34, 5);
      // sepia bg
      px(ctx, x, y, s, s, '#4a3820');
      // wide brim hat
      px(ctx, x+s*0.08, y+s*0.26+bob, s*0.84, s*0.08, '#3a2810');
      px(ctx, x+s*0.18, y+s*0.1+bob, s*0.64, s*0.18, '#5a3818');
      px(ctx, x+s*0.18, y+s*0.22+bob, s*0.64, s*0.06, '#3a2810');
      // hat band
      px(ctx, x+s*0.18, y+s*0.24+bob, s*0.64, s*0.04, '#2a1808');
      // shadowed face under hat
      px(ctx, x+s*0.26, y+s*0.34+bob, s*0.48, s*0.46, '#7a5838');
      px(ctx, x+s*0.22, y+s*0.44+bob, s*0.06, s*0.3, '#7a5838');
      px(ctx, x+s*0.74, y+s*0.44+bob, s*0.06, s*0.3, '#7a5838');
      // shadow under hat brim
      px(ctx, x+s*0.26, y+s*0.34+bob, s*0.48, s*0.08, '#5a3820');
      // eyes in shadow
      px(ctx, x+s*0.34, y+s*0.48+bob, s*0.08, s*0.04, '#1a1008');
      px(ctx, x+s*0.58, y+s*0.48+bob, s*0.08, s*0.04, '#1a1008');
      // moustache
      px(ctx, x+s*0.36, y+s*0.66+bob, s*0.28, s*0.04, '#3a2810');
      // mouth
      px(ctx, x+s*0.44, y+s*0.72+bob, s*0.12, s*0.02, '#2a1808');
      // leather collar
      px(ctx, x+s*0.2, y+s*0.84+bob, s*0.6, s*0.12, '#5a3818');
      px(ctx, x+s*0.2, y+s*0.84+bob, s*0.6, s*0.04, '#3a2810');
    },
    DR_YEET(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t / 320) * 1.6;
      shadow(ctx, x+s/2, y+s-4, s*0.34, 5);
      // grey tabby face
      px(ctx, x+s*0.18, y+s*0.3+bob, s*0.64, s*0.58, '#8a8278');
      px(ctx, x+s*0.14, y+s*0.42+bob, s*0.06, s*0.34, '#8a8278');
      px(ctx, x+s*0.8, y+s*0.42+bob, s*0.06, s*0.34, '#8a8278');
      // ears
      px(ctx, x+s*0.16, y+s*0.16+bob, s*0.16, s*0.18, '#7a7268');
      px(ctx, x+s*0.68, y+s*0.16+bob, s*0.16, s*0.18, '#7a7268');
      px(ctx, x+s*0.2, y+s*0.22+bob, s*0.08, s*0.1, '#d090a0');
      px(ctx, x+s*0.72, y+s*0.22+bob, s*0.08, s*0.1, '#d090a0');
      // tabby stripes
      px(ctx, x+s*0.32, y+s*0.32+bob, s*0.04, s*0.1, '#5a5248');
      px(ctx, x+s*0.5, y+s*0.3+bob, s*0.04, s*0.08, '#5a5248');
      px(ctx, x+s*0.66, y+s*0.32+bob, s*0.04, s*0.1, '#5a5248');
      // huge yellow-green eyes (looking up dramatically)
      px(ctx, x+s*0.24, y+s*0.46+bob, s*0.18, s*0.16, '#e8e030');
      px(ctx, x+s*0.58, y+s*0.46+bob, s*0.18, s*0.16, '#e8e030');
      // pupils looking up
      px(ctx, x+s*0.3, y+s*0.46+bob, s*0.06, s*0.06, '#0a0a08');
      px(ctx, x+s*0.64, y+s*0.46+bob, s*0.06, s*0.06, '#0a0a08');
      // pink nose
      px(ctx, x+s*0.44, y+s*0.66+bob, s*0.12, s*0.06, '#e890a0');
      // small mouth
      px(ctx, x+s*0.42, y+s*0.74+bob, s*0.06, s*0.04, '#3a2820');
      px(ctx, x+s*0.52, y+s*0.74+bob, s*0.06, s*0.04, '#3a2820');
    },
    FFFOOST(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t / 320) * 1.6;
      shadow(ctx, x+s/2, y+s-4, s*0.34, 5);
      // pale pastel bg
      px(ctx, x, y, s, s, '#fde8f0');
      // long flowing pink hair (back)
      px(ctx, x+s*0.1, y+s*0.18+bob, s*0.8, s*0.7, '#ffa8d0');
      px(ctx, x+s*0.06, y+s*0.3+bob, s*0.06, s*0.5, '#ffa8d0');
      px(ctx, x+s*0.88, y+s*0.3+bob, s*0.06, s*0.5, '#ffa8d0');
      // pale face
      px(ctx, x+s*0.28, y+s*0.34+bob, s*0.44, s*0.46, '#fef0e8');
      px(ctx, x+s*0.24, y+s*0.46+bob, s*0.06, s*0.26, '#fef0e8');
      px(ctx, x+s*0.7, y+s*0.46+bob, s*0.06, s*0.26, '#fef0e8');
      // pink hair fringe
      px(ctx, x+s*0.24, y+s*0.28+bob, s*0.52, s*0.14, '#ff90c8');
      px(ctx, x+s*0.36, y+s*0.4+bob, s*0.08, s*0.06, '#ff90c8');
      px(ctx, x+s*0.56, y+s*0.4+bob, s*0.08, s*0.06, '#ff90c8');
      // bow/ribbon
      px(ctx, x+s*0.18, y+s*0.24+bob, s*0.1, s*0.08, '#ff5090');
      px(ctx, x+s*0.16, y+s*0.26+bob, s*0.04, s*0.04, '#ff5090');
      // big eyes
      px(ctx, x+s*0.32, y+s*0.5+bob, s*0.1, s*0.1, '#fff');
      px(ctx, x+s*0.58, y+s*0.5+bob, s*0.1, s*0.1, '#fff');
      px(ctx, x+s*0.34, y+s*0.52+bob, s*0.06, s*0.08, '#a050c0');
      px(ctx, x+s*0.6, y+s*0.52+bob, s*0.06, s*0.08, '#a050c0');
      px(ctx, x+s*0.36, y+s*0.54+bob, s*0.02, s*0.02, '#fff');
      px(ctx, x+s*0.62, y+s*0.54+bob, s*0.02, s*0.02, '#fff');
      // small mouth
      px(ctx, x+s*0.46, y+s*0.7+bob, s*0.08, s*0.02, '#e07090');
    },
    NOTAIM(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t / 320) * 1.6;
      shadow(ctx, x+s/2, y+s-4, s*0.34, 5);
      // dark fluffy blob
      px(ctx, x+s*0.18, y+s*0.22+bob, s*0.64, s*0.66, '#1a1208');
      px(ctx, x+s*0.14, y+s*0.34+bob, s*0.06, s*0.46, '#1a1208');
      px(ctx, x+s*0.8, y+s*0.34+bob, s*0.06, s*0.46, '#1a1208');
      px(ctx, x+s*0.26, y+s*0.16+bob, s*0.48, s*0.08, '#1a1208');
      // fuzzy texture (pseudo-random small dark rects)
      px(ctx, x+s*0.24, y+s*0.28+bob, s*0.04, s*0.04, '#2a2018');
      px(ctx, x+s*0.4, y+s*0.24+bob, s*0.04, s*0.04, '#2a2018');
      px(ctx, x+s*0.6, y+s*0.28+bob, s*0.04, s*0.04, '#2a2018');
      px(ctx, x+s*0.7, y+s*0.4+bob, s*0.04, s*0.04, '#2a2018');
      px(ctx, x+s*0.22, y+s*0.5+bob, s*0.04, s*0.04, '#2a2018');
      px(ctx, x+s*0.5, y+s*0.5+bob, s*0.04, s*0.04, '#0a0604');
      px(ctx, x+s*0.34, y+s*0.6+bob, s*0.04, s*0.04, '#2a2018');
      px(ctx, x+s*0.66, y+s*0.62+bob, s*0.04, s*0.04, '#0a0604');
      px(ctx, x+s*0.28, y+s*0.72+bob, s*0.04, s*0.04, '#2a2018');
      px(ctx, x+s*0.56, y+s*0.74+bob, s*0.04, s*0.04, '#2a2018');
      px(ctx, x+s*0.74, y+s*0.74+bob, s*0.04, s*0.04, '#0a0604');
      // very subtle eye glints
      px(ctx, x+s*0.36, y+s*0.46+bob, s*0.04, s*0.02, '#403830');
      px(ctx, x+s*0.6, y+s*0.46+bob, s*0.04, s*0.02, '#403830');
    },
    OANEXITY(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t / 320) * 1.6;
      shadow(ctx, x+s/2, y+s-4, s*0.34, 5);
      // pale skin round head
      px(ctx, x+s*0.22, y+s*0.22+bob, s*0.56, s*0.66, '#f0d4b8');
      px(ctx, x+s*0.18, y+s*0.32+bob, s*0.06, s*0.46, '#f0d4b8');
      px(ctx, x+s*0.78, y+s*0.32+bob, s*0.06, s*0.46, '#f0d4b8');
      px(ctx, x+s*0.3, y+s*0.16+bob, s*0.4, s*0.08, '#f0d4b8');
      // bald shine
      px(ctx, x+s*0.36, y+s*0.22+bob, s*0.16, s*0.04, '#ffe8c8');
      // round black-rim glasses (left)
      px(ctx, x+s*0.22, y+s*0.42+bob, s*0.22, s*0.04, '#0a0a0a');
      px(ctx, x+s*0.22, y+s*0.42+bob, s*0.04, s*0.18, '#0a0a0a');
      px(ctx, x+s*0.4, y+s*0.42+bob, s*0.04, s*0.18, '#0a0a0a');
      px(ctx, x+s*0.22, y+s*0.56+bob, s*0.22, s*0.04, '#0a0a0a');
      px(ctx, x+s*0.26, y+s*0.46+bob, s*0.14, s*0.1, '#d8e8f0');
      // round glasses (right)
      px(ctx, x+s*0.56, y+s*0.42+bob, s*0.22, s*0.04, '#0a0a0a');
      px(ctx, x+s*0.56, y+s*0.42+bob, s*0.04, s*0.18, '#0a0a0a');
      px(ctx, x+s*0.74, y+s*0.42+bob, s*0.04, s*0.18, '#0a0a0a');
      px(ctx, x+s*0.56, y+s*0.56+bob, s*0.22, s*0.04, '#0a0a0a');
      px(ctx, x+s*0.6, y+s*0.46+bob, s*0.14, s*0.1, '#d8e8f0');
      // bridge
      px(ctx, x+s*0.44, y+s*0.46+bob, s*0.12, s*0.04, '#0a0a0a');
      // tiny eyes behind glasses
      px(ctx, x+s*0.32, y+s*0.49+bob, s*0.04, s*0.04, '#0a0a0a');
      px(ctx, x+s*0.64, y+s*0.49+bob, s*0.04, s*0.04, '#0a0a0a');
      // small neutral mouth
      px(ctx, x+s*0.44, y+s*0.74+bob, s*0.12, s*0.02, '#8a5040');
    },
    EVAN(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t / 320) * 1.6;
      shadow(ctx, x+s/2, y+s-4, s*0.34, 5);
      // soft bg
      px(ctx, x, y, s, s, '#2a3020');
      // green leaves around
      px(ctx, x+s*0.04, y+s*0.16, s*0.14, s*0.06, '#3a8030');
      px(ctx, x+s*0.06, y+s*0.22, s*0.1, s*0.04, '#4a9038');
      px(ctx, x+s*0.82, y+s*0.7, s*0.14, s*0.06, '#3a8030');
      px(ctx, x+s*0.84, y+s*0.76, s*0.1, s*0.04, '#4a9038');
      px(ctx, x+s*0.04, y+s*0.78, s*0.12, s*0.06, '#3a8030');
      // bright pink hair (flowing)
      px(ctx, x+s*0.16, y+s*0.28+bob, s*0.7, s*0.6, '#ff60b0');
      px(ctx, x+s*0.1, y+s*0.4+bob, s*0.08, s*0.4, '#ff60b0');
      px(ctx, x+s*0.84, y+s*0.4+bob, s*0.08, s*0.4, '#ff60b0');
      // hair shine
      px(ctx, x+s*0.24, y+s*0.32+bob, s*0.4, s*0.04, '#ff90c8');
      // pale face
      px(ctx, x+s*0.3, y+s*0.4+bob, s*0.4, s*0.4, '#fff0e0');
      px(ctx, x+s*0.26, y+s*0.5+bob, s*0.06, s*0.22, '#fff0e0');
      px(ctx, x+s*0.68, y+s*0.5+bob, s*0.06, s*0.22, '#fff0e0');
      // pink fringe
      px(ctx, x+s*0.3, y+s*0.4+bob, s*0.4, s*0.08, '#ff60b0');
      // big eyes (lying down vibe - half closed)
      px(ctx, x+s*0.34, y+s*0.54+bob, s*0.1, s*0.04, '#fff');
      px(ctx, x+s*0.56, y+s*0.54+bob, s*0.1, s*0.04, '#fff');
      px(ctx, x+s*0.36, y+s*0.54+bob, s*0.06, s*0.04, '#c84090');
      px(ctx, x+s*0.58, y+s*0.54+bob, s*0.06, s*0.04, '#c84090');
      // mouth
      px(ctx, x+s*0.46, y+s*0.7+bob, s*0.08, s*0.02, '#d05080');
    },
    ZYPHON(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t / 320) * 1.6;
      shadow(ctx, x+s/2, y+s-4, s*0.34, 5);
      // dark moody bg
      px(ctx, x, y, s, s, '#101010');
      // ears up
      px(ctx, x+s*0.18, y+s*0.14+bob, s*0.16, s*0.2, '#3a2818');
      px(ctx, x+s*0.66, y+s*0.14+bob, s*0.16, s*0.2, '#3a2818');
      px(ctx, x+s*0.22, y+s*0.2+bob, s*0.08, s*0.1, '#1a1008');
      px(ctx, x+s*0.7, y+s*0.2+bob, s*0.08, s*0.1, '#1a1008');
      // brown/black dog face
      px(ctx, x+s*0.22, y+s*0.3+bob, s*0.56, s*0.54, '#3a2818');
      px(ctx, x+s*0.18, y+s*0.42+bob, s*0.06, s*0.34, '#3a2818');
      px(ctx, x+s*0.78, y+s*0.42+bob, s*0.06, s*0.34, '#3a2818');
      // dramatic shadow/lighting
      px(ctx, x+s*0.22, y+s*0.3+bob, s*0.28, s*0.5, '#1a1008');
      // muzzle
      px(ctx, x+s*0.34, y+s*0.62+bob, s*0.32, s*0.22, '#2a1c10');
      // nose
      px(ctx, x+s*0.44, y+s*0.66+bob, s*0.12, s*0.08, '#0a0604');
      // eyes barely visible (small glints)
      px(ctx, x+s*0.32, y+s*0.5+bob, s*0.04, s*0.03, '#a08060');
      px(ctx, x+s*0.64, y+s*0.5+bob, s*0.04, s*0.03, '#a08060');
      // mouth
      px(ctx, x+s*0.42, y+s*0.78+bob, s*0.16, s*0.02, '#0a0604');
    },
    SAPWN(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t / 320) * 1.6;
      const drip = Math.sin(t / 400) * 2;
      shadow(ctx, x+s/2, y+s-4, s*0.34, 5);
      // red drippy bg
      px(ctx, x, y, s, s, '#3a0810');
      // drips
      px(ctx, x+s*0.1, y, s*0.04, s*0.4+drip, '#a01828');
      px(ctx, x+s*0.3, y, s*0.04, s*0.3+drip, '#a01828');
      px(ctx, x+s*0.5, y, s*0.04, s*0.5+drip, '#a01828');
      px(ctx, x+s*0.7, y, s*0.04, s*0.34+drip, '#a01828');
      px(ctx, x+s*0.86, y, s*0.04, s*0.42+drip, '#a01828');
      // gold hourglass mid layer
      px(ctx, x+s*0.34, y+s*0.18+bob, s*0.32, s*0.04, '#e8c040');
      px(ctx, x+s*0.34, y+s*0.78+bob, s*0.32, s*0.04, '#e8c040');
      px(ctx, x+s*0.36, y+s*0.22+bob, s*0.28, s*0.14, '#f0d860');
      px(ctx, x+s*0.42, y+s*0.36+bob, s*0.16, s*0.04, '#c89830');
      px(ctx, x+s*0.46, y+s*0.4+bob, s*0.08, s*0.16, '#c89830');
      px(ctx, x+s*0.42, y+s*0.56+bob, s*0.16, s*0.04, '#c89830');
      px(ctx, x+s*0.36, y+s*0.6+bob, s*0.28, s*0.18, '#f0d860');
      // anime girl face in front
      px(ctx, x+s*0.3, y+s*0.36+bob, s*0.4, s*0.42, '#fde8d8');
      // dark hair
      px(ctx, x+s*0.26, y+s*0.3+bob, s*0.48, s*0.12, '#1a0a14');
      px(ctx, x+s*0.24, y+s*0.38+bob, s*0.06, s*0.3, '#1a0a14');
      px(ctx, x+s*0.7, y+s*0.38+bob, s*0.06, s*0.3, '#1a0a14');
      // big eyes
      px(ctx, x+s*0.32, y+s*0.5+bob, s*0.1, s*0.08, '#fff');
      px(ctx, x+s*0.58, y+s*0.5+bob, s*0.1, s*0.08, '#fff');
      px(ctx, x+s*0.34, y+s*0.52+bob, s*0.06, s*0.06, '#a01838');
      px(ctx, x+s*0.6, y+s*0.52+bob, s*0.06, s*0.06, '#a01838');
      // mouth
      px(ctx, x+s*0.44, y+s*0.7+bob, s*0.12, s*0.02, '#c04060');
    },
    SNAIL4(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t / 320) * 1.6;
      const zfloat = Math.sin(t / 500) * 2;
      shadow(ctx, x+s/2, y+s-4, s*0.34, 5);
      // soft pink bg
      px(ctx, x, y, s, s, '#ffd8e8');
      // crescent moon
      px(ctx, x+s*0.78, y+s*0.12, s*0.12, s*0.12, '#fff8c0');
      px(ctx, x+s*0.82, y+s*0.14, s*0.08, s*0.08, '#ffd8e8');
      // pink hair
      px(ctx, x+s*0.16, y+s*0.22+bob, s*0.7, s*0.66, '#ffa0c8');
      px(ctx, x+s*0.1, y+s*0.34+bob, s*0.08, s*0.5, '#ffa0c8');
      px(ctx, x+s*0.84, y+s*0.34+bob, s*0.08, s*0.5, '#ffa0c8');
      // hair shine
      px(ctx, x+s*0.28, y+s*0.26+bob, s*0.3, s*0.04, '#ffc0d8');
      // pale face
      px(ctx, x+s*0.3, y+s*0.4+bob, s*0.4, s*0.4, '#fff4ec');
      px(ctx, x+s*0.26, y+s*0.5+bob, s*0.06, s*0.22, '#fff4ec');
      px(ctx, x+s*0.68, y+s*0.5+bob, s*0.06, s*0.22, '#fff4ec');
      // pink fringe
      px(ctx, x+s*0.3, y+s*0.4+bob, s*0.4, s*0.06, '#ffa0c8');
      // sleepy half-closed eyes (curves)
      px(ctx, x+s*0.32, y+s*0.56+bob, s*0.12, s*0.02, '#a04070');
      px(ctx, x+s*0.32, y+s*0.58+bob, s*0.04, s*0.02, '#a04070');
      px(ctx, x+s*0.4, y+s*0.58+bob, s*0.04, s*0.02, '#a04070');
      px(ctx, x+s*0.56, y+s*0.56+bob, s*0.12, s*0.02, '#a04070');
      px(ctx, x+s*0.56, y+s*0.58+bob, s*0.04, s*0.02, '#a04070');
      px(ctx, x+s*0.64, y+s*0.58+bob, s*0.04, s*0.02, '#a04070');
      // small drowsy mouth
      px(ctx, x+s*0.46, y+s*0.7+bob, s*0.08, s*0.02, '#c06090');
      // floating Z's
      px(ctx, x+s*0.16+zfloat, y+s*0.22+zfloat, s*0.08, s*0.02, '#7050a0');
      px(ctx, x+s*0.18+zfloat, y+s*0.24+zfloat, s*0.04, s*0.02, '#7050a0');
      px(ctx, x+s*0.16+zfloat, y+s*0.26+zfloat, s*0.08, s*0.02, '#7050a0');
      px(ctx, x+s*0.08-zfloat, y+s*0.34-zfloat, s*0.06, s*0.02, '#7050a0');
      px(ctx, x+s*0.08-zfloat, y+s*0.38-zfloat, s*0.06, s*0.02, '#7050a0');
    },

    ZENI(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t*0.003) * (s*0.012);
      shadow(ctx, x+s/2, y+s-4, s*0.34, 5);
      // purple outfit
      ctx.fillStyle = "#a070c8";
      ctx.beginPath();
      ctx.ellipse(x+s*0.5, y+s*0.74+bob, s*0.30, s*0.22, 0, 0, Math.PI*2);
      ctx.fill();
      // black choker
      ctx.fillStyle = "#1a1a1a";
      ctx.fillRect(x+s*0.34, y+s*0.58+bob, s*0.32, s*0.04);
      // arms
      px(ctx, x+s*0.18, y+s*0.62+bob, s*0.10, s*0.20, "#a070c8");
      px(ctx, x+s*0.72, y+s*0.62+bob, s*0.10, s*0.20, "#a070c8");
      // long brown/lavender hair
      ctx.fillStyle = "#a08caa";
      ctx.beginPath();
      ctx.moveTo(x+s*0.28, y+s*0.30+bob);
      ctx.quadraticCurveTo(x+s*0.18, y+s*0.60+bob, x+s*0.30, y+s*0.74+bob);
      ctx.lineTo(x+s*0.38, y+s*0.50+bob);
      ctx.closePath();
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(x+s*0.72, y+s*0.30+bob);
      ctx.quadraticCurveTo(x+s*0.82, y+s*0.60+bob, x+s*0.70, y+s*0.74+bob);
      ctx.lineTo(x+s*0.62, y+s*0.50+bob);
      ctx.closePath();
      ctx.fill();
      // face
      ctx.fillStyle = "#ffe0e0";
      ctx.beginPath();
      ctx.ellipse(x+s*0.5, y+s*0.42+bob, s*0.18, s*0.20, 0, 0, Math.PI*2);
      ctx.fill();
      // big bangs
      ctx.fillStyle = "#a08caa";
      px(ctx, x+s*0.30, y+s*0.22+bob, s*0.40, s*0.12, "#a08caa");
      // small horns
      ctx.fillStyle = "#5a3868";
      ctx.beginPath();
      ctx.moveTo(x+s*0.36, y+s*0.20+bob);
      ctx.quadraticCurveTo(x+s*0.30, y+s*0.10+bob, x+s*0.34, y+s*0.04+bob);
      ctx.lineTo(x+s*0.40, y+s*0.18+bob);
      ctx.closePath();
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(x+s*0.64, y+s*0.20+bob);
      ctx.quadraticCurveTo(x+s*0.70, y+s*0.10+bob, x+s*0.66, y+s*0.04+bob);
      ctx.lineTo(x+s*0.60, y+s*0.18+bob);
      ctx.closePath();
      ctx.fill();
      // horn highlights
      ctx.fillStyle = "#a070b8";
      ctx.fillRect(x+s*0.36, y+s*0.10+bob, s*0.02, s*0.04);
      ctx.fillRect(x+s*0.62, y+s*0.10+bob, s*0.02, s*0.04);
      // pink cheek blush
      ctx.fillStyle = "rgba(255,140,180,0.6)";
      ctx.beginPath(); ctx.arc(x+s*0.34, y+s*0.46+bob, s*0.030, 0, Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(x+s*0.66, y+s*0.46+bob, s*0.030, 0, Math.PI*2); ctx.fill();
      // :3 eyes (upward arcs)
      ctx.strokeStyle = "#1a1a1a";
      ctx.lineWidth = Math.max(2, s*0.014);
      ctx.beginPath();
      ctx.arc(x+s*0.42, y+s*0.44+bob, s*0.030, Math.PI*1.1, Math.PI*1.9);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(x+s*0.58, y+s*0.44+bob, s*0.030, Math.PI*1.1, Math.PI*1.9);
      ctx.stroke();
      // W mouth
      ctx.lineWidth = Math.max(1, s*0.012);
      ctx.beginPath();
      ctx.moveTo(x+s*0.44, y+s*0.50+bob);
      ctx.lineTo(x+s*0.47, y+s*0.54+bob);
      ctx.lineTo(x+s*0.50, y+s*0.50+bob);
      ctx.lineTo(x+s*0.53, y+s*0.54+bob);
      ctx.lineTo(x+s*0.56, y+s*0.50+bob);
      ctx.stroke();
          // === auto-flourish: identifier overlay ===
      try {
        ctx.save();
        const __fb = Math.sin(t*0.0035) * (s*0.008);
        // Tier-glow username label (below sprite)
        ctx.font = `bold ${Math.max(7, Math.floor(s*0.060))}px monospace`;
        ctx.textAlign = "center";
        ctx.fillStyle = "rgba(0,0,0,0.55)";
        ctx.fillRect(x+s*0.10, y+s*0.965, s*0.80, s*0.075);
        ctx.fillStyle = "#7fdc6a";
        ctx.shadowColor = "#7fdc6a";
        ctx.shadowBlur = Math.max(2, s*0.012);
        ctx.fillText("Zeni", x+s*0.50, y+s*1.020);
        ctx.shadowBlur = 0;
        // Floating role badge tag (top-right corner)
        const __bx = x+s*0.66, __by = y+s*0.05+__fb;
        const __bw = s*0.32, __bh = s*0.10;
        ctx.fillStyle = "#a07ad8";
        ctx.fillRect(__bx, __by, __bw, __bh);
        ctx.strokeStyle = "#7fdc6a";
        ctx.lineWidth = Math.max(1, s*0.008);
        ctx.strokeRect(__bx, __by, __bw, __bh);
        ctx.fillStyle = "#0a0a14";
        ctx.font = `bold ${Math.max(7, Math.floor(s*0.058))}px monospace`;
        ctx.fillText(":3", __bx+__bw/2, __by+__bh*0.74);
        ctx.textAlign = "start";
        ctx.fillStyle = "#3a1a5a";
        ctx.beginPath();
        ctx.moveTo(x+s*0.06-s*0.020, y+s*0.10+s*0.015);
        ctx.lineTo(x+s*0.06-s*0.012, y+s*0.10-s*0.018);
        ctx.lineTo(x+s*0.06-s*0.005, y+s*0.10+s*0.005);
        ctx.closePath(); ctx.fill();
        ctx.beginPath();
        ctx.moveTo(x+s*0.06+s*0.020, y+s*0.10+s*0.015);
        ctx.lineTo(x+s*0.06+s*0.012, y+s*0.10-s*0.018);
        ctx.lineTo(x+s*0.06+s*0.005, y+s*0.10+s*0.005);
        ctx.closePath(); ctx.fill();
        ctx.restore();
      } catch(__e) { /* flourish fail-safe */ }
},
    ZENSER48(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t / 320) * 1.6;
      shadow(ctx, x+s/2, y+s-4, s*0.34, 5);
      // misty grey background
      px(ctx, x+2, y+2, s-4, s-4, '#7d8590');
      px(ctx, x+6, y+10, 4, 3, '#9aa3ad');
      px(ctx, x+s-14, y+18, 5, 2, '#9aa3ad');
      px(ctx, x+10, y+s-20, 6, 2, '#9aa3ad');
      // umbrella canopy (clear/grey)
      const cy = y + 14 + bob;
      px(ctx, x+s/2-14, cy, 28, 3, '#c0c8d0');
      px(ctx, x+s/2-12, cy+3, 24, 2, '#aab2bc');
      px(ctx, x+s/2-9, cy-3, 18, 3, '#d8dde3');
      // umbrella ribs
      px(ctx, x+s/2-7, cy+5, 1, 2, '#5a6068');
      px(ctx, x+s/2+6, cy+5, 1, 2, '#5a6068');
      // pole
      px(ctx, x+s/2, cy+5, 1, 18, '#3a3f45');
      // figure - dark coat
      px(ctx, x+s/2-5, y+30+bob, 10, 16, '#1a1d22');
      // pale face
      px(ctx, x+s/2-3, y+26+bob, 6, 5, '#e8d8c8');
      px(ctx, x+s/2-3, y+22+bob, 6, 4, '#2a2520');
      // tiny eyes
      px(ctx, x+s/2-2, y+28+bob, 1, 1, '#1a1a1a');
      px(ctx, x+s/2+1, y+28+bob, 1, 1, '#1a1a1a');
    },
    ADOT(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t / 320) * 1.4;
      shadow(ctx, x+s/2, y+s-4, s*0.34, 5);
      // dark side-lit background
      px(ctx, x+2, y+2, s-4, s-4, '#15171c');
      px(ctx, x+s-14, y+4, 12, s-8, '#22252c');
      // hair - black flopping
      px(ctx, x+12, y+8+bob, s-24, 18, '#0a0a10');
      px(ctx, x+10, y+14+bob, 8, 14, '#0a0a10');
      px(ctx, x+s-18, y+14+bob, 8, 16, '#0a0a10');
      // hair flop over eye
      px(ctx, x+18, y+18+bob, 14, 6, '#15151a');
      // pale face
      px(ctx, x+16, y+22+bob, s-32, 22, '#d8c2b0');
      // shadow on one side
      px(ctx, x+16, y+22+bob, 6, 22, '#9a8474');
      // dark eyes (left covered by hair)
      px(ctx, x+s-26, y+30+bob, 3, 3, '#1a1a22');
      // mouth neutral
      px(ctx, x+26, y+38+bob, 8, 1, '#5a3830');
      // neck/shoulders dark
      px(ctx, x+18, y+44+bob, s-36, 18, '#0a0a12');
    },
    IMOH(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t / 320) * 1.6;
      const glow = (Math.sin(t / 200) + 1) / 2;
      shadow(ctx, x+s/2, y+s-4, s*0.34, 5);
      // dark fog background
      px(ctx, x+2, y+2, s-4, s-4, '#1a0d22');
      px(ctx, x+6, y+s-14, s-12, 4, '#2a1a35');
      px(ctx, x+10, y+s-8, s-20, 2, '#3a2545');
      // hood silhouette
      px(ctx, x+12, y+10+bob, s-24, 12, '#2a1635');
      px(ctx, x+8, y+18+bob, s-16, 24, '#2a1635');
      px(ctx, x+14, y+42+bob, s-28, 14, '#2a1635');
      // inner shadow of hood
      px(ctx, x+18, y+22+bob, s-36, 18, '#0a0512');
      // glowing purple eyes
      const eg = `rgba(190,120,255,${0.7 + glow*0.3})`;
      px(ctx, x+22, y+28+bob, 5, 3, eg);
      px(ctx, x+s-27, y+28+bob, 5, 3, eg);
      px(ctx, x+23, y+29+bob, 3, 1, '#ffffff');
      px(ctx, x+s-26, y+29+bob, 3, 1, '#ffffff');
      // pixelated tag
      px(ctx, x+4, y+s-6, 6, 3, '#7a55a5');
    },
    DOSEY(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t / 320) * 1.4;
      shadow(ctx, x+s/2, y+s-4, s*0.34, 5);
      // background warm
      px(ctx, x+2, y+2, s-4, s-4, '#3a3028');
      // red Supreme cap
      px(ctx, x+10, y+10+bob, s-20, 12, '#d8202a');
      px(ctx, x+8, y+12+bob, 4, 8, '#a01820');
      px(ctx, x+s-12, y+12+bob, 4, 8, '#a01820');
      // brim
      px(ctx, x+8, y+22+bob, s-16, 4, '#1a1010');
      // white "Supreme" hint
      px(ctx, x+18, y+15+bob, 28, 3, '#ffffff');
      px(ctx, x+20, y+16+bob, 2, 1, '#d8202a');
      px(ctx, x+26, y+16+bob, 2, 1, '#d8202a');
      px(ctx, x+34, y+16+bob, 2, 1, '#d8202a');
      // brown skin face
      px(ctx, x+14, y+26+bob, s-28, 24, '#7a4d2e');
      // shadow under brim
      px(ctx, x+14, y+26+bob, s-28, 3, '#4a2d1c');
      // eyes
      px(ctx, x+22, y+34+bob, 3, 3, '#1a1208');
      px(ctx, x+s-25, y+34+bob, 3, 3, '#1a1208');
      // mouth neutral
      px(ctx, x+26, y+44+bob, 12, 1, '#3a1a10');
    },
    EDWIN(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t / 320) * 1.6;
      shadow(ctx, x+s/2, y+s-4, s*0.34, 5);
      // soft background
      px(ctx, x+2, y+2, s-4, s-4, '#e8e2dc');
      // floppy ears
      px(ctx, x+6, y+18+bob, 10, 18, '#fafafa');
      px(ctx, x+s-16, y+18+bob, 10, 18, '#fafafa');
      px(ctx, x+8, y+28+bob, 6, 8, '#e8e2dc');
      // round fluffy white head
      px(ctx, x+12, y+14+bob, s-24, s-26, '#fafafa');
      px(ctx, x+10, y+22+bob, 4, 22, '#fafafa');
      px(ctx, x+s-14, y+22+bob, 4, 22, '#fafafa');
      // fluff bumps
      px(ctx, x+18, y+12+bob, 4, 4, '#fafafa');
      px(ctx, x+s-22, y+12+bob, 4, 4, '#fafafa');
      // small black eyes
      px(ctx, x+22, y+32+bob, 4, 4, '#0a0a0a');
      px(ctx, x+s-26, y+32+bob, 4, 4, '#0a0a0a');
      px(ctx, x+23, y+32+bob, 1, 1, '#ffffff');
      px(ctx, x+s-25, y+32+bob, 1, 1, '#ffffff');
      // small black nose
      px(ctx, x+s/2-2, y+40+bob, 4, 3, '#1a1010');
      // pink tongue
      px(ctx, x+s/2-2, y+44+bob, 4, 4, '#ff8aa0');
      px(ctx, x+s/2-1, y+45+bob, 1, 3, '#d85a78');
    },
    BYTE(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t / 320) * 1.4;
      const glow = (Math.sin(t / 180) + 1) / 2;
      shadow(ctx, x+s/2, y+s-4, s*0.34, 5);
      // dark cyber background
      px(ctx, x+2, y+2, s-4, s-4, '#0a0c12');
      // angular grey helmet
      px(ctx, x+12, y+8+bob, s-24, 6, '#3a3f48');
      px(ctx, x+8, y+12+bob, s-16, 30, '#4a505a');
      px(ctx, x+10, y+42+bob, s-20, 10, '#3a3f48');
      // jagged top
      px(ctx, x+14, y+6+bob, 4, 4, '#5a606a');
      px(ctx, x+s-18, y+6+bob, 4, 4, '#5a606a');
      // jaw plate
      px(ctx, x+18, y+44+bob, s-36, 6, '#2a2f38');
      // glowing red slit eyes
      const eg = `rgba(255,80,40,${0.7 + glow*0.3})`;
      px(ctx, x+16, y+24+bob, 10, 2, eg);
      px(ctx, x+s-26, y+24+bob, 10, 2, eg);
      px(ctx, x+18, y+24+bob, 6, 1, '#ffd0a0');
      px(ctx, x+s-24, y+24+bob, 6, 1, '#ffd0a0');
      // panel lines
      px(ctx, x+s/2-1, y+28+bob, 2, 14, '#22262e');
      px(ctx, x+12, y+34+bob, s-24, 1, '#22262e');
      // neon accent
      px(ctx, x+s-12, y+s-14, 4, 6, '#ff5028');
    },
    CALICSIZED(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t / 320) * 1.5;
      const glow = (Math.sin(t / 220) + 1) / 2;
      shadow(ctx, x+s/2, y+s-4, s*0.34, 5);
      // background
      px(ctx, x+2, y+2, s-4, s-4, '#0a1530');
      // ears pointing up
      px(ctx, x+10, y+6+bob, 6, 12, '#2a8aff');
      px(ctx, x+s-16, y+6+bob, 6, 12, '#2a8aff');
      px(ctx, x+11, y+10+bob, 3, 6, '#5aaaff');
      px(ctx, x+s-15, y+10+bob, 3, 6, '#5aaaff');
      // bright blue cat head
      px(ctx, x+10, y+14+bob, s-20, s-26, '#3a9aff');
      // highlights
      px(ctx, x+14, y+18+bob, 6, 4, '#7accff');
      px(ctx, x+s-22, y+18+bob, 6, 4, '#7accff');
      // glowing cyan eyes
      const eg = `rgba(220,255,255,${0.8 + glow*0.2})`;
      px(ctx, x+18, y+28+bob, 8, 8, eg);
      px(ctx, x+s-26, y+28+bob, 8, 8, eg);
      px(ctx, x+20, y+30+bob, 4, 4, '#0a8aff');
      px(ctx, x+s-24, y+30+bob, 4, 4, '#0a8aff');
      // fierce mouth
      px(ctx, x+s/2-1, y+44+bob, 2, 2, '#1a3060');
      px(ctx, x+s/2-4, y+46+bob, 8, 1, '#1a3060');
      // mace tag
      px(ctx, x+4, y+s-8, 6, 4, '#aabbdd');
    },
    BUTTKUN(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t / 320) * 1.2;
      shadow(ctx, x+s/2, y+s-4, s*0.34, 5);
      // gradient sky to deeper blue
      const grad = ctx.createLinearGradient(x, y, x, y+s);
      grad.addColorStop(0, '#a8d8f0');
      grad.addColorStop(0.5, '#5a9ad8');
      grad.addColorStop(1, '#1a3a78');
      ctx.fillStyle = grad;
      ctx.fillRect(x+2, y+2, s-4, s-4);
      // horizon line
      px(ctx, x+2, y+s/2, s-4, 1, '#3a6aa8');
      // tiny pixel character at bottom
      px(ctx, x+s/2-2, y+s-14+bob, 4, 6, '#2a2030');
      px(ctx, x+s/2-1, y+s-16+bob, 2, 2, '#e8c8a0');
      // GIANT BTR text hint
      px(ctx, x+8, y+10, 18, 3, '#ffffff');
      px(ctx, x+8, y+15, 12, 2, '#ffffff');
      // small clouds
      px(ctx, x+10, y+22+bob, 8, 2, '#d8e8f8');
      px(ctx, x+s-22, y+30-bob, 12, 2, '#d8e8f8');
    },
    BLU(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t / 320) * 1.4;
      shadow(ctx, x+s/2, y+s-4, s*0.34, 5);
      // dark background fading edges
      px(ctx, x+2, y+2, s-4, s-4, '#1a1a22');
      px(ctx, x+2, y+2, s-4, 4, '#2a2a35');
      px(ctx, x+2, y+s-6, s-4, 4, '#2a2a35');
      // pointed ears
      px(ctx, x+10, y+8+bob, 6, 10, '#0a0a0a');
      px(ctx, x+s-16, y+8+bob, 6, 10, '#0a0a0a');
      px(ctx, x+12, y+12+bob, 2, 4, '#2a2030');
      px(ctx, x+s-14, y+12+bob, 2, 4, '#2a2030');
      // black cat head silhouette
      px(ctx, x+10, y+16+bob, s-20, s-26, '#0a0a0a');
      // small white dot eyes
      px(ctx, x+22, y+30+bob, 3, 3, '#ffffff');
      px(ctx, x+s-25, y+30+bob, 3, 3, '#ffffff');
      // tiny mouth
      px(ctx, x+s/2-1, y+40+bob, 2, 1, '#3a3a45');
      // cute sticker
      px(ctx, x+s-14, y+s-12, 10, 6, '#ff8aa8');
      px(ctx, x+s-12, y+s-10, 2, 1, '#ffffff');
    },
    BENJI_YT(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t / 320) * 1.4;
      shadow(ctx, x+s/2, y+s-4, s*0.34, 5);
      // pure black background
      px(ctx, x+2, y+2, s-4, s-4, '#000000');
      // white round skull face
      px(ctx, x+12, y+10+bob, s-24, 4, '#f0f0e8');
      px(ctx, x+10, y+14+bob, s-20, 32, '#f0f0e8');
      px(ctx, x+12, y+46+bob, s-24, 4, '#f0f0e8');
      // jaw
      px(ctx, x+16, y+50+bob, s-32, 4, '#e0e0d8');
      // hollow black eye sockets
      px(ctx, x+16, y+22+bob, 10, 8, '#000000');
      px(ctx, x+s-26, y+22+bob, 10, 8, '#000000');
      // nose hole (none, but small triangle)
      px(ctx, x+s/2-2, y+34+bob, 4, 3, '#000000');
      // teeth grin row
      const ty = y + 42 + bob;
      px(ctx, x+18, ty, 2, 4, '#f0f0e8');
      px(ctx, x+22, ty, 2, 4, '#f0f0e8');
      px(ctx, x+26, ty, 2, 4, '#f0f0e8');
      px(ctx, x+30, ty, 2, 4, '#f0f0e8');
      px(ctx, x+34, ty, 2, 4, '#f0f0e8');
      px(ctx, x+38, ty, 2, 4, '#f0f0e8');
      px(ctx, x+42, ty, 2, 4, '#f0f0e8');
      // teeth gap line
      px(ctx, x+16, ty-1, s-32, 1, '#000000');
    },
    ALRAYS(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t / 320) * 1.5;
      shadow(ctx, x+s/2, y+s-4, s*0.34, 5);
      // warm orange background
      px(ctx, x+2, y+2, s-4, s-4, '#3a1a18');
      // cat ears up
      px(ctx, x+10, y+4+bob, 8, 12, '#e85020');
      px(ctx, x+s-18, y+4+bob, 8, 12, '#e85020');
      px(ctx, x+12, y+8+bob, 4, 6, '#ff8050');
      px(ctx, x+s-16, y+8+bob, 4, 6, '#ff8050');
      // orange/red hair
      px(ctx, x+8, y+12+bob, s-16, 14, '#e85020');
      px(ctx, x+10, y+22+bob, s-20, 4, '#ff7048');
      // pale face
      px(ctx, x+14, y+22+bob, s-28, 26, '#ffd8b8');
      // hair bangs
      px(ctx, x+14, y+22+bob, s-28, 5, '#e85020');
      px(ctx, x+18, y+24+bob, 4, 6, '#e85020');
      px(ctx, x+s-22, y+24+bob, 4, 6, '#e85020');
      // big anime eyes
      px(ctx, x+18, y+30+bob, 6, 7, '#ffffff');
      px(ctx, x+s-24, y+30+bob, 6, 7, '#ffffff');
      px(ctx, x+19, y+31+bob, 4, 5, '#a83018');
      px(ctx, x+s-23, y+31+bob, 4, 5, '#a83018');
      px(ctx, x+20, y+32+bob, 1, 1, '#ffffff');
      px(ctx, x+s-22, y+32+bob, 1, 1, '#ffffff');
      // freckles
      px(ctx, x+24, y+40+bob, 1, 1, '#a85020');
      px(ctx, x+s-26, y+40+bob, 1, 1, '#a85020');
      // mouth
      px(ctx, x+s/2-1, y+44+bob, 3, 1, '#a02020');
    },
    _1DAM(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t / 320) * 1.4;
      shadow(ctx, x+s/2, y+s-4, s*0.34, 5);
      // dark moody background
      px(ctx, x+2, y+2, s-4, s-4, '#15182a');
      // crescent moon in background
      px(ctx, x+s-18, y+8, 10, 10, '#e8e0c0');
      px(ctx, x+s-15, y+10, 8, 6, '#15182a');
      // dark hair flowing
      px(ctx, x+10, y+10+bob, s-20, 12, '#0a0a18');
      px(ctx, x+8, y+18+bob, 8, 22, '#0a0a18');
      px(ctx, x+s-16, y+18+bob, 8, 22, '#0a0a18');
      // hair bangs over eyes
      px(ctx, x+14, y+20+bob, s-28, 8, '#0a0a18');
      // pale face
      px(ctx, x+16, y+24+bob, s-32, 22, '#e8d0c0');
      // soft shadow side
      px(ctx, x+16, y+24+bob, 5, 22, '#a89888');
      // large eyes looking down
      px(ctx, x+20, y+32+bob, 5, 5, '#ffffff');
      px(ctx, x+s-25, y+32+bob, 5, 5, '#ffffff');
      px(ctx, x+21, y+34+bob, 3, 3, '#3a2030');
      px(ctx, x+s-24, y+34+bob, 3, 3, '#3a2030');
      // small mouth
      px(ctx, x+s/2-2, y+42+bob, 4, 1, '#a06070');
      // hourglass tag
      px(ctx, x+4, y+s-8, 4, 5, '#c8a878');
    },
    BREEZY(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t / 320) * 1.6;
      shadow(ctx, x+s/2, y+s-4, s*0.34, 5);
      // space bg
      px(ctx, x, y, s, s, '#1a0a2a');
      px(ctx, x, y, s, s*0.4, '#3a1a5a');
      // stars
      for (let i=0; i<14; i++) {
        const sx = x + ((i*23) % s);
        const sy = y + ((i*31) % s);
        const tw = (Math.sin(t/300+i)+1)*0.5;
        px(ctx, sx, sy, 2, 2, `rgba(255,255,255,${0.4+tw*0.6})`);
      }
      // shooting star streak
      const stt = (t/30) % (s+20);
      px(ctx, x+stt-20, y+s*0.30+bob*0.5, 16, 2, '#ffeebb');
      px(ctx, x+stt-12, y+s*0.30+bob*0.5-1, 8, 4, '#fff');
      px(ctx, x+stt-4, y+s*0.30+bob*0.5-2, 6, 6, '#ffffaa');
      // zZz
      px(ctx, x+s*0.16, y+s*0.66+bob, s*0.06, s*0.02, '#fff');
      px(ctx, x+s*0.20, y+s*0.68+bob, s*0.02, s*0.04, '#fff');
      px(ctx, x+s*0.16, y+s*0.72+bob, s*0.06, s*0.02, '#fff');
      px(ctx, x+s*0.26, y+s*0.78+bob, s*0.04, s*0.02, '#aaa');
    },
    LOHR(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t / 320) * 1.6;
      shadow(ctx, x+s/2, y+s-4, s*0.34, 5);
      // sky/snow bg
      px(ctx, x, y, s, s*0.6, '#1a2848');
      px(ctx, x, y+s*0.6, s, s*0.4, '#e8eef8');
      // snow flakes
      for (let i=0; i<6; i++) {
        const fx = x + ((i*13 + (t/100|0)) % s);
        const fy = y + ((i*17 + (t/80|0)) % (s*0.6));
        px(ctx, fx, fy, 2, 2, '#fff');
      }
      const cx = x + s/2, cy = y + s/2 + bob;
      // head
      px(ctx, cx-s*0.16, cy-s*0.10, s*0.32, s*0.30, '#f0c8a8');
      // santa hat
      px(ctx, cx-s*0.18, cy-s*0.24, s*0.36, s*0.10, '#cc1a1a');
      px(ctx, cx-s*0.18, cy-s*0.30, s*0.20, s*0.08, '#cc1a1a');
      px(ctx, cx-s*0.20, cy-s*0.16, s*0.40, s*0.04, '#fff');
      px(ctx, cx-s*0.04, cy-s*0.34, s*0.06, s*0.06, '#fff');
      // beard
      px(ctx, cx-s*0.14, cy+s*0.10, s*0.28, s*0.14, '#fff');
      // streak counter
      px(ctx, x+s*0.04, y+s*0.84, s*0.30, s*0.10, '#cc1a1a');
      px(ctx, x+s*0.06, y+s*0.86, s*0.04, s*0.06, '#fff');
      px(ctx, x+s*0.12, y+s*0.86, s*0.04, s*0.06, '#fff');
      px(ctx, x+s*0.18, y+s*0.86, s*0.04, s*0.06, '#fff');
    },
    JACKY(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t / 320) * 1.4;
      shadow(ctx, x+s/2, y+s-4, s*0.34, 5);
      // soft anime background
      px(ctx, x+2, y+2, s-4, s-4, '#e8d8b8');
      // blonde messy hair
      px(ctx, x+10, y+6+bob, s-20, 18, '#f8d050');
      px(ctx, x+8, y+10+bob, 6, 18, '#f8d050');
      px(ctx, x+s-14, y+10+bob, 6, 18, '#f8d050');
      // messy spikes
      px(ctx, x+14, y+4+bob, 4, 4, '#ffe070');
      px(ctx, x+22, y+3+bob, 4, 4, '#f8d050');
      px(ctx, x+34, y+3+bob, 4, 4, '#f8d050');
      px(ctx, x+s-18, y+4+bob, 4, 4, '#ffe070');
      // hair bangs
      px(ctx, x+14, y+18+bob, s-28, 6, '#d8a830');
      // pale face
      px(ctx, x+14, y+22+bob, s-28, 22, '#ffe0c8');
      // anime eyes
      px(ctx, x+18, y+30+bob, 6, 5, '#ffffff');
      px(ctx, x+s-24, y+30+bob, 6, 5, '#ffffff');
      px(ctx, x+19, y+31+bob, 4, 4, '#5a3818');
      px(ctx, x+s-23, y+31+bob, 4, 4, '#5a3818');
      px(ctx, x+20, y+32+bob, 1, 1, '#ffffff');
      px(ctx, x+s-22, y+32+bob, 1, 1, '#ffffff');
      // mouth neutral
      px(ctx, x+26, y+40+bob, 8, 1, '#a06848');
      // brown jacket collar
      px(ctx, x+8, y+s-18+bob, s-16, 14, '#5a3018');
      px(ctx, x+14, y+s-16+bob, s-28, 4, '#7a4828');
      px(ctx, x+s/2-3, y+s-18+bob, 6, 6, '#ffe0c8');
      // blood drop tag
      px(ctx, x+4, y+s-8, 4, 5, '#c8202a');
    },
    MILOSIVIC(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t / 320) * 1.6;
      shadow(ctx, x+s/2, y+s-4, s*0.34, 5);
      // dark gradient ocean
      for (let i=0; i<16; i++) {
        const sh = Math.floor(40 - i*2.2);
        px(ctx, x, y+i*s/16, s, s/16, `rgb(0,${Math.max(sh-10,0)},${Math.max(sh+10,5)})`);
      }
      // moon glow top
      const mx = x + s*0.7, my = y + s*0.18 + bob*0.5;
      px(ctx, mx-s*0.08, my-s*0.08, s*0.16, s*0.16, '#d8e8ff');
      px(ctx, mx-s*0.06, my-s*0.06, s*0.12, s*0.12, '#f8fcff');
      // ripples
      const rp = Math.sin(t/600) * 2;
      px(ctx, x+s*0.10, y+s*0.65+rp, s*0.30, s*0.02, '#1a3a5a');
      px(ctx, x+s*0.50, y+s*0.78-rp, s*0.30, s*0.02, '#1a3a5a');
      px(ctx, x+s*0.20, y+s*0.88+rp, s*0.40, s*0.02, '#22466e');
    },
    SEA11(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t / 320) * 1.6;
      shadow(ctx, x+s/2, y+s-4, s*0.34, 5);
      // sky gradient
      for (let i=0; i<8; i++) {
        const r = 255, g = 140 + i*8, b = 100 + i*12;
        px(ctx, x, y+i*s/16, s, s/16, `rgb(${r},${g},${b})`);
      }
      // sun
      px(ctx, x+s*0.40, y+s*0.30+bob*0.3, s*0.20, s*0.16, '#fff2a8');
      // water
      for (let i=8; i<16; i++) {
        const r = 200 - (i-8)*12, g = 90 + (i-8)*4, b = 110 + (i-8)*8;
        px(ctx, x, y+i*s/16, s, s/16, `rgb(${r},${g},${b})`);
      }
      // halo floating
      const hy = y + s*0.20 + bob;
      px(ctx, x+s*0.18, hy, s*0.18, s*0.04, '#ffe680');
      px(ctx, x+s*0.20, hy+s*0.02, s*0.14, s*0.02, '#fff5b0');
      // bird
      px(ctx, x+s*0.70, y+s*0.45+bob*0.4, s*0.04, s*0.02, '#222');
      px(ctx, x+s*0.74, y+s*0.43+bob*0.4, s*0.04, s*0.02, '#222');
    },
    WIFI(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t / 320) * 1.6;
      shadow(ctx, x+s/2, y+s-4, s*0.34, 5);
      const cx = x + s/2, cy = y + s/2 + bob;
      // skull dome
      px(ctx, cx-s*0.28, cy-s*0.30, s*0.56, s*0.50, '#c41e1e');
      px(ctx, cx-s*0.32, cy-s*0.20, s*0.06, s*0.30, '#8a0000');
      px(ctx, cx+s*0.26, cy-s*0.20, s*0.06, s*0.30, '#8a0000');
      // dark eye sockets
      px(ctx, cx-s*0.20, cy-s*0.12, s*0.14, s*0.14, '#1a0000');
      px(ctx, cx+s*0.06, cy-s*0.12, s*0.14, s*0.14, '#1a0000');
      // glow eyes
      px(ctx, cx-s*0.16, cy-0.06*s, s*0.05, s*0.05, '#ff8800');
      px(ctx, cx+s*0.10, cy-0.06*s, s*0.05, s*0.05, '#ff8800');
      // jaw + jagged teeth
      px(ctx, cx-s*0.22, cy+s*0.08, s*0.44, s*0.14, '#e84545');
      for (let i=0; i<5; i++) {
        px(ctx, cx-s*0.20+i*s*0.09, cy+s*0.16, s*0.04, s*0.08, '#fff5e0');
      }
      // HK tag
      px(ctx, x+s*0.05, y+s*0.78, s*0.18, s*0.10, '#00aaff');
      px(ctx, x+s*0.07, y+s*0.80, s*0.04, s*0.04, '#fff');
    },
    XKING(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t / 320) * 1.6;
      shadow(ctx, x+s/2, y+s-4, s*0.34, 5);
      // light bg
      px(ctx, x, y, s, s, '#e8e4d8');
      const cx = x + s/2, cy = y + s/2 + bob;
      // face
      px(ctx, cx-s*0.24, cy-s*0.22, s*0.48, s*0.44, '#d4a578');
      // hair
      px(ctx, cx-s*0.26, cy-s*0.30, s*0.52, s*0.14, '#2a1810');
      px(ctx, cx-s*0.22, cy-s*0.34, s*0.44, s*0.06, '#2a1810');
      // glasses
      px(ctx, cx-s*0.22, cy-s*0.10, s*0.18, s*0.12, '#1a1a1a');
      px(ctx, cx+s*0.04, cy-s*0.10, s*0.18, s*0.12, '#1a1a1a');
      px(ctx, cx-s*0.20, cy-s*0.08, s*0.14, s*0.08, '#e8c8a8');
      px(ctx, cx+s*0.06, cy-s*0.08, s*0.14, s*0.08, '#e8c8a8');
      px(ctx, cx-s*0.04, cy-s*0.06, s*0.08, s*0.02, '#1a1a1a');
      // mouth
      px(ctx, cx-s*0.06, cy+s*0.10, s*0.12, s*0.02, '#7a4030');
      // flag accent corner
      px(ctx, x+s*0.78, y+s*0.04, s*0.18, s*0.06, '#fff');
      px(ctx, x+s*0.78, y+s*0.06, s*0.18, s*0.02, '#0066cc');
    },
    HEADBAND_GUY(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t / 320) * 1.5;
      shadow(ctx, x+s/2, y+s-4, s*0.34, 5);
      // dark background
      px(ctx, x+2, y+2, s-4, s-4, '#1a0808');
      // dark hair top
      px(ctx, x+10, y+6+bob, s-20, 8, '#1a0a0a');
      // bright red headband
      px(ctx, x+6, y+14+bob, s-12, 8, '#e02018');
      px(ctx, x+6, y+15+bob, s-12, 1, '#ff5040');
      px(ctx, x+6, y+20+bob, s-12, 2, '#a01010');
      // headband stripes (samurai)
      px(ctx, x+18, y+16+bob, 2, 4, '#ffffff');
      px(ctx, x+s-20, y+16+bob, 2, 4, '#ffffff');
      px(ctx, x+s/2-1, y+16+bob, 2, 4, '#ffffff');
      // headband ties hanging
      px(ctx, x+4, y+22+bob, 3, 10, '#e02018');
      px(ctx, x+s-7, y+22+bob, 3, 10, '#e02018');
      // dark/red face
      px(ctx, x+12, y+22+bob, s-24, 26, '#7a4030');
      // shadow under headband
      px(ctx, x+12, y+22+bob, s-24, 3, '#3a1810');
      // eyes peering out fierce
      px(ctx, x+20, y+30+bob, 5, 3, '#ffffff');
      px(ctx, x+s-25, y+30+bob, 5, 3, '#ffffff');
      px(ctx, x+22, y+30+bob, 2, 3, '#1a0a0a');
      px(ctx, x+s-24, y+30+bob, 2, 3, '#1a0a0a');
      // mouth determined
      px(ctx, x+24, y+42+bob, 14, 1, '#3a1810');
    },
    KOYLY(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t / 320) * 1.4;
      shadow(ctx, x+s/2, y+s-4, s*0.34, 5);
      // soft tan background
      px(ctx, x+2, y+2, s-4, s-4, '#d8b888');
      // brown cowboy hat - wide brim
      px(ctx, x+2, y+18+bob, s-4, 5, '#5a3018');
      px(ctx, x+4, y+22+bob, s-8, 2, '#3a1808');
      // hat crown
      px(ctx, x+16, y+8+bob, s-32, 12, '#7a4020');
      px(ctx, x+18, y+6+bob, s-36, 4, '#7a4020');
      // hat band
      px(ctx, x+16, y+16+bob, s-32, 2, '#3a1808');
      px(ctx, x+22, y+16+bob, 2, 2, '#d8a060');
      // dog face peeking out
      px(ctx, x+12, y+24+bob, s-24, 26, '#fafafa');
      // brown patches
      px(ctx, x+12, y+24+bob, 12, 12, '#a87048');
      px(ctx, x+s-20, y+30+bob, 8, 8, '#a87048');
      // dog eyes (emote :( )
      px(ctx, x+20, y+32+bob, 2, 4, '#0a0a0a');
      px(ctx, x+s-22, y+32+bob, 2, 4, '#0a0a0a');
      // snout
      px(ctx, x+s/2-4, y+40+bob, 8, 6, '#e8d8c0');
      // black nose
      px(ctx, x+s/2-2, y+40+bob, 4, 3, '#1a1010');
      // pink tongue out
      px(ctx, x+s/2-2, y+46+bob, 4, 4, '#ff8aa0');
      px(ctx, x+s/2-1, y+47+bob, 2, 2, '#d85a78');
    },

    W0RTH(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t*0.003) * (s*0.012);
      const browTwitch = Math.sin(t*0.0025) * (s*0.004);
      shadow(ctx, x+s/2, y+s-4, s*0.34, 5);
      // dark hoodie body
      ctx.fillStyle = "#1a1a22";
      ctx.beginPath();
      ctx.ellipse(x+s*0.5, y+s*0.74+bob, s*0.34, s*0.22, 0, 0, Math.PI*2);
      ctx.fill();
      // hoodie inner shadow
      ctx.fillStyle = "#0a0a12";
      ctx.beginPath();
      ctx.ellipse(x+s*0.5, y+s*0.78+bob, s*0.20, s*0.06, 0, 0, Math.PI*2);
      ctx.fill();
      // arms
      px(ctx, x+s*0.14, y+s*0.62+bob, s*0.12, s*0.22, "#1a1a22");
      px(ctx, x+s*0.74, y+s*0.62+bob, s*0.12, s*0.22, "#1a1a22");
      // hoodie hood collar/strings
      ctx.fillStyle = "#2a2a32";
      ctx.fillRect(x+s*0.36, y+s*0.62+bob, s*0.28, s*0.06);
      // hoodie strings
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = Math.max(1, s*0.008);
      ctx.beginPath();
      ctx.moveTo(x+s*0.44, y+s*0.66+bob);
      ctx.lineTo(x+s*0.42, y+s*0.78+bob);
      ctx.moveTo(x+s*0.56, y+s*0.66+bob);
      ctx.lineTo(x+s*0.58, y+s*0.78+bob);
      ctx.stroke();
      // hoodie string tips
      ctx.fillStyle = "#fff";
      ctx.beginPath(); ctx.arc(x+s*0.42, y+s*0.79+bob, s*0.012, 0, Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(x+s*0.58, y+s*0.79+bob, s*0.012, 0, Math.PI*2); ctx.fill();
      // light skin face
      ctx.fillStyle = "#f0d8b8";
      ctx.beginPath();
      ctx.ellipse(x+s*0.5, y+s*0.46+bob, s*0.20, s*0.21, 0, 0, Math.PI*2);
      ctx.fill();
      // face shadow under cap (soft)
      ctx.fillStyle = "rgba(0,0,0,0.15)";
      ctx.beginPath();
      ctx.ellipse(x+s*0.5, y+s*0.40+bob, s*0.18, s*0.06, 0, 0, Math.PI*2);
      ctx.fill();
      // DARK MESSY HAIR sticking out from under beanie (sides + below)
      ctx.fillStyle = "#1a1208";
      // left messy clumps
      ctx.beginPath();
      ctx.moveTo(x+s*0.30, y+s*0.36+bob);
      ctx.lineTo(x+s*0.26, y+s*0.40+bob);
      ctx.lineTo(x+s*0.28, y+s*0.46+bob);
      ctx.lineTo(x+s*0.32, y+s*0.42+bob);
      ctx.closePath();
      ctx.fill();
      // right messy clumps
      ctx.beginPath();
      ctx.moveTo(x+s*0.70, y+s*0.36+bob);
      ctx.lineTo(x+s*0.74, y+s*0.40+bob);
      ctx.lineTo(x+s*0.72, y+s*0.46+bob);
      ctx.lineTo(x+s*0.68, y+s*0.42+bob);
      ctx.closePath();
      ctx.fill();
      // hair poking out front (messy bangs under beanie)
      ctx.beginPath();
      ctx.moveTo(x+s*0.34, y+s*0.34+bob);
      ctx.lineTo(x+s*0.36, y+s*0.40+bob);
      ctx.lineTo(x+s*0.40, y+s*0.36+bob);
      ctx.lineTo(x+s*0.44, y+s*0.40+bob);
      ctx.lineTo(x+s*0.46, y+s*0.34+bob);
      ctx.closePath();
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(x+s*0.54, y+s*0.34+bob);
      ctx.lineTo(x+s*0.56, y+s*0.40+bob);
      ctx.lineTo(x+s*0.60, y+s*0.36+bob);
      ctx.lineTo(x+s*0.64, y+s*0.40+bob);
      ctx.lineTo(x+s*0.66, y+s*0.34+bob);
      ctx.closePath();
      ctx.fill();
      // little hair tuft sticking out top
      ctx.beginPath();
      ctx.moveTo(x+s*0.40, y+s*0.20+bob);
      ctx.lineTo(x+s*0.38, y+s*0.16+bob);
      ctx.lineTo(x+s*0.42, y+s*0.18+bob);
      ctx.closePath();
      ctx.fill();
      // BEANIE/CAP (low, dark color, slouchy)
      ctx.fillStyle = "#3a2848";
      ctx.beginPath();
      ctx.ellipse(x+s*0.5, y+s*0.26+bob, s*0.24, s*0.14, 0, 0, Math.PI*2);
      ctx.fill();
      // beanie main body extending to forehead
      ctx.fillRect(x+s*0.26, y+s*0.26+bob, s*0.48, s*0.12);
      // beanie FOLD LINE (across middle)
      ctx.fillStyle = "#2a1838";
      ctx.fillRect(x+s*0.26, y+s*0.30+bob, s*0.48, s*0.04);
      // fold line shadow
      ctx.fillStyle = "#1a0828";
      ctx.fillRect(x+s*0.26, y+s*0.34+bob, s*0.48, s*0.008);
      // beanie top knob/wrinkle
      ctx.fillStyle = "#3a2848";
      ctx.beginPath();
      ctx.ellipse(x+s*0.50, y+s*0.18+bob, s*0.06, s*0.04, 0, 0, Math.PI*2);
      ctx.fill();
      // beanie texture lines (knit)
      ctx.strokeStyle = "#2a1838";
      ctx.lineWidth = Math.max(1, s*0.005);
      ctx.beginPath();
      ctx.moveTo(x+s*0.30, y+s*0.22+bob); ctx.lineTo(x+s*0.30, y+s*0.30+bob);
      ctx.moveTo(x+s*0.40, y+s*0.20+bob); ctx.lineTo(x+s*0.40, y+s*0.30+bob);
      ctx.moveTo(x+s*0.50, y+s*0.20+bob); ctx.lineTo(x+s*0.50, y+s*0.30+bob);
      ctx.moveTo(x+s*0.60, y+s*0.20+bob); ctx.lineTo(x+s*0.60, y+s*0.30+bob);
      ctx.moveTo(x+s*0.70, y+s*0.22+bob); ctx.lineTo(x+s*0.70, y+s*0.30+bob);
      ctx.stroke();
      // raised eyebrow (left flat, right raised)
      ctx.fillStyle = "#1a1208";
      // left eyebrow (flat)
      ctx.fillRect(x+s*0.36, y+s*0.40+bob, s*0.10, s*0.014);
      // right eyebrow (RAISED, angled up + animated)
      ctx.save();
      ctx.translate(x+s*0.59, y+s*0.40+bob+browTwitch);
      ctx.rotate(-0.25);
      ctx.fillRect(0, 0, s*0.10, s*0.014);
      ctx.restore();
      // eyes (small, smug, half-lidded)
      ctx.fillStyle = "#1a1a1a";
      // left eye
      ctx.beginPath();
      ctx.ellipse(x+s*0.42, y+s*0.46+bob, s*0.020, s*0.014, 0, 0, Math.PI*2);
      ctx.fill();
      // right eye (smaller — squinting from raised brow)
      ctx.beginPath();
      ctx.ellipse(x+s*0.60, y+s*0.46+bob+browTwitch*0.5, s*0.018, s*0.010, 0, 0, Math.PI*2);
      ctx.fill();
      // eye highlights
      ctx.fillStyle = "#fff";
      ctx.beginPath(); ctx.arc(x+s*0.425, y+s*0.455+bob, s*0.005, 0, Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(x+s*0.605, y+s*0.456+bob, s*0.005, 0, Math.PI*2); ctx.fill();
      // SMIRK (asymmetric mouth — left side up, right side flat)
      ctx.strokeStyle = "#1a1a1a";
      ctx.lineWidth = Math.max(1, s*0.014);
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(x+s*0.44, y+s*0.56+bob);
      ctx.quadraticCurveTo(x+s*0.48, y+s*0.535+bob, x+s*0.54, y+s*0.555+bob);
      ctx.lineTo(x+s*0.58, y+s*0.555+bob);
      ctx.stroke();
      ctx.lineCap = "butt";
      // tiny smirk dimple
      ctx.fillStyle = "rgba(0,0,0,0.2)";
      ctx.beginPath();
      ctx.arc(x+s*0.43, y+s*0.555+bob, s*0.005, 0, Math.PI*2);
      ctx.fill();
      // LITE badge on hoodie chest
      ctx.fillStyle = "#7fdcff";
      ctx.fillRect(x+s*0.42, y+s*0.70+bob, s*0.16, s*0.07);
      // badge border
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = Math.max(1, s*0.006);
      ctx.strokeRect(x+s*0.42, y+s*0.70+bob, s*0.16, s*0.07);
      ctx.fillStyle = "#1a1a22";
      ctx.font = `bold ${Math.floor(s*0.045)}px monospace`;
      ctx.textAlign = "center";
      ctx.fillText("LITE", x+s*0.50, y+s*0.752+bob);
      ctx.textAlign = "start";
      // little glow around LITE badge
      const glowP = 0.4 + Math.sin(t*0.005) * 0.3;
      ctx.fillStyle = `rgba(127,220,255,${glowP*0.3})`;
      ctx.fillRect(x+s*0.40, y+s*0.69+bob, s*0.20, s*0.09);
          // === auto-flourish: identifier overlay ===
      try {
        ctx.save();
        const __fb = Math.sin(t*0.0035) * (s*0.008);
        // Tier-glow username label (below sprite)
        ctx.font = `bold ${Math.max(7, Math.floor(s*0.060))}px monospace`;
        ctx.textAlign = "center";
        ctx.fillStyle = "rgba(0,0,0,0.55)";
        ctx.fillRect(x+s*0.10, y+s*0.965, s*0.80, s*0.075);
        ctx.fillStyle = "#5fc8ff";
        ctx.shadowColor = "#5fc8ff";
        ctx.shadowBlur = Math.max(2, s*0.012);
        ctx.fillText("W0rth", x+s*0.50, y+s*1.020);
        ctx.shadowBlur = 0;
        // Floating role badge tag (top-right corner)
        const __bx = x+s*0.66, __by = y+s*0.05+__fb;
        const __bw = s*0.32, __bh = s*0.10;
        ctx.fillStyle = "#7fdcff";
        ctx.fillRect(__bx, __by, __bw, __bh);
        ctx.strokeStyle = "#5fc8ff";
        ctx.lineWidth = Math.max(1, s*0.008);
        ctx.strokeRect(__bx, __by, __bw, __bh);
        ctx.fillStyle = "#0a0a14";
        ctx.font = `bold ${Math.max(7, Math.floor(s*0.058))}px monospace`;
        ctx.fillText("LITE", __bx+__bw/2, __by+__bh*0.74);
        ctx.textAlign = "start";
        ctx.fillStyle = "#dadce0";
        ctx.fillRect(x+s*0.06-s*0.005, y+s*0.10-s*0.025, s*0.010, s*0.040);
        ctx.fillStyle = "#a07050";
        ctx.fillRect(x+s*0.06-s*0.012, y+s*0.10+s*0.012, s*0.024, s*0.006);
        ctx.restore();
      } catch(__e) { /* flourish fail-safe */ }
},
    SIGSTICK(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t / 320) * 1.6;
      shadow(ctx, x+s/2, y+s-4, s*0.34, 5);
      // blue circle bg
      px(ctx, x, y, s, s, '#5865f2');
      const cx = x + s/2, cy = y + s/2 + bob;
      // round white head
      px(ctx, cx-s*0.26, cy-s*0.20, s*0.52, s*0.42, '#fff');
      px(ctx, cx-s*0.30, cy-s*0.14, s*0.04, s*0.30, '#fff');
      px(ctx, cx+s*0.26, cy-s*0.14, s*0.04, s*0.30, '#fff');
      px(ctx, cx-s*0.22, cy-s*0.24, s*0.44, s*0.04, '#fff');
      // eyes
      px(ctx, cx-s*0.14, cy-s*0.06, s*0.06, s*0.06, '#1a1a1a');
      px(ctx, cx+s*0.08, cy-s*0.06, s*0.06, s*0.06, '#1a1a1a');
      // smile (curved)
      px(ctx, cx-s*0.10, cy+s*0.10, s*0.04, s*0.04, '#1a1a1a');
      px(ctx, cx-s*0.06, cy+s*0.14, s*0.12, s*0.04, '#1a1a1a');
      px(ctx, cx+s*0.06, cy+s*0.10, s*0.04, s*0.04, '#1a1a1a');
    },
    CAST(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t / 320) * 1.6;
      shadow(ctx, x+s/2, y+s-4, s*0.34, 5);
      // green bg
      px(ctx, x, y, s, s, '#43b581');
      const cx = x + s/2, cy = y + s/2 + bob;
      // wumpus body
      px(ctx, cx-s*0.20, cy-s*0.12, s*0.40, s*0.32, '#ffffff');
      px(ctx, cx-s*0.16, cy-s*0.18, s*0.32, s*0.08, '#ffffff');
      px(ctx, cx-s*0.22, cy-s*0.24, s*0.10, s*0.12, '#ffffff');
      px(ctx, cx+s*0.12, cy-s*0.24, s*0.10, s*0.12, '#ffffff');
      // eyes
      px(ctx, cx-s*0.10, cy-s*0.06, s*0.06, s*0.10, '#1a1a1a');
      px(ctx, cx+s*0.04, cy-s*0.06, s*0.06, s*0.10, '#1a1a1a');
      // mouth
      px(ctx, cx-s*0.06, cy+s*0.08, s*0.12, s*0.06, '#1a1a1a');
      // feet
      px(ctx, cx-s*0.14, cy+s*0.20, s*0.10, s*0.06, '#ffffff');
      px(ctx, cx+s*0.04, cy+s*0.20, s*0.10, s*0.06, '#ffffff');
    },

  };
})();
