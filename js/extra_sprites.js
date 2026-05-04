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
      const bob = Math.sin(t*0.003) * (s*0.012);
      shadow(ctx, x+s/2, y+s-4, s*0.34, 5);
      // hoodie body
      ctx.fillStyle = sp.color1 || "#3a6acc";
      ctx.beginPath();
      ctx.ellipse(x+s*0.5, y+s*0.72+bob, s*0.30, s*0.22, 0, 0, Math.PI*2);
      ctx.fill();
      // arms
      px(ctx, x+s*0.18, y+s*0.62+bob, s*0.10, s*0.18, sp.color1 || "#3a6acc");
      px(ctx, x+s*0.72, y+s*0.62+bob, s*0.10, s*0.18, sp.color1 || "#3a6acc");
      // head — peach skin
      ctx.fillStyle = "#ffd0a8";
      ctx.beginPath();
      ctx.ellipse(x+s*0.5, y+s*0.42+bob, s*0.20, s*0.20, 0, 0, Math.PI*2);
      ctx.fill();
      // wild fire-orange hair (jagged tufts)
      ctx.fillStyle = "#ff7a18";
      ctx.beginPath();
      ctx.moveTo(x+s*0.30, y+s*0.36+bob);
      ctx.lineTo(x+s*0.26, y+s*0.18+bob);
      ctx.lineTo(x+s*0.36, y+s*0.24+bob);
      ctx.lineTo(x+s*0.40, y+s*0.14+bob);
      ctx.lineTo(x+s*0.48, y+s*0.22+bob);
      ctx.lineTo(x+s*0.54, y+s*0.12+bob);
      ctx.lineTo(x+s*0.60, y+s*0.22+bob);
      ctx.lineTo(x+s*0.66, y+s*0.16+bob);
      ctx.lineTo(x+s*0.72, y+s*0.26+bob);
      ctx.lineTo(x+s*0.74, y+s*0.36+bob);
      ctx.closePath();
      ctx.fill();
      // hair highlight
      ctx.fillStyle = "#ffb060";
      px(ctx, x+s*0.40, y+s*0.20+bob, s*0.04, s*0.04, "#ffb060");
      px(ctx, x+s*0.56, y+s*0.18+bob, s*0.04, s*0.04, "#ffb060");
      // flickering side flames
      const flick = 0.6 + Math.sin(t*0.012)*0.4;
      ctx.fillStyle = `rgba(255,140,40,${flick})`;
      ctx.beginPath();
      ctx.moveTo(x+s*0.22, y+s*0.40+bob);
      ctx.quadraticCurveTo(x+s*0.10, y+s*0.30+bob, x+s*0.18, y+s*0.20+bob);
      ctx.quadraticCurveTo(x+s*0.24, y+s*0.36+bob, x+s*0.22, y+s*0.40+bob);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(x+s*0.78, y+s*0.40+bob);
      ctx.quadraticCurveTo(x+s*0.90, y+s*0.30+bob, x+s*0.82, y+s*0.20+bob);
      ctx.quadraticCurveTo(x+s*0.76, y+s*0.36+bob, x+s*0.78, y+s*0.40+bob);
      ctx.fill();
      // closed-eye smile (curved arcs)
      ctx.strokeStyle = "#1a1a1a";
      ctx.lineWidth = Math.max(1, s*0.014);
      ctx.beginPath(); ctx.arc(x+s*0.42, y+s*0.42+bob, s*0.030, Math.PI*1.1, Math.PI*1.9); ctx.stroke();
      ctx.beginPath(); ctx.arc(x+s*0.58, y+s*0.42+bob, s*0.030, Math.PI*1.1, Math.PI*1.9); ctx.stroke();
      // pleasant smile
      ctx.beginPath(); ctx.arc(x+s*0.50, y+s*0.50+bob, s*0.04, Math.PI*0.15, Math.PI*0.85); ctx.stroke();
      // HMOD badge
      ctx.fillStyle = "#5865f2";
      ctx.fillRect(x+s*0.44, y+s*0.70+bob, s*0.12, s*0.06);
      ctx.fillStyle = "#fff";
      ctx.font = `bold ${Math.floor(s*0.04)}px monospace`;
      ctx.textAlign = "center";
      ctx.fillText("HMOD", x+s*0.50, y+s*0.745+bob);
      ctx.textAlign = "start";
    },

    LSM253(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t*0.0028) * (s*0.011);
      shadow(ctx, x+s/2, y+s-4, s*0.34, 5);
      // hoodie
      ctx.fillStyle = "#2a3848";
      ctx.beginPath();
      ctx.ellipse(x+s*0.5, y+s*0.72+bob, s*0.32, s*0.22, 0, 0, Math.PI*2);
      ctx.fill();
      // arms
      px(ctx, x+s*0.18, y+s*0.62+bob, s*0.10, s*0.18, "#2a3848");
      px(ctx, x+s*0.72, y+s*0.62+bob, s*0.10, s*0.18, "#2a3848");
      // pale face
      ctx.fillStyle = "#f0e0d0";
      ctx.beginPath();
      ctx.ellipse(x+s*0.5, y+s*0.46+bob, s*0.20, s*0.20, 0, 0, Math.PI*2);
      ctx.fill();
      // brown hair peeking out under cap
      px(ctx, x+s*0.30, y+s*0.36+bob, s*0.40, s*0.06, "#5a3818");
      // dark blue cap
      ctx.fillStyle = "#1a2848";
      ctx.beginPath();
      ctx.ellipse(x+s*0.50, y+s*0.30+bob, s*0.22, s*0.12, 0, Math.PI, Math.PI*2);
      ctx.fill();
      // brim sticking out
      ctx.fillStyle = "#0a1830";
      ctx.fillRect(x+s*0.50, y+s*0.34+bob, s*0.30, s*0.04);
      // eyes (under brim shadow)
      ctx.fillStyle = "#1a1a1a";
      px(ctx, x+s*0.40, y+s*0.44+bob, s*0.05, s*0.02, "rgba(0,0,0,0.3)"); // brim shadow
      px(ctx, x+s*0.55, y+s*0.44+bob, s*0.05, s*0.02, "rgba(0,0,0,0.3)");
      ctx.beginPath(); ctx.arc(x+s*0.42, y+s*0.46+bob, s*0.014, 0, Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(x+s*0.58, y+s*0.46+bob, s*0.014, 0, Math.PI*2); ctx.fill();
      // small mouth
      ctx.strokeStyle = "#1a1a1a";
      ctx.lineWidth = Math.max(1, s*0.012);
      ctx.beginPath(); ctx.moveTo(x+s*0.46, y+s*0.54+bob); ctx.lineTo(x+s*0.54, y+s*0.54+bob); ctx.stroke();
      // mod shield badge
      ctx.fillStyle = "#5865f2";
      ctx.beginPath();
      ctx.moveTo(x+s*0.50, y+s*0.66+bob);
      ctx.lineTo(x+s*0.44, y+s*0.69+bob);
      ctx.lineTo(x+s*0.46, y+s*0.78+bob);
      ctx.lineTo(x+s*0.50, y+s*0.80+bob);
      ctx.lineTo(x+s*0.54, y+s*0.78+bob);
      ctx.lineTo(x+s*0.56, y+s*0.69+bob);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = "#fff";
      ctx.font = `bold ${Math.floor(s*0.05)}px monospace`;
      ctx.textAlign = "center";
      ctx.fillText("M", x+s*0.50, y+s*0.755+bob);
      ctx.textAlign = "start";
    },

    MYSELF(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t*0.003) * (s*0.012);
      shadow(ctx, x+s/2, y+s-4, s*0.34, 5);
      // hoodie body
      ctx.fillStyle = "#2a4ca0";
      ctx.beginPath();
      ctx.ellipse(x+s*0.5, y+s*0.74+bob, s*0.32, s*0.22, 0, 0, Math.PI*2);
      ctx.fill();
      // arms
      px(ctx, x+s*0.16, y+s*0.62+bob, s*0.10, s*0.20, "#2a4ca0");
      px(ctx, x+s*0.74, y+s*0.62+bob, s*0.10, s*0.20, "#2a4ca0");
      // crystal head — hexagonal facets
      const cx = x+s*0.5, cy = y+s*0.40+bob;
      ctx.fillStyle = "#7fdcff";
      ctx.beginPath();
      ctx.moveTo(cx, cy-s*0.22);
      ctx.lineTo(cx+s*0.20, cy-s*0.10);
      ctx.lineTo(cx+s*0.20, cy+s*0.10);
      ctx.lineTo(cx, cy+s*0.22);
      ctx.lineTo(cx-s*0.20, cy+s*0.10);
      ctx.lineTo(cx-s*0.20, cy-s*0.10);
      ctx.closePath();
      ctx.fill();
      // facet lines
      ctx.strokeStyle = "#5fa8d8";
      ctx.lineWidth = Math.max(1, s*0.010);
      ctx.beginPath();
      ctx.moveTo(cx, cy-s*0.22); ctx.lineTo(cx, cy+s*0.22);
      ctx.moveTo(cx-s*0.20, cy-s*0.10); ctx.lineTo(cx+s*0.20, cy+s*0.10);
      ctx.moveTo(cx+s*0.20, cy-s*0.10); ctx.lineTo(cx-s*0.20, cy+s*0.10);
      ctx.stroke();
      // glowing pulsing cyan eyes
      const pulse = 0.6 + Math.sin(t*0.006)*0.4;
      ctx.fillStyle = `rgba(180,255,255,${pulse})`;
      ctx.beginPath(); ctx.arc(cx-s*0.07, cy-s*0.02, s*0.030, 0, Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(cx+s*0.07, cy-s*0.02, s*0.030, 0, Math.PI*2); ctx.fill();
      ctx.fillStyle = "#fff";
      ctx.beginPath(); ctx.arc(cx-s*0.07, cy-s*0.02, s*0.014, 0, Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(cx+s*0.07, cy-s*0.02, s*0.014, 0, Math.PI*2); ctx.fill();
      // headphone band
      ctx.fillStyle = "#1a1a1a";
      ctx.fillRect(cx-s*0.22, cy-s*0.22, s*0.44, s*0.04);
      // headphone cups (cyan glow)
      ctx.fillStyle = `rgba(127,220,255,${pulse})`;
      ctx.fillRect(cx-s*0.26, cy-s*0.10, s*0.06, s*0.16);
      ctx.fillRect(cx+s*0.20, cy-s*0.10, s*0.06, s*0.16);
      // orbiting sparkles
      const sT = t*0.003;
      for (let i = 0; i < 5; i++) {
        const a = sT + i*(Math.PI*2/5);
        const sxp = cx + Math.cos(a)*s*0.34;
        const syp = cy + Math.sin(a)*s*0.20;
        ctx.fillStyle = "#fff";
        ctx.beginPath(); ctx.arc(sxp, syp, s*0.014, 0, Math.PI*2); ctx.fill();
      }
      // MINE badge
      ctx.fillStyle = "#5865f2";
      ctx.fillRect(x+s*0.42, y+s*0.72+bob, s*0.16, s*0.06);
      ctx.fillStyle = "#fff";
      ctx.font = `bold ${Math.floor(s*0.045)}px monospace`;
      ctx.textAlign = "center";
      ctx.fillText("MINE", x+s*0.50, y+s*0.765+bob);
      ctx.textAlign = "start";
    },

    STEEL_GAMER(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t*0.003) * (s*0.012);
      shadow(ctx, x+s/2, y+s-4, s*0.34, 5);
      // sunset radial glow
      const grad = ctx.createRadialGradient(x+s*0.5, y+s*0.4, s*0.10, x+s*0.5, y+s*0.4, s*0.55);
      grad.addColorStop(0, "rgba(255,180,100,0.5)");
      grad.addColorStop(1, "rgba(255,100,150,0.0)");
      ctx.fillStyle = grad;
      ctx.fillRect(x, y, s, s);
      // pink/magenta top
      ctx.fillStyle = "#ff5598";
      ctx.beginPath();
      ctx.ellipse(x+s*0.5, y+s*0.74+bob, s*0.32, s*0.22, 0, 0, Math.PI*2);
      ctx.fill();
      // long flowing blonde hair (back)
      ctx.fillStyle = "#ffd86a";
      ctx.beginPath();
      ctx.moveTo(x+s*0.20, y+s*0.30+bob);
      ctx.quadraticCurveTo(x+s*0.10, y+s*0.60+bob, x+s*0.20, y+s*0.86+bob);
      ctx.lineTo(x+s*0.40, y+s*0.86+bob);
      ctx.lineTo(x+s*0.40, y+s*0.30+bob);
      ctx.closePath();
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(x+s*0.80, y+s*0.30+bob);
      ctx.quadraticCurveTo(x+s*0.90, y+s*0.60+bob, x+s*0.80, y+s*0.86+bob);
      ctx.lineTo(x+s*0.60, y+s*0.86+bob);
      ctx.lineTo(x+s*0.60, y+s*0.30+bob);
      ctx.closePath();
      ctx.fill();
      // face
      ctx.fillStyle = "#ffd8b8";
      ctx.beginPath();
      ctx.ellipse(x+s*0.5, y+s*0.44+bob, s*0.18, s*0.20, 0, 0, Math.PI*2);
      ctx.fill();
      // bangs
      ctx.fillStyle = "#ffd86a";
      px(ctx, x+s*0.32, y+s*0.26+bob, s*0.36, s*0.10, "#ffd86a");
      // dark sunglasses bar
      ctx.fillStyle = "#1a1a1a";
      ctx.fillRect(x+s*0.30, y+s*0.40+bob, s*0.40, s*0.06);
      // shades highlight
      ctx.fillStyle = "rgba(255,255,255,0.3)";
      ctx.fillRect(x+s*0.34, y+s*0.41+bob, s*0.08, s*0.02);
      ctx.fillRect(x+s*0.56, y+s*0.41+bob, s*0.08, s*0.02);
      // smirk
      ctx.strokeStyle = "#1a1a1a";
      ctx.lineWidth = Math.max(1, s*0.012);
      ctx.beginPath();
      ctx.moveTo(x+s*0.46, y+s*0.54+bob);
      ctx.quadraticCurveTo(x+s*0.52, y+s*0.58+bob, x+s*0.58, y+s*0.52+bob);
      ctx.stroke();
    },

    // ===== MINECRAFT MAINS =====
    SZS(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t*0.003) * (s*0.012);
      shadow(ctx, x+s/2, y+s-4, s*0.34, 5);
      // dark cloak/coat
      ctx.fillStyle = "#1a0a2a";
      ctx.beginPath();
      ctx.moveTo(x+s*0.18, y+s*0.50+bob);
      ctx.lineTo(x+s*0.20, y+s*0.96+bob);
      ctx.lineTo(x+s*0.80, y+s*0.96+bob);
      ctx.lineTo(x+s*0.82, y+s*0.50+bob);
      ctx.closePath();
      ctx.fill();
      // long dark hair down sides
      ctx.fillStyle = "#3a1a4a";
      ctx.beginPath();
      ctx.moveTo(x+s*0.26, y+s*0.30+bob);
      ctx.quadraticCurveTo(x+s*0.18, y+s*0.50+bob, x+s*0.24, y+s*0.74+bob);
      ctx.lineTo(x+s*0.34, y+s*0.74+bob);
      ctx.lineTo(x+s*0.34, y+s*0.30+bob);
      ctx.closePath();
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(x+s*0.66, y+s*0.30+bob);
      ctx.quadraticCurveTo(x+s*0.72, y+s*0.50+bob, x+s*0.66, y+s*0.74+bob);
      ctx.lineTo(x+s*0.56, y+s*0.74+bob);
      ctx.lineTo(x+s*0.56, y+s*0.30+bob);
      ctx.closePath();
      ctx.fill();
      // face
      ctx.fillStyle = "#e8c8d0";
      ctx.beginPath();
      ctx.ellipse(x+s*0.5, y+s*0.40+bob, s*0.16, s*0.18, 0, 0, Math.PI*2);
      ctx.fill();
      // jagged bangs
      ctx.fillStyle = "#3a1a4a";
      ctx.beginPath();
      ctx.moveTo(x+s*0.34, y+s*0.30+bob);
      ctx.lineTo(x+s*0.40, y+s*0.40+bob);
      ctx.lineTo(x+s*0.44, y+s*0.30+bob);
      ctx.lineTo(x+s*0.50, y+s*0.42+bob);
      ctx.lineTo(x+s*0.56, y+s*0.30+bob);
      ctx.lineTo(x+s*0.60, y+s*0.40+bob);
      ctx.lineTo(x+s*0.66, y+s*0.30+bob);
      ctx.lineTo(x+s*0.66, y+s*0.22+bob);
      ctx.lineTo(x+s*0.34, y+s*0.22+bob);
      ctx.closePath();
      ctx.fill();
      // glowing purple eyes
      const glow = 0.6 + Math.sin(t*0.006)*0.4;
      ctx.fillStyle = `rgba(160,80,255,${glow})`;
      ctx.beginPath(); ctx.arc(x+s*0.43, y+s*0.40+bob, s*0.030, 0, Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(x+s*0.57, y+s*0.40+bob, s*0.030, 0, Math.PI*2); ctx.fill();
      ctx.fillStyle = "#fff";
      ctx.beginPath(); ctx.arc(x+s*0.43, y+s*0.40+bob, s*0.012, 0, Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(x+s*0.57, y+s*0.40+bob, s*0.012, 0, Math.PI*2); ctx.fill();
      // small mouth
      ctx.strokeStyle = "#1a1a1a";
      ctx.lineWidth = Math.max(1, s*0.010);
      ctx.beginPath(); ctx.moveTo(x+s*0.46, y+s*0.50+bob); ctx.lineTo(x+s*0.54, y+s*0.50+bob); ctx.stroke();
      // tilted broadsword on right
      ctx.save();
      ctx.translate(x+s*0.74, y+s*0.60+bob);
      ctx.rotate(0.4);
      // blade
      ctx.fillStyle = "#dadce0";
      ctx.fillRect(-s*0.04, -s*0.32, s*0.08, s*0.50);
      ctx.fillStyle = "#fff";
      ctx.fillRect(-s*0.04, -s*0.32, s*0.02, s*0.50);
      // crossguard
      ctx.fillStyle = "#a07050";
      ctx.fillRect(-s*0.10, s*0.18, s*0.20, s*0.04);
      // hilt
      ctx.fillStyle = "#5a3818";
      ctx.fillRect(-s*0.03, s*0.22, s*0.06, s*0.10);
      ctx.restore();
    },

    KAPARKING(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t*0.003) * (s*0.012);
      shadow(ctx, x+s/2, y+s-4, s*0.34, 5);
      // legs (cubic)
      px(ctx, x+s*0.34, y+s*0.74+bob, s*0.12, s*0.20, "#2a4868");
      px(ctx, x+s*0.54, y+s*0.74+bob, s*0.12, s*0.20, "#2a4868");
      // body — square torso
      px(ctx, x+s*0.30, y+s*0.46+bob, s*0.40, s*0.30, "#5fa8d8");
      // arms
      px(ctx, x+s*0.16, y+s*0.46+bob, s*0.14, s*0.24, "#ffd0a8");
      px(ctx, x+s*0.70, y+s*0.46+bob, s*0.14, s*0.24, "#ffd0a8");
      // cubic head
      px(ctx, x+s*0.30, y+s*0.18+bob, s*0.40, s*0.30, "#ffd0a8");
      // brown hair block
      px(ctx, x+s*0.30, y+s*0.18+bob, s*0.40, s*0.10, "#5a3818");
      // eyes (rectangular roblox style)
      px(ctx, x+s*0.36, y+s*0.32+bob, s*0.08, s*0.04, "#1a1a1a");
      px(ctx, x+s*0.56, y+s*0.32+bob, s*0.08, s*0.04, "#1a1a1a");
      // pixel highlight
      px(ctx, x+s*0.38, y+s*0.32+bob, s*0.02, s*0.02, "#fff");
      px(ctx, x+s*0.58, y+s*0.32+bob, s*0.02, s*0.02, "#fff");
      // smile
      px(ctx, x+s*0.42, y+s*0.42+bob, s*0.16, s*0.02, "#1a1a1a");
      // pickaxe in right hand
      ctx.save();
      ctx.translate(x+s*0.84, y+s*0.58+bob);
      ctx.rotate(-0.3);
      ctx.fillStyle = "#7a4828";
      ctx.fillRect(-s*0.02, -s*0.18, s*0.04, s*0.30);
      ctx.fillStyle = "#a0a0a8";
      ctx.fillRect(-s*0.10, -s*0.20, s*0.20, s*0.06);
      ctx.fillStyle = "#5a5a60";
      ctx.fillRect(-s*0.10, -s*0.16, s*0.20, s*0.02);
      ctx.restore();
      // HOP badge
      ctx.fillStyle = "#5865f2";
      ctx.fillRect(x+s*0.40, y+s*0.84+bob, s*0.20, s*0.06);
      ctx.fillStyle = "#fff";
      ctx.font = `bold ${Math.floor(s*0.045)}px monospace`;
      ctx.textAlign = "center";
      ctx.fillText("HOP", x+s*0.50, y+s*0.885+bob);
      ctx.textAlign = "start";
    },

    NIT(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t*0.003) * (s*0.012);
      shadow(ctx, x+s/2, y+s-4, s*0.34, 5);
      // legs (denim blue)
      px(ctx, x+s*0.34, y+s*0.74+bob, s*0.12, s*0.20, "#2a4868");
      px(ctx, x+s*0.54, y+s*0.74+bob, s*0.12, s*0.20, "#2a4868");
      // cyan shirt body
      px(ctx, x+s*0.30, y+s*0.46+bob, s*0.40, s*0.30, "#3aa8c8");
      // arms
      px(ctx, x+s*0.16, y+s*0.46+bob, s*0.14, s*0.24, "#ffd0a8");
      px(ctx, x+s*0.70, y+s*0.46+bob, s*0.14, s*0.24, "#ffd0a8");
      // cubic head
      px(ctx, x+s*0.30, y+s*0.18+bob, s*0.40, s*0.30, "#ffd0a8");
      // brown hair (Steve-style)
      px(ctx, x+s*0.30, y+s*0.18+bob, s*0.40, s*0.08, "#7a4828");
      px(ctx, x+s*0.30, y+s*0.18+bob, s*0.04, s*0.10, "#7a4828");
      px(ctx, x+s*0.66, y+s*0.18+bob, s*0.04, s*0.10, "#7a4828");
      // eyes
      px(ctx, x+s*0.36, y+s*0.30+bob, s*0.08, s*0.04, "#fff");
      px(ctx, x+s*0.56, y+s*0.30+bob, s*0.08, s*0.04, "#fff");
      px(ctx, x+s*0.40, y+s*0.30+bob, s*0.04, s*0.04, "#1a4a8a");
      px(ctx, x+s*0.60, y+s*0.30+bob, s*0.04, s*0.04, "#1a4a8a");
      // mouth/beard
      px(ctx, x+s*0.40, y+s*0.40+bob, s*0.20, s*0.02, "#5a3818");
      // diamond sword
      ctx.save();
      ctx.translate(x+s*0.84, y+s*0.50+bob);
      ctx.rotate(-0.2);
      ctx.fillStyle = "#7fdcff";
      ctx.fillRect(-s*0.04, -s*0.26, s*0.08, s*0.40);
      ctx.fillStyle = "#5fa8d8";
      ctx.fillRect(-s*0.04, -s*0.26, s*0.04, s*0.40);
      ctx.fillStyle = "#7a4828";
      ctx.fillRect(-s*0.08, s*0.14, s*0.16, s*0.04);
      ctx.fillStyle = "#a07050";
      ctx.fillRect(-s*0.02, s*0.18, s*0.04, s*0.08);
      ctx.restore();
      // PLOT badge
      ctx.fillStyle = "#5865f2";
      ctx.fillRect(x+s*0.38, y+s*0.84+bob, s*0.24, s*0.06);
      ctx.fillStyle = "#fff";
      ctx.font = `bold ${Math.floor(s*0.045)}px monospace`;
      ctx.textAlign = "center";
      ctx.fillText("PLOT", x+s*0.50, y+s*0.885+bob);
      ctx.textAlign = "start";
    },

    ALXROAR(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t*0.003) * (s*0.012);
      shadow(ctx, x+s/2, y+s-4, s*0.34, 5);
      // purple wizard robe
      ctx.fillStyle = "#6a30c0";
      ctx.beginPath();
      ctx.moveTo(x+s*0.20, y+s*0.50+bob);
      ctx.lineTo(x+s*0.16, y+s*0.96+bob);
      ctx.lineTo(x+s*0.84, y+s*0.96+bob);
      ctx.lineTo(x+s*0.80, y+s*0.50+bob);
      ctx.closePath();
      ctx.fill();
      // robe trim gold
      ctx.fillStyle = "#ffd700";
      ctx.fillRect(x+s*0.18, y+s*0.92+bob, s*0.66, s*0.04);
      // sleeves
      px(ctx, x+s*0.10, y+s*0.50+bob, s*0.14, s*0.24, "#6a30c0");
      px(ctx, x+s*0.76, y+s*0.50+bob, s*0.14, s*0.24, "#6a30c0");
      // face
      ctx.fillStyle = "#ffd8b8";
      ctx.beginPath();
      ctx.ellipse(x+s*0.5, y+s*0.42+bob, s*0.16, s*0.16, 0, 0, Math.PI*2);
      ctx.fill();
      // wizard beard (white)
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.moveTo(x+s*0.36, y+s*0.46+bob);
      ctx.quadraticCurveTo(x+s*0.50, y+s*0.66+bob, x+s*0.64, y+s*0.46+bob);
      ctx.lineTo(x+s*0.60, y+s*0.50+bob);
      ctx.lineTo(x+s*0.40, y+s*0.50+bob);
      ctx.closePath();
      ctx.fill();
      // eyes
      ctx.fillStyle = "#1a1a1a";
      ctx.beginPath(); ctx.arc(x+s*0.44, y+s*0.42+bob, s*0.014, 0, Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(x+s*0.56, y+s*0.42+bob, s*0.014, 0, Math.PI*2); ctx.fill();
      // wizard hat
      ctx.fillStyle = "#3a1a6a";
      ctx.beginPath();
      ctx.moveTo(x+s*0.30, y+s*0.30+bob);
      ctx.lineTo(x+s*0.50, y+s*0.04+bob);
      ctx.lineTo(x+s*0.70, y+s*0.30+bob);
      ctx.closePath();
      ctx.fill();
      // hat brim
      ctx.fillStyle = "#3a1a6a";
      ctx.fillRect(x+s*0.24, y+s*0.28+bob, s*0.52, s*0.06);
      // gold star wand
      ctx.save();
      ctx.translate(x+s*0.86, y+s*0.40+bob);
      ctx.rotate(-0.4);
      ctx.fillStyle = "#5a3818";
      ctx.fillRect(-s*0.02, 0, s*0.04, s*0.30);
      // gold star tip
      ctx.fillStyle = "#ffd700";
      ctx.beginPath();
      const sx0 = 0, sy0 = -s*0.04;
      for (let i = 0; i < 10; i++) {
        const a = (i/10)*Math.PI*2 - Math.PI/2;
        const r = i%2===0 ? s*0.06 : s*0.025;
        const px2 = sx0 + Math.cos(a)*r;
        const py2 = sy0 + Math.sin(a)*r;
        if (i===0) ctx.moveTo(px2, py2); else ctx.lineTo(px2, py2);
      }
      ctx.closePath();
      ctx.fill();
      ctx.restore();
      // orbiting sparkles
      const sT = t*0.004;
      for (let i = 0; i < 4; i++) {
        const a = sT + i*(Math.PI*2/4);
        const sxp = x+s*0.86 + Math.cos(a)*s*0.10;
        const syp = y+s*0.40 + Math.sin(a)*s*0.10;
        ctx.fillStyle = "#ffd700";
        ctx.beginPath(); ctx.arc(sxp, syp, s*0.012, 0, Math.PI*2); ctx.fill();
      }
      // MOX badge
      ctx.fillStyle = "#5865f2";
      ctx.fillRect(x+s*0.40, y+s*0.84+bob, s*0.20, s*0.06);
      ctx.fillStyle = "#fff";
      ctx.font = `bold ${Math.floor(s*0.045)}px monospace`;
      ctx.textAlign = "center";
      ctx.fillText("MOX", x+s*0.50, y+s*0.885+bob);
      ctx.textAlign = "start";
    },

    RANGERWILL(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t*0.003) * (s*0.012);
      shadow(ctx, x+s/2, y+s-4, s*0.34, 5);
      // wings
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.moveTo(x+s*0.20, y+s*0.40+bob);
      ctx.quadraticCurveTo(x+s*0.02, y+s*0.30+bob, x+s*0.10, y+s*0.60+bob);
      ctx.quadraticCurveTo(x+s*0.18, y+s*0.50+bob, x+s*0.28, y+s*0.50+bob);
      ctx.closePath();
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(x+s*0.80, y+s*0.40+bob);
      ctx.quadraticCurveTo(x+s*0.98, y+s*0.30+bob, x+s*0.90, y+s*0.60+bob);
      ctx.quadraticCurveTo(x+s*0.82, y+s*0.50+bob, x+s*0.72, y+s*0.50+bob);
      ctx.closePath();
      ctx.fill();
      // feather lines
      ctx.strokeStyle = "#dadce0";
      ctx.lineWidth = Math.max(1, s*0.008);
      ctx.beginPath();
      ctx.moveTo(x+s*0.10, y+s*0.40+bob); ctx.lineTo(x+s*0.20, y+s*0.50+bob);
      ctx.moveTo(x+s*0.90, y+s*0.40+bob); ctx.lineTo(x+s*0.80, y+s*0.50+bob);
      ctx.stroke();
      // pink robe
      ctx.fillStyle = "#ffc0d8";
      ctx.beginPath();
      ctx.ellipse(x+s*0.5, y+s*0.74+bob, s*0.30, s*0.22, 0, 0, Math.PI*2);
      ctx.fill();
      // face
      ctx.fillStyle = "#ffe0d0";
      ctx.beginPath();
      ctx.ellipse(x+s*0.5, y+s*0.42+bob, s*0.18, s*0.18, 0, 0, Math.PI*2);
      ctx.fill();
      // pink hair
      ctx.fillStyle = "#ff80b8";
      px(ctx, x+s*0.30, y+s*0.24+bob, s*0.40, s*0.10, "#ff80b8");
      ctx.beginPath();
      ctx.moveTo(x+s*0.30, y+s*0.34+bob);
      ctx.quadraticCurveTo(x+s*0.20, y+s*0.50+bob, x+s*0.30, y+s*0.54+bob);
      ctx.lineTo(x+s*0.34, y+s*0.46+bob);
      ctx.closePath();
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(x+s*0.70, y+s*0.34+bob);
      ctx.quadraticCurveTo(x+s*0.80, y+s*0.50+bob, x+s*0.70, y+s*0.54+bob);
      ctx.lineTo(x+s*0.66, y+s*0.46+bob);
      ctx.closePath();
      ctx.fill();
      // glowing pulsing halo
      const pulse = 0.5 + Math.sin(t*0.005)*0.5;
      ctx.strokeStyle = `rgba(255,220,120,${pulse})`;
      ctx.lineWidth = Math.max(2, s*0.018);
      ctx.beginPath();
      ctx.ellipse(x+s*0.50, y+s*0.16+bob, s*0.16, s*0.05, 0, 0, Math.PI*2);
      ctx.stroke();
      // big sparkly purple eyes
      ctx.fillStyle = "#a060f0";
      ctx.beginPath(); ctx.arc(x+s*0.43, y+s*0.42+bob, s*0.040, 0, Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(x+s*0.57, y+s*0.42+bob, s*0.040, 0, Math.PI*2); ctx.fill();
      ctx.fillStyle = "#fff";
      ctx.beginPath(); ctx.arc(x+s*0.42, y+s*0.40+bob, s*0.014, 0, Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(x+s*0.56, y+s*0.40+bob, s*0.014, 0, Math.PI*2); ctx.fill();
      // small smile
      ctx.strokeStyle = "#1a1a1a";
      ctx.lineWidth = Math.max(1, s*0.012);
      ctx.beginPath(); ctx.arc(x+s*0.50, y+s*0.50+bob, s*0.025, Math.PI*0.15, Math.PI*0.85); ctx.stroke();
      // HOP badge
      ctx.fillStyle = "#5865f2";
      ctx.fillRect(x+s*0.40, y+s*0.84+bob, s*0.20, s*0.06);
      ctx.fillStyle = "#fff";
      ctx.font = `bold ${Math.floor(s*0.045)}px monospace`;
      ctx.textAlign = "center";
      ctx.fillText("HOP", x+s*0.50, y+s*0.885+bob);
      ctx.textAlign = "start";
    },

    CARRIED(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t*0.003) * (s*0.012);
      shadow(ctx, x+s/2, y+s-4, s*0.34, 5);
      // long brown hair (back)
      ctx.fillStyle = "#5a3818";
      ctx.beginPath();
      ctx.moveTo(x+s*0.30, y+s*0.30+bob);
      ctx.quadraticCurveTo(x+s*0.20, y+s*0.70+bob, x+s*0.30, y+s*0.86+bob);
      ctx.lineTo(x+s*0.70, y+s*0.86+bob);
      ctx.quadraticCurveTo(x+s*0.80, y+s*0.70+bob, x+s*0.70, y+s*0.30+bob);
      ctx.closePath();
      ctx.fill();
      // red armor body
      ctx.fillStyle = "#c01818";
      ctx.beginPath();
      ctx.ellipse(x+s*0.5, y+s*0.66+bob, s*0.30, s*0.22, 0, 0, Math.PI*2);
      ctx.fill();
      // gold chest plate
      ctx.fillStyle = "#ffd700";
      ctx.beginPath();
      ctx.moveTo(x+s*0.40, y+s*0.50+bob);
      ctx.lineTo(x+s*0.60, y+s*0.50+bob);
      ctx.lineTo(x+s*0.62, y+s*0.66+bob);
      ctx.lineTo(x+s*0.50, y+s*0.74+bob);
      ctx.lineTo(x+s*0.38, y+s*0.66+bob);
      ctx.closePath();
      ctx.fill();
      // chest plate trim
      ctx.fillStyle = "#a07020";
      ctx.beginPath();
      ctx.moveTo(x+s*0.42, y+s*0.52+bob);
      ctx.lineTo(x+s*0.58, y+s*0.52+bob);
      ctx.stroke();
      // face
      ctx.fillStyle = "#ffd8b8";
      ctx.beginPath();
      ctx.ellipse(x+s*0.5, y+s*0.36+bob, s*0.16, s*0.16, 0, 0, Math.PI*2);
      ctx.fill();
      // bangs
      ctx.fillStyle = "#5a3818";
      px(ctx, x+s*0.32, y+s*0.20+bob, s*0.36, s*0.10, "#5a3818");
      px(ctx, x+s*0.34, y+s*0.30+bob, s*0.06, s*0.06, "#5a3818");
      px(ctx, x+s*0.60, y+s*0.30+bob, s*0.06, s*0.06, "#5a3818");
      // eyes
      ctx.fillStyle = "#fff";
      ctx.beginPath(); ctx.arc(x+s*0.44, y+s*0.36+bob, s*0.030, 0, Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(x+s*0.56, y+s*0.36+bob, s*0.030, 0, Math.PI*2); ctx.fill();
      ctx.fillStyle = "#a02020";
      ctx.beginPath(); ctx.arc(x+s*0.44, y+s*0.36+bob, s*0.014, 0, Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(x+s*0.56, y+s*0.36+bob, s*0.014, 0, Math.PI*2); ctx.fill();
      // mouth
      ctx.strokeStyle = "#1a1a1a";
      ctx.lineWidth = Math.max(1, s*0.010);
      ctx.beginPath(); ctx.moveTo(x+s*0.46, y+s*0.44+bob); ctx.lineTo(x+s*0.54, y+s*0.44+bob); ctx.stroke();
      // BIG vertical broadsword on left
      ctx.fillStyle = "#dadce0";
      ctx.fillRect(x+s*0.10, y+s*0.16+bob, s*0.10, s*0.60);
      ctx.fillStyle = "#fff";
      ctx.fillRect(x+s*0.10, y+s*0.16+bob, s*0.04, s*0.60);
      ctx.fillStyle = "#ffd700";
      ctx.fillRect(x+s*0.04, y+s*0.74+bob, s*0.22, s*0.06);
      ctx.fillStyle = "#7a4828";
      ctx.fillRect(x+s*0.12, y+s*0.80+bob, s*0.06, s*0.10);
      // HOP badge
      ctx.fillStyle = "#5865f2";
      ctx.fillRect(x+s*0.66, y+s*0.86+bob, s*0.20, s*0.06);
      ctx.fillStyle = "#fff";
      ctx.font = `bold ${Math.floor(s*0.045)}px monospace`;
      ctx.textAlign = "center";
      ctx.fillText("HOP", x+s*0.76, y+s*0.905+bob);
      ctx.textAlign = "start";
    },

    _KEE_(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t*0.003) * (s*0.012);
      shadow(ctx, x+s/2, y+s-4, s*0.34, 5);
      // pink dress
      ctx.fillStyle = "#ffb0d0";
      ctx.beginPath();
      ctx.moveTo(x+s*0.24, y+s*0.54+bob);
      ctx.lineTo(x+s*0.18, y+s*0.96+bob);
      ctx.lineTo(x+s*0.82, y+s*0.96+bob);
      ctx.lineTo(x+s*0.76, y+s*0.54+bob);
      ctx.closePath();
      ctx.fill();
      // red bow at chest
      ctx.fillStyle = "#ed4245";
      ctx.beginPath();
      ctx.moveTo(x+s*0.42, y+s*0.58+bob);
      ctx.lineTo(x+s*0.36, y+s*0.54+bob);
      ctx.lineTo(x+s*0.36, y+s*0.62+bob);
      ctx.closePath();
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(x+s*0.58, y+s*0.58+bob);
      ctx.lineTo(x+s*0.64, y+s*0.54+bob);
      ctx.lineTo(x+s*0.64, y+s*0.62+bob);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = "#a01020";
      ctx.fillRect(x+s*0.46, y+s*0.56+bob, s*0.08, s*0.06);
      // pink twin tails
      ctx.fillStyle = "#ff80c0";
      ctx.beginPath();
      ctx.moveTo(x+s*0.20, y+s*0.30+bob);
      ctx.quadraticCurveTo(x+s*0.04, y+s*0.50+bob, x+s*0.16, y+s*0.74+bob);
      ctx.lineTo(x+s*0.28, y+s*0.50+bob);
      ctx.closePath();
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(x+s*0.80, y+s*0.30+bob);
      ctx.quadraticCurveTo(x+s*0.96, y+s*0.50+bob, x+s*0.84, y+s*0.74+bob);
      ctx.lineTo(x+s*0.72, y+s*0.50+bob);
      ctx.closePath();
      ctx.fill();
      // face
      ctx.fillStyle = "#ffe0e8";
      ctx.beginPath();
      ctx.ellipse(x+s*0.5, y+s*0.40+bob, s*0.18, s*0.20, 0, 0, Math.PI*2);
      ctx.fill();
      // bangs
      ctx.fillStyle = "#ff80c0";
      px(ctx, x+s*0.30, y+s*0.20+bob, s*0.40, s*0.12, "#ff80c0");
      // big sparkly pink eyes
      ctx.fillStyle = "#ff60a8";
      ctx.beginPath(); ctx.arc(x+s*0.43, y+s*0.42+bob, s*0.045, 0, Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(x+s*0.57, y+s*0.42+bob, s*0.045, 0, Math.PI*2); ctx.fill();
      ctx.fillStyle = "#fff";
      ctx.beginPath(); ctx.arc(x+s*0.42, y+s*0.40+bob, s*0.018, 0, Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(x+s*0.56, y+s*0.40+bob, s*0.018, 0, Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(x+s*0.45, y+s*0.44+bob, s*0.008, 0, Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(x+s*0.59, y+s*0.44+bob, s*0.008, 0, Math.PI*2); ctx.fill();
      // small mouth
      ctx.strokeStyle = "#1a1a1a";
      ctx.lineWidth = Math.max(1, s*0.010);
      ctx.beginPath(); ctx.moveTo(x+s*0.48, y+s*0.50+bob); ctx.lineTo(x+s*0.52, y+s*0.50+bob); ctx.stroke();
      // floating sparkles
      const sT = t*0.004;
      for (let i = 0; i < 5; i++) {
        const a = sT + i*(Math.PI*2/5);
        const sxp = x+s*0.5 + Math.cos(a)*s*0.40;
        const syp = y+s*0.5 + Math.sin(a)*s*0.32;
        ctx.fillStyle = "#fff";
        ctx.fillRect(sxp-1, syp-1, 2, 2);
      }
      // JUST badge
      ctx.fillStyle = "#5865f2";
      ctx.fillRect(x+s*0.40, y+s*0.84+bob, s*0.20, s*0.06);
      ctx.fillStyle = "#fff";
      ctx.font = `bold ${Math.floor(s*0.045)}px monospace`;
      ctx.textAlign = "center";
      ctx.fillText("JUST", x+s*0.50, y+s*0.885+bob);
      ctx.textAlign = "start";
    },

    _WISHRAM_(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t*0.003) * (s*0.012);
      const tailWag = Math.sin(t*0.005) * (s*0.04);
      shadow(ctx, x+s/2, y+s-4, s*0.34, 5);
      // chubby orange tabby body
      ctx.fillStyle = "#ff9540";
      ctx.beginPath();
      ctx.ellipse(x+s*0.5, y+s*0.66+bob, s*0.36, s*0.30, 0, 0, Math.PI*2);
      ctx.fill();
      // belly stripes
      ctx.fillStyle = "#c06820";
      for (let i = 0; i < 4; i++) {
        ctx.fillRect(x+s*(0.32 + i*0.10), y+s*0.74+bob, s*0.04, s*0.10);
      }
      // tail wagging
      ctx.fillStyle = "#ff9540";
      ctx.beginPath();
      ctx.moveTo(x+s*0.84, y+s*0.66+bob);
      ctx.quadraticCurveTo(x+s*0.96+tailWag, y+s*0.50+bob, x+s*0.88+tailWag, y+s*0.36+bob);
      ctx.lineTo(x+s*0.84+tailWag, y+s*0.40+bob);
      ctx.lineTo(x+s*0.80, y+s*0.62+bob);
      ctx.closePath();
      ctx.fill();
      // tail stripes
      ctx.fillStyle = "#c06820";
      ctx.fillRect(x+s*0.86, y+s*0.50+bob, s*0.04, s*0.04);
      ctx.fillRect(x+s*0.86+tailWag*0.5, y+s*0.42+bob, s*0.04, s*0.04);
      // head
      ctx.fillStyle = "#ff9540";
      ctx.beginPath();
      ctx.ellipse(x+s*0.5, y+s*0.36+bob, s*0.26, s*0.24, 0, 0, Math.PI*2);
      ctx.fill();
      // M forehead pattern
      ctx.fillStyle = "#c06820";
      ctx.beginPath();
      ctx.moveTo(x+s*0.40, y+s*0.20+bob);
      ctx.lineTo(x+s*0.44, y+s*0.30+bob);
      ctx.lineTo(x+s*0.50, y+s*0.22+bob);
      ctx.lineTo(x+s*0.56, y+s*0.30+bob);
      ctx.lineTo(x+s*0.60, y+s*0.20+bob);
      ctx.lineTo(x+s*0.58, y+s*0.18+bob);
      ctx.lineTo(x+s*0.42, y+s*0.18+bob);
      ctx.closePath();
      ctx.fill();
      // triangle ears
      ctx.fillStyle = "#ff9540";
      ctx.beginPath();
      ctx.moveTo(x+s*0.28, y+s*0.20+bob);
      ctx.lineTo(x+s*0.32, y+s*0.06+bob);
      ctx.lineTo(x+s*0.40, y+s*0.18+bob);
      ctx.closePath();
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(x+s*0.72, y+s*0.20+bob);
      ctx.lineTo(x+s*0.68, y+s*0.06+bob);
      ctx.lineTo(x+s*0.60, y+s*0.18+bob);
      ctx.closePath();
      ctx.fill();
      // pink inner ears
      ctx.fillStyle = "#ffb0c0";
      ctx.beginPath();
      ctx.moveTo(x+s*0.32, y+s*0.16+bob);
      ctx.lineTo(x+s*0.34, y+s*0.10+bob);
      ctx.lineTo(x+s*0.38, y+s*0.16+bob);
      ctx.closePath();
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(x+s*0.68, y+s*0.16+bob);
      ctx.lineTo(x+s*0.66, y+s*0.10+bob);
      ctx.lineTo(x+s*0.62, y+s*0.16+bob);
      ctx.closePath();
      ctx.fill();
      // big green eyes with vertical pupil
      ctx.fillStyle = "#fff";
      ctx.beginPath(); ctx.arc(x+s*0.42, y+s*0.36+bob, s*0.040, 0, Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(x+s*0.58, y+s*0.36+bob, s*0.040, 0, Math.PI*2); ctx.fill();
      ctx.fillStyle = "#3aa838";
      ctx.beginPath(); ctx.arc(x+s*0.42, y+s*0.36+bob, s*0.034, 0, Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(x+s*0.58, y+s*0.36+bob, s*0.034, 0, Math.PI*2); ctx.fill();
      // vertical pupil
      ctx.fillStyle = "#1a1a1a";
      ctx.fillRect(x+s*0.418, y+s*0.336+bob, s*0.008, s*0.044);
      ctx.fillRect(x+s*0.578, y+s*0.336+bob, s*0.008, s*0.044);
      // pink nose
      ctx.fillStyle = "#ff80a0";
      ctx.beginPath();
      ctx.moveTo(x+s*0.50, y+s*0.42+bob);
      ctx.lineTo(x+s*0.46, y+s*0.46+bob);
      ctx.lineTo(x+s*0.54, y+s*0.46+bob);
      ctx.closePath();
      ctx.fill();
      // :3 mouth
      ctx.strokeStyle = "#1a1a1a";
      ctx.lineWidth = Math.max(1, s*0.012);
      ctx.beginPath();
      ctx.moveTo(x+s*0.42, y+s*0.50+bob);
      ctx.quadraticCurveTo(x+s*0.50, y+s*0.54+bob, x+s*0.50, y+s*0.50+bob);
      ctx.quadraticCurveTo(x+s*0.50, y+s*0.54+bob, x+s*0.58, y+s*0.50+bob);
      ctx.stroke();
      // tiny gold crown on top
      ctx.fillStyle = "#ffd700";
      ctx.beginPath();
      ctx.moveTo(x+s*0.42, y+s*0.10+bob);
      ctx.lineTo(x+s*0.44, y+s*0.04+bob);
      ctx.lineTo(x+s*0.48, y+s*0.08+bob);
      ctx.lineTo(x+s*0.50, y+s*0.02+bob);
      ctx.lineTo(x+s*0.52, y+s*0.08+bob);
      ctx.lineTo(x+s*0.56, y+s*0.04+bob);
      ctx.lineTo(x+s*0.58, y+s*0.10+bob);
      ctx.closePath();
      ctx.fill();
      // CUTE badge
      ctx.fillStyle = "#5865f2";
      ctx.fillRect(x+s*0.38, y+s*0.86+bob, s*0.24, s*0.06);
      ctx.fillStyle = "#fff";
      ctx.font = `bold ${Math.floor(s*0.045)}px monospace`;
      ctx.textAlign = "center";
      ctx.fillText("CUTE", x+s*0.50, y+s*0.905+bob);
      ctx.textAlign = "start";
    },

    JUST_MILES(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t*0.003) * (s*0.012);
      shadow(ctx, x+s/2, y+s-4, s*0.34, 5);
      // dark cloak body
      ctx.fillStyle = "#1a1a2a";
      ctx.beginPath();
      ctx.moveTo(x+s*0.20, y+s*0.50+bob);
      ctx.lineTo(x+s*0.16, y+s*0.96+bob);
      ctx.lineTo(x+s*0.84, y+s*0.96+bob);
      ctx.lineTo(x+s*0.80, y+s*0.50+bob);
      ctx.closePath();
      ctx.fill();
      // hood
      ctx.fillStyle = "#0a0a14";
      ctx.beginPath();
      ctx.ellipse(x+s*0.50, y+s*0.36+bob, s*0.26, s*0.28, 0, 0, Math.PI*2);
      ctx.fill();
      // shadowed face
      ctx.fillStyle = "#3a3a4a";
      ctx.beginPath();
      ctx.ellipse(x+s*0.50, y+s*0.42+bob, s*0.16, s*0.18, 0, 0, Math.PI*2);
      ctx.fill();
      // heavy upper-face shadow
      ctx.fillStyle = "rgba(0,0,0,0.6)";
      ctx.fillRect(x+s*0.34, y+s*0.30+bob, s*0.32, s*0.10);
      // glowing red eye-slits
      const glow = 0.6 + Math.sin(t*0.006)*0.4;
      ctx.fillStyle = `rgba(255,40,40,${glow})`;
      ctx.fillRect(x+s*0.40, y+s*0.40+bob, s*0.06, s*0.02);
      ctx.fillRect(x+s*0.54, y+s*0.40+bob, s*0.06, s*0.02);
      // gold star medal on red ribbon
      // ribbon
      ctx.fillStyle = "#a01020";
      ctx.beginPath();
      ctx.moveTo(x+s*0.38, y+s*0.60+bob);
      ctx.lineTo(x+s*0.50, y+s*0.74+bob);
      ctx.lineTo(x+s*0.62, y+s*0.60+bob);
      ctx.lineTo(x+s*0.56, y+s*0.58+bob);
      ctx.lineTo(x+s*0.50, y+s*0.66+bob);
      ctx.lineTo(x+s*0.44, y+s*0.58+bob);
      ctx.closePath();
      ctx.fill();
      // gold star
      ctx.fillStyle = "#ffd700";
      ctx.beginPath();
      const sx0 = x+s*0.50, sy0 = y+s*0.78+bob;
      for (let i = 0; i < 10; i++) {
        const a = (i/10)*Math.PI*2 - Math.PI/2;
        const r = i%2===0 ? s*0.07 : s*0.030;
        const px2 = sx0 + Math.cos(a)*r;
        const py2 = sy0 + Math.sin(a)*r;
        if (i===0) ctx.moveTo(px2, py2); else ctx.lineTo(px2, py2);
      }
      ctx.closePath();
      ctx.fill();
      // star center
      ctx.fillStyle = "#a07020";
      ctx.beginPath(); ctx.arc(sx0, sy0, s*0.020, 0, Math.PI*2); ctx.fill();
      // JUST badge
      ctx.fillStyle = "#5865f2";
      ctx.fillRect(x+s*0.04, y+s*0.86+bob, s*0.18, s*0.06);
      ctx.fillStyle = "#fff";
      ctx.font = `bold ${Math.floor(s*0.045)}px monospace`;
      ctx.textAlign = "center";
      ctx.fillText("JUST", x+s*0.13, y+s*0.905+bob);
      ctx.textAlign = "start";
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
    },

    XL_MATTHEW100(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t*0.003) * (s*0.012);
      shadow(ctx, x+s/2, y+s-4, s*0.34, 5);
      // green pants
      px(ctx, x+s*0.32, y+s*0.74+bob, s*0.14, s*0.22, "#3a8838");
      px(ctx, x+s*0.54, y+s*0.74+bob, s*0.14, s*0.22, "#3a8838");
      // yellow open shirt
      ctx.fillStyle = "#ffd86a";
      ctx.beginPath();
      ctx.moveTo(x+s*0.22, y+s*0.54+bob);
      ctx.lineTo(x+s*0.22, y+s*0.78+bob);
      ctx.lineTo(x+s*0.78, y+s*0.78+bob);
      ctx.lineTo(x+s*0.78, y+s*0.54+bob);
      ctx.closePath();
      ctx.fill();
      // red stripe
      ctx.fillStyle = "#ed4245";
      ctx.fillRect(x+s*0.22, y+s*0.62+bob, s*0.56, s*0.04);
      // skin chest
      ctx.fillStyle = "#ffd0a8";
      ctx.fillRect(x+s*0.42, y+s*0.54+bob, s*0.16, s*0.18);
      // arms
      px(ctx, x+s*0.10, y+s*0.56+bob, s*0.12, s*0.20, "#ffd86a");
      px(ctx, x+s*0.78, y+s*0.56+bob, s*0.12, s*0.20, "#ffd86a");
      // face
      ctx.fillStyle = "#ffd0a8";
      ctx.beginPath();
      ctx.ellipse(x+s*0.5, y+s*0.40+bob, s*0.18, s*0.20, 0, 0, Math.PI*2);
      ctx.fill();
      // messy brown/blonde hair
      ctx.fillStyle = "#a07028";
      ctx.beginPath();
      ctx.moveTo(x+s*0.30, y+s*0.30+bob);
      ctx.lineTo(x+s*0.32, y+s*0.18+bob);
      ctx.lineTo(x+s*0.40, y+s*0.24+bob);
      ctx.lineTo(x+s*0.46, y+s*0.16+bob);
      ctx.lineTo(x+s*0.54, y+s*0.22+bob);
      ctx.lineTo(x+s*0.60, y+s*0.16+bob);
      ctx.lineTo(x+s*0.68, y+s*0.20+bob);
      ctx.lineTo(x+s*0.70, y+s*0.30+bob);
      ctx.closePath();
      ctx.fill();
      // red bandana with white dots
      ctx.fillStyle = "#ed4245";
      ctx.fillRect(x+s*0.30, y+s*0.28+bob, s*0.40, s*0.04);
      ctx.fillStyle = "#fff";
      ctx.beginPath(); ctx.arc(x+s*0.36, y+s*0.30+bob, s*0.008, 0, Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(x+s*0.46, y+s*0.30+bob, s*0.008, 0, Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(x+s*0.56, y+s*0.30+bob, s*0.008, 0, Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(x+s*0.66, y+s*0.30+bob, s*0.008, 0, Math.PI*2); ctx.fill();
      // sharper angled eyebrows
      ctx.strokeStyle = "#5a3818";
      ctx.lineWidth = Math.max(1, s*0.014);
      ctx.beginPath();
      ctx.moveTo(x+s*0.40, y+s*0.36+bob); ctx.lineTo(x+s*0.46, y+s*0.38+bob);
      ctx.moveTo(x+s*0.60, y+s*0.36+bob); ctx.lineTo(x+s*0.54, y+s*0.38+bob);
      ctx.stroke();
      // eyes
      ctx.fillStyle = "#fff";
      ctx.beginPath(); ctx.arc(x+s*0.43, y+s*0.42+bob, s*0.025, 0, Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(x+s*0.57, y+s*0.42+bob, s*0.025, 0, Math.PI*2); ctx.fill();
      ctx.fillStyle = "#1a1a1a";
      ctx.beginPath(); ctx.arc(x+s*0.43, y+s*0.42+bob, s*0.012, 0, Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(x+s*0.57, y+s*0.42+bob, s*0.012, 0, Math.PI*2); ctx.fill();
      // smirk
      ctx.strokeStyle = "#1a1a1a";
      ctx.lineWidth = Math.max(1, s*0.012);
      ctx.beginPath();
      ctx.moveTo(x+s*0.46, y+s*0.50+bob);
      ctx.quadraticCurveTo(x+s*0.52, y+s*0.54+bob, x+s*0.58, y+s*0.48+bob);
      ctx.stroke();
      // FM badge
      ctx.fillStyle = "#5865f2";
      ctx.fillRect(x+s*0.40, y+s*0.86+bob, s*0.20, s*0.06);
      ctx.fillStyle = "#fff";
      ctx.font = `bold ${Math.floor(s*0.045)}px monospace`;
      ctx.textAlign = "center";
      ctx.fillText("FM", x+s*0.50, y+s*0.905+bob);
      ctx.textAlign = "start";
    },

    // ===== MEMERS / STREAMERS / CODERS =====
    FORGBEAR1(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t*0.005) * (s*0.018);
      shadow(ctx, x+s/2, y+s-4, s*0.34, 5);
      // bulbous lopsided green head
      ctx.fillStyle = "#5fa838";
      ctx.beginPath();
      ctx.ellipse(x+s*0.48, y+s*0.50+bob, s*0.34, s*0.30, 0.2, 0, Math.PI*2);
      ctx.fill();
      // sickly yellow-green chin
      ctx.fillStyle = "#a8c838";
      ctx.beginPath();
      ctx.ellipse(x+s*0.50, y+s*0.66+bob, s*0.22, s*0.10, 0, 0, Math.PI*2);
      ctx.fill();
      // bulging too-big white eyes
      ctx.fillStyle = "#fff";
      ctx.beginPath(); ctx.arc(x+s*0.36, y+s*0.36+bob, s*0.10, 0, Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(x+s*0.62, y+s*0.34+bob, s*0.10, 0, Math.PI*2); ctx.fill();
      // bloodshot streaks
      ctx.strokeStyle = "#c01818";
      ctx.lineWidth = Math.max(1, s*0.006);
      ctx.beginPath();
      ctx.moveTo(x+s*0.30, y+s*0.32+bob); ctx.lineTo(x+s*0.38, y+s*0.36+bob);
      ctx.moveTo(x+s*0.32, y+s*0.42+bob); ctx.lineTo(x+s*0.38, y+s*0.38+bob);
      ctx.moveTo(x+s*0.66, y+s*0.30+bob); ctx.lineTo(x+s*0.62, y+s*0.34+bob);
      ctx.moveTo(x+s*0.68, y+s*0.40+bob); ctx.lineTo(x+s*0.62, y+s*0.36+bob);
      ctx.stroke();
      // tiny crazed pupils darting
      const dart = Math.sin(t*0.020)*s*0.015;
      ctx.fillStyle = "#1a1a1a";
      ctx.beginPath(); ctx.arc(x+s*0.36+dart, y+s*0.36+bob, s*0.015, 0, Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(x+s*0.62-dart, y+s*0.34+bob, s*0.015, 0, Math.PI*2); ctx.fill();
      // massive unhinged grin
      ctx.fillStyle = "#1a1a1a";
      ctx.beginPath();
      ctx.ellipse(x+s*0.48, y+s*0.60+bob, s*0.20, s*0.10, 0, 0, Math.PI*2);
      ctx.fill();
      // jagged teeth
      ctx.fillStyle = "#fff";
      for (let i = 0; i < 7; i++) {
        ctx.beginPath();
        ctx.moveTo(x+s*(0.30+i*0.06), y+s*0.54+bob);
        ctx.lineTo(x+s*(0.33+i*0.06), y+s*0.62+bob);
        ctx.lineTo(x+s*(0.36+i*0.06), y+s*0.54+bob);
        ctx.closePath();
        ctx.fill();
      }
      // tongue lolling
      ctx.fillStyle = "#ff5598";
      ctx.beginPath();
      ctx.ellipse(x+s*0.54, y+s*0.66+bob, s*0.06, s*0.10, 0.3, 0, Math.PI*2);
      ctx.fill();
      // drool drop
      ctx.fillStyle = "rgba(180,220,255,0.8)";
      ctx.beginPath();
      ctx.ellipse(x+s*0.58, y+s*0.78+bob, s*0.020, s*0.040, 0, 0, Math.PI*2);
      ctx.fill();
    },

    WALKINGGHEAD(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t*0.003) * (s*0.012);
      const stride = Math.sin(t*0.008) * (s*0.04);
      shadow(ctx, x+s/2, y+s-4, s*0.30, 5);
      // stick legs
      ctx.strokeStyle = "#1a1a1a";
      ctx.lineWidth = Math.max(2, s*0.014);
      ctx.beginPath();
      ctx.moveTo(x+s*0.42, y+s*0.74+bob);
      ctx.lineTo(x+s*0.36-stride, y+s*0.92+bob);
      ctx.moveTo(x+s*0.58, y+s*0.74+bob);
      ctx.lineTo(x+s*0.64+stride, y+s*0.92+bob);
      ctx.stroke();
      // shoes
      ctx.fillStyle = "#1a1a1a";
      ctx.fillRect(x+s*0.30-stride, y+s*0.90+bob, s*0.10, s*0.04);
      ctx.fillRect(x+s*0.60+stride, y+s*0.90+bob, s*0.10, s*0.04);
      // yellow emoji head
      ctx.fillStyle = "#ffd86a";
      ctx.beginPath();
      ctx.arc(x+s*0.50, y+s*0.40+bob, s*0.30, 0, Math.PI*2);
      ctx.fill();
      // shading
      ctx.fillStyle = "#e8b048";
      ctx.beginPath();
      ctx.arc(x+s*0.50, y+s*0.46+bob, s*0.30, 0, Math.PI);
      ctx.fill();
      // big black dot eyes
      ctx.fillStyle = "#1a1a1a";
      ctx.beginPath(); ctx.arc(x+s*0.40, y+s*0.36+bob, s*0.04, 0, Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(x+s*0.60, y+s*0.36+bob, s*0.04, 0, Math.PI*2); ctx.fill();
      // big curved arc smile
      ctx.strokeStyle = "#1a1a1a";
      ctx.lineWidth = Math.max(2, s*0.020);
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.arc(x+s*0.50, y+s*0.46+bob, s*0.12, Math.PI*0.15, Math.PI*0.85);
      ctx.stroke();
      ctx.lineCap = "butt";
      // stick arms swinging
      ctx.lineWidth = Math.max(2, s*0.014);
      ctx.beginPath();
      ctx.moveTo(x+s*0.30, y+s*0.62+bob);
      ctx.lineTo(x+s*0.18+stride, y+s*0.74+bob);
      ctx.moveTo(x+s*0.70, y+s*0.62+bob);
      ctx.lineTo(x+s*0.82-stride, y+s*0.74+bob);
      ctx.stroke();
    },

    RONIC(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t*0.003) * (s*0.012);
      shadow(ctx, x+s/2, y+s-4, s*0.34, 5);
      // legs
      px(ctx, x+s*0.34, y+s*0.74+bob, s*0.12, s*0.20, "#2a4868");
      px(ctx, x+s*0.54, y+s*0.74+bob, s*0.12, s*0.20, "#2a4868");
      // body
      px(ctx, x+s*0.30, y+s*0.46+bob, s*0.40, s*0.30, "#a04590");
      // arms
      px(ctx, x+s*0.16, y+s*0.46+bob, s*0.14, s*0.24, "#ffd0a8");
      px(ctx, x+s*0.70, y+s*0.46+bob, s*0.14, s*0.24, "#ffd0a8");
      // cubic head
      px(ctx, x+s*0.30, y+s*0.18+bob, s*0.40, s*0.30, "#ffd0a8");
      // dark hair
      px(ctx, x+s*0.30, y+s*0.18+bob, s*0.40, s*0.04, "#1a1a1a");
      // gold crown
      ctx.fillStyle = "#ffd700";
      ctx.beginPath();
      ctx.moveTo(x+s*0.30, y+s*0.18+bob);
      ctx.lineTo(x+s*0.34, y+s*0.06+bob);
      ctx.lineTo(x+s*0.40, y+s*0.14+bob);
      ctx.lineTo(x+s*0.50, y+s*0.04+bob);
      ctx.lineTo(x+s*0.60, y+s*0.14+bob);
      ctx.lineTo(x+s*0.66, y+s*0.06+bob);
      ctx.lineTo(x+s*0.70, y+s*0.18+bob);
      ctx.closePath();
      ctx.fill();
      // red gem on crown
      ctx.fillStyle = "#ed4245";
      ctx.beginPath(); ctx.arc(x+s*0.50, y+s*0.10+bob, s*0.022, 0, Math.PI*2); ctx.fill();
      // sunglasses bar
      ctx.fillStyle = "#1a1a1a";
      ctx.fillRect(x+s*0.32, y+s*0.30+bob, s*0.36, s*0.06);
      // shades highlight
      ctx.fillStyle = "rgba(255,255,255,0.3)";
      ctx.fillRect(x+s*0.34, y+s*0.31+bob, s*0.06, s*0.02);
      ctx.fillRect(x+s*0.54, y+s*0.31+bob, s*0.06, s*0.02);
      // smug smirk
      ctx.strokeStyle = "#1a1a1a";
      ctx.lineWidth = Math.max(1, s*0.012);
      ctx.beginPath();
      ctx.moveTo(x+s*0.42, y+s*0.42+bob);
      ctx.quadraticCurveTo(x+s*0.50, y+s*0.46+bob, x+s*0.58, y+s*0.40+bob);
      ctx.stroke();
      // controller in hands
      ctx.fillStyle = "#1a1a1a";
      ctx.fillRect(x+s*0.32, y+s*0.62+bob, s*0.36, s*0.10);
      ctx.fillStyle = "#5865f2";
      ctx.beginPath(); ctx.arc(x+s*0.40, y+s*0.66+bob, s*0.018, 0, Math.PI*2); ctx.fill();
      ctx.fillStyle = "#ed4245";
      ctx.beginPath(); ctx.arc(x+s*0.60, y+s*0.66+bob, s*0.018, 0, Math.PI*2); ctx.fill();
      // KING badge
      ctx.fillStyle = "#5865f2";
      ctx.fillRect(x+s*0.38, y+s*0.86+bob, s*0.24, s*0.06);
      ctx.fillStyle = "#fff";
      ctx.font = `bold ${Math.floor(s*0.045)}px monospace`;
      ctx.textAlign = "center";
      ctx.fillText("KING", x+s*0.50, y+s*0.905+bob);
      ctx.textAlign = "start";
    },

    BLACK_JACK(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t*0.003) * (s*0.012);
      shadow(ctx, x+s/2, y+s-4, s*0.34, 5);
      // dark red moon backdrop
      ctx.fillStyle = "#3a0810";
      ctx.beginPath();
      ctx.arc(x+s*0.78, y+s*0.20, s*0.18, 0, Math.PI*2);
      ctx.fill();
      ctx.fillStyle = "#a01020";
      ctx.beginPath();
      ctx.arc(x+s*0.76, y+s*0.18, s*0.16, 0, Math.PI*2);
      ctx.fill();
      // dark cloak with crimson inner
      ctx.fillStyle = "#a01020";
      ctx.beginPath();
      ctx.moveTo(x+s*0.20, y+s*0.50+bob);
      ctx.lineTo(x+s*0.16, y+s*0.96+bob);
      ctx.lineTo(x+s*0.84, y+s*0.96+bob);
      ctx.lineTo(x+s*0.80, y+s*0.50+bob);
      ctx.closePath();
      ctx.fill();
      // outer cloak
      ctx.fillStyle = "#1a0510";
      ctx.beginPath();
      ctx.moveTo(x+s*0.20, y+s*0.50+bob);
      ctx.lineTo(x+s*0.16, y+s*0.96+bob);
      ctx.lineTo(x+s*0.30, y+s*0.96+bob);
      ctx.lineTo(x+s*0.36, y+s*0.50+bob);
      ctx.closePath();
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(x+s*0.80, y+s*0.50+bob);
      ctx.lineTo(x+s*0.84, y+s*0.96+bob);
      ctx.lineTo(x+s*0.70, y+s*0.96+bob);
      ctx.lineTo(x+s*0.64, y+s*0.50+bob);
      ctx.closePath();
      ctx.fill();
      // long black hair
      ctx.fillStyle = "#0a0510";
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
      // pale face
      ctx.fillStyle = "#f0e0d8";
      ctx.beginPath();
      ctx.ellipse(x+s*0.5, y+s*0.42+bob, s*0.16, s*0.18, 0, 0, Math.PI*2);
      ctx.fill();
      // bangs
      ctx.fillStyle = "#0a0510";
      px(ctx, x+s*0.34, y+s*0.26+bob, s*0.32, s*0.10, "#0a0510");
      // glowing red eyes
      const glow = 0.6 + Math.sin(t*0.006)*0.4;
      ctx.fillStyle = `rgba(255,40,40,${glow})`;
      ctx.beginPath(); ctx.arc(x+s*0.43, y+s*0.42+bob, s*0.030, 0, Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(x+s*0.57, y+s*0.42+bob, s*0.030, 0, Math.PI*2); ctx.fill();
      ctx.fillStyle = "#fff";
      ctx.beginPath(); ctx.arc(x+s*0.43, y+s*0.42+bob, s*0.010, 0, Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(x+s*0.57, y+s*0.42+bob, s*0.010, 0, Math.PI*2); ctx.fill();
      // tiny smirk
      ctx.strokeStyle = "#1a1a1a";
      ctx.lineWidth = Math.max(1, s*0.010);
      ctx.beginPath();
      ctx.moveTo(x+s*0.46, y+s*0.52+bob);
      ctx.quadraticCurveTo(x+s*0.50, y+s*0.55+bob, x+s*0.54, y+s*0.50+bob);
      ctx.stroke();
      // fang
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.moveTo(x+s*0.48, y+s*0.52+bob);
      ctx.lineTo(x+s*0.49, y+s*0.56+bob);
      ctx.lineTo(x+s*0.50, y+s*0.52+bob);
      ctx.closePath();
      ctx.fill();
      // cherry-blossom petals drifting
      const pT = (t*0.001) % 1;
      ctx.fillStyle = "#ffc0d8";
      for (let i = 0; i < 5; i++) {
        const py2 = (pT + i*0.2) % 1;
        const pxp = x + s*(0.10 + i*0.18) + Math.sin(t*0.003 + i)*s*0.04;
        const pyp = y + py2*s*0.8;
        ctx.beginPath();
        ctx.ellipse(pxp, pyp, s*0.012, s*0.020, py2*Math.PI, 0, Math.PI*2);
        ctx.fill();
      }
    },

    WILLIAM_GREGORY(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t*0.0028) * (s*0.010);
      shadow(ctx, x+s/2, y+s-4, s*0.34, 5);
      // black suit jacket
      ctx.fillStyle = "#1a1a1a";
      ctx.beginPath();
      ctx.moveTo(x+s*0.20, y+s*0.50+bob);
      ctx.lineTo(x+s*0.16, y+s*0.96+bob);
      ctx.lineTo(x+s*0.84, y+s*0.96+bob);
      ctx.lineTo(x+s*0.80, y+s*0.50+bob);
      ctx.closePath();
      ctx.fill();
      // white shirt collar V
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.moveTo(x+s*0.40, y+s*0.50+bob);
      ctx.lineTo(x+s*0.50, y+s*0.74+bob);
      ctx.lineTo(x+s*0.60, y+s*0.50+bob);
      ctx.closePath();
      ctx.fill();
      // black tie
      ctx.fillStyle = "#0a0a0a";
      ctx.beginPath();
      ctx.moveTo(x+s*0.46, y+s*0.50+bob);
      ctx.lineTo(x+s*0.54, y+s*0.50+bob);
      ctx.lineTo(x+s*0.52, y+s*0.74+bob);
      ctx.lineTo(x+s*0.50, y+s*0.78+bob);
      ctx.lineTo(x+s*0.48, y+s*0.74+bob);
      ctx.closePath();
      ctx.fill();
      // jacket lapels
      ctx.fillStyle = "#0a0a0a";
      ctx.beginPath();
      ctx.moveTo(x+s*0.22, y+s*0.50+bob);
      ctx.lineTo(x+s*0.40, y+s*0.50+bob);
      ctx.lineTo(x+s*0.46, y+s*0.66+bob);
      ctx.lineTo(x+s*0.30, y+s*0.66+bob);
      ctx.closePath();
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(x+s*0.78, y+s*0.50+bob);
      ctx.lineTo(x+s*0.60, y+s*0.50+bob);
      ctx.lineTo(x+s*0.54, y+s*0.66+bob);
      ctx.lineTo(x+s*0.70, y+s*0.66+bob);
      ctx.closePath();
      ctx.fill();
      // face
      ctx.fillStyle = "#e8c4a0";
      ctx.beginPath();
      ctx.ellipse(x+s*0.5, y+s*0.36+bob, s*0.18, s*0.20, 0, 0, Math.PI*2);
      ctx.fill();
      // slick dark hair
      ctx.fillStyle = "#1a1a1a";
      px(ctx, x+s*0.32, y+s*0.18+bob, s*0.36, s*0.08, "#1a1a1a");
      ctx.fillStyle = "#3a3a3a";
      px(ctx, x+s*0.38, y+s*0.20+bob, s*0.20, s*0.04, "#3a3a3a");
      // wide aviator sunglasses
      ctx.fillStyle = "#0a0a0a";
      ctx.beginPath(); ctx.arc(x+s*0.42, y+s*0.36+bob, s*0.06, 0, Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(x+s*0.58, y+s*0.36+bob, s*0.06, 0, Math.PI*2); ctx.fill();
      // bridge
      ctx.fillRect(x+s*0.46, y+s*0.34+bob, s*0.08, s*0.02);
      // lens reflections
      ctx.fillStyle = "rgba(255,255,255,0.3)";
      ctx.beginPath(); ctx.arc(x+s*0.40, y+s*0.34+bob, s*0.018, 0, Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(x+s*0.56, y+s*0.34+bob, s*0.018, 0, Math.PI*2); ctx.fill();
      // stoic mouth
      ctx.strokeStyle = "#1a1a1a";
      ctx.lineWidth = Math.max(1, s*0.012);
      ctx.beginPath();
      ctx.moveTo(x+s*0.44, y+s*0.48+bob); ctx.lineTo(x+s*0.56, y+s*0.48+bob);
      ctx.stroke();
    },

    LASERFIRE(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t*0.003) * (s*0.012);
      shadow(ctx, x+s/2, y+s-4, s*0.34, 5);
      // animated flame ring aura
      const flick = 0.5 + Math.sin(t*0.012)*0.5;
      ctx.fillStyle = `rgba(255,80,40,${flick*0.6})`;
      for (let i = 0; i < 8; i++) {
        const a = i*(Math.PI*2/8) + t*0.003;
        const r = s*0.40 + Math.sin(t*0.008+i)*s*0.04;
        const fx = x+s*0.50 + Math.cos(a)*r;
        const fy = y+s*0.50 + Math.sin(a)*r;
        ctx.beginPath();
        ctx.moveTo(fx, fy);
        ctx.lineTo(fx-s*0.04, fy-s*0.08);
        ctx.lineTo(fx+s*0.04, fy-s*0.04);
        ctx.closePath();
        ctx.fill();
      }
      // black jacket
      ctx.fillStyle = "#1a1a1a";
      ctx.beginPath();
      ctx.ellipse(x+s*0.5, y+s*0.74+bob, s*0.30, s*0.22, 0, 0, Math.PI*2);
      ctx.fill();
      // red zipper
      ctx.fillStyle = "#ed4245";
      ctx.fillRect(x+s*0.49, y+s*0.54+bob, s*0.02, s*0.30);
      // pale face
      ctx.fillStyle = "#f0d8c0";
      ctx.beginPath();
      ctx.ellipse(x+s*0.5, y+s*0.42+bob, s*0.18, s*0.20, 0, 0, Math.PI*2);
      ctx.fill();
      // spiky pink/red hair
      ctx.fillStyle = "#ff3060";
      ctx.beginPath();
      ctx.moveTo(x+s*0.30, y+s*0.34+bob);
      ctx.lineTo(x+s*0.24, y+s*0.16+bob);
      ctx.lineTo(x+s*0.34, y+s*0.22+bob);
      ctx.lineTo(x+s*0.38, y+s*0.10+bob);
      ctx.lineTo(x+s*0.46, y+s*0.20+bob);
      ctx.lineTo(x+s*0.50, y+s*0.06+bob);
      ctx.lineTo(x+s*0.54, y+s*0.20+bob);
      ctx.lineTo(x+s*0.62, y+s*0.10+bob);
      ctx.lineTo(x+s*0.66, y+s*0.22+bob);
      ctx.lineTo(x+s*0.76, y+s*0.16+bob);
      ctx.lineTo(x+s*0.70, y+s*0.34+bob);
      ctx.closePath();
      ctx.fill();
      // hair highlight
      ctx.fillStyle = "#ff80a0";
      px(ctx, x+s*0.40, y+s*0.18+bob, s*0.04, s*0.04, "#ff80a0");
      // glowing red anime eyes
      const eglow = 0.6 + Math.sin(t*0.006)*0.4;
      ctx.fillStyle = `rgba(255,40,40,${eglow})`;
      ctx.beginPath(); ctx.arc(x+s*0.42, y+s*0.42+bob, s*0.040, 0, Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(x+s*0.58, y+s*0.42+bob, s*0.040, 0, Math.PI*2); ctx.fill();
      ctx.fillStyle = "#fff";
      ctx.beginPath(); ctx.arc(x+s*0.41, y+s*0.41+bob, s*0.014, 0, Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(x+s*0.57, y+s*0.41+bob, s*0.014, 0, Math.PI*2); ctx.fill();
      // smug smirk
      ctx.strokeStyle = "#1a1a1a";
      ctx.lineWidth = Math.max(1, s*0.012);
      ctx.beginPath();
      ctx.moveTo(x+s*0.44, y+s*0.52+bob);
      ctx.quadraticCurveTo(x+s*0.50, y+s*0.56+bob, x+s*0.58, y+s*0.50+bob);
      ctx.stroke();
    },

    F503N(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t*0.003) * (s*0.012);
      shadow(ctx, x+s/2, y+s-4, s*0.34, 5);
      // brown boots
      px(ctx, x+s*0.30, y+s*0.86+bob, s*0.16, s*0.10, "#5a3818");
      px(ctx, x+s*0.54, y+s*0.86+bob, s*0.16, s*0.10, "#5a3818");
      // tan vest
      ctx.fillStyle = "#c8a070";
      ctx.beginPath();
      ctx.moveTo(x+s*0.22, y+s*0.50+bob);
      ctx.lineTo(x+s*0.20, y+s*0.86+bob);
      ctx.lineTo(x+s*0.80, y+s*0.86+bob);
      ctx.lineTo(x+s*0.78, y+s*0.50+bob);
      ctx.closePath();
      ctx.fill();
      // shirt under vest
      ctx.fillStyle = "#fff";
      ctx.fillRect(x+s*0.40, y+s*0.50+bob, s*0.20, s*0.34);
      // sheriff star on vest
      ctx.fillStyle = "#ffd700";
      const sx0 = x+s*0.30, sy0 = y+s*0.62+bob;
      ctx.beginPath();
      for (let i = 0; i < 10; i++) {
        const a = (i/10)*Math.PI*2 - Math.PI/2;
        const r = i%2===0 ? s*0.05 : s*0.022;
        const px2 = sx0 + Math.cos(a)*r;
        const py2 = sy0 + Math.sin(a)*r;
        if (i===0) ctx.moveTo(px2, py2); else ctx.lineTo(px2, py2);
      }
      ctx.closePath();
      ctx.fill();
      // arms
      px(ctx, x+s*0.10, y+s*0.52+bob, s*0.12, s*0.22, "#fff");
      px(ctx, x+s*0.78, y+s*0.52+bob, s*0.12, s*0.22, "#fff");
      // face
      ctx.fillStyle = "#d8a070";
      ctx.beginPath();
      ctx.ellipse(x+s*0.5, y+s*0.36+bob, s*0.16, s*0.16, 0, 0, Math.PI*2);
      ctx.fill();
      // red bandana with white dots
      ctx.fillStyle = "#ed4245";
      ctx.fillRect(x+s*0.32, y+s*0.46+bob, s*0.36, s*0.06);
      ctx.fillStyle = "#fff";
      for (let i = 0; i < 4; i++) {
        ctx.beginPath();
        ctx.arc(x+s*(0.36+i*0.08), y+s*0.49+bob, s*0.008, 0, Math.PI*2);
        ctx.fill();
      }
      // wide-brim cowboy hat
      ctx.fillStyle = "#7a4828";
      ctx.fillRect(x+s*0.18, y+s*0.22+bob, s*0.64, s*0.04);
      ctx.beginPath();
      ctx.ellipse(x+s*0.50, y+s*0.18+bob, s*0.18, s*0.10, 0, 0, Math.PI*2);
      ctx.fill();
      // hat band
      ctx.fillStyle = "#3a1818";
      ctx.fillRect(x+s*0.32, y+s*0.22+bob, s*0.36, s*0.02);
      // squinty eyes
      ctx.strokeStyle = "#1a1a1a";
      ctx.lineWidth = Math.max(1, s*0.014);
      ctx.beginPath();
      ctx.moveTo(x+s*0.40, y+s*0.36+bob); ctx.lineTo(x+s*0.46, y+s*0.36+bob);
      ctx.moveTo(x+s*0.54, y+s*0.36+bob); ctx.lineTo(x+s*0.60, y+s*0.36+bob);
      ctx.stroke();
      // mouth
      ctx.beginPath();
      ctx.moveTo(x+s*0.46, y+s*0.42+bob); ctx.lineTo(x+s*0.54, y+s*0.42+bob);
      ctx.stroke();
    },

    DR_YEET(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t*0.0028) * (s*0.010);
      shadow(ctx, x+s/2, y+s-4, s*0.36, 5);
      // fat round body
      ctx.fillStyle = "#9aa0a8";
      ctx.beginPath();
      ctx.ellipse(x+s*0.5, y+s*0.66+bob, s*0.40, s*0.30, 0, 0, Math.PI*2);
      ctx.fill();
      // lighter belly
      ctx.fillStyle = "#c4c8d0";
      ctx.beginPath();
      ctx.ellipse(x+s*0.5, y+s*0.74+bob, s*0.28, s*0.16, 0, 0, Math.PI*2);
      ctx.fill();
      // tail wrapping around
      ctx.fillStyle = "#9aa0a8";
      ctx.beginPath();
      ctx.ellipse(x+s*0.16, y+s*0.78+bob, s*0.12, s*0.06, 0.2, 0, Math.PI*2);
      ctx.fill();
      // head
      ctx.fillStyle = "#9aa0a8";
      ctx.beginPath();
      ctx.ellipse(x+s*0.5, y+s*0.36+bob, s*0.30, s*0.26, 0, 0, Math.PI*2);
      ctx.fill();
      // cheek tufts
      ctx.fillStyle = "#c4c8d0";
      ctx.beginPath(); ctx.arc(x+s*0.28, y+s*0.42+bob, s*0.06, 0, Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(x+s*0.72, y+s*0.42+bob, s*0.06, 0, Math.PI*2); ctx.fill();
      // ears
      ctx.fillStyle = "#9aa0a8";
      ctx.beginPath();
      ctx.moveTo(x+s*0.28, y+s*0.20+bob);
      ctx.lineTo(x+s*0.32, y+s*0.06+bob);
      ctx.lineTo(x+s*0.40, y+s*0.18+bob);
      ctx.closePath();
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(x+s*0.72, y+s*0.20+bob);
      ctx.lineTo(x+s*0.68, y+s*0.06+bob);
      ctx.lineTo(x+s*0.60, y+s*0.18+bob);
      ctx.closePath();
      ctx.fill();
      // pink inner ears
      ctx.fillStyle = "#ff80a0";
      ctx.beginPath();
      ctx.moveTo(x+s*0.32, y+s*0.16+bob);
      ctx.lineTo(x+s*0.34, y+s*0.10+bob);
      ctx.lineTo(x+s*0.38, y+s*0.16+bob);
      ctx.closePath();
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(x+s*0.68, y+s*0.16+bob);
      ctx.lineTo(x+s*0.66, y+s*0.10+bob);
      ctx.lineTo(x+s*0.62, y+s*0.16+bob);
      ctx.closePath();
      ctx.fill();
      // half-closed grumpy slit eyes
      ctx.strokeStyle = "#1a1a1a";
      ctx.lineWidth = Math.max(2, s*0.018);
      ctx.beginPath();
      ctx.moveTo(x+s*0.36, y+s*0.34+bob);
      ctx.lineTo(x+s*0.44, y+s*0.34+bob);
      ctx.moveTo(x+s*0.56, y+s*0.34+bob);
      ctx.lineTo(x+s*0.64, y+s*0.34+bob);
      ctx.stroke();
      // pink nose
      ctx.fillStyle = "#ff80a0";
      ctx.beginPath();
      ctx.moveTo(x+s*0.50, y+s*0.42+bob);
      ctx.lineTo(x+s*0.46, y+s*0.46+bob);
      ctx.lineTo(x+s*0.54, y+s*0.46+bob);
      ctx.closePath();
      ctx.fill();
      // frown
      ctx.strokeStyle = "#1a1a1a";
      ctx.lineWidth = Math.max(1, s*0.012);
      ctx.beginPath();
      ctx.moveTo(x+s*0.42, y+s*0.54+bob);
      ctx.quadraticCurveTo(x+s*0.50, y+s*0.50+bob, x+s*0.58, y+s*0.54+bob);
      ctx.stroke();
      // whiskers
      ctx.lineWidth = Math.max(1, s*0.006);
      ctx.beginPath();
      ctx.moveTo(x+s*0.20, y+s*0.46+bob); ctx.lineTo(x+s*0.34, y+s*0.46+bob);
      ctx.moveTo(x+s*0.20, y+s*0.50+bob); ctx.lineTo(x+s*0.34, y+s*0.50+bob);
      ctx.moveTo(x+s*0.66, y+s*0.46+bob); ctx.lineTo(x+s*0.80, y+s*0.46+bob);
      ctx.moveTo(x+s*0.66, y+s*0.50+bob); ctx.lineTo(x+s*0.80, y+s*0.50+bob);
      ctx.stroke();
      // //WD label
      ctx.fillStyle = "#5865f2";
      ctx.fillRect(x+s*0.38, y+s*0.84+bob, s*0.24, s*0.06);
      ctx.fillStyle = "#fff";
      ctx.font = `bold ${Math.floor(s*0.045)}px monospace`;
      ctx.textAlign = "center";
      ctx.fillText("//WD", x+s*0.50, y+s*0.885+bob);
      ctx.textAlign = "start";
    },

    FFFOOST(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t*0.003) * (s*0.012);
      shadow(ctx, x+s/2, y+s-4, s*0.34, 5);
      // school outfit
      ctx.fillStyle = "#3a4868";
      ctx.beginPath();
      ctx.moveTo(x+s*0.22, y+s*0.54+bob);
      ctx.lineTo(x+s*0.18, y+s*0.96+bob);
      ctx.lineTo(x+s*0.82, y+s*0.96+bob);
      ctx.lineTo(x+s*0.78, y+s*0.54+bob);
      ctx.closePath();
      ctx.fill();
      // collar
      ctx.fillStyle = "#fff";
      ctx.fillRect(x+s*0.34, y+s*0.54+bob, s*0.32, s*0.08);
      ctx.fillStyle = "#ed4245";
      ctx.beginPath();
      ctx.moveTo(x+s*0.46, y+s*0.58+bob);
      ctx.lineTo(x+s*0.54, y+s*0.58+bob);
      ctx.lineTo(x+s*0.50, y+s*0.66+bob);
      ctx.closePath();
      ctx.fill();
      // pink twin tails
      ctx.fillStyle = "#ff80c0";
      ctx.beginPath();
      ctx.moveTo(x+s*0.20, y+s*0.30+bob);
      ctx.quadraticCurveTo(x+s*0.04, y+s*0.50+bob, x+s*0.14, y+s*0.74+bob);
      ctx.lineTo(x+s*0.26, y+s*0.50+bob);
      ctx.closePath();
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(x+s*0.80, y+s*0.30+bob);
      ctx.quadraticCurveTo(x+s*0.96, y+s*0.50+bob, x+s*0.86, y+s*0.74+bob);
      ctx.lineTo(x+s*0.74, y+s*0.50+bob);
      ctx.closePath();
      ctx.fill();
      // red ribbon ties
      ctx.fillStyle = "#ed4245";
      ctx.fillRect(x+s*0.18, y+s*0.40+bob, s*0.06, s*0.04);
      ctx.fillRect(x+s*0.76, y+s*0.40+bob, s*0.06, s*0.04);
      // face
      ctx.fillStyle = "#ffe0e8";
      ctx.beginPath();
      ctx.ellipse(x+s*0.5, y+s*0.40+bob, s*0.18, s*0.20, 0, 0, Math.PI*2);
      ctx.fill();
      // bangs
      ctx.fillStyle = "#ff80c0";
      px(ctx, x+s*0.30, y+s*0.20+bob, s*0.40, s*0.12, "#ff80c0");
      // pink cheek blush
      ctx.fillStyle = "rgba(255,140,180,0.6)";
      ctx.beginPath(); ctx.arc(x+s*0.34, y+s*0.46+bob, s*0.030, 0, Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(x+s*0.66, y+s*0.46+bob, s*0.030, 0, Math.PI*2); ctx.fill();
      // big sparkly purple eyes
      ctx.fillStyle = "#a060f0";
      ctx.beginPath(); ctx.arc(x+s*0.42, y+s*0.42+bob, s*0.045, 0, Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(x+s*0.58, y+s*0.42+bob, s*0.045, 0, Math.PI*2); ctx.fill();
      ctx.fillStyle = "#fff";
      ctx.beginPath(); ctx.arc(x+s*0.41, y+s*0.40+bob, s*0.018, 0, Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(x+s*0.57, y+s*0.40+bob, s*0.018, 0, Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(x+s*0.44, y+s*0.45+bob, s*0.008, 0, Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(x+s*0.60, y+s*0.45+bob, s*0.008, 0, Math.PI*2); ctx.fill();
      // tiny smile
      ctx.strokeStyle = "#1a1a1a";
      ctx.lineWidth = Math.max(1, s*0.010);
      ctx.beginPath(); ctx.arc(x+s*0.50, y+s*0.50+bob, s*0.020, Math.PI*0.15, Math.PI*0.85); ctx.stroke();
      // orbiting sparkles
      const sT = t*0.004;
      for (let i = 0; i < 4; i++) {
        const a = sT + i*(Math.PI*2/4);
        const sxp = x+s*0.5 + Math.cos(a)*s*0.40;
        const syp = y+s*0.5 + Math.sin(a)*s*0.32;
        ctx.fillStyle = "#ffc0e0";
        ctx.fillRect(sxp-1, syp-1, 3, 3);
      }
    },

    NOTAIM(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t*0.003) * (s*0.012);
      shadow(ctx, x+s/2, y+s-4, s*0.34, 5);
      // wispy shadow trails
      ctx.fillStyle = "rgba(40,0,0,0.4)";
      for (let i = 0; i < 4; i++) {
        const wy = y+s*0.74 + Math.sin(t*0.004+i)*s*0.04;
        ctx.beginPath();
        ctx.ellipse(x+s*(0.30+i*0.14), wy+bob, s*0.06, s*0.03, 0, 0, Math.PI*2);
        ctx.fill();
      }
      // dark hooded body
      ctx.fillStyle = "#0a0a0a";
      ctx.beginPath();
      ctx.moveTo(x+s*0.20, y+s*0.30+bob);
      ctx.quadraticCurveTo(x+s*0.50, y+s*0.10+bob, x+s*0.80, y+s*0.30+bob);
      ctx.lineTo(x+s*0.84, y+s*0.86+bob);
      ctx.lineTo(x+s*0.16, y+s*0.86+bob);
      ctx.closePath();
      ctx.fill();
      // red glow halo
      const pulse = 0.5 + Math.sin(t*0.008)*0.5;
      const grad = ctx.createRadialGradient(x+s*0.5, y+s*0.40, s*0.05, x+s*0.5, y+s*0.40, s*0.30);
      grad.addColorStop(0, `rgba(255,40,40,${pulse*0.6})`);
      grad.addColorStop(1, "rgba(255,40,40,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(x, y, s, s);
      // crosshair eye
      const cx = x+s*0.50, cy = y+s*0.42+bob;
      ctx.strokeStyle = `rgba(255,40,40,${pulse})`;
      ctx.lineWidth = Math.max(2, s*0.014);
      ctx.beginPath();
      ctx.arc(cx, cy, s*0.10, 0, Math.PI*2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(cx-s*0.14, cy); ctx.lineTo(cx-s*0.06, cy);
      ctx.moveTo(cx+s*0.06, cy); ctx.lineTo(cx+s*0.14, cy);
      ctx.moveTo(cx, cy-s*0.14); ctx.lineTo(cx, cy-s*0.06);
      ctx.moveTo(cx, cy+s*0.06); ctx.lineTo(cx, cy+s*0.14);
      ctx.stroke();
      ctx.fillStyle = `rgba(255,40,40,${pulse})`;
      ctx.beginPath(); ctx.arc(cx, cy, s*0.014, 0, Math.PI*2); ctx.fill();
    },

    OANEXITY(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t*0.003) * (s*0.012);
      shadow(ctx, x+s/2, y+s-4, s*0.34, 5);
      // gradient halo backdrop
      const grad = ctx.createRadialGradient(x+s*0.5, y+s*0.4, s*0.10, x+s*0.5, y+s*0.4, s*0.55);
      grad.addColorStop(0, "rgba(255,220,100,0.4)");
      grad.addColorStop(1, "rgba(80,140,255,0.0)");
      ctx.fillStyle = grad;
      ctx.fillRect(x, y, s, s);
      // hoodie body
      ctx.fillStyle = "#3a6acc";
      ctx.beginPath();
      ctx.ellipse(x+s*0.5, y+s*0.74+bob, s*0.32, s*0.22, 0, 0, Math.PI*2);
      ctx.fill();
      // arms
      px(ctx, x+s*0.16, y+s*0.62+bob, s*0.10, s*0.20, "#3a6acc");
      px(ctx, x+s*0.74, y+s*0.62+bob, s*0.10, s*0.20, "#3a6acc");
      // hood
      ctx.fillStyle = "#2a4a8c";
      ctx.beginPath();
      ctx.ellipse(x+s*0.50, y+s*0.34+bob, s*0.26, s*0.28, 0, 0, Math.PI*2);
      ctx.fill();
      // face
      ctx.fillStyle = "#ffd0a8";
      ctx.beginPath();
      ctx.ellipse(x+s*0.5, y+s*0.42+bob, s*0.18, s*0.18, 0, 0, Math.PI*2);
      ctx.fill();
      // brown hair tuft
      ctx.fillStyle = "#7a4828";
      px(ctx, x+s*0.42, y+s*0.26+bob, s*0.16, s*0.06, "#7a4828");
      // big round glasses
      ctx.strokeStyle = "#1a1a1a";
      ctx.lineWidth = Math.max(2, s*0.014);
      ctx.beginPath(); ctx.arc(x+s*0.42, y+s*0.42+bob, s*0.06, 0, Math.PI*2); ctx.stroke();
      ctx.beginPath(); ctx.arc(x+s*0.58, y+s*0.42+bob, s*0.06, 0, Math.PI*2); ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x+s*0.48, y+s*0.42+bob); ctx.lineTo(x+s*0.52, y+s*0.42+bob);
      ctx.stroke();
      // glass shine
      ctx.fillStyle = "rgba(255,255,255,0.3)";
      ctx.beginPath(); ctx.arc(x+s*0.40, y+s*0.40+bob, s*0.020, 0, Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(x+s*0.56, y+s*0.40+bob, s*0.020, 0, Math.PI*2); ctx.fill();
      // tiny dot pupils
      ctx.fillStyle = "#1a1a1a";
      ctx.beginPath(); ctx.arc(x+s*0.42, y+s*0.42+bob, s*0.010, 0, Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(x+s*0.58, y+s*0.42+bob, s*0.010, 0, Math.PI*2); ctx.fill();
      // small smile
      ctx.lineWidth = Math.max(1, s*0.010);
      ctx.beginPath(); ctx.arc(x+s*0.50, y+s*0.52+bob, s*0.025, Math.PI*0.15, Math.PI*0.85); ctx.stroke();
      // CRIB badge
      ctx.fillStyle = "#5865f2";
      ctx.fillRect(x+s*0.40, y+s*0.84+bob, s*0.20, s*0.06);
      ctx.fillStyle = "#fff";
      ctx.font = `bold ${Math.floor(s*0.045)}px monospace`;
      ctx.textAlign = "center";
      ctx.fillText("CRIB", x+s*0.50, y+s*0.885+bob);
      ctx.textAlign = "start";
    },

    EVAN(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t*0.003) * (s*0.012);
      shadow(ctx, x+s/2, y+s-4, s*0.34, 5);
      // long purple hair (back)
      ctx.fillStyle = "#a060f0";
      ctx.beginPath();
      ctx.moveTo(x+s*0.28, y+s*0.30+bob);
      ctx.quadraticCurveTo(x+s*0.16, y+s*0.60+bob, x+s*0.26, y+s*0.86+bob);
      ctx.lineTo(x+s*0.74, y+s*0.86+bob);
      ctx.quadraticCurveTo(x+s*0.84, y+s*0.60+bob, x+s*0.72, y+s*0.30+bob);
      ctx.closePath();
      ctx.fill();
      // soft purple outfit
      ctx.fillStyle = "#c8a8e8";
      ctx.beginPath();
      ctx.ellipse(x+s*0.5, y+s*0.74+bob, s*0.30, s*0.22, 0, 0, Math.PI*2);
      ctx.fill();
      // arms
      px(ctx, x+s*0.18, y+s*0.62+bob, s*0.10, s*0.20, "#c8a8e8");
      px(ctx, x+s*0.72, y+s*0.62+bob, s*0.10, s*0.20, "#c8a8e8");
      // face
      ctx.fillStyle = "#ffe0d0";
      ctx.beginPath();
      ctx.ellipse(x+s*0.5, y+s*0.42+bob, s*0.18, s*0.20, 0, 0, Math.PI*2);
      ctx.fill();
      // bangs
      ctx.fillStyle = "#a060f0";
      px(ctx, x+s*0.30, y+s*0.24+bob, s*0.40, s*0.10, "#a060f0");
      // big anime eyes
      ctx.fillStyle = "#ff80b8";
      ctx.beginPath(); ctx.arc(x+s*0.43, y+s*0.42+bob, s*0.045, 0, Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(x+s*0.57, y+s*0.42+bob, s*0.045, 0, Math.PI*2); ctx.fill();
      ctx.fillStyle = "#fff";
      ctx.beginPath(); ctx.arc(x+s*0.42, y+s*0.40+bob, s*0.018, 0, Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(x+s*0.58, y+s*0.40+bob, s*0.018, 0, Math.PI*2); ctx.fill();
      // small smile
      ctx.strokeStyle = "#1a1a1a";
      ctx.lineWidth = Math.max(1, s*0.010);
      ctx.beginPath(); ctx.arc(x+s*0.50, y+s*0.52+bob, s*0.020, Math.PI*0.15, Math.PI*0.85); ctx.stroke();
      // gold trophy
      ctx.fillStyle = "#ffd700";
      ctx.beginPath();
      ctx.moveTo(x+s*0.78, y+s*0.60+bob);
      ctx.lineTo(x+s*0.92, y+s*0.60+bob);
      ctx.lineTo(x+s*0.88, y+s*0.74+bob);
      ctx.lineTo(x+s*0.82, y+s*0.74+bob);
      ctx.closePath();
      ctx.fill();
      ctx.fillRect(x+s*0.80, y+s*0.74+bob, s*0.10, s*0.02);
      ctx.fillRect(x+s*0.82, y+s*0.76+bob, s*0.06, s*0.04);
      ctx.strokeStyle = "#ffd700";
      ctx.lineWidth = Math.max(1, s*0.010);
      ctx.beginPath(); ctx.arc(x+s*0.78, y+s*0.64+bob, s*0.020, Math.PI*0.5, Math.PI*1.5); ctx.stroke();
      ctx.beginPath(); ctx.arc(x+s*0.92, y+s*0.64+bob, s*0.020, Math.PI*1.5, Math.PI*0.5); ctx.stroke();
      // MESA badge
      ctx.fillStyle = "#5865f2";
      ctx.fillRect(x+s*0.04, y+s*0.86+bob, s*0.20, s*0.06);
      ctx.fillStyle = "#fff";
      ctx.font = `bold ${Math.floor(s*0.045)}px monospace`;
      ctx.textAlign = "center";
      ctx.fillText("MESA", x+s*0.14, y+s*0.905+bob);
      ctx.textAlign = "start";
    },

    ZYPHON(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t*0.003) * (s*0.012);
      shadow(ctx, x+s/2, y+s-4, s*0.34, 5);
      // misty dark aura
      const grad = ctx.createRadialGradient(x+s*0.5, y+s*0.5, s*0.10, x+s*0.5, y+s*0.5, s*0.50);
      grad.addColorStop(0, "rgba(120,60,160,0.4)");
      grad.addColorStop(1, "rgba(40,20,60,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(x, y, s, s);
      // long curling tail
      ctx.fillStyle = "#1a0a1a";
      ctx.beginPath();
      ctx.moveTo(x+s*0.78, y+s*0.66+bob);
      ctx.quadraticCurveTo(x+s*0.96, y+s*0.50+bob, x+s*0.86, y+s*0.30+bob);
      ctx.quadraticCurveTo(x+s*0.80, y+s*0.40+bob, x+s*0.74, y+s*0.62+bob);
      ctx.closePath();
      ctx.fill();
      // sleek black body
      ctx.fillStyle = "#0a0510";
      ctx.beginPath();
      ctx.ellipse(x+s*0.5, y+s*0.66+bob, s*0.28, s*0.22, 0, 0, Math.PI*2);
      ctx.fill();
      // head
      ctx.beginPath();
      ctx.ellipse(x+s*0.5, y+s*0.40+bob, s*0.24, s*0.20, 0, 0, Math.PI*2);
      ctx.fill();
      // pointed ears
      ctx.beginPath();
      ctx.moveTo(x+s*0.32, y+s*0.28+bob);
      ctx.lineTo(x+s*0.30, y+s*0.10+bob);
      ctx.lineTo(x+s*0.42, y+s*0.20+bob);
      ctx.closePath();
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(x+s*0.68, y+s*0.28+bob);
      ctx.lineTo(x+s*0.70, y+s*0.10+bob);
      ctx.lineTo(x+s*0.58, y+s*0.20+bob);
      ctx.closePath();
      ctx.fill();
      // faint purple inner ears
      ctx.fillStyle = "#5a2a6a";
      ctx.beginPath();
      ctx.moveTo(x+s*0.32, y+s*0.20+bob);
      ctx.lineTo(x+s*0.34, y+s*0.14+bob);
      ctx.lineTo(x+s*0.38, y+s*0.20+bob);
      ctx.closePath();
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(x+s*0.68, y+s*0.20+bob);
      ctx.lineTo(x+s*0.66, y+s*0.14+bob);
      ctx.lineTo(x+s*0.62, y+s*0.20+bob);
      ctx.closePath();
      ctx.fill();
      // sleepy glowing purple half-closed eyes
      const eglow2 = 0.6 + Math.sin(t*0.005)*0.4;
      ctx.fillStyle = `rgba(160,80,255,${eglow2})`;
      ctx.fillRect(x+s*0.36, y+s*0.40+bob, s*0.10, s*0.02);
      ctx.fillRect(x+s*0.54, y+s*0.40+bob, s*0.10, s*0.02);
      // smug mouth
      ctx.strokeStyle = "#5a2a6a";
      ctx.lineWidth = Math.max(1, s*0.010);
      ctx.beginPath();
      ctx.moveTo(x+s*0.46, y+s*0.50+bob);
      ctx.quadraticCurveTo(x+s*0.50, y+s*0.54+bob, x+s*0.54, y+s*0.50+bob);
      ctx.stroke();
    },

    SAPWN(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t*0.003) * (s*0.012);
      shadow(ctx, x+s/2, y+s-4, s*0.34, 5);
      // red moon backdrop
      ctx.fillStyle = "#a01020";
      ctx.beginPath(); ctx.arc(x+s*0.78, y+s*0.20, s*0.16, 0, Math.PI*2); ctx.fill();
      ctx.fillStyle = "#601018";
      ctx.beginPath(); ctx.arc(x+s*0.74, y+s*0.18, s*0.04, 0, Math.PI*2); ctx.fill();
      // hooded silhouette
      ctx.fillStyle = "#0a0a14";
      ctx.beginPath();
      ctx.moveTo(x+s*0.20, y+s*0.30+bob);
      ctx.quadraticCurveTo(x+s*0.50, y+s*0.10+bob, x+s*0.80, y+s*0.30+bob);
      ctx.lineTo(x+s*0.84, y+s*0.86+bob);
      ctx.lineTo(x+s*0.16, y+s*0.86+bob);
      ctx.closePath();
      ctx.fill();
      // hood inner shadow
      ctx.fillStyle = "#000";
      ctx.beginPath();
      ctx.ellipse(x+s*0.50, y+s*0.40+bob, s*0.16, s*0.18, 0, 0, Math.PI*2);
      ctx.fill();
      // glowing red eye dots
      const eglow3 = 0.6 + Math.sin(t*0.006)*0.4;
      ctx.fillStyle = `rgba(255,40,40,${eglow3})`;
      ctx.beginPath(); ctx.arc(x+s*0.44, y+s*0.40+bob, s*0.014, 0, Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(x+s*0.56, y+s*0.40+bob, s*0.014, 0, Math.PI*2); ctx.fill();
      // hourglass
      const hT = (t*0.0008) % 1;
      ctx.save();
      ctx.translate(x+s*0.32, y+s*0.62+bob);
      ctx.fillStyle = "#a07050";
      ctx.fillRect(-s*0.08, -s*0.14, s*0.16, s*0.02);
      ctx.fillRect(-s*0.08, s*0.12, s*0.16, s*0.02);
      ctx.fillStyle = "rgba(220,200,160,0.4)";
      ctx.beginPath();
      ctx.moveTo(-s*0.08, -s*0.12);
      ctx.lineTo(s*0.08, -s*0.12);
      ctx.lineTo(0, 0);
      ctx.closePath();
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(-s*0.08, s*0.12);
      ctx.lineTo(s*0.08, s*0.12);
      ctx.lineTo(0, 0);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = "#dcb878";
      const topH = (1 - hT) * s*0.10;
      const topW = s*0.08*topH/(s*0.10);
      ctx.beginPath();
      ctx.moveTo(-topW, -s*0.12);
      ctx.lineTo(topW, -s*0.12);
      ctx.lineTo(0.01, -s*0.12 + topH);
      ctx.lineTo(-0.01, -s*0.12 + topH);
      ctx.closePath();
      ctx.fill();
      ctx.fillRect(-1, -s*0.04, 2, s*0.08);
      const botH = hT * s*0.10;
      const botW = s*0.08*botH/(s*0.10);
      ctx.beginPath();
      ctx.moveTo(0, s*0.12 - botH);
      ctx.lineTo(botW, s*0.12);
      ctx.lineTo(-botW, s*0.12);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    },

    SNAIL4(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t*0.0028) * (s*0.010);
      shadow(ctx, x+s/2, y+s-4, s*0.34, 5);
      // pink hoodie
      ctx.fillStyle = "#ffa0c0";
      ctx.beginPath();
      ctx.ellipse(x+s*0.5, y+s*0.74+bob, s*0.32, s*0.22, 0, 0, Math.PI*2);
      ctx.fill();
      px(ctx, x+s*0.16, y+s*0.62+bob, s*0.10, s*0.20, "#ffa0c0");
      px(ctx, x+s*0.74, y+s*0.62+bob, s*0.10, s*0.20, "#ffa0c0");
      // long pink drooping hair
      ctx.fillStyle = "#ff80a8";
      ctx.beginPath();
      ctx.moveTo(x+s*0.26, y+s*0.30+bob);
      ctx.quadraticCurveTo(x+s*0.16, y+s*0.66+bob, x+s*0.28, y+s*0.80+bob);
      ctx.lineTo(x+s*0.36, y+s*0.50+bob);
      ctx.closePath();
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(x+s*0.74, y+s*0.30+bob);
      ctx.quadraticCurveTo(x+s*0.84, y+s*0.66+bob, x+s*0.72, y+s*0.80+bob);
      ctx.lineTo(x+s*0.64, y+s*0.50+bob);
      ctx.closePath();
      ctx.fill();
      // face
      ctx.fillStyle = "#ffe0d8";
      ctx.beginPath();
      ctx.ellipse(x+s*0.5, y+s*0.42+bob, s*0.18, s*0.20, 0, 0, Math.PI*2);
      ctx.fill();
      // droopy bangs
      ctx.fillStyle = "#ff80a8";
      ctx.beginPath();
      ctx.moveTo(x+s*0.32, y+s*0.30+bob);
      ctx.quadraticCurveTo(x+s*0.50, y+s*0.42+bob, x+s*0.68, y+s*0.30+bob);
      ctx.lineTo(x+s*0.68, y+s*0.20+bob);
      ctx.lineTo(x+s*0.32, y+s*0.20+bob);
      ctx.closePath();
      ctx.fill();
      // eyebags
      ctx.fillStyle = "rgba(120,80,100,0.4)";
      ctx.fillRect(x+s*0.38, y+s*0.46+bob, s*0.08, s*0.02);
      ctx.fillRect(x+s*0.54, y+s*0.46+bob, s*0.08, s*0.02);
      // half-closed sleepy eyes
      ctx.strokeStyle = "#1a1a1a";
      ctx.lineWidth = Math.max(2, s*0.014);
      ctx.beginPath();
      ctx.moveTo(x+s*0.38, y+s*0.42+bob); ctx.lineTo(x+s*0.46, y+s*0.42+bob);
      ctx.moveTo(x+s*0.54, y+s*0.42+bob); ctx.lineTo(x+s*0.62, y+s*0.42+bob);
      ctx.stroke();
      ctx.lineWidth = Math.max(1, s*0.010);
      ctx.beginPath();
      ctx.moveTo(x+s*0.46, y+s*0.52+bob); ctx.lineTo(x+s*0.54, y+s*0.52+bob);
      ctx.stroke();
      // tiny snail in hand
      const sxh = x+s*0.18, syh = y+s*0.78+bob;
      ctx.fillStyle = "#a0c8a0";
      ctx.beginPath();
      ctx.ellipse(sxh, syh, s*0.08, s*0.04, 0, 0, Math.PI*2);
      ctx.fill();
      ctx.fillStyle = "#a07050";
      ctx.beginPath();
      ctx.arc(sxh-s*0.02, syh-s*0.03, s*0.05, 0, Math.PI*2);
      ctx.fill();
      ctx.strokeStyle = "#5a3818";
      ctx.lineWidth = Math.max(1, s*0.006);
      ctx.beginPath();
      ctx.arc(sxh-s*0.02, syh-s*0.03, s*0.025, 0, Math.PI*1.5);
      ctx.stroke();
      ctx.strokeStyle = "#3a8838";
      ctx.beginPath();
      ctx.moveTo(sxh+s*0.04, syh-s*0.02); ctx.lineTo(sxh+s*0.06, syh-s*0.06);
      ctx.moveTo(sxh+s*0.06, syh-s*0.02); ctx.lineTo(sxh+s*0.08, syh-s*0.06);
      ctx.stroke();
      // floating Z
      const zT = (t*0.001) % 1;
      const zY = y + s*0.20 - zT * s*0.12;
      const zA = (1 - zT) * 0.7;
      ctx.fillStyle = `rgba(160,140,180,${zA})`;
      ctx.font = `bold ${Math.max(6, Math.floor(s*0.10))}px monospace`;
      ctx.textAlign = "center";
      ctx.fillText("z", x+s*0.80, zY);
      ctx.textAlign = "start";
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
    },














ZENSER48(ctx, sp, x, y, s, t) {
  const bob = Math.sin(t*0.003) * (s*0.012);
  shadow(ctx, x+s/2, y+s-4, s*0.36, 6);
  // wispy shadow tendrils at base (animated)
  const wisp = Math.sin(t*0.004)*0.5+0.5;
  ctx.fillStyle = `rgba(60,20,40,${0.3+wisp*0.2})`;
  ctx.beginPath();
  ctx.moveTo(x+s*0.20, y+s*0.92+bob);
  ctx.quadraticCurveTo(x+s*0.10, y+s*0.86+bob, x+s*0.16, y+s*0.78+bob);
  ctx.quadraticCurveTo(x+s*0.22, y+s*0.86+bob, x+s*0.20, y+s*0.92+bob);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(x+s*0.80, y+s*0.92+bob);
  ctx.quadraticCurveTo(x+s*0.90, y+s*0.86+bob, x+s*0.84, y+s*0.78+bob);
  ctx.quadraticCurveTo(x+s*0.78, y+s*0.86+bob, x+s*0.80, y+s*0.92+bob);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(x+s*0.50, y+s*0.96+bob);
  ctx.quadraticCurveTo(x+s*0.40, y+s*0.92+bob, x+s*0.46, y+s*0.84+bob);
  ctx.quadraticCurveTo(x+s*0.54, y+s*0.92+bob, x+s*0.50, y+s*0.96+bob);
  ctx.fill();
  // tapered cloak silhouette
  ctx.fillStyle = "#0a0512";
  ctx.beginPath();
  ctx.moveTo(x+s*0.36, y+s*0.18+bob);
  ctx.lineTo(x+s*0.30, y+s*0.40+bob);
  ctx.lineTo(x+s*0.18, y+s*0.92+bob);
  ctx.lineTo(x+s*0.82, y+s*0.92+bob);
  ctx.lineTo(x+s*0.70, y+s*0.40+bob);
  ctx.lineTo(x+s*0.64, y+s*0.18+bob);
  ctx.closePath();
  ctx.fill();
  // hood drape over head
  ctx.fillStyle = "#0a0512";
  ctx.beginPath();
  ctx.moveTo(x+s*0.30, y+s*0.40+bob);
  ctx.quadraticCurveTo(x+s*0.30, y+s*0.16+bob, x+s*0.50, y+s*0.10+bob);
  ctx.quadraticCurveTo(x+s*0.70, y+s*0.16+bob, x+s*0.70, y+s*0.40+bob);
  ctx.lineTo(x+s*0.62, y+s*0.42+bob);
  ctx.quadraticCurveTo(x+s*0.62, y+s*0.28+bob, x+s*0.50, y+s*0.24+bob);
  ctx.quadraticCurveTo(x+s*0.38, y+s*0.28+bob, x+s*0.38, y+s*0.42+bob);
  ctx.closePath();
  ctx.fill();
  // hood drape highlight (subtle edge)
  ctx.fillStyle = "#2a1638";
  ctx.beginPath();
  ctx.moveTo(x+s*0.30, y+s*0.40+bob);
  ctx.quadraticCurveTo(x+s*0.30, y+s*0.18+bob, x+s*0.42, y+s*0.12+bob);
  ctx.lineTo(x+s*0.40, y+s*0.18+bob);
  ctx.quadraticCurveTo(x+s*0.34, y+s*0.24+bob, x+s*0.34, y+s*0.40+bob);
  ctx.closePath();
  ctx.fill();
  // inner hood shadow (deep)
  ctx.fillStyle = "#000";
  ctx.beginPath();
  ctx.ellipse(x+s*0.50, y+s*0.40+bob, s*0.13, s*0.12, 0, 0, Math.PI*2);
  ctx.fill();
  // pulsing red glowing eyes
  const pulse = 0.5 + Math.sin(t*0.008)*0.5;
  // outer glow
  ctx.fillStyle = `rgba(255,40,60,${0.25+pulse*0.25})`;
  ctx.beginPath(); ctx.arc(x+s*0.44, y+s*0.40+bob, s*0.045, 0, Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(x+s*0.56, y+s*0.40+bob, s*0.045, 0, Math.PI*2); ctx.fill();
  // inner eye
  ctx.fillStyle = `rgba(255,80,90,${0.7+pulse*0.3})`;
  ctx.beginPath(); ctx.arc(x+s*0.44, y+s*0.40+bob, s*0.022, 0, Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(x+s*0.56, y+s*0.40+bob, s*0.022, 0, Math.PI*2); ctx.fill();
  // hot core
  ctx.fillStyle = "#fff";
  ctx.beginPath(); ctx.arc(x+s*0.44, y+s*0.40+bob, s*0.008, 0, Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(x+s*0.56, y+s*0.40+bob, s*0.008, 0, Math.PI*2); ctx.fill();
  // floating dark sparks
  for (let i = 0; i < 4; i++) {
    const a = t*0.002 + i*Math.PI*0.5;
    const fx = x+s*0.5 + Math.cos(a)*s*0.36;
    const fy = y+s*0.5 + Math.sin(a)*s*0.30;
    ctx.fillStyle = `rgba(120,40,80,${0.3+pulse*0.3})`;
    ctx.beginPath(); ctx.arc(fx, fy, s*0.012, 0, Math.PI*2); ctx.fill();
  }
},

ADOT(ctx, sp, x, y, s, t) {
  const bob = Math.sin(t*0.003) * (s*0.012);
  shadow(ctx, x+s/2, y+s-4, s*0.34, 5);
  // dark backdrop circle (the "page")
  ctx.fillStyle = "#1a1626";
  ctx.beginPath();
  ctx.arc(x+s*0.5, y+s*0.5+bob, s*0.42, 0, Math.PI*2);
  ctx.fill();
  // page subtle inner ring
  ctx.strokeStyle = "#2a2436";
  ctx.lineWidth = Math.max(1, s*0.008);
  ctx.beginPath();
  ctx.arc(x+s*0.5, y+s*0.5+bob, s*0.40, 0, Math.PI*2);
  ctx.stroke();
  // big white dot (main body)
  ctx.fillStyle = "#f8f8fa";
  ctx.beginPath();
  ctx.arc(x+s*0.5, y+s*0.46+bob, s*0.22, 0, Math.PI*2);
  ctx.fill();
  // subtle gloss highlight (offset ellipse)
  ctx.fillStyle = "rgba(255,255,255,0.7)";
  ctx.beginPath();
  ctx.ellipse(x+s*0.42, y+s*0.38+bob, s*0.08, s*0.05, -0.4, 0, Math.PI*2);
  ctx.fill();
  // softer secondary highlight
  ctx.fillStyle = "rgba(255,255,255,0.35)";
  ctx.beginPath();
  ctx.ellipse(x+s*0.56, y+s*0.52+bob, s*0.06, s*0.03, 0.3, 0, Math.PI*2);
  ctx.fill();
  // soft shadow under dot (on the page)
  ctx.fillStyle = "rgba(0,0,0,0.25)";
  ctx.beginPath();
  ctx.ellipse(x+s*0.5, y+s*0.66+bob, s*0.18, s*0.04, 0, 0, Math.PI*2);
  ctx.fill();
  // cute eyes (small black dots)
  ctx.fillStyle = "#1a1a26";
  ctx.beginPath(); ctx.arc(x+s*0.43, y+s*0.44+bob, s*0.022, 0, Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(x+s*0.57, y+s*0.44+bob, s*0.022, 0, Math.PI*2); ctx.fill();
  // eye shines
  ctx.fillStyle = "#fff";
  ctx.beginPath(); ctx.arc(x+s*0.435, y+s*0.435+bob, s*0.008, 0, Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(x+s*0.575, y+s*0.435+bob, s*0.008, 0, Math.PI*2); ctx.fill();
  // tiny smile
  ctx.strokeStyle = "#1a1a26";
  ctx.lineWidth = Math.max(1, s*0.012);
  ctx.beginPath();
  ctx.arc(x+s*0.50, y+s*0.50+bob, s*0.04, Math.PI*0.15, Math.PI*0.85);
  ctx.stroke();
  // tiny pink cheeks
  ctx.fillStyle = "rgba(255,160,180,0.45)";
  ctx.beginPath(); ctx.arc(x+s*0.39, y+s*0.50+bob, s*0.018, 0, Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(x+s*0.61, y+s*0.50+bob, s*0.018, 0, Math.PI*2); ctx.fill();
  // "Adot" tiny label below
  ctx.fillStyle = "#c8c0d8";
  ctx.font = `${Math.floor(s*0.06)}px monospace`;
  ctx.textAlign = "center";
  ctx.fillText("Adot", x+s*0.50, y+s*0.86+bob);
  ctx.textAlign = "start";
  // tiny sparkle around the dot
  const spark = 0.4 + Math.sin(t*0.005)*0.6;
  ctx.fillStyle = `rgba(255,255,255,${spark})`;
  px(ctx, x+s*0.74, y+s*0.30+bob, s*0.012, s*0.012, `rgba(255,255,255,${spark})`);
  px(ctx, x+s*0.24, y+s*0.62+bob, s*0.010, s*0.010, `rgba(255,255,255,${spark*0.7})`);
},

IMOH(ctx, sp, x, y, s, t) {
  const bob = Math.sin(t*0.003) * (s*0.012);
  shadow(ctx, x+s/2, y+s-4, s*0.30, 5);
  // faint lavender aura (radial)
  const auraGrad = ctx.createRadialGradient(x+s*0.5, y+s*0.5+bob, s*0.10, x+s*0.5, y+s*0.5+bob, s*0.55);
  auraGrad.addColorStop(0, "rgba(180,140,220,0.30)");
  auraGrad.addColorStop(1, "rgba(180,140,220,0.00)");
  ctx.fillStyle = auraGrad;
  ctx.fillRect(x, y, s, s);
  // tall slim purple silhouette body (slumped)
  ctx.fillStyle = "#3a1c4a";
  ctx.beginPath();
  ctx.moveTo(x+s*0.42, y+s*0.32+bob);
  ctx.lineTo(x+s*0.36, y+s*0.94+bob);
  ctx.lineTo(x+s*0.62, y+s*0.94+bob);
  ctx.lineTo(x+s*0.58, y+s*0.32+bob);
  ctx.closePath();
  ctx.fill();
  // body highlight (a little lighter on right)
  ctx.fillStyle = "#522866";
  ctx.beginPath();
  ctx.moveTo(x+s*0.54, y+s*0.34+bob);
  ctx.lineTo(x+s*0.50, y+s*0.92+bob);
  ctx.lineTo(x+s*0.58, y+s*0.92+bob);
  ctx.lineTo(x+s*0.58, y+s*0.34+bob);
  ctx.closePath();
  ctx.fill();
  // droopy arms (long, hanging)
  ctx.fillStyle = "#3a1c4a";
  ctx.beginPath();
  ctx.moveTo(x+s*0.36, y+s*0.40+bob);
  ctx.quadraticCurveTo(x+s*0.22, y+s*0.62+bob, x+s*0.26, y+s*0.84+bob);
  ctx.lineTo(x+s*0.32, y+s*0.84+bob);
  ctx.quadraticCurveTo(x+s*0.30, y+s*0.62+bob, x+s*0.42, y+s*0.46+bob);
  ctx.closePath();
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(x+s*0.64, y+s*0.40+bob);
  ctx.quadraticCurveTo(x+s*0.78, y+s*0.62+bob, x+s*0.74, y+s*0.84+bob);
  ctx.lineTo(x+s*0.68, y+s*0.84+bob);
  ctx.quadraticCurveTo(x+s*0.70, y+s*0.62+bob, x+s*0.58, y+s*0.46+bob);
  ctx.closePath();
  ctx.fill();
  // head (tilted forward — slight offset)
  ctx.fillStyle = "#c8a8d0";
  ctx.beginPath();
  ctx.ellipse(x+s*0.50, y+s*0.30+bob, s*0.13, s*0.14, 0.15, 0, Math.PI*2);
  ctx.fill();
  // dark purple hair (covers top, drooping over forward-tilted head)
  ctx.fillStyle = "#1a0826";
  ctx.beginPath();
  ctx.moveTo(x+s*0.38, y+s*0.20+bob);
  ctx.quadraticCurveTo(x+s*0.42, y+s*0.10+bob, x+s*0.54, y+s*0.12+bob);
  ctx.quadraticCurveTo(x+s*0.62, y+s*0.18+bob, x+s*0.62, y+s*0.30+bob);
  ctx.lineTo(x+s*0.56, y+s*0.34+bob);
  ctx.quadraticCurveTo(x+s*0.54, y+s*0.24+bob, x+s*0.46, y+s*0.26+bob);
  ctx.lineTo(x+s*0.40, y+s*0.30+bob);
  ctx.closePath();
  ctx.fill();
  // hair bangs drooping over eyes
  ctx.fillStyle = "#1a0826";
  ctx.beginPath();
  ctx.moveTo(x+s*0.40, y+s*0.28+bob);
  ctx.quadraticCurveTo(x+s*0.50, y+s*0.36+bob, x+s*0.60, y+s*0.28+bob);
  ctx.lineTo(x+s*0.58, y+s*0.22+bob);
  ctx.lineTo(x+s*0.42, y+s*0.22+bob);
  ctx.closePath();
  ctx.fill();
  // sleepy half-closed lavender eye lines (thin slits)
  ctx.strokeStyle = "#7a4a9a";
  ctx.lineWidth = Math.max(1, s*0.012);
  ctx.beginPath();
  ctx.moveTo(x+s*0.42, y+s*0.32+bob);
  ctx.lineTo(x+s*0.47, y+s*0.33+bob);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x+s*0.53, y+s*0.32+bob);
  ctx.lineTo(x+s*0.58, y+s*0.33+bob);
  ctx.stroke();
  // tiny flat mouth
  ctx.strokeStyle = "#5a2870";
  ctx.lineWidth = Math.max(1, s*0.010);
  ctx.beginPath();
  ctx.moveTo(x+s*0.47, y+s*0.38+bob);
  ctx.lineTo(x+s*0.53, y+s*0.38+bob);
  ctx.stroke();
  // floating Z (sleepy)
  const zBob = Math.sin(t*0.004) * (s*0.02);
  ctx.fillStyle = "#9c80c0";
  ctx.font = `bold ${Math.floor(s*0.10)}px monospace`;
  ctx.fillText("Z", x+s*0.74, y+s*0.18+bob+zBob);
  ctx.fillStyle = "#b8a0d8";
  ctx.font = `bold ${Math.floor(s*0.06)}px monospace`;
  ctx.fillText("z", x+s*0.82, y+s*0.10+bob+zBob*0.7);
},

DOSEY(ctx, sp, x, y, s, t) {
  const bob = Math.sin(t*0.003) * (s*0.012);
  shadow(ctx, x+s/2, y+s-4, s*0.34, 5);
  // mischievous body (kid-sized hoodie, slightly small)
  ctx.fillStyle = "#3a4a78";
  ctx.beginPath();
  ctx.ellipse(x+s*0.5, y+s*0.76+bob, s*0.30, s*0.20, 0, 0, Math.PI*2);
  ctx.fill();
  // arms
  px(ctx, x+s*0.20, y+s*0.66+bob, s*0.10, s*0.18, "#3a4a78");
  px(ctx, x+s*0.70, y+s*0.66+bob, s*0.10, s*0.18, "#3a4a78");
  // pointy red devil tail (tip)
  ctx.fillStyle = "#d8202a";
  ctx.beginPath();
  ctx.moveTo(x+s*0.78, y+s*0.74+bob);
  ctx.quadraticCurveTo(x+s*0.92, y+s*0.78+bob, x+s*0.86, y+s*0.66+bob);
  ctx.quadraticCurveTo(x+s*0.84, y+s*0.72+bob, x+s*0.78, y+s*0.74+bob);
  ctx.closePath();
  ctx.fill();
  // tail arrow tip
  ctx.fillStyle = "#a8101a";
  ctx.beginPath();
  ctx.moveTo(x+s*0.86, y+s*0.66+bob);
  ctx.lineTo(x+s*0.92, y+s*0.62+bob);
  ctx.lineTo(x+s*0.88, y+s*0.70+bob);
  ctx.closePath();
  ctx.fill();
  // face
  ctx.fillStyle = "#ffd8b8";
  ctx.beginPath();
  ctx.ellipse(x+s*0.5, y+s*0.46+bob, s*0.18, s*0.18, 0, 0, Math.PI*2);
  ctx.fill();
  // tiny red devil horns peeking from cap
  ctx.fillStyle = "#d8202a";
  ctx.beginPath();
  ctx.moveTo(x+s*0.36, y+s*0.24+bob);
  ctx.lineTo(x+s*0.32, y+s*0.16+bob);
  ctx.lineTo(x+s*0.40, y+s*0.22+bob);
  ctx.closePath();
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(x+s*0.64, y+s*0.24+bob);
  ctx.lineTo(x+s*0.68, y+s*0.16+bob);
  ctx.lineTo(x+s*0.60, y+s*0.22+bob);
  ctx.closePath();
  ctx.fill();
  // red BACKWARDS baseball cap (button on back at front since backwards)
  // brim sticking out the BACK (right side here for backwards effect)
  ctx.fillStyle = "#a8101a";
  ctx.fillRect(x+s*0.10, y+s*0.32+bob, s*0.20, s*0.04);
  // cap dome
  ctx.fillStyle = "#d8202a";
  ctx.beginPath();
  ctx.ellipse(x+s*0.50, y+s*0.28+bob, s*0.24, s*0.13, 0, Math.PI, Math.PI*2);
  ctx.fill();
  // cap bottom band
  px(ctx, x+s*0.26, y+s*0.28+bob, s*0.48, s*0.04, "#d8202a");
  // backwards button (front = visible adjustment strap)
  ctx.fillStyle = "#a8101a";
  px(ctx, x+s*0.62, y+s*0.30+bob, s*0.10, s*0.04, "#a8101a");
  // strap hole
  ctx.fillStyle = "#1a1a1a";
  px(ctx, x+s*0.66, y+s*0.31+bob, s*0.02, s*0.02, "#1a1a1a");
  // glasses (round black frames)
  ctx.strokeStyle = "#1a1a1a";
  ctx.lineWidth = Math.max(1, s*0.014);
  ctx.beginPath();
  ctx.arc(x+s*0.42, y+s*0.46+bob, s*0.05, 0, Math.PI*2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(x+s*0.58, y+s*0.46+bob, s*0.05, 0, Math.PI*2);
  ctx.stroke();
  // bridge
  ctx.beginPath();
  ctx.moveTo(x+s*0.47, y+s*0.46+bob);
  ctx.lineTo(x+s*0.53, y+s*0.46+bob);
  ctx.stroke();
  // glasses lens shine
  ctx.fillStyle = "rgba(255,255,255,0.4)";
  ctx.beginPath();
  ctx.arc(x+s*0.40, y+s*0.44+bob, s*0.014, 0, Math.PI*2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(x+s*0.56, y+s*0.44+bob, s*0.014, 0, Math.PI*2);
  ctx.fill();
  // eyes behind glasses (small dots)
  ctx.fillStyle = "#1a1a1a";
  ctx.beginPath(); ctx.arc(x+s*0.43, y+s*0.47+bob, s*0.014, 0, Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(x+s*0.57, y+s*0.47+bob, s*0.014, 0, Math.PI*2); ctx.fill();
  // smirk (asymmetric mouth — left up, right normal)
  ctx.strokeStyle = "#1a1a1a";
  ctx.lineWidth = Math.max(1, s*0.014);
  ctx.beginPath();
  ctx.moveTo(x+s*0.44, y+s*0.58+bob);
  ctx.quadraticCurveTo(x+s*0.50, y+s*0.62+bob, x+s*0.56, y+s*0.55+bob);
  ctx.stroke();
  // little tooth peeking
  ctx.fillStyle = "#fff";
  px(ctx, x+s*0.54, y+s*0.575+bob, s*0.012, s*0.014, "#fff");
  // mischievous cheek blush
  ctx.fillStyle = "rgba(255,140,150,0.40)";
  ctx.beginPath(); ctx.arc(x+s*0.36, y+s*0.54+bob, s*0.018, 0, Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(x+s*0.64, y+s*0.54+bob, s*0.018, 0, Math.PI*2); ctx.fill();
},

EDWIN(ctx, sp, x, y, s, t) {
  const bob = Math.sin(t*0.003) * (s*0.012);
  shadow(ctx, x+s/2, y+s-4, s*0.36, 5);
  // dark coat body
  ctx.fillStyle = "#0e1422";
  ctx.beginPath();
  ctx.moveTo(x+s*0.20, y+s*0.52+bob);
  ctx.lineTo(x+s*0.16, y+s*0.96+bob);
  ctx.lineTo(x+s*0.84, y+s*0.96+bob);
  ctx.lineTo(x+s*0.80, y+s*0.52+bob);
  ctx.closePath();
  ctx.fill();
  // coat lapel highlight (cool tone)
  ctx.fillStyle = "#1c2a44";
  ctx.beginPath();
  ctx.moveTo(x+s*0.40, y+s*0.58+bob);
  ctx.lineTo(x+s*0.36, y+s*0.92+bob);
  ctx.lineTo(x+s*0.42, y+s*0.92+bob);
  ctx.lineTo(x+s*0.46, y+s*0.60+bob);
  ctx.closePath();
  ctx.fill();
  // arms / coat sleeves
  px(ctx, x+s*0.14, y+s*0.54+bob, s*0.12, s*0.28, "#0e1422");
  px(ctx, x+s*0.74, y+s*0.54+bob, s*0.12, s*0.28, "#0e1422");
  // big black scarf wrapped around neck
  ctx.fillStyle = "#000";
  ctx.beginPath();
  ctx.ellipse(x+s*0.5, y+s*0.56+bob, s*0.26, s*0.10, 0, 0, Math.PI*2);
  ctx.fill();
  // scarf fold
  ctx.fillStyle = "#1a1a22";
  ctx.beginPath();
  ctx.ellipse(x+s*0.5, y+s*0.54+bob, s*0.22, s*0.05, 0, 0, Math.PI*2);
  ctx.fill();
  // scarf tail (hanging on left)
  ctx.fillStyle = "#000";
  ctx.beginPath();
  ctx.moveTo(x+s*0.30, y+s*0.58+bob);
  ctx.lineTo(x+s*0.22, y+s*0.78+bob);
  ctx.lineTo(x+s*0.34, y+s*0.80+bob);
  ctx.lineTo(x+s*0.40, y+s*0.60+bob);
  ctx.closePath();
  ctx.fill();
  // scarf tail fringe
  px(ctx, x+s*0.22, y+s*0.78+bob, s*0.014, s*0.04, "#1a1a22");
  px(ctx, x+s*0.26, y+s*0.79+bob, s*0.014, s*0.04, "#1a1a22");
  px(ctx, x+s*0.30, y+s*0.80+bob, s*0.014, s*0.04, "#1a1a22");
  // face (cool-tone highlight side)
  ctx.fillStyle = "#a8b2c4";
  ctx.beginPath();
  ctx.ellipse(x+s*0.5, y+s*0.40+bob, s*0.16, s*0.18, 0, 0, Math.PI*2);
  ctx.fill();
  // face cool-tone highlight (bluish on right cheek)
  ctx.fillStyle = "rgba(140,180,220,0.35)";
  ctx.beginPath();
  ctx.ellipse(x+s*0.56, y+s*0.42+bob, s*0.07, s*0.10, 0, 0, Math.PI*2);
  ctx.fill();
  // face shadow side (left, darker)
  ctx.fillStyle = "rgba(40,50,70,0.35)";
  ctx.beginPath();
  ctx.ellipse(x+s*0.42, y+s*0.42+bob, s*0.05, s*0.10, 0, 0, Math.PI*2);
  ctx.fill();
  // dark slick hair sweep (stylish side-swept)
  ctx.fillStyle = "#0a0a14";
  ctx.beginPath();
  ctx.moveTo(x+s*0.34, y+s*0.34+bob);
  ctx.quadraticCurveTo(x+s*0.30, y+s*0.20+bob, x+s*0.46, y+s*0.18+bob);
  ctx.quadraticCurveTo(x+s*0.62, y+s*0.16+bob, x+s*0.68, y+s*0.30+bob);
  ctx.quadraticCurveTo(x+s*0.60, y+s*0.26+bob, x+s*0.50, y+s*0.30+bob);
  ctx.quadraticCurveTo(x+s*0.42, y+s*0.32+bob, x+s*0.34, y+s*0.34+bob);
  ctx.closePath();
  ctx.fill();
  // hair sweep highlight
  ctx.fillStyle = "#2a3048";
  ctx.beginPath();
  ctx.moveTo(x+s*0.46, y+s*0.20+bob);
  ctx.quadraticCurveTo(x+s*0.56, y+s*0.18+bob, x+s*0.62, y+s*0.24+bob);
  ctx.lineTo(x+s*0.58, y+s*0.26+bob);
  ctx.quadraticCurveTo(x+s*0.52, y+s*0.22+bob, x+s*0.46, y+s*0.24+bob);
  ctx.closePath();
  ctx.fill();
  // faint glowing cool-tone eyes
  const glow = 0.6 + Math.sin(t*0.005)*0.4;
  ctx.fillStyle = `rgba(140,200,240,${0.3+glow*0.3})`;
  ctx.beginPath(); ctx.arc(x+s*0.44, y+s*0.40+bob, s*0.030, 0, Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(x+s*0.56, y+s*0.40+bob, s*0.030, 0, Math.PI*2); ctx.fill();
  // inner eye (cyan)
  ctx.fillStyle = `rgba(180,230,255,${0.7+glow*0.3})`;
  ctx.beginPath(); ctx.arc(x+s*0.44, y+s*0.40+bob, s*0.014, 0, Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(x+s*0.56, y+s*0.40+bob, s*0.014, 0, Math.PI*2); ctx.fill();
  // pupil core
  ctx.fillStyle = "#fff";
  ctx.beginPath(); ctx.arc(x+s*0.44, y+s*0.40+bob, s*0.005, 0, Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(x+s*0.56, y+s*0.40+bob, s*0.005, 0, Math.PI*2); ctx.fill();
  // subtle stoic mouth line
  ctx.strokeStyle = "#3a3848";
  ctx.lineWidth = Math.max(1, s*0.010);
  ctx.beginPath();
  ctx.moveTo(x+s*0.46, y+s*0.50+bob);
  ctx.lineTo(x+s*0.54, y+s*0.50+bob);
  ctx.stroke();
  // FC badge
  ctx.fillStyle = "#5865f2";
  ctx.fillRect(x+s*0.42, y+s*0.84+bob, s*0.16, s*0.06);
  ctx.fillStyle = "#fff";
  ctx.font = `bold ${Math.floor(s*0.045)}px monospace`;
  ctx.textAlign = "center";
  ctx.fillText("FC", x+s*0.50, y+s*0.885+bob);
  ctx.textAlign = "start";
},
    BYTE(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t*0.003) * (s*0.012);
      const tailWag = Math.sin(t*0.005) * (s*0.04);
      const pulse = 0.6 + Math.sin(t*0.008)*0.4;
      shadow(ctx, x+s/2, y+s-4, s*0.34, 5);
      // sleek black cat body
      ctx.fillStyle = "#0a0a12";
      ctx.beginPath();
      ctx.ellipse(x+s*0.5, y+s*0.68+bob, s*0.30, s*0.24, 0, 0, Math.PI*2);
      ctx.fill();
      // body subtle highlight
      ctx.fillStyle = "#1a1a26";
      ctx.beginPath();
      ctx.ellipse(x+s*0.46, y+s*0.62+bob, s*0.16, s*0.10, 0, 0, Math.PI*2);
      ctx.fill();
      // tiny cyan circuit dots on body
      ctx.fillStyle = `rgba(80,240,255,${pulse})`;
      px(ctx, x+s*0.36, y+s*0.66+bob, s*0.014, s*0.014, `rgba(80,240,255,${pulse})`);
      px(ctx, x+s*0.50, y+s*0.74+bob, s*0.014, s*0.014, `rgba(80,240,255,${pulse})`);
      px(ctx, x+s*0.62, y+s*0.66+bob, s*0.014, s*0.014, `rgba(80,240,255,${pulse})`);
      px(ctx, x+s*0.44, y+s*0.78+bob, s*0.014, s*0.014, `rgba(80,240,255,${pulse})`);
      // circuit trace lines
      ctx.strokeStyle = `rgba(80,240,255,${pulse*0.6})`;
      ctx.lineWidth = Math.max(1, s*0.006);
      ctx.beginPath();
      ctx.moveTo(x+s*0.36, y+s*0.66+bob);
      ctx.lineTo(x+s*0.50, y+s*0.74+bob);
      ctx.lineTo(x+s*0.62, y+s*0.66+bob);
      ctx.stroke();
      // tail with cyan glowing tip
      ctx.fillStyle = "#0a0a12";
      ctx.beginPath();
      ctx.moveTo(x+s*0.80, y+s*0.66+bob);
      ctx.quadraticCurveTo(x+s*0.94+tailWag, y+s*0.50+bob, x+s*0.86+tailWag, y+s*0.32+bob);
      ctx.lineTo(x+s*0.82+tailWag, y+s*0.36+bob);
      ctx.lineTo(x+s*0.78, y+s*0.62+bob);
      ctx.closePath();
      ctx.fill();
      // glowing cyan tail tip
      ctx.fillStyle = `rgba(80,240,255,${pulse})`;
      ctx.beginPath();
      ctx.arc(x+s*0.84+tailWag, y+s*0.32+bob, s*0.030, 0, Math.PI*2);
      ctx.fill();
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.arc(x+s*0.84+tailWag, y+s*0.32+bob, s*0.012, 0, Math.PI*2);
      ctx.fill();
      // head
      ctx.fillStyle = "#0a0a12";
      ctx.beginPath();
      ctx.ellipse(x+s*0.5, y+s*0.40+bob, s*0.24, s*0.22, 0, 0, Math.PI*2);
      ctx.fill();
      // pointed ears
      ctx.fillStyle = "#0a0a12";
      ctx.beginPath();
      ctx.moveTo(x+s*0.30, y+s*0.24+bob);
      ctx.lineTo(x+s*0.34, y+s*0.06+bob);
      ctx.lineTo(x+s*0.42, y+s*0.20+bob);
      ctx.closePath();
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(x+s*0.70, y+s*0.24+bob);
      ctx.lineTo(x+s*0.66, y+s*0.06+bob);
      ctx.lineTo(x+s*0.58, y+s*0.20+bob);
      ctx.closePath();
      ctx.fill();
      // dim cyan inner ears
      ctx.fillStyle = "#1a3a48";
      ctx.beginPath();
      ctx.moveTo(x+s*0.34, y+s*0.20+bob);
      ctx.lineTo(x+s*0.36, y+s*0.10+bob);
      ctx.lineTo(x+s*0.40, y+s*0.20+bob);
      ctx.closePath();
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(x+s*0.66, y+s*0.20+bob);
      ctx.lineTo(x+s*0.64, y+s*0.10+bob);
      ctx.lineTo(x+s*0.60, y+s*0.20+bob);
      ctx.closePath();
      ctx.fill();
      // glowing cyan cat-slit eyes
      ctx.fillStyle = `rgba(80,240,255,${pulse})`;
      ctx.beginPath(); ctx.arc(x+s*0.42, y+s*0.40+bob, s*0.040, 0, Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(x+s*0.58, y+s*0.40+bob, s*0.040, 0, Math.PI*2); ctx.fill();
      // cat-slit pupils
      ctx.fillStyle = "#0a0a12";
      ctx.fillRect(x+s*0.416, y+s*0.376+bob, s*0.008, s*0.048);
      ctx.fillRect(x+s*0.576, y+s*0.376+bob, s*0.008, s*0.048);
      // pink nose triangle
      ctx.fillStyle = "#ff80a0";
      ctx.beginPath();
      ctx.moveTo(x+s*0.50, y+s*0.46+bob);
      ctx.lineTo(x+s*0.46, y+s*0.50+bob);
      ctx.lineTo(x+s*0.54, y+s*0.50+bob);
      ctx.closePath();
      ctx.fill();
      // whiskers
      ctx.strokeStyle = "#aaa";
      ctx.lineWidth = Math.max(1, s*0.008);
      ctx.beginPath();
      ctx.moveTo(x+s*0.30, y+s*0.48+bob); ctx.lineTo(x+s*0.42, y+s*0.50+bob);
      ctx.moveTo(x+s*0.30, y+s*0.52+bob); ctx.lineTo(x+s*0.42, y+s*0.52+bob);
      ctx.moveTo(x+s*0.70, y+s*0.48+bob); ctx.lineTo(x+s*0.58, y+s*0.50+bob);
      ctx.moveTo(x+s*0.70, y+s*0.52+bob); ctx.lineTo(x+s*0.58, y+s*0.52+bob);
      ctx.stroke();
      // small mouth
      ctx.beginPath();
      ctx.moveTo(x+s*0.50, y+s*0.50+bob); ctx.lineTo(x+s*0.50, y+s*0.54+bob);
      ctx.moveTo(x+s*0.50, y+s*0.54+bob); ctx.quadraticCurveTo(x+s*0.46, y+s*0.56+bob, x+s*0.44, y+s*0.54+bob);
      ctx.moveTo(x+s*0.50, y+s*0.54+bob); ctx.quadraticCurveTo(x+s*0.54, y+s*0.56+bob, x+s*0.56, y+s*0.54+bob);
      ctx.stroke();
      // ALTR badge
      ctx.fillStyle = "#5865f2";
      ctx.fillRect(x+s*0.38, y+s*0.86+bob, s*0.24, s*0.06);
      ctx.fillStyle = "#fff";
      ctx.font = `bold ${Math.floor(s*0.045)}px monospace`;
      ctx.textAlign = "center";
      ctx.fillText("ALTR", x+s*0.50, y+s*0.905+bob);
      ctx.textAlign = "start";
    },

    CALICSIZED(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t*0.0028) * (s*0.011);
      const glow = 0.6 + Math.sin(t*0.007)*0.4;
      shadow(ctx, x+s/2, y+s-4, s*0.34, 5);
      // dark cloak body
      ctx.fillStyle = "#1a1424";
      ctx.beginPath();
      ctx.moveTo(x+s*0.18, y+s*0.92+bob);
      ctx.lineTo(x+s*0.22, y+s*0.56+bob);
      ctx.lineTo(x+s*0.40, y+s*0.46+bob);
      ctx.lineTo(x+s*0.60, y+s*0.46+bob);
      ctx.lineTo(x+s*0.78, y+s*0.56+bob);
      ctx.lineTo(x+s*0.82, y+s*0.92+bob);
      ctx.closePath();
      ctx.fill();
      // cloak shadow folds
      ctx.fillStyle = "#0a0612";
      px(ctx, x+s*0.36, y+s*0.62+bob, s*0.04, s*0.30, "#0a0612");
      px(ctx, x+s*0.60, y+s*0.62+bob, s*0.04, s*0.30, "#0a0612");
      // hood (large, casts deep shadow)
      ctx.fillStyle = "#1a1424";
      ctx.beginPath();
      ctx.moveTo(x+s*0.20, y+s*0.50+bob);
      ctx.quadraticCurveTo(x+s*0.20, y+s*0.14+bob, x+s*0.50, y+s*0.10+bob);
      ctx.quadraticCurveTo(x+s*0.80, y+s*0.14+bob, x+s*0.80, y+s*0.50+bob);
      ctx.lineTo(x+s*0.72, y+s*0.46+bob);
      ctx.quadraticCurveTo(x+s*0.72, y+s*0.26+bob, x+s*0.50, y+s*0.22+bob);
      ctx.quadraticCurveTo(x+s*0.28, y+s*0.26+bob, x+s*0.28, y+s*0.46+bob);
      ctx.closePath();
      ctx.fill();
      // hood inner shadow (very dark)
      ctx.fillStyle = "#000";
      ctx.beginPath();
      ctx.ellipse(x+s*0.50, y+s*0.40+bob, s*0.18, s*0.18, 0, 0, Math.PI*2);
      ctx.fill();
      // silver hair strands escaping the hood
      ctx.fillStyle = "#c8c8d8";
      px(ctx, x+s*0.30, y+s*0.42+bob, s*0.02, s*0.12, "#c8c8d8");
      px(ctx, x+s*0.34, y+s*0.46+bob, s*0.02, s*0.10, "#c8c8d8");
      px(ctx, x+s*0.66, y+s*0.46+bob, s*0.02, s*0.10, "#c8c8d8");
      px(ctx, x+s*0.70, y+s*0.42+bob, s*0.02, s*0.12, "#c8c8d8");
      px(ctx, x+s*0.46, y+s*0.50+bob, s*0.02, s*0.06, "#c8c8d8");
      px(ctx, x+s*0.54, y+s*0.50+bob, s*0.02, s*0.06, "#c8c8d8");
      // single glowing red eye inside hood
      ctx.fillStyle = `rgba(255,40,40,${glow})`;
      ctx.beginPath();
      ctx.arc(x+s*0.50, y+s*0.40+bob, s*0.040, 0, Math.PI*2);
      ctx.fill();
      ctx.fillStyle = `rgba(255,160,160,${glow})`;
      ctx.beginPath();
      ctx.arc(x+s*0.50, y+s*0.40+bob, s*0.020, 0, Math.PI*2);
      ctx.fill();
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.arc(x+s*0.50, y+s*0.40+bob, s*0.008, 0, Math.PI*2);
      ctx.fill();
      // mace handle (diagonal)
      ctx.strokeStyle = "#6a4a2a";
      ctx.lineWidth = Math.max(2, s*0.020);
      ctx.beginPath();
      ctx.moveTo(x+s*0.20, y+s*0.92+bob);
      ctx.lineTo(x+s*0.62, y+s*0.50+bob);
      ctx.stroke();
      // mace handle wraps
      ctx.strokeStyle = "#3a2a1a";
      ctx.lineWidth = Math.max(1, s*0.008);
      for (let i = 0; i < 5; i++) {
        const t1 = 0.15 + i*0.10;
        const px1 = x+s*(0.20 + (0.62-0.20)*t1);
        const py1 = y+s*(0.92 + (0.50-0.92)*t1)+bob;
        ctx.beginPath();
        ctx.moveTo(px1-s*0.014, py1+s*0.014);
        ctx.lineTo(px1+s*0.014, py1-s*0.014);
        ctx.stroke();
      }
      // spiked metal ball
      ctx.fillStyle = "#6a6a78";
      ctx.beginPath();
      ctx.arc(x+s*0.66, y+s*0.46+bob, s*0.10, 0, Math.PI*2);
      ctx.fill();
      // ball highlight
      ctx.fillStyle = "#9aa0a8";
      ctx.beginPath();
      ctx.arc(x+s*0.62, y+s*0.42+bob, s*0.040, 0, Math.PI*2);
      ctx.fill();
      // 6 spikes radiating
      ctx.fillStyle = "#8a8a98";
      const cx = x+s*0.66, cy = y+s*0.46+bob;
      for (let i = 0; i < 6; i++) {
        const a = (i/6)*Math.PI*2;
        const sx1 = cx + Math.cos(a)*s*0.10;
        const sy1 = cy + Math.sin(a)*s*0.10;
        const sx2 = cx + Math.cos(a)*s*0.18;
        const sy2 = cy + Math.sin(a)*s*0.18;
        const pa = a + Math.PI/2;
        ctx.beginPath();
        ctx.moveTo(sx1 + Math.cos(pa)*s*0.020, sy1 + Math.sin(pa)*s*0.020);
        ctx.lineTo(sx2, sy2);
        ctx.lineTo(sx1 - Math.cos(pa)*s*0.020, sy1 - Math.sin(pa)*s*0.020);
        ctx.closePath();
        ctx.fill();
      }
      // Mace badge
      ctx.fillStyle = "#5865f2";
      ctx.fillRect(x+s*0.38, y+s*0.86+bob, s*0.24, s*0.06);
      ctx.fillStyle = "#fff";
      ctx.font = `bold ${Math.floor(s*0.045)}px monospace`;
      ctx.textAlign = "center";
      ctx.fillText("MACE", x+s*0.50, y+s*0.905+bob);
      ctx.textAlign = "start";
    },

    BUTTKUN(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t*0.003) * (s*0.014);
      const sparkle = 0.5 + Math.sin(t*0.008)*0.5;
      shadow(ctx, x+s/2, y+s-4, s*0.34, 5);
      // solid blue circle body
      ctx.fillStyle = "#3aa0ff";
      ctx.beginPath();
      ctx.arc(x+s*0.5, y+s*0.52+bob, s*0.36, 0, Math.PI*2);
      ctx.fill();
      // body outline
      ctx.strokeStyle = "#1a60c0";
      ctx.lineWidth = Math.max(1, s*0.012);
      ctx.beginPath();
      ctx.arc(x+s*0.5, y+s*0.52+bob, s*0.36, 0, Math.PI*2);
      ctx.stroke();
      // lighter inner highlight
      ctx.fillStyle = "#7ac4ff";
      ctx.beginPath();
      ctx.ellipse(x+s*0.40, y+s*0.40+bob, s*0.14, s*0.10, -0.4, 0, Math.PI*2);
      ctx.fill();
      ctx.fillStyle = "#a8dcff";
      ctx.beginPath();
      ctx.ellipse(x+s*0.36, y+s*0.36+bob, s*0.06, s*0.04, -0.4, 0, Math.PI*2);
      ctx.fill();
      // pink cheek blush
      ctx.fillStyle = "rgba(255,140,180,0.8)";
      ctx.beginPath();
      ctx.ellipse(x+s*0.30, y+s*0.58+bob, s*0.05, s*0.03, 0, 0, Math.PI*2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(x+s*0.70, y+s*0.58+bob, s*0.05, s*0.03, 0, 0, Math.PI*2);
      ctx.fill();
      // sparkly oval eyes
      ctx.fillStyle = "#0a0a1a";
      ctx.beginPath();
      ctx.ellipse(x+s*0.40, y+s*0.50+bob, s*0.04, s*0.06, 0, 0, Math.PI*2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(x+s*0.60, y+s*0.50+bob, s*0.04, s*0.06, 0, 0, Math.PI*2);
      ctx.fill();
      // eye sparkles
      ctx.fillStyle = `rgba(255,255,255,${sparkle})`;
      ctx.beginPath();
      ctx.arc(x+s*0.41, y+s*0.48+bob, s*0.018, 0, Math.PI*2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(x+s*0.61, y+s*0.48+bob, s*0.018, 0, Math.PI*2);
      ctx.fill();
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.arc(x+s*0.39, y+s*0.52+bob, s*0.008, 0, Math.PI*2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(x+s*0.59, y+s*0.52+bob, s*0.008, 0, Math.PI*2);
      ctx.fill();
      // simple smile
      ctx.strokeStyle = "#0a0a1a";
      ctx.lineWidth = Math.max(2, s*0.014);
      ctx.beginPath();
      ctx.arc(x+s*0.50, y+s*0.58+bob, s*0.06, Math.PI*0.15, Math.PI*0.85);
      ctx.stroke();
      // BTR! badge
      ctx.fillStyle = "#5865f2";
      ctx.fillRect(x+s*0.38, y+s*0.90+bob, s*0.24, s*0.06);
      ctx.fillStyle = "#fff";
      ctx.font = `bold ${Math.floor(s*0.045)}px monospace`;
      ctx.textAlign = "center";
      ctx.fillText("BTR!", x+s*0.50, y+s*0.945+bob);
      ctx.textAlign = "start";
    },

    BLU(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t*0.003) * (s*0.014);
      const sparkle = 0.5 + Math.sin(t*0.008)*0.5;
      shadow(ctx, x+s/2, y+s-4, s*0.32, 5);
      // egg-shaped blue blob body
      ctx.fillStyle = "#5ab8ff";
      ctx.beginPath();
      ctx.ellipse(x+s*0.5, y+s*0.54+bob, s*0.30, s*0.36, 0, 0, Math.PI*2);
      ctx.fill();
      // body outline
      ctx.strokeStyle = "#2a78c0";
      ctx.lineWidth = Math.max(1, s*0.010);
      ctx.beginPath();
      ctx.ellipse(x+s*0.5, y+s*0.54+bob, s*0.30, s*0.36, 0, 0, Math.PI*2);
      ctx.stroke();
      // inner highlight
      ctx.fillStyle = "#a0d8ff";
      ctx.beginPath();
      ctx.ellipse(x+s*0.40, y+s*0.40+bob, s*0.10, s*0.14, -0.3, 0, Math.PI*2);
      ctx.fill();
      // tiny hair tuft
      ctx.fillStyle = "#5ab8ff";
      ctx.beginPath();
      ctx.moveTo(x+s*0.46, y+s*0.20+bob);
      ctx.quadraticCurveTo(x+s*0.50, y+s*0.10+bob, x+s*0.56, y+s*0.16+bob);
      ctx.lineTo(x+s*0.52, y+s*0.22+bob);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = "#2a78c0";
      ctx.lineWidth = Math.max(1, s*0.008);
      ctx.beginPath();
      ctx.moveTo(x+s*0.46, y+s*0.20+bob);
      ctx.quadraticCurveTo(x+s*0.50, y+s*0.10+bob, x+s*0.56, y+s*0.16+bob);
      ctx.stroke();
      // pink heart-shaped cheeks
      ctx.fillStyle = "#ff80b0";
      // left heart
      let chx = x+s*0.28, chy = y+s*0.58+bob;
      ctx.beginPath();
      ctx.arc(chx-s*0.012, chy-s*0.004, s*0.018, 0, Math.PI*2);
      ctx.arc(chx+s*0.012, chy-s*0.004, s*0.018, 0, Math.PI*2);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(chx-s*0.026, chy+s*0.004);
      ctx.lineTo(chx, chy+s*0.030);
      ctx.lineTo(chx+s*0.026, chy+s*0.004);
      ctx.closePath();
      ctx.fill();
      // right heart
      chx = x+s*0.72; chy = y+s*0.58+bob;
      ctx.beginPath();
      ctx.arc(chx-s*0.012, chy-s*0.004, s*0.018, 0, Math.PI*2);
      ctx.arc(chx+s*0.012, chy-s*0.004, s*0.018, 0, Math.PI*2);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(chx-s*0.026, chy+s*0.004);
      ctx.lineTo(chx, chy+s*0.030);
      ctx.lineTo(chx+s*0.026, chy+s*0.004);
      ctx.closePath();
      ctx.fill();
      // big sparkly black eyes
      ctx.fillStyle = "#0a0a1a";
      ctx.beginPath();
      ctx.ellipse(x+s*0.40, y+s*0.50+bob, s*0.05, s*0.07, 0, 0, Math.PI*2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(x+s*0.60, y+s*0.50+bob, s*0.05, s*0.07, 0, 0, Math.PI*2);
      ctx.fill();
      // pink inner sparkle
      ctx.fillStyle = "#ff80b0";
      ctx.beginPath();
      ctx.arc(x+s*0.41, y+s*0.51+bob, s*0.018, 0, Math.PI*2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(x+s*0.61, y+s*0.51+bob, s*0.018, 0, Math.PI*2);
      ctx.fill();
      // white eye sparkle
      ctx.fillStyle = `rgba(255,255,255,${sparkle})`;
      ctx.beginPath();
      ctx.arc(x+s*0.395, y+s*0.48+bob, s*0.012, 0, Math.PI*2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(x+s*0.595, y+s*0.48+bob, s*0.012, 0, Math.PI*2);
      ctx.fill();
      // tiny round open mouth (o-shape)
      ctx.fillStyle = "#0a0a1a";
      ctx.beginPath();
      ctx.arc(x+s*0.50, y+s*0.62+bob, s*0.018, 0, Math.PI*2);
      ctx.fill();
      ctx.fillStyle = "#ff80a0";
      ctx.beginPath();
      ctx.arc(x+s*0.50, y+s*0.62+bob, s*0.010, 0, Math.PI*2);
      ctx.fill();
      // floating sparkles
      const sT = t*0.003;
      for (let i = 0; i < 4; i++) {
        const a = sT + i*(Math.PI*2/4);
        const sxp = x+s*0.5 + Math.cos(a)*s*0.42;
        const syp = y+s*0.5 + Math.sin(a)*s*0.30+bob;
        ctx.fillStyle = `rgba(255,255,200,${0.4+Math.sin(t*0.01+i)*0.4})`;
        ctx.beginPath();
        ctx.moveTo(sxp, syp-s*0.020);
        ctx.lineTo(sxp+s*0.008, syp);
        ctx.lineTo(sxp+s*0.020, syp);
        ctx.lineTo(sxp+s*0.010, syp+s*0.008);
        ctx.lineTo(sxp+s*0.014, syp+s*0.020);
        ctx.lineTo(sxp, syp+s*0.010);
        ctx.lineTo(sxp-s*0.014, syp+s*0.020);
        ctx.lineTo(sxp-s*0.010, syp+s*0.008);
        ctx.lineTo(sxp-s*0.020, syp);
        ctx.lineTo(sxp-s*0.008, syp);
        ctx.closePath();
        ctx.fill();
      }
      // Cute badge
      ctx.fillStyle = "#5865f2";
      ctx.fillRect(x+s*0.38, y+s*0.92+bob, s*0.24, s*0.06);
      ctx.fillStyle = "#fff";
      ctx.font = `bold ${Math.floor(s*0.045)}px monospace`;
      ctx.textAlign = "center";
      ctx.fillText("CUTE", x+s*0.50, y+s*0.965+bob);
      ctx.textAlign = "start";
    },

    BENJI_YT(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t*0.003) * (s*0.012);
      const eyeGlow = 0.5 + Math.sin(t*0.008)*0.5;
      shadow(ctx, x+s/2, y+s-4, s*0.34, 5);
      // hoodie body
      ctx.fillStyle = "#1a1a22";
      ctx.beginPath();
      ctx.ellipse(x+s*0.5, y+s*0.74+bob, s*0.32, s*0.22, 0, 0, Math.PI*2);
      ctx.fill();
      // arms
      px(ctx, x+s*0.16, y+s*0.62+bob, s*0.10, s*0.20, "#1a1a22");
      px(ctx, x+s*0.74, y+s*0.62+bob, s*0.10, s*0.20, "#1a1a22");
      // hoodie strings
      ctx.strokeStyle = "#0a0a12";
      ctx.lineWidth = Math.max(1, s*0.010);
      ctx.beginPath();
      ctx.moveTo(x+s*0.46, y+s*0.62+bob);
      ctx.lineTo(x+s*0.44, y+s*0.74+bob);
      ctx.moveTo(x+s*0.54, y+s*0.62+bob);
      ctx.lineTo(x+s*0.56, y+s*0.74+bob);
      ctx.stroke();
      // hood up (around head)
      ctx.fillStyle = "#1a1a22";
      ctx.beginPath();
      ctx.moveTo(x+s*0.22, y+s*0.56+bob);
      ctx.quadraticCurveTo(x+s*0.22, y+s*0.16+bob, x+s*0.50, y+s*0.12+bob);
      ctx.quadraticCurveTo(x+s*0.78, y+s*0.16+bob, x+s*0.78, y+s*0.56+bob);
      ctx.lineTo(x+s*0.70, y+s*0.50+bob);
      ctx.quadraticCurveTo(x+s*0.70, y+s*0.26+bob, x+s*0.50, y+s*0.22+bob);
      ctx.quadraticCurveTo(x+s*0.30, y+s*0.26+bob, x+s*0.30, y+s*0.50+bob);
      ctx.closePath();
      ctx.fill();
      // hood inner shadow
      ctx.fillStyle = "#0a0a12";
      px(ctx, x+s*0.30, y+s*0.30+bob, s*0.40, s*0.04, "#0a0a12");
      // white skull mask covering face
      ctx.fillStyle = "#f0ece0";
      ctx.beginPath();
      ctx.ellipse(x+s*0.5, y+s*0.42+bob, s*0.18, s*0.20, 0, 0, Math.PI*2);
      ctx.fill();
      // skull jaw extending down
      ctx.fillStyle = "#f0ece0";
      ctx.beginPath();
      ctx.moveTo(x+s*0.36, y+s*0.50+bob);
      ctx.lineTo(x+s*0.40, y+s*0.62+bob);
      ctx.lineTo(x+s*0.60, y+s*0.62+bob);
      ctx.lineTo(x+s*0.64, y+s*0.50+bob);
      ctx.closePath();
      ctx.fill();
      // mask shading
      ctx.fillStyle = "#c8c2b0";
      ctx.beginPath();
      ctx.ellipse(x+s*0.5, y+s*0.46+bob, s*0.18, s*0.04, 0, 0, Math.PI*2);
      ctx.fill();
      // dark eye sockets
      ctx.fillStyle = "#000";
      ctx.beginPath();
      ctx.ellipse(x+s*0.40, y+s*0.40+bob, s*0.046, s*0.040, 0, 0, Math.PI*2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(x+s*0.60, y+s*0.40+bob, s*0.046, s*0.040, 0, 0, Math.PI*2);
      ctx.fill();
      // tiny red eye glow inside sockets
      ctx.fillStyle = `rgba(255,40,40,${eyeGlow})`;
      ctx.beginPath();
      ctx.arc(x+s*0.40, y+s*0.40+bob, s*0.014, 0, Math.PI*2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(x+s*0.60, y+s*0.40+bob, s*0.014, 0, Math.PI*2);
      ctx.fill();
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.arc(x+s*0.40, y+s*0.40+bob, s*0.005, 0, Math.PI*2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(x+s*0.60, y+s*0.40+bob, s*0.005, 0, Math.PI*2);
      ctx.fill();
      // nose hole (triangular)
      ctx.fillStyle = "#000";
      ctx.beginPath();
      ctx.moveTo(x+s*0.50, y+s*0.46+bob);
      ctx.lineTo(x+s*0.475, y+s*0.52+bob);
      ctx.lineTo(x+s*0.525, y+s*0.52+bob);
      ctx.closePath();
      ctx.fill();
      // vertical stripe teeth
      ctx.fillStyle = "#000";
      px(ctx, x+s*0.41, y+s*0.55+bob, s*0.018, s*0.07, "#000");
      ctx.fillStyle = "#f0ece0";
      px(ctx, x+s*0.428, y+s*0.55+bob, s*0.014, s*0.07, "#f0ece0");
      ctx.fillStyle = "#000";
      px(ctx, x+s*0.442, y+s*0.55+bob, s*0.018, s*0.07, "#000");
      ctx.fillStyle = "#f0ece0";
      px(ctx, x+s*0.460, y+s*0.55+bob, s*0.014, s*0.07, "#f0ece0");
      ctx.fillStyle = "#000";
      px(ctx, x+s*0.474, y+s*0.55+bob, s*0.018, s*0.07, "#000");
      ctx.fillStyle = "#f0ece0";
      px(ctx, x+s*0.492, y+s*0.55+bob, s*0.014, s*0.07, "#f0ece0");
      ctx.fillStyle = "#000";
      px(ctx, x+s*0.506, y+s*0.55+bob, s*0.018, s*0.07, "#000");
      ctx.fillStyle = "#f0ece0";
      px(ctx, x+s*0.524, y+s*0.55+bob, s*0.014, s*0.07, "#f0ece0");
      ctx.fillStyle = "#000";
      px(ctx, x+s*0.538, y+s*0.55+bob, s*0.018, s*0.07, "#000");
      ctx.fillStyle = "#f0ece0";
      px(ctx, x+s*0.556, y+s*0.55+bob, s*0.014, s*0.07, "#f0ece0");
      ctx.fillStyle = "#000";
      px(ctx, x+s*0.570, y+s*0.55+bob, s*0.018, s*0.07, "#000");
      // WOS badge
      ctx.fillStyle = "#5865f2";
      ctx.fillRect(x+s*0.38, y+s*0.86+bob, s*0.24, s*0.06);
      ctx.fillStyle = "#fff";
      ctx.font = `bold ${Math.floor(s*0.045)}px monospace`;
      ctx.textAlign = "center";
      ctx.fillText("WOS", x+s*0.50, y+s*0.905+bob);
      ctx.textAlign = "start";
    },

    ALRAYS(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t*0.003) * (s*0.012);
      const tailWag = Math.sin(t*0.005) * (s*0.04);
      shadow(ctx, x+s/2, y+s-4, s*0.34, 5);
      // chubby orange tabby body
      ctx.fillStyle = "#ff9540";
      ctx.beginPath();
      ctx.ellipse(x+s*0.5, y+s*0.68+bob, s*0.34, s*0.26, 0, 0, Math.PI*2);
      ctx.fill();
      // belly stripes
      ctx.fillStyle = "#c06820";
      for (let i = 0; i < 4; i++) {
        ctx.fillRect(x+s*(0.32 + i*0.10), y+s*0.74+bob, s*0.04, s*0.10);
      }
      // tail
      ctx.fillStyle = "#ff9540";
      ctx.beginPath();
      ctx.moveTo(x+s*0.82, y+s*0.66+bob);
      ctx.quadraticCurveTo(x+s*0.96+tailWag, y+s*0.50+bob, x+s*0.88+tailWag, y+s*0.34+bob);
      ctx.lineTo(x+s*0.84+tailWag, y+s*0.38+bob);
      ctx.lineTo(x+s*0.80, y+s*0.62+bob);
      ctx.closePath();
      ctx.fill();
      // tail stripes
      ctx.fillStyle = "#c06820";
      ctx.fillRect(x+s*0.86, y+s*0.50+bob, s*0.04, s*0.04);
      ctx.fillRect(x+s*0.86+tailWag*0.5, y+s*0.42+bob, s*0.04, s*0.04);
      // head
      ctx.fillStyle = "#ff9540";
      ctx.beginPath();
      ctx.ellipse(x+s*0.5, y+s*0.40+bob, s*0.24, s*0.22, 0, 0, Math.PI*2);
      ctx.fill();
      // triangle ears
      ctx.fillStyle = "#ff9540";
      ctx.beginPath();
      ctx.moveTo(x+s*0.30, y+s*0.24+bob);
      ctx.lineTo(x+s*0.34, y+s*0.10+bob);
      ctx.lineTo(x+s*0.42, y+s*0.22+bob);
      ctx.closePath();
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(x+s*0.70, y+s*0.24+bob);
      ctx.lineTo(x+s*0.66, y+s*0.10+bob);
      ctx.lineTo(x+s*0.58, y+s*0.22+bob);
      ctx.closePath();
      ctx.fill();
      // pink inner ears
      ctx.fillStyle = "#ffb0c0";
      ctx.beginPath();
      ctx.moveTo(x+s*0.34, y+s*0.20+bob);
      ctx.lineTo(x+s*0.36, y+s*0.14+bob);
      ctx.lineTo(x+s*0.40, y+s*0.20+bob);
      ctx.closePath();
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(x+s*0.66, y+s*0.20+bob);
      ctx.lineTo(x+s*0.64, y+s*0.14+bob);
      ctx.lineTo(x+s*0.60, y+s*0.20+bob);
      ctx.closePath();
      ctx.fill();
      // happy closed eyes (curved arcs)
      ctx.strokeStyle = "#1a1a1a";
      ctx.lineWidth = Math.max(1, s*0.014);
      ctx.beginPath();
      ctx.arc(x+s*0.42, y+s*0.40+bob, s*0.030, Math.PI*1.1, Math.PI*1.9);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(x+s*0.58, y+s*0.40+bob, s*0.030, Math.PI*1.1, Math.PI*1.9);
      ctx.stroke();
      // pink nose
      ctx.fillStyle = "#ff80a0";
      ctx.beginPath();
      ctx.moveTo(x+s*0.50, y+s*0.46+bob);
      ctx.lineTo(x+s*0.46, y+s*0.50+bob);
      ctx.lineTo(x+s*0.54, y+s*0.50+bob);
      ctx.closePath();
      ctx.fill();
      // small smile
      ctx.beginPath();
      ctx.moveTo(x+s*0.50, y+s*0.50+bob);
      ctx.lineTo(x+s*0.50, y+s*0.54+bob);
      ctx.moveTo(x+s*0.50, y+s*0.54+bob);
      ctx.quadraticCurveTo(x+s*0.46, y+s*0.56+bob, x+s*0.44, y+s*0.54+bob);
      ctx.moveTo(x+s*0.50, y+s*0.54+bob);
      ctx.quadraticCurveTo(x+s*0.54, y+s*0.56+bob, x+s*0.56, y+s*0.54+bob);
      ctx.stroke();
      // flower crown - ring of white flowers around head
      const crownCx = x+s*0.50, crownCy = y+s*0.20+bob;
      const flowerPositions = [
        {ang: Math.PI*1.05, r: s*0.24},
        {ang: Math.PI*1.20, r: s*0.22},
        {ang: Math.PI*1.40, r: s*0.20},
        {ang: Math.PI*1.60, r: s*0.20},
        {ang: Math.PI*1.80, r: s*0.22},
        {ang: Math.PI*1.95, r: s*0.24},
      ];
      for (const fp of flowerPositions) {
        const fx = crownCx + Math.cos(fp.ang)*fp.r;
        const fy = y+s*0.40+bob + Math.sin(fp.ang)*fp.r;
        // 5 white petals
        ctx.fillStyle = "#fff";
        for (let p = 0; p < 5; p++) {
          const pa = (p/5)*Math.PI*2;
          ctx.beginPath();
          ctx.arc(fx + Math.cos(pa)*s*0.022, fy + Math.sin(pa)*s*0.022, s*0.018, 0, Math.PI*2);
          ctx.fill();
        }
        // yellow center
        ctx.fillStyle = "#ffd040";
        ctx.beginPath();
        ctx.arc(fx, fy, s*0.014, 0, Math.PI*2);
        ctx.fill();
      }
      // MILK badge
      ctx.fillStyle = "#5865f2";
      ctx.fillRect(x+s*0.38, y+s*0.90+bob, s*0.24, s*0.06);
      ctx.fillStyle = "#fff";
      ctx.font = `bold ${Math.floor(s*0.045)}px monospace`;
      ctx.textAlign = "center";
      ctx.fillText("MILK", x+s*0.50, y+s*0.945+bob);
      ctx.textAlign = "start";
    },

    _1DAM(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t*0.003) * (s*0.012);
      const aura = 0.4 + Math.sin(t*0.006)*0.3;
      const eyeGlow = 0.6 + Math.sin(t*0.009)*0.4;
      shadow(ctx, x+s/2, y+s-4, s*0.34, 5);
      // soft white aura behind
      ctx.fillStyle = `rgba(255,255,255,${aura*0.5})`;
      ctx.beginPath();
      ctx.ellipse(x+s*0.5, y+s*0.5+bob, s*0.42, s*0.46, 0, 0, Math.PI*2);
      ctx.fill();
      ctx.fillStyle = `rgba(255,255,255,${aura*0.3})`;
      ctx.beginPath();
      ctx.ellipse(x+s*0.5, y+s*0.5+bob, s*0.46, s*0.50, 0, 0, Math.PI*2);
      ctx.fill();
      // dark body (jacket)
      ctx.fillStyle = "#0e0e18";
      ctx.beginPath();
      ctx.ellipse(x+s*0.5, y+s*0.74+bob, s*0.30, s*0.22, 0, 0, Math.PI*2);
      ctx.fill();
      // body white edge highlight
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = Math.max(2, s*0.014);
      ctx.beginPath();
      ctx.ellipse(x+s*0.5, y+s*0.74+bob, s*0.30, s*0.22, 0, 0, Math.PI*2);
      ctx.stroke();
      // pale face
      ctx.fillStyle = "#f0e8e0";
      ctx.beginPath();
      ctx.ellipse(x+s*0.5, y+s*0.46+bob, s*0.18, s*0.20, 0, 0, Math.PI*2);
      ctx.fill();
      // dark long hair behind/around (large mass)
      ctx.fillStyle = "#0e0e18";
      ctx.beginPath();
      ctx.moveTo(x+s*0.22, y+s*0.70+bob);
      ctx.lineTo(x+s*0.22, y+s*0.34+bob);
      ctx.quadraticCurveTo(x+s*0.26, y+s*0.16+bob, x+s*0.50, y+s*0.14+bob);
      ctx.quadraticCurveTo(x+s*0.74, y+s*0.16+bob, x+s*0.78, y+s*0.34+bob);
      ctx.lineTo(x+s*0.78, y+s*0.70+bob);
      ctx.lineTo(x+s*0.70, y+s*0.62+bob);
      ctx.lineTo(x+s*0.66, y+s*0.40+bob);
      ctx.lineTo(x+s*0.62, y+s*0.34+bob);
      ctx.quadraticCurveTo(x+s*0.50, y+s*0.28+bob, x+s*0.38, y+s*0.34+bob);
      ctx.lineTo(x+s*0.34, y+s*0.40+bob);
      ctx.lineTo(x+s*0.30, y+s*0.62+bob);
      ctx.closePath();
      ctx.fill();
      // hair white edge stroke
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = Math.max(2, s*0.014);
      ctx.beginPath();
      ctx.moveTo(x+s*0.22, y+s*0.70+bob);
      ctx.lineTo(x+s*0.22, y+s*0.34+bob);
      ctx.quadraticCurveTo(x+s*0.26, y+s*0.16+bob, x+s*0.50, y+s*0.14+bob);
      ctx.quadraticCurveTo(x+s*0.74, y+s*0.16+bob, x+s*0.78, y+s*0.34+bob);
      ctx.lineTo(x+s*0.78, y+s*0.70+bob);
      ctx.stroke();
      // hair front bangs
      ctx.fillStyle = "#0e0e18";
      ctx.beginPath();
      ctx.moveTo(x+s*0.32, y+s*0.30+bob);
      ctx.lineTo(x+s*0.36, y+s*0.42+bob);
      ctx.lineTo(x+s*0.42, y+s*0.36+bob);
      ctx.lineTo(x+s*0.46, y+s*0.42+bob);
      ctx.lineTo(x+s*0.50, y+s*0.34+bob);
      ctx.lineTo(x+s*0.54, y+s*0.42+bob);
      ctx.lineTo(x+s*0.58, y+s*0.36+bob);
      ctx.lineTo(x+s*0.64, y+s*0.42+bob);
      ctx.lineTo(x+s*0.68, y+s*0.30+bob);
      ctx.quadraticCurveTo(x+s*0.50, y+s*0.22+bob, x+s*0.32, y+s*0.30+bob);
      ctx.closePath();
      ctx.fill();
      // bangs white edge
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = Math.max(1, s*0.010);
      ctx.beginPath();
      ctx.moveTo(x+s*0.32, y+s*0.30+bob);
      ctx.lineTo(x+s*0.36, y+s*0.42+bob);
      ctx.lineTo(x+s*0.42, y+s*0.36+bob);
      ctx.lineTo(x+s*0.46, y+s*0.42+bob);
      ctx.lineTo(x+s*0.50, y+s*0.34+bob);
      ctx.lineTo(x+s*0.54, y+s*0.42+bob);
      ctx.lineTo(x+s*0.58, y+s*0.36+bob);
      ctx.lineTo(x+s*0.64, y+s*0.42+bob);
      ctx.lineTo(x+s*0.68, y+s*0.30+bob);
      ctx.stroke();
      // sharp slit white-glowing eyes
      ctx.fillStyle = "#0e0e18";
      ctx.beginPath();
      ctx.moveTo(x+s*0.36, y+s*0.46+bob);
      ctx.lineTo(x+s*0.46, y+s*0.46+bob);
      ctx.lineTo(x+s*0.46, y+s*0.50+bob);
      ctx.lineTo(x+s*0.36, y+s*0.50+bob);
      ctx.closePath();
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(x+s*0.54, y+s*0.46+bob);
      ctx.lineTo(x+s*0.64, y+s*0.46+bob);
      ctx.lineTo(x+s*0.64, y+s*0.50+bob);
      ctx.lineTo(x+s*0.54, y+s*0.50+bob);
      ctx.closePath();
      ctx.fill();
      // white glow inside eyes
      ctx.fillStyle = `rgba(255,255,255,${eyeGlow})`;
      ctx.fillRect(x+s*0.38, y+s*0.475+bob, s*0.06, s*0.014);
      ctx.fillRect(x+s*0.56, y+s*0.475+bob, s*0.06, s*0.014);
      // small mouth
      ctx.strokeStyle = "#1a1a1a";
      ctx.lineWidth = Math.max(1, s*0.010);
      ctx.beginPath();
      ctx.moveTo(x+s*0.46, y+s*0.58+bob);
      ctx.lineTo(x+s*0.54, y+s*0.58+bob);
      ctx.stroke();
      // JEW badge
      ctx.fillStyle = "#5865f2";
      ctx.fillRect(x+s*0.38, y+s*0.90+bob, s*0.24, s*0.06);
      ctx.fillStyle = "#fff";
      ctx.font = `bold ${Math.floor(s*0.045)}px monospace`;
      ctx.textAlign = "center";
      ctx.fillText("JEW", x+s*0.50, y+s*0.945+bob);
      ctx.textAlign = "start";
    },
  BREEZY(ctx, sp, x, y, s, t) {
    const bob = Math.sin(t*0.003) * (s*0.012);
    shadow(ctx, x+s/2, y+s-4, s*0.34, 5);
    // light blue hoodie body
    ctx.fillStyle = "#9ecaff";
    ctx.beginPath();
    ctx.ellipse(x+s*0.5, y+s*0.74+bob, s*0.32, s*0.22, 0, 0, Math.PI*2);
    ctx.fill();
    // arms
    px(ctx, x+s*0.16, y+s*0.62+bob, s*0.10, s*0.20, "#9ecaff");
    px(ctx, x+s*0.74, y+s*0.62+bob, s*0.10, s*0.20, "#9ecaff");
    // hoodie strings
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = Math.max(1, s*0.010);
    ctx.beginPath(); ctx.moveTo(x+s*0.46, y+s*0.60+bob); ctx.lineTo(x+s*0.46, y+s*0.70+bob); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x+s*0.54, y+s*0.60+bob); ctx.lineTo(x+s*0.54, y+s*0.70+bob); ctx.stroke();
    // face — peach skin
    ctx.fillStyle = "#ffd0a8";
    ctx.beginPath();
    ctx.ellipse(x+s*0.5, y+s*0.44+bob, s*0.19, s*0.20, 0, 0, Math.PI*2);
    ctx.fill();
    // messy brown hair (jagged tufts)
    ctx.fillStyle = "#6a4020";
    ctx.beginPath();
    ctx.moveTo(x+s*0.32, y+s*0.36+bob);
    ctx.lineTo(x+s*0.30, y+s*0.22+bob);
    ctx.lineTo(x+s*0.38, y+s*0.26+bob);
    ctx.lineTo(x+s*0.42, y+s*0.18+bob);
    ctx.lineTo(x+s*0.50, y+s*0.24+bob);
    ctx.lineTo(x+s*0.58, y+s*0.18+bob);
    ctx.lineTo(x+s*0.62, y+s*0.26+bob);
    ctx.lineTo(x+s*0.70, y+s*0.22+bob);
    ctx.lineTo(x+s*0.68, y+s*0.36+bob);
    ctx.closePath();
    ctx.fill();
    // hair highlight
    px(ctx, x+s*0.40, y+s*0.24+bob, s*0.04, s*0.03, "#8a5830");
    px(ctx, x+s*0.56, y+s*0.22+bob, s*0.04, s*0.03, "#8a5830");
    // headphone band
    ctx.fillStyle = "#1a1a1a";
    ctx.fillRect(x+s*0.28, y+s*0.28+bob, s*0.44, s*0.04);
    // headphone cups
    ctx.fillStyle = "#2a2a2a";
    ctx.beginPath(); ctx.ellipse(x+s*0.26, y+s*0.42+bob, s*0.06, s*0.08, 0, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(x+s*0.74, y+s*0.42+bob, s*0.06, s*0.08, 0, 0, Math.PI*2); ctx.fill();
    // cup detail
    ctx.fillStyle = "#444";
    ctx.beginPath(); ctx.ellipse(x+s*0.26, y+s*0.42+bob, s*0.03, s*0.04, 0, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(x+s*0.74, y+s*0.42+bob, s*0.03, s*0.04, 0, 0, Math.PI*2); ctx.fill();
    // shades (sunglasses)
    ctx.fillStyle = "#1a1a1a";
    ctx.fillRect(x+s*0.34, y+s*0.40+bob, s*0.13, s*0.06);
    ctx.fillRect(x+s*0.53, y+s*0.40+bob, s*0.13, s*0.06);
    // bridge
    ctx.fillRect(x+s*0.47, y+s*0.42+bob, s*0.06, s*0.02);
    // shade highlights
    ctx.fillStyle = "rgba(255,255,255,0.3)";
    px(ctx, x+s*0.36, y+s*0.41+bob, s*0.03, s*0.012, "rgba(255,255,255,0.3)");
    px(ctx, x+s*0.55, y+s*0.41+bob, s*0.03, s*0.012, "rgba(255,255,255,0.3)");
    // closed eyes hint behind shades (relaxed arcs above)
    ctx.strokeStyle = "#1a1a1a";
    ctx.lineWidth = Math.max(1, s*0.010);
    ctx.beginPath(); ctx.arc(x+s*0.40, y+s*0.39+bob, s*0.020, Math.PI*1.1, Math.PI*1.9); ctx.stroke();
    ctx.beginPath(); ctx.arc(x+s*0.60, y+s*0.39+bob, s*0.020, Math.PI*1.1, Math.PI*1.9); ctx.stroke();
    // slight relaxed smile
    ctx.lineWidth = Math.max(1, s*0.012);
    ctx.beginPath();
    ctx.arc(x+s*0.50, y+s*0.52+bob, s*0.04, Math.PI*0.10, Math.PI*0.90);
    ctx.stroke();
    // floating animated music note
    const noteY = y+s*0.16 + Math.sin(t*0.005)*s*0.04;
    const noteX = x+s*0.78 + Math.sin(t*0.003)*s*0.02;
    ctx.fillStyle = "#3a8aff";
    ctx.fillRect(noteX, noteY, s*0.018, s*0.10);
    ctx.beginPath();
    ctx.ellipse(noteX-s*0.014, noteY+s*0.10, s*0.026, s*0.018, 0, 0, Math.PI*2);
    ctx.fill();
    // note flag
    ctx.beginPath();
    ctx.moveTo(noteX+s*0.018, noteY);
    ctx.quadraticCurveTo(noteX+s*0.06, noteY+s*0.02, noteX+s*0.04, noteY+s*0.05);
    ctx.lineTo(noteX+s*0.018, noteY+s*0.04);
    ctx.closePath();
    ctx.fill();
  },

  LOHR(ctx, sp, x, y, s, t) {
    const bob = Math.sin(t*0.003) * (s*0.012);
    shadow(ctx, x+s/2, y+s-4, s*0.34, 5);
    // soft glow backdrop
    const pulse = 0.5 + Math.sin(t*0.005)*0.5;
    const glow = ctx.createRadialGradient(x+s*0.5, y+s*0.18, s*0.04, x+s*0.5, y+s*0.18, s*0.40);
    glow.addColorStop(0, `rgba(255,230,140,${pulse*0.6})`);
    glow.addColorStop(1, "rgba(255,230,140,0)");
    ctx.fillStyle = glow;
    ctx.fillRect(x, y, s, s);
    // left wing (white feathered)
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.moveTo(x+s*0.22, y+s*0.40+bob);
    ctx.quadraticCurveTo(x+s*0.00, y+s*0.28+bob, x+s*0.06, y+s*0.66+bob);
    ctx.quadraticCurveTo(x+s*0.16, y+s*0.54+bob, x+s*0.30, y+s*0.52+bob);
    ctx.closePath();
    ctx.fill();
    // right wing
    ctx.beginPath();
    ctx.moveTo(x+s*0.78, y+s*0.40+bob);
    ctx.quadraticCurveTo(x+s*1.00, y+s*0.28+bob, x+s*0.94, y+s*0.66+bob);
    ctx.quadraticCurveTo(x+s*0.84, y+s*0.54+bob, x+s*0.70, y+s*0.52+bob);
    ctx.closePath();
    ctx.fill();
    // feather lines
    ctx.strokeStyle = "#d8dce4";
    ctx.lineWidth = Math.max(1, s*0.008);
    ctx.beginPath();
    ctx.moveTo(x+s*0.10, y+s*0.36+bob); ctx.lineTo(x+s*0.20, y+s*0.48+bob);
    ctx.moveTo(x+s*0.08, y+s*0.46+bob); ctx.lineTo(x+s*0.18, y+s*0.54+bob);
    ctx.moveTo(x+s*0.10, y+s*0.56+bob); ctx.lineTo(x+s*0.22, y+s*0.58+bob);
    ctx.moveTo(x+s*0.90, y+s*0.36+bob); ctx.lineTo(x+s*0.80, y+s*0.48+bob);
    ctx.moveTo(x+s*0.92, y+s*0.46+bob); ctx.lineTo(x+s*0.82, y+s*0.54+bob);
    ctx.moveTo(x+s*0.90, y+s*0.56+bob); ctx.lineTo(x+s*0.78, y+s*0.58+bob);
    ctx.stroke();
    // white robe with gold trim
    ctx.fillStyle = "#fafafa";
    ctx.beginPath();
    ctx.ellipse(x+s*0.5, y+s*0.74+bob, s*0.30, s*0.22, 0, 0, Math.PI*2);
    ctx.fill();
    // gold trim
    ctx.fillStyle = "#e6c14a";
    ctx.fillRect(x+s*0.22, y+s*0.62+bob, s*0.56, s*0.02);
    ctx.fillRect(x+s*0.42, y+s*0.66+bob, s*0.16, s*0.02);
    // arms
    px(ctx, x+s*0.18, y+s*0.62+bob, s*0.10, s*0.18, "#fafafa");
    px(ctx, x+s*0.72, y+s*0.62+bob, s*0.10, s*0.18, "#fafafa");
    // gold cuffs
    px(ctx, x+s*0.18, y+s*0.78+bob, s*0.10, s*0.02, "#e6c14a");
    px(ctx, x+s*0.72, y+s*0.78+bob, s*0.10, s*0.02, "#e6c14a");
    // face
    ctx.fillStyle = "#ffe0c8";
    ctx.beginPath();
    ctx.ellipse(x+s*0.5, y+s*0.42+bob, s*0.18, s*0.20, 0, 0, Math.PI*2);
    ctx.fill();
    // white short hair
    ctx.fillStyle = "#f4f4f4";
    px(ctx, x+s*0.32, y+s*0.24+bob, s*0.36, s*0.10, "#f4f4f4");
    ctx.beginPath();
    ctx.moveTo(x+s*0.34, y+s*0.32+bob);
    ctx.lineTo(x+s*0.40, y+s*0.26+bob);
    ctx.lineTo(x+s*0.46, y+s*0.32+bob);
    ctx.lineTo(x+s*0.52, y+s*0.26+bob);
    ctx.lineTo(x+s*0.58, y+s*0.32+bob);
    ctx.lineTo(x+s*0.64, y+s*0.26+bob);
    ctx.lineTo(x+s*0.66, y+s*0.32+bob);
    ctx.closePath();
    ctx.fill();
    // glowing pulsing gold halo
    ctx.strokeStyle = `rgba(255,220,90,${pulse})`;
    ctx.lineWidth = Math.max(2, s*0.020);
    ctx.beginPath();
    ctx.ellipse(x+s*0.50, y+s*0.16+bob, s*0.16, s*0.05, 0, 0, Math.PI*2);
    ctx.stroke();
    // halo inner glow
    ctx.strokeStyle = `rgba(255,255,200,${pulse*0.6})`;
    ctx.lineWidth = Math.max(1, s*0.010);
    ctx.beginPath();
    ctx.ellipse(x+s*0.50, y+s*0.16+bob, s*0.13, s*0.04, 0, 0, Math.PI*2);
    ctx.stroke();
    // calm closed eyes (arcs)
    ctx.strokeStyle = "#1a1a1a";
    ctx.lineWidth = Math.max(1, s*0.012);
    ctx.beginPath(); ctx.arc(x+s*0.42, y+s*0.42+bob, s*0.026, Math.PI*1.1, Math.PI*1.9); ctx.stroke();
    ctx.beginPath(); ctx.arc(x+s*0.58, y+s*0.42+bob, s*0.026, Math.PI*1.1, Math.PI*1.9); ctx.stroke();
    // serene smile
    ctx.beginPath();
    ctx.arc(x+s*0.50, y+s*0.52+bob, s*0.030, Math.PI*0.15, Math.PI*0.85);
    ctx.stroke();
    // day-counter scroll (held in hands)
    ctx.fillStyle = "#f8e8c4";
    ctx.fillRect(x+s*0.36, y+s*0.80+bob, s*0.28, s*0.10);
    // scroll ends
    ctx.fillStyle = "#c89848";
    ctx.fillRect(x+s*0.34, y+s*0.80+bob, s*0.02, s*0.10);
    ctx.fillRect(x+s*0.64, y+s*0.80+bob, s*0.02, s*0.10);
    // scroll text
    ctx.fillStyle = "#1a1a1a";
    ctx.font = `bold ${Math.floor(s*0.05)}px monospace`;
    ctx.textAlign = "center";
    ctx.fillText("1855", x+s*0.50, y+s*0.872+bob);
    ctx.textAlign = "start";
  },

  JACKY(ctx, sp, x, y, s, t) {
    const bob = Math.sin(t*0.003) * (s*0.012);
    shadow(ctx, x+s/2, y+s-4, s*0.34, 5);
    // blue pants
    ctx.fillStyle = "#3a6acc";
    ctx.fillRect(x+s*0.34, y+s*0.78+bob, s*0.32, s*0.14);
    // orange shirt
    ctx.fillStyle = "#ff8a30";
    ctx.beginPath();
    ctx.ellipse(x+s*0.5, y+s*0.72+bob, s*0.30, s*0.18, 0, 0, Math.PI*2);
    ctx.fill();
    // arms in orange
    px(ctx, x+s*0.18, y+s*0.62+bob, s*0.10, s*0.18, "#ff8a30");
    px(ctx, x+s*0.72, y+s*0.62+bob, s*0.10, s*0.18, "#ff8a30");
    // peach face
    ctx.fillStyle = "#ffd8b0";
    ctx.beginPath();
    ctx.ellipse(x+s*0.5, y+s*0.44+bob, s*0.19, s*0.20, 0, 0, Math.PI*2);
    ctx.fill();
    // crazy spiky blonde hair — many radiating triangles
    ctx.fillStyle = "#ffd14a";
    const sp_cx = x+s*0.50, sp_cy = y+s*0.30+bob;
    const spikes = [
      [-0.30, 0.34, -0.36, 0.10, -0.20, 0.20],
      [-0.18, 0.24, -0.20, 0.04, -0.08, 0.18],
      [-0.06, 0.20, -0.04, 0.00, 0.04, 0.18],
      [0.06, 0.20, 0.10, 0.02, 0.16, 0.20],
      [0.18, 0.22, 0.24, 0.04, 0.30, 0.22],
      [0.30, 0.30, 0.36, 0.12, 0.22, 0.20]
    ];
    for (const sk of spikes) {
      ctx.beginPath();
      ctx.moveTo(sp_cx+s*sk[0], y+s*sk[1]+bob);
      ctx.lineTo(sp_cx+s*sk[2], y+s*sk[3]+bob);
      ctx.lineTo(sp_cx+s*sk[4], y+s*sk[5]+bob);
      ctx.closePath();
      ctx.fill();
    }
    // base hair
    ctx.fillStyle = "#ffd14a";
    ctx.beginPath();
    ctx.ellipse(x+s*0.50, y+s*0.30+bob, s*0.20, s*0.10, 0, 0, Math.PI);
    ctx.fill();
    // hair highlight
    ctx.fillStyle = "#ffe888";
    px(ctx, x+s*0.40, y+s*0.26+bob, s*0.06, s*0.02, "#ffe888");
    px(ctx, x+s*0.54, y+s*0.24+bob, s*0.06, s*0.02, "#ffe888");
    // big sparkly anime eyes (blue with white sparkles)
    ctx.fillStyle = "#fff";
    ctx.beginPath(); ctx.arc(x+s*0.42, y+s*0.44+bob, s*0.058, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(x+s*0.58, y+s*0.44+bob, s*0.058, 0, Math.PI*2); ctx.fill();
    // blue iris
    ctx.fillStyle = "#3aaaff";
    ctx.beginPath(); ctx.arc(x+s*0.42, y+s*0.44+bob, s*0.044, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(x+s*0.58, y+s*0.44+bob, s*0.044, 0, Math.PI*2); ctx.fill();
    // pupil
    ctx.fillStyle = "#1a1a3a";
    ctx.beginPath(); ctx.arc(x+s*0.42, y+s*0.44+bob, s*0.022, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(x+s*0.58, y+s*0.44+bob, s*0.022, 0, Math.PI*2); ctx.fill();
    // big white sparkles
    ctx.fillStyle = "#fff";
    ctx.beginPath(); ctx.arc(x+s*0.40, y+s*0.42+bob, s*0.018, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(x+s*0.56, y+s*0.42+bob, s*0.018, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(x+s*0.44, y+s*0.46+bob, s*0.008, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(x+s*0.60, y+s*0.46+bob, s*0.008, 0, Math.PI*2); ctx.fill();
    // pink cheeks
    ctx.fillStyle = "rgba(255,140,160,0.7)";
    ctx.beginPath(); ctx.ellipse(x+s*0.34, y+s*0.52+bob, s*0.04, s*0.025, 0, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(x+s*0.66, y+s*0.52+bob, s*0.04, s*0.025, 0, 0, Math.PI*2); ctx.fill();
    // BIG OPEN smile showing teeth
    ctx.fillStyle = "#3a1a1a";
    ctx.beginPath();
    ctx.ellipse(x+s*0.50, y+s*0.56+bob, s*0.07, s*0.04, 0, 0, Math.PI);
    ctx.fill();
    // teeth (white bar across top of mouth)
    ctx.fillStyle = "#fff";
    ctx.fillRect(x+s*0.44, y+s*0.555+bob, s*0.12, s*0.014);
    // teeth divisions
    ctx.strokeStyle = "#aaa";
    ctx.lineWidth = Math.max(1, s*0.005);
    ctx.beginPath();
    ctx.moveTo(x+s*0.48, y+s*0.555+bob); ctx.lineTo(x+s*0.48, y+s*0.569+bob);
    ctx.moveTo(x+s*0.52, y+s*0.555+bob); ctx.lineTo(x+s*0.52, y+s*0.569+bob);
    ctx.stroke();
  },

  MILOSIVIC(ctx, sp, x, y, s, t) {
    const bob = Math.sin(t*0.003) * (s*0.010);
    // starry night background
    ctx.fillStyle = "#0a0a2a";
    ctx.fillRect(x, y, s, s);
    // twinkling stars
    const starPos = [
      [0.10, 0.12], [0.20, 0.30], [0.08, 0.50], [0.14, 0.74],
      [0.86, 0.18], [0.92, 0.40], [0.84, 0.60], [0.90, 0.82],
      [0.30, 0.08], [0.70, 0.10], [0.50, 0.06], [0.40, 0.86],
      [0.62, 0.88], [0.26, 0.94]
    ];
    for (let i = 0; i < starPos.length; i++) {
      const tw = 0.5 + Math.sin(t*0.004 + i) * 0.5;
      ctx.fillStyle = `rgba(255,255,200,${tw})`;
      const sxp = x + s*starPos[i][0];
      const syp = y + s*starPos[i][1];
      ctx.beginPath(); ctx.arc(sxp, syp, s*0.010, 0, Math.PI*2); ctx.fill();
      // star cross
      ctx.fillRect(sxp-s*0.014, syp-s*0.002, s*0.028, s*0.004);
      ctx.fillRect(sxp-s*0.002, syp-s*0.014, s*0.004, s*0.028);
    }
    shadow(ctx, x+s/2, y+s-4, s*0.34, 5);
    // moon body — navy-blue rounded full moon
    const mcx = x+s*0.50, mcy = y+s*0.50+bob;
    ctx.fillStyle = "#3a4a8c";
    ctx.beginPath();
    ctx.arc(mcx, mcy, s*0.34, 0, Math.PI*2);
    ctx.fill();
    // moon highlight
    ctx.fillStyle = "#5a6abc";
    ctx.beginPath();
    ctx.ellipse(mcx-s*0.10, mcy-s*0.10, s*0.10, s*0.08, 0, 0, Math.PI*2);
    ctx.fill();
    // soft inner glow
    const glow = ctx.createRadialGradient(mcx-s*0.08, mcy-s*0.08, s*0.02, mcx, mcy, s*0.34);
    glow.addColorStop(0, "rgba(180,200,255,0.4)");
    glow.addColorStop(1, "rgba(180,200,255,0)");
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(mcx, mcy, s*0.34, 0, Math.PI*2);
    ctx.fill();
    // moon craters
    ctx.fillStyle = "#2a3a6c";
    ctx.beginPath(); ctx.arc(mcx-s*0.12, mcy+s*0.06, s*0.030, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(mcx+s*0.10, mcy+s*0.14, s*0.022, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(mcx+s*0.16, mcy-s*0.06, s*0.018, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(mcx-s*0.04, mcy+s*0.18, s*0.014, 0, Math.PI*2); ctx.fill();
    // crater shading
    ctx.fillStyle = "#4a5a9c";
    ctx.beginPath(); ctx.arc(mcx-s*0.115, mcy+s*0.052, s*0.018, 0, Math.PI*2); ctx.fill();
    // closed sleepy eye-arcs
    ctx.strokeStyle = "#1a1a2a";
    ctx.lineWidth = Math.max(2, s*0.014);
    ctx.beginPath(); ctx.arc(mcx-s*0.10, mcy-s*0.04, s*0.040, Math.PI*1.1, Math.PI*1.9); ctx.stroke();
    ctx.beginPath(); ctx.arc(mcx+s*0.10, mcy-s*0.04, s*0.040, Math.PI*1.1, Math.PI*1.9); ctx.stroke();
    // eyelashes
    ctx.lineWidth = Math.max(1, s*0.008);
    ctx.beginPath();
    ctx.moveTo(mcx-s*0.13, mcy-s*0.07); ctx.lineTo(mcx-s*0.15, mcy-s*0.10);
    ctx.moveTo(mcx-s*0.07, mcy-s*0.07); ctx.lineTo(mcx-s*0.05, mcy-s*0.10);
    ctx.moveTo(mcx+s*0.07, mcy-s*0.07); ctx.lineTo(mcx+s*0.05, mcy-s*0.10);
    ctx.moveTo(mcx+s*0.13, mcy-s*0.07); ctx.lineTo(mcx+s*0.15, mcy-s*0.10);
    ctx.stroke();
    // tiny serene mouth
    ctx.lineWidth = Math.max(1, s*0.012);
    ctx.beginPath();
    ctx.arc(mcx, mcy+s*0.08, s*0.020, Math.PI*0.20, Math.PI*0.80);
    ctx.stroke();
    // blush
    ctx.fillStyle = "rgba(180,140,200,0.5)";
    ctx.beginPath(); ctx.ellipse(mcx-s*0.18, mcy+s*0.04, s*0.034, s*0.020, 0, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(mcx+s*0.18, mcy+s*0.04, s*0.034, s*0.020, 0, 0, Math.PI*2); ctx.fill();
    // floating animated Z
    const zY = y+s*0.18 + Math.sin(t*0.004)*s*0.04;
    const zX = x+s*0.78 + Math.cos(t*0.003)*s*0.02;
    ctx.fillStyle = "#fff";
    ctx.font = `bold ${Math.floor(s*0.10)}px monospace`;
    ctx.textAlign = "center";
    ctx.fillText("Z", zX, zY);
    // smaller Z
    const zY2 = y+s*0.10 + Math.sin(t*0.004 + 1)*s*0.03;
    ctx.font = `bold ${Math.floor(s*0.06)}px monospace`;
    ctx.fillText("z", x+s*0.86, zY2);
    ctx.textAlign = "start";
  },

  SEA11(ctx, sp, x, y, s, t) {
    const bob = Math.sin(t*0.003) * (s*0.012);
    // sunset gradient backdrop
    const sky = ctx.createLinearGradient(x, y, x, y+s);
    sky.addColorStop(0, "#ffb060");
    sky.addColorStop(0.5, "#ff80a0");
    sky.addColorStop(1, "#a060c0");
    ctx.fillStyle = sky;
    ctx.fillRect(x, y, s, s);
    // sun behind
    const sunY = y+s*0.34;
    const sunGrad = ctx.createRadialGradient(x+s*0.5, sunY, s*0.04, x+s*0.5, sunY, s*0.34);
    sunGrad.addColorStop(0, "rgba(255,240,180,0.95)");
    sunGrad.addColorStop(1, "rgba(255,200,120,0)");
    ctx.fillStyle = sunGrad;
    ctx.fillRect(x, y, s, s);
    ctx.fillStyle = "#ffe888";
    ctx.beginPath();
    ctx.arc(x+s*0.50, sunY, s*0.16, 0, Math.PI*2);
    ctx.fill();
    shadow(ctx, x+s/2, y+s-4, s*0.34, 5);
    // pulsing pink/orange wings (left)
    const pulse = 0.5 + Math.sin(t*0.005)*0.5;
    ctx.fillStyle = "#ffb0c8";
    ctx.beginPath();
    ctx.moveTo(x+s*0.22, y+s*0.42+bob);
    ctx.quadraticCurveTo(x+s*0.00, y+s*0.30+bob, x+s*0.06, y+s*0.66+bob);
    ctx.quadraticCurveTo(x+s*0.16, y+s*0.54+bob, x+s*0.30, y+s*0.52+bob);
    ctx.closePath();
    ctx.fill();
    // wing inner orange tint
    ctx.fillStyle = "#ffc88a";
    ctx.beginPath();
    ctx.moveTo(x+s*0.22, y+s*0.44+bob);
    ctx.quadraticCurveTo(x+s*0.10, y+s*0.40+bob, x+s*0.14, y+s*0.58+bob);
    ctx.quadraticCurveTo(x+s*0.20, y+s*0.52+bob, x+s*0.28, y+s*0.52+bob);
    ctx.closePath();
    ctx.fill();
    // right wing
    ctx.fillStyle = "#ffb0c8";
    ctx.beginPath();
    ctx.moveTo(x+s*0.78, y+s*0.42+bob);
    ctx.quadraticCurveTo(x+s*1.00, y+s*0.30+bob, x+s*0.94, y+s*0.66+bob);
    ctx.quadraticCurveTo(x+s*0.84, y+s*0.54+bob, x+s*0.70, y+s*0.52+bob);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "#ffc88a";
    ctx.beginPath();
    ctx.moveTo(x+s*0.78, y+s*0.44+bob);
    ctx.quadraticCurveTo(x+s*0.90, y+s*0.40+bob, x+s*0.86, y+s*0.58+bob);
    ctx.quadraticCurveTo(x+s*0.80, y+s*0.52+bob, x+s*0.72, y+s*0.52+bob);
    ctx.closePath();
    ctx.fill();
    // feather lines
    ctx.strokeStyle = "rgba(255,140,160,0.8)";
    ctx.lineWidth = Math.max(1, s*0.008);
    ctx.beginPath();
    ctx.moveTo(x+s*0.10, y+s*0.40+bob); ctx.lineTo(x+s*0.20, y+s*0.50+bob);
    ctx.moveTo(x+s*0.08, y+s*0.50+bob); ctx.lineTo(x+s*0.20, y+s*0.56+bob);
    ctx.moveTo(x+s*0.90, y+s*0.40+bob); ctx.lineTo(x+s*0.80, y+s*0.50+bob);
    ctx.moveTo(x+s*0.92, y+s*0.50+bob); ctx.lineTo(x+s*0.80, y+s*0.56+bob);
    ctx.stroke();
    // pink robe
    ctx.fillStyle = "#ffc8d8";
    ctx.beginPath();
    ctx.ellipse(x+s*0.5, y+s*0.74+bob, s*0.30, s*0.22, 0, 0, Math.PI*2);
    ctx.fill();
    // arms
    px(ctx, x+s*0.20, y+s*0.62+bob, s*0.10, s*0.18, "#ffc8d8");
    px(ctx, x+s*0.70, y+s*0.62+bob, s*0.10, s*0.18, "#ffc8d8");
    // face
    ctx.fillStyle = "#ffe0d0";
    ctx.beginPath();
    ctx.ellipse(x+s*0.5, y+s*0.44+bob, s*0.18, s*0.20, 0, 0, Math.PI*2);
    ctx.fill();
    // pink-tinged hair
    ctx.fillStyle = "#ffa0c0";
    px(ctx, x+s*0.30, y+s*0.24+bob, s*0.40, s*0.10, "#ffa0c0");
    ctx.beginPath();
    ctx.moveTo(x+s*0.30, y+s*0.34+bob);
    ctx.quadraticCurveTo(x+s*0.22, y+s*0.50+bob, x+s*0.30, y+s*0.56+bob);
    ctx.lineTo(x+s*0.34, y+s*0.46+bob);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(x+s*0.70, y+s*0.34+bob);
    ctx.quadraticCurveTo(x+s*0.78, y+s*0.50+bob, x+s*0.70, y+s*0.56+bob);
    ctx.lineTo(x+s*0.66, y+s*0.46+bob);
    ctx.closePath();
    ctx.fill();
    // orange/pink halo
    ctx.strokeStyle = `rgba(255,160,90,${pulse})`;
    ctx.lineWidth = Math.max(2, s*0.018);
    ctx.beginPath();
    ctx.ellipse(x+s*0.50, y+s*0.16+bob, s*0.16, s*0.05, 0, 0, Math.PI*2);
    ctx.stroke();
    ctx.strokeStyle = `rgba(255,200,140,${pulse*0.6})`;
    ctx.lineWidth = Math.max(1, s*0.010);
    ctx.beginPath();
    ctx.ellipse(x+s*0.50, y+s*0.16+bob, s*0.13, s*0.04, 0, 0, Math.PI*2);
    ctx.stroke();
    // big closed-arc happy eyes
    ctx.strokeStyle = "#1a1a1a";
    ctx.lineWidth = Math.max(2, s*0.016);
    ctx.beginPath(); ctx.arc(x+s*0.42, y+s*0.42+bob, s*0.034, Math.PI*1.1, Math.PI*1.9); ctx.stroke();
    ctx.beginPath(); ctx.arc(x+s*0.58, y+s*0.42+bob, s*0.034, Math.PI*1.1, Math.PI*1.9); ctx.stroke();
    // blush
    ctx.fillStyle = "rgba(255,140,160,0.7)";
    ctx.beginPath(); ctx.ellipse(x+s*0.34, y+s*0.50+bob, s*0.04, s*0.025, 0, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(x+s*0.66, y+s*0.50+bob, s*0.04, s*0.025, 0, 0, Math.PI*2); ctx.fill();
    // big smile
    ctx.lineWidth = Math.max(2, s*0.014);
    ctx.beginPath();
    ctx.arc(x+s*0.50, y+s*0.52+bob, s*0.05, Math.PI*0.10, Math.PI*0.90);
    ctx.stroke();
  },

  WIFI(ctx, sp, x, y, s, t) {
    const bob = Math.sin(t*0.003) * (s*0.012);
    shadow(ctx, x+s/2, y+s-4, s*0.34, 5);
    // shirt
    ctx.fillStyle = "#3a8aff";
    ctx.beginPath();
    ctx.ellipse(x+s*0.5, y+s*0.74+bob, s*0.32, s*0.22, 0, 0, Math.PI*2);
    ctx.fill();
    // arms
    px(ctx, x+s*0.16, y+s*0.62+bob, s*0.10, s*0.20, "#3a8aff");
    px(ctx, x+s*0.74, y+s*0.62+bob, s*0.10, s*0.20, "#3a8aff");
    // face
    ctx.fillStyle = "#ffd0a8";
    ctx.beginPath();
    ctx.ellipse(x+s*0.5, y+s*0.44+bob, s*0.19, s*0.20, 0, 0, Math.PI*2);
    ctx.fill();
    // dark hair fringe under cap
    ctx.fillStyle = "#2a1a08";
    px(ctx, x+s*0.32, y+s*0.32+bob, s*0.36, s*0.06, "#2a1a08");
    ctx.beginPath();
    ctx.moveTo(x+s*0.32, y+s*0.34+bob);
    ctx.lineTo(x+s*0.38, y+s*0.40+bob);
    ctx.lineTo(x+s*0.44, y+s*0.34+bob);
    ctx.lineTo(x+s*0.50, y+s*0.40+bob);
    ctx.lineTo(x+s*0.56, y+s*0.34+bob);
    ctx.lineTo(x+s*0.62, y+s*0.40+bob);
    ctx.lineTo(x+s*0.68, y+s*0.34+bob);
    ctx.closePath();
    ctx.fill();
    // red baseball cap (crown)
    ctx.fillStyle = "#d83030";
    ctx.beginPath();
    ctx.ellipse(x+s*0.50, y+s*0.28+bob, s*0.22, s*0.12, 0, Math.PI, Math.PI*2);
    ctx.fill();
    // cap brim
    ctx.fillStyle = "#a82020";
    ctx.fillRect(x+s*0.50, y+s*0.30+bob, s*0.30, s*0.04);
    ctx.beginPath();
    ctx.ellipse(x+s*0.65, y+s*0.32+bob, s*0.15, s*0.03, 0, 0, Math.PI*2);
    ctx.fill();
    // cap highlight
    ctx.fillStyle = "#f04848";
    px(ctx, x+s*0.40, y+s*0.20+bob, s*0.06, s*0.02, "#f04848");
    // cap button
    ctx.fillStyle = "#a82020";
    ctx.beginPath(); ctx.arc(x+s*0.50, y+s*0.18+bob, s*0.014, 0, Math.PI*2); ctx.fill();
    // eyes
    ctx.fillStyle = "#1a1a1a";
    ctx.beginPath(); ctx.arc(x+s*0.42, y+s*0.46+bob, s*0.018, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(x+s*0.58, y+s*0.46+bob, s*0.018, 0, Math.PI*2); ctx.fill();
    // eye shine
    ctx.fillStyle = "#fff";
    ctx.beginPath(); ctx.arc(x+s*0.425, y+s*0.455+bob, s*0.006, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(x+s*0.585, y+s*0.455+bob, s*0.006, 0, Math.PI*2); ctx.fill();
    // smirk (asymmetric)
    ctx.strokeStyle = "#1a1a1a";
    ctx.lineWidth = Math.max(1, s*0.012);
    ctx.beginPath();
    ctx.moveTo(x+s*0.46, y+s*0.55+bob);
    ctx.quadraticCurveTo(x+s*0.52, y+s*0.58+bob, x+s*0.58, y+s*0.54+bob);
    ctx.stroke();
    // phone (held in hand)
    const phx = x+s*0.30, phy = y+s*0.66+bob;
    ctx.fillStyle = "#1a1a1a";
    ctx.fillRect(phx, phy, s*0.16, s*0.22);
    // cyan screen
    ctx.fillStyle = "#1ad8e8";
    ctx.fillRect(phx+s*0.012, phy+s*0.014, s*0.136, s*0.18);
    // wifi signal — center dot
    const wcx = phx+s*0.080, wcy = phy+s*0.13;
    ctx.fillStyle = "#fff";
    ctx.beginPath(); ctx.arc(wcx, wcy, s*0.012, 0, Math.PI*2); ctx.fill();
    // wifi arcs (3 arcs radiating)
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = Math.max(2, s*0.010);
    const pulse = (Math.sin(t*0.005) + 1) / 2;
    ctx.globalAlpha = 0.5 + pulse*0.5;
    ctx.beginPath(); ctx.arc(wcx, wcy, s*0.024, Math.PI*1.25, Math.PI*1.75); ctx.stroke();
    ctx.globalAlpha = 0.3 + pulse*0.4;
    ctx.beginPath(); ctx.arc(wcx, wcy, s*0.040, Math.PI*1.25, Math.PI*1.75); ctx.stroke();
    ctx.globalAlpha = 0.2 + pulse*0.3;
    ctx.beginPath(); ctx.arc(wcx, wcy, s*0.056, Math.PI*1.25, Math.PI*1.75); ctx.stroke();
    ctx.globalAlpha = 1;
    // phone home button
    ctx.fillStyle = "#444";
    ctx.beginPath(); ctx.arc(phx+s*0.080, phy+s*0.20, s*0.008, 0, Math.PI*2); ctx.fill();
  },

  XKING(ctx, sp, x, y, s, t) {
    const bob = Math.sin(t*0.003) * (s*0.012);
    shadow(ctx, x+s/2, y+s-4, s*0.34, 5);
    // purple robe
    ctx.fillStyle = "#7040c0";
    ctx.beginPath();
    ctx.ellipse(x+s*0.5, y+s*0.74+bob, s*0.32, s*0.22, 0, 0, Math.PI*2);
    ctx.fill();
    // robe trim
    ctx.fillStyle = "#a070e0";
    ctx.fillRect(x+s*0.20, y+s*0.62+bob, s*0.60, s*0.02);
    // arms
    px(ctx, x+s*0.16, y+s*0.62+bob, s*0.10, s*0.20, "#7040c0");
    px(ctx, x+s*0.74, y+s*0.62+bob, s*0.10, s*0.20, "#7040c0");
    // face
    ctx.fillStyle = "#ffd0a8";
    ctx.beginPath();
    ctx.ellipse(x+s*0.5, y+s*0.44+bob, s*0.19, s*0.20, 0, 0, Math.PI*2);
    ctx.fill();
    // brown hair fringe
    ctx.fillStyle = "#5a3818";
    px(ctx, x+s*0.32, y+s*0.30+bob, s*0.36, s*0.08, "#5a3818");
    ctx.beginPath();
    ctx.moveTo(x+s*0.32, y+s*0.36+bob);
    ctx.lineTo(x+s*0.38, y+s*0.42+bob);
    ctx.lineTo(x+s*0.44, y+s*0.36+bob);
    ctx.lineTo(x+s*0.50, y+s*0.42+bob);
    ctx.lineTo(x+s*0.56, y+s*0.36+bob);
    ctx.lineTo(x+s*0.62, y+s*0.42+bob);
    ctx.lineTo(x+s*0.68, y+s*0.36+bob);
    ctx.closePath();
    ctx.fill();
    // gold crown — 3-pointed
    ctx.fillStyle = "#ffcc30";
    ctx.beginPath();
    ctx.moveTo(x+s*0.30, y+s*0.30+bob);
    ctx.lineTo(x+s*0.34, y+s*0.10+bob);
    ctx.lineTo(x+s*0.42, y+s*0.22+bob);
    ctx.lineTo(x+s*0.50, y+s*0.06+bob);
    ctx.lineTo(x+s*0.58, y+s*0.22+bob);
    ctx.lineTo(x+s*0.66, y+s*0.10+bob);
    ctx.lineTo(x+s*0.70, y+s*0.30+bob);
    ctx.closePath();
    ctx.fill();
    // crown band
    ctx.fillStyle = "#e0aa10";
    ctx.fillRect(x+s*0.30, y+s*0.26+bob, s*0.40, s*0.04);
    // crown jewels
    ctx.fillStyle = "#e83040";
    ctx.beginPath(); ctx.arc(x+s*0.34, y+s*0.16+bob, s*0.020, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = "#1ad8e8";
    ctx.beginPath(); ctx.arc(x+s*0.50, y+s*0.12+bob, s*0.024, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = "#e83040";
    ctx.beginPath(); ctx.arc(x+s*0.66, y+s*0.16+bob, s*0.020, 0, Math.PI*2); ctx.fill();
    // jewel shines
    ctx.fillStyle = "rgba(255,255,255,0.6)";
    ctx.beginPath(); ctx.arc(x+s*0.335, y+s*0.155+bob, s*0.006, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(x+s*0.495, y+s*0.115+bob, s*0.008, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(x+s*0.655, y+s*0.155+bob, s*0.006, 0, Math.PI*2); ctx.fill();
    // crown highlight
    ctx.fillStyle = "#fff080";
    px(ctx, x+s*0.36, y+s*0.27+bob, s*0.04, s*0.012, "#fff080");
    // big rectangular glasses
    ctx.fillStyle = "rgba(180,200,220,0.25)";
    ctx.fillRect(x+s*0.32, y+s*0.40+bob, s*0.16, s*0.10);
    ctx.fillRect(x+s*0.52, y+s*0.40+bob, s*0.16, s*0.10);
    ctx.strokeStyle = "#1a1a1a";
    ctx.lineWidth = Math.max(2, s*0.014);
    ctx.strokeRect(x+s*0.32, y+s*0.40+bob, s*0.16, s*0.10);
    ctx.strokeRect(x+s*0.52, y+s*0.40+bob, s*0.16, s*0.10);
    // glasses bridge
    ctx.beginPath();
    ctx.moveTo(x+s*0.48, y+s*0.45+bob); ctx.lineTo(x+s*0.52, y+s*0.45+bob);
    ctx.stroke();
    // glasses temples
    ctx.beginPath();
    ctx.moveTo(x+s*0.32, y+s*0.45+bob); ctx.lineTo(x+s*0.28, y+s*0.46+bob);
    ctx.moveTo(x+s*0.68, y+s*0.45+bob); ctx.lineTo(x+s*0.72, y+s*0.46+bob);
    ctx.stroke();
    // eyes behind glasses
    ctx.fillStyle = "#1a1a1a";
    ctx.beginPath(); ctx.arc(x+s*0.40, y+s*0.45+bob, s*0.012, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(x+s*0.60, y+s*0.45+bob, s*0.012, 0, Math.PI*2); ctx.fill();
    // glass shine
    ctx.fillStyle = "rgba(255,255,255,0.5)";
    px(ctx, x+s*0.34, y+s*0.41+bob, s*0.04, s*0.014, "rgba(255,255,255,0.5)");
    px(ctx, x+s*0.54, y+s*0.41+bob, s*0.04, s*0.014, "rgba(255,255,255,0.5)");
    // smile
    ctx.strokeStyle = "#1a1a1a";
    ctx.lineWidth = Math.max(1, s*0.012);
    ctx.beginPath();
    ctx.arc(x+s*0.50, y+s*0.55+bob, s*0.04, Math.PI*0.15, Math.PI*0.85);
    ctx.stroke();
    // JEW badge
    ctx.fillStyle = "#5865f2";
    ctx.fillRect(x+s*0.40, y+s*0.84+bob, s*0.20, s*0.06);
    ctx.fillStyle = "#fff";
    ctx.font = `bold ${Math.floor(s*0.045)}px monospace`;
    ctx.textAlign = "center";
    ctx.fillText("JEW", x+s*0.50, y+s*0.885+bob);
    ctx.textAlign = "start";
  },
    HEADBAND_GUY(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t*0.003) * (s*0.012);
      const tailWave = Math.sin(t*0.005) * (s*0.025);
      const tailWave2 = Math.cos(t*0.007) * (s*0.018);
      shadow(ctx, x+s/2, y+s-4, s*0.34, 5);
      // white gi (karate uniform) body
      ctx.fillStyle = "#f4f0e6";
      ctx.beginPath();
      ctx.ellipse(x+s*0.5, y+s*0.74+bob, s*0.34, s*0.22, 0, 0, Math.PI*2);
      ctx.fill();
      // gi shadow/folds
      ctx.fillStyle = "#d8d0bc";
      ctx.beginPath();
      ctx.moveTo(x+s*0.32, y+s*0.62+bob);
      ctx.lineTo(x+s*0.50, y+s*0.96+bob);
      ctx.lineTo(x+s*0.34, y+s*0.96+bob);
      ctx.closePath();
      ctx.fill();
      // gi V-collar (crossover)
      ctx.fillStyle = "#f4f0e6";
      ctx.beginPath();
      ctx.moveTo(x+s*0.50, y+s*0.58+bob);
      ctx.lineTo(x+s*0.36, y+s*0.78+bob);
      ctx.lineTo(x+s*0.42, y+s*0.84+bob);
      ctx.lineTo(x+s*0.50, y+s*0.66+bob);
      ctx.lineTo(x+s*0.58, y+s*0.84+bob);
      ctx.lineTo(x+s*0.64, y+s*0.78+bob);
      ctx.closePath();
      ctx.fill();
      // collar trim
      ctx.strokeStyle = "#1a1a1a";
      ctx.lineWidth = Math.max(1, s*0.010);
      ctx.beginPath();
      ctx.moveTo(x+s*0.50, y+s*0.58+bob);
      ctx.lineTo(x+s*0.36, y+s*0.78+bob);
      ctx.moveTo(x+s*0.50, y+s*0.58+bob);
      ctx.lineTo(x+s*0.64, y+s*0.78+bob);
      ctx.stroke();
      // arms in gi sleeves
      px(ctx, x+s*0.14, y+s*0.62+bob, s*0.12, s*0.20, "#f4f0e6");
      px(ctx, x+s*0.74, y+s*0.62+bob, s*0.12, s*0.20, "#f4f0e6");
      // sleeve cuffs (darker)
      px(ctx, x+s*0.14, y+s*0.78+bob, s*0.12, s*0.04, "#d8d0bc");
      px(ctx, x+s*0.74, y+s*0.78+bob, s*0.12, s*0.04, "#d8d0bc");
      // BLACK BELT around waist
      ctx.fillStyle = "#1a1a1a";
      ctx.fillRect(x+s*0.20, y+s*0.84+bob, s*0.60, s*0.06);
      // black belt knot in front (square knot)
      ctx.fillStyle = "#0a0a0a";
      ctx.fillRect(x+s*0.44, y+s*0.82+bob, s*0.12, s*0.10);
      ctx.fillStyle = "#1a1a1a";
      ctx.fillRect(x+s*0.46, y+s*0.83+bob, s*0.08, s*0.08);
      // belt knot tails dangling
      px(ctx, x+s*0.45, y+s*0.90+bob, s*0.025, s*0.06, "#1a1a1a");
      px(ctx, x+s*0.525, y+s*0.90+bob, s*0.025, s*0.06, "#1a1a1a");
      // knot highlight
      ctx.fillStyle = "#3a3a3a";
      ctx.fillRect(x+s*0.465, y+s*0.835+bob, s*0.07, s*0.012);
      // peach skin face
      ctx.fillStyle = "#ffd0a8";
      ctx.beginPath();
      ctx.ellipse(x+s*0.5, y+s*0.44+bob, s*0.20, s*0.21, 0, 0, Math.PI*2);
      ctx.fill();
      // dark spiky hair tuft (sticking up out of headband)
      ctx.fillStyle = "#1a1208";
      ctx.beginPath();
      ctx.moveTo(x+s*0.34, y+s*0.30+bob);
      ctx.lineTo(x+s*0.32, y+s*0.16+bob);
      ctx.lineTo(x+s*0.40, y+s*0.22+bob);
      ctx.lineTo(x+s*0.44, y+s*0.10+bob);
      ctx.lineTo(x+s*0.50, y+s*0.20+bob);
      ctx.lineTo(x+s*0.56, y+s*0.08+bob);
      ctx.lineTo(x+s*0.62, y+s*0.20+bob);
      ctx.lineTo(x+s*0.68, y+s*0.16+bob);
      ctx.lineTo(x+s*0.66, y+s*0.30+bob);
      ctx.closePath();
      ctx.fill();
      // hair shadow streaks
      ctx.fillStyle = "#000";
      px(ctx, x+s*0.42, y+s*0.18+bob, s*0.012, s*0.06, "#000");
      px(ctx, x+s*0.54, y+s*0.16+bob, s*0.012, s*0.06, "#000");
      // RED HEADBAND across forehead
      ctx.fillStyle = "#d61f1f";
      ctx.fillRect(x+s*0.28, y+s*0.32+bob, s*0.44, s*0.07);
      // headband shadow line
      ctx.fillStyle = "#9a1414";
      ctx.fillRect(x+s*0.28, y+s*0.38+bob, s*0.44, s*0.012);
      // white circle (rising sun) in middle of headband
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.arc(x+s*0.50, y+s*0.355+bob, s*0.030, 0, Math.PI*2);
      ctx.fill();
      // sun rays around circle (subtle)
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = Math.max(1, s*0.006);
      for (let i = 0; i < 8; i++) {
        const ra = (i / 8) * Math.PI * 2;
        const rx1 = x+s*0.50 + Math.cos(ra)*s*0.034;
        const ry1 = y+s*0.355+bob + Math.sin(ra)*s*0.034;
        const rx2 = x+s*0.50 + Math.cos(ra)*s*0.040;
        const ry2 = y+s*0.355+bob + Math.sin(ra)*s*0.040;
        ctx.beginPath();
        ctx.moveTo(rx1, ry1);
        ctx.lineTo(rx2, ry2);
        ctx.stroke();
      }
      // headband tail flowing back (animated)
      ctx.fillStyle = "#d61f1f";
      ctx.beginPath();
      ctx.moveTo(x+s*0.28, y+s*0.34+bob);
      ctx.quadraticCurveTo(x+s*0.10+tailWave, y+s*0.30+bob+tailWave2, x+s*0.04+tailWave, y+s*0.42+bob);
      ctx.quadraticCurveTo(x+s*0.12+tailWave, y+s*0.40+bob+tailWave2, x+s*0.28, y+s*0.39+bob);
      ctx.closePath();
      ctx.fill();
      // second tail layer
      ctx.fillStyle = "#9a1414";
      ctx.beginPath();
      ctx.moveTo(x+s*0.28, y+s*0.36+bob);
      ctx.quadraticCurveTo(x+s*0.08+tailWave2, y+s*0.36+bob+tailWave, x+s*0.06+tailWave2, y+s*0.46+bob);
      ctx.quadraticCurveTo(x+s*0.16+tailWave2, y+s*0.42+bob, x+s*0.28, y+s*0.40+bob);
      ctx.closePath();
      ctx.fill();
      // sharp determined eye-slits (thick angled lines)
      ctx.strokeStyle = "#1a1a1a";
      ctx.lineWidth = Math.max(2, s*0.022);
      ctx.lineCap = "round";
      // left slit (angled down toward center = determined)
      ctx.beginPath();
      ctx.moveTo(x+s*0.36, y+s*0.45+bob);
      ctx.lineTo(x+s*0.46, y+s*0.48+bob);
      ctx.stroke();
      // right slit
      ctx.beginPath();
      ctx.moveTo(x+s*0.54, y+s*0.48+bob);
      ctx.lineTo(x+s*0.64, y+s*0.45+bob);
      ctx.stroke();
      ctx.lineCap = "butt";
      // small eyebrows above slits (more intensity)
      ctx.fillStyle = "#1a1208";
      ctx.fillRect(x+s*0.36, y+s*0.41+bob, s*0.10, s*0.012);
      ctx.fillRect(x+s*0.54, y+s*0.41+bob, s*0.10, s*0.012);
      // tight determined mouth
      ctx.strokeStyle = "#1a1a1a";
      ctx.lineWidth = Math.max(1, s*0.012);
      ctx.beginPath();
      ctx.moveTo(x+s*0.46, y+s*0.56+bob);
      ctx.lineTo(x+s*0.54, y+s*0.56+bob);
      ctx.stroke();
      // CYAN sweat drop on temple (animated drip)
      const dropY = Math.sin(t*0.004) * (s*0.008);
      ctx.fillStyle = "#5fd8ff";
      ctx.beginPath();
      ctx.moveTo(x+s*0.70, y+s*0.43+bob+dropY);
      ctx.quadraticCurveTo(x+s*0.74, y+s*0.48+bob+dropY, x+s*0.71, y+s*0.51+bob+dropY);
      ctx.quadraticCurveTo(x+s*0.68, y+s*0.48+bob+dropY, x+s*0.70, y+s*0.43+bob+dropY);
      ctx.fill();
      // sweat drop highlight
      ctx.fillStyle = "#bff0ff";
      ctx.beginPath();
      ctx.arc(x+s*0.705, y+s*0.46+bob+dropY, s*0.008, 0, Math.PI*2);
      ctx.fill();
      // KARATE badge on gi
      ctx.fillStyle = "#d61f1f";
      ctx.fillRect(x+s*0.66, y+s*0.66+bob, s*0.10, s*0.06);
      ctx.fillStyle = "#fff";
      ctx.font = `bold ${Math.floor(s*0.035)}px monospace`;
      ctx.textAlign = "center";
      ctx.fillText("KI", x+s*0.71, y+s*0.705+bob);
      ctx.textAlign = "start";
    },

    KOYLY(ctx, sp, x, y, s, t) {
      const bob = Math.sin(t*0.003) * (s*0.012);
      const earWobble = Math.sin(t*0.004) * (s*0.008);
      const zPulse = (Math.sin(t*0.002) + 1) * 0.5;
      const zFloat = Math.sin(t*0.0035) * (s*0.015);
      shadow(ctx, x+s/2, y+s-4, s*0.34, 5);
      // chubby puppy body (light cream/tan)
      ctx.fillStyle = "#f4d8a8";
      ctx.beginPath();
      ctx.ellipse(x+s*0.5, y+s*0.74+bob, s*0.30, s*0.20, 0, 0, Math.PI*2);
      ctx.fill();
      // belly highlight
      ctx.fillStyle = "#fce8c4";
      ctx.beginPath();
      ctx.ellipse(x+s*0.5, y+s*0.78+bob, s*0.20, s*0.10, 0, 0, Math.PI*2);
      ctx.fill();
      // stubby legs (4 little nubs)
      px(ctx, x+s*0.26, y+s*0.86+bob, s*0.08, s*0.08, "#f4d8a8");
      px(ctx, x+s*0.40, y+s*0.88+bob, s*0.08, s*0.07, "#f4d8a8");
      px(ctx, x+s*0.52, y+s*0.88+bob, s*0.08, s*0.07, "#f4d8a8");
      px(ctx, x+s*0.66, y+s*0.86+bob, s*0.08, s*0.08, "#f4d8a8");
      // tiny paw pads on front legs
      px(ctx, x+s*0.28, y+s*0.92+bob, s*0.04, s*0.02, "#d4b888");
      px(ctx, x+s*0.68, y+s*0.92+bob, s*0.04, s*0.02, "#d4b888");
      // puppy head — big round
      ctx.fillStyle = "#f4d8a8";
      ctx.beginPath();
      ctx.ellipse(x+s*0.5, y+s*0.46+bob, s*0.22, s*0.21, 0, 0, Math.PI*2);
      ctx.fill();
      // muzzle (lighter)
      ctx.fillStyle = "#fce8c4";
      ctx.beginPath();
      ctx.ellipse(x+s*0.50, y+s*0.55+bob, s*0.10, s*0.07, 0, 0, Math.PI*2);
      ctx.fill();
      // FLOPPY EARS (long, droopy down past cheeks)
      // left ear
      ctx.fillStyle = "#c89868";
      ctx.beginPath();
      ctx.moveTo(x+s*0.30, y+s*0.32+bob);
      ctx.quadraticCurveTo(x+s*0.20+earWobble, y+s*0.42+bob, x+s*0.22+earWobble, y+s*0.58+bob);
      ctx.quadraticCurveTo(x+s*0.30, y+s*0.60+bob, x+s*0.36, y+s*0.50+bob);
      ctx.quadraticCurveTo(x+s*0.34, y+s*0.38+bob, x+s*0.30, y+s*0.32+bob);
      ctx.fill();
      // left ear inner (pink)
      ctx.fillStyle = "#e8b098";
      ctx.beginPath();
      ctx.moveTo(x+s*0.30, y+s*0.36+bob);
      ctx.quadraticCurveTo(x+s*0.26+earWobble, y+s*0.44+bob, x+s*0.27+earWobble, y+s*0.54+bob);
      ctx.quadraticCurveTo(x+s*0.32, y+s*0.50+bob, x+s*0.32, y+s*0.40+bob);
      ctx.fill();
      // right ear
      ctx.fillStyle = "#c89868";
      ctx.beginPath();
      ctx.moveTo(x+s*0.70, y+s*0.32+bob);
      ctx.quadraticCurveTo(x+s*0.80-earWobble, y+s*0.42+bob, x+s*0.78-earWobble, y+s*0.58+bob);
      ctx.quadraticCurveTo(x+s*0.70, y+s*0.60+bob, x+s*0.64, y+s*0.50+bob);
      ctx.quadraticCurveTo(x+s*0.66, y+s*0.38+bob, x+s*0.70, y+s*0.32+bob);
      ctx.fill();
      // right ear inner
      ctx.fillStyle = "#e8b098";
      ctx.beginPath();
      ctx.moveTo(x+s*0.70, y+s*0.36+bob);
      ctx.quadraticCurveTo(x+s*0.74-earWobble, y+s*0.44+bob, x+s*0.73-earWobble, y+s*0.54+bob);
      ctx.quadraticCurveTo(x+s*0.68, y+s*0.50+bob, x+s*0.68, y+s*0.40+bob);
      ctx.fill();
      // top of head fluff
      ctx.fillStyle = "#f4d8a8";
      ctx.beginPath();
      ctx.ellipse(x+s*0.5, y+s*0.30+bob, s*0.10, s*0.04, 0, 0, Math.PI*2);
      ctx.fill();
      // sleepy closed eyes (gentle arcs ^_^ but flat)
      ctx.strokeStyle = "#1a1a1a";
      ctx.lineWidth = Math.max(2, s*0.018);
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.arc(x+s*0.42, y+s*0.46+bob, s*0.030, Math.PI*1.2, Math.PI*1.8);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(x+s*0.58, y+s*0.46+bob, s*0.030, Math.PI*1.2, Math.PI*1.8);
      ctx.stroke();
      // little eyelashes/sleep marks
      ctx.lineWidth = Math.max(1, s*0.010);
      ctx.beginPath();
      ctx.moveTo(x+s*0.40, y+s*0.49+bob);
      ctx.lineTo(x+s*0.39, y+s*0.51+bob);
      ctx.moveTo(x+s*0.60, y+s*0.49+bob);
      ctx.lineTo(x+s*0.61, y+s*0.51+bob);
      ctx.stroke();
      ctx.lineCap = "butt";
      // black nose (rounded triangle)
      ctx.fillStyle = "#1a1a1a";
      ctx.beginPath();
      ctx.moveTo(x+s*0.50, y+s*0.50+bob);
      ctx.quadraticCurveTo(x+s*0.46, y+s*0.52+bob, x+s*0.48, y+s*0.55+bob);
      ctx.quadraticCurveTo(x+s*0.50, y+s*0.56+bob, x+s*0.52, y+s*0.55+bob);
      ctx.quadraticCurveTo(x+s*0.54, y+s*0.52+bob, x+s*0.50, y+s*0.50+bob);
      ctx.fill();
      // nose highlight
      ctx.fillStyle = "#666";
      ctx.beginPath();
      ctx.arc(x+s*0.49, y+s*0.515+bob, s*0.006, 0, Math.PI*2);
      ctx.fill();
      // tiny droop mouth (sad-ish little frown)
      ctx.strokeStyle = "#1a1a1a";
      ctx.lineWidth = Math.max(1, s*0.012);
      ctx.beginPath();
      ctx.moveTo(x+s*0.50, y+s*0.56+bob);
      ctx.lineTo(x+s*0.50, y+s*0.59+bob);
      ctx.moveTo(x+s*0.50, y+s*0.59+bob);
      ctx.quadraticCurveTo(x+s*0.46, y+s*0.61+bob, x+s*0.44, y+s*0.60+bob);
      ctx.moveTo(x+s*0.50, y+s*0.59+bob);
      ctx.quadraticCurveTo(x+s*0.54, y+s*0.61+bob, x+s*0.56, y+s*0.60+bob);
      ctx.stroke();
      // DARK COLLAR around neck
      ctx.fillStyle = "#2a1a1a";
      ctx.fillRect(x+s*0.28, y+s*0.62+bob, s*0.44, s*0.05);
      ctx.fillStyle = "#1a0a0a";
      ctx.fillRect(x+s*0.28, y+s*0.66+bob, s*0.44, s*0.012);
      // collar studs
      ctx.fillStyle = "#888";
      ctx.beginPath(); ctx.arc(x+s*0.34, y+s*0.645+bob, s*0.008, 0, Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(x+s*0.40, y+s*0.645+bob, s*0.008, 0, Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(x+s*0.60, y+s*0.645+bob, s*0.008, 0, Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(x+s*0.66, y+s*0.645+bob, s*0.008, 0, Math.PI*2); ctx.fill();
      // SKULL CHARM pendant hanging off collar
      ctx.fillStyle = "#888";
      ctx.fillRect(x+s*0.498, y+s*0.66+bob, s*0.004, s*0.03);
      // skull body (white circle/square)
      ctx.fillStyle = "#f0f0f0";
      ctx.beginPath();
      ctx.ellipse(x+s*0.50, y+s*0.71+bob, s*0.045, s*0.045, 0, 0, Math.PI*2);
      ctx.fill();
      // skull jaw bottom (square)
      ctx.fillRect(x+s*0.475, y+s*0.72+bob, s*0.05, s*0.025);
      // skull eye sockets (black)
      ctx.fillStyle = "#000";
      ctx.beginPath(); ctx.arc(x+s*0.485, y+s*0.705+bob, s*0.010, 0, Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(x+s*0.515, y+s*0.705+bob, s*0.010, 0, Math.PI*2); ctx.fill();
      // skull nose (small triangle)
      ctx.beginPath();
      ctx.moveTo(x+s*0.50, y+s*0.715+bob);
      ctx.lineTo(x+s*0.495, y+s*0.725+bob);
      ctx.lineTo(x+s*0.505, y+s*0.725+bob);
      ctx.closePath();
      ctx.fill();
      // skull teeth (vertical lines on jaw)
      ctx.strokeStyle = "#000";
      ctx.lineWidth = Math.max(1, s*0.005);
      ctx.beginPath();
      ctx.moveTo(x+s*0.485, y+s*0.725+bob); ctx.lineTo(x+s*0.485, y+s*0.74+bob);
      ctx.moveTo(x+s*0.495, y+s*0.725+bob); ctx.lineTo(x+s*0.495, y+s*0.74+bob);
      ctx.moveTo(x+s*0.505, y+s*0.725+bob); ctx.lineTo(x+s*0.505, y+s*0.74+bob);
      ctx.moveTo(x+s*0.515, y+s*0.725+bob); ctx.lineTo(x+s*0.515, y+s*0.74+bob);
      ctx.stroke();
      // floating Z (sleepy)
      ctx.fillStyle = `rgba(127,180,255,${0.5 + zPulse*0.5})`;
      ctx.font = `bold ${Math.floor(s*0.10)}px monospace`;
      ctx.fillText("Z", x+s*0.74, y+s*0.20+bob+zFloat);
      // smaller Z
      ctx.fillStyle = `rgba(127,180,255,${0.3 + zPulse*0.4})`;
      ctx.font = `bold ${Math.floor(s*0.06)}px monospace`;
      ctx.fillText("z", x+s*0.82, y+s*0.12+bob-zFloat);
      // tiniest Z
      ctx.fillStyle = `rgba(127,180,255,${0.2 + zPulse*0.3})`;
      ctx.font = `bold ${Math.floor(s*0.04)}px monospace`;
      ctx.fillText("z", x+s*0.88, y+s*0.06+bob+zFloat*0.5);
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
    },
  };
})();
