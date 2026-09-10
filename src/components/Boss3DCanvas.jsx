import React, { useRef, useEffect } from "react";

export default function Boss3DCanvas({ stageId, isHit, hpPercent }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let animTime = 0;

    // Sparks & Stars Particles on Hit
    let starParticles = [];

    const createStarSparks = () => {
      for (let i = 0; i < 25; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 8 + 3;
        starParticles.push({
          x: canvas.width / 2,
          y: canvas.height / 2 - 10,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1.0,
          size: Math.random() * 6 + 4,
          color: Math.random() > 0.5 ? "#f59e0b" : "#ef4444",
        });
      }
    };

    if (isHit) {
      createStarSparks();
    }

    // Helper: Draw 3D Shaded Sphere
    const draw3DSphere = (x, y, radius, mainColor, highlightColor, shadowColor) => {
      const grad = ctx.createRadialGradient(
        x - radius * 0.3,
        y - radius * 0.3,
        radius * 0.1,
        x,
        y,
        radius
      );
      grad.addColorStop(0, highlightColor);
      grad.addColorStop(0.5, mainColor);
      grad.addColorStop(1, shadowColor);

      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();
    };

    // Helper: Draw Star Shape
    const drawStar = (cx, cy, spikes, outerRadius, innerRadius, color) => {
      let rot = (Math.PI / 2) * 3;
      let x = cx;
      let y = cy;
      let step = Math.PI / spikes;

      ctx.beginPath();
      ctx.moveTo(cx, cy - outerRadius);
      for (let i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        ctx.lineTo(x, y);
        rot += step;

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        ctx.lineTo(x, y);
        rot += step;
      }
      ctx.lineTo(cx, cy - outerRadius);
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      animTime += 0.05;

      const width = canvas.width;
      const height = canvas.height;
      const centerX = width / 2;
      const centerY = height / 2 + Math.sin(animTime * 2) * 6; // Idle Bobbing

      // Squash & Stretch on Hit or Idle
      let scaleX = 1.0;
      let scaleY = 1.0;
      if (isHit) {
        scaleX = 1.25;
        scaleY = 0.75;
      } else {
        scaleX = 1 + Math.sin(animTime * 4) * 0.03;
        scaleY = 1 - Math.sin(animTime * 4) * 0.03;
      }

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.scale(scaleX, scaleY);

      // Floor Shadow
      ctx.save();
      ctx.scale(1, 0.3);
      const shadowGrad = ctx.createRadialGradient(0, 180, 5, 0, 180, 60);
      shadowGrad.addColorStop(0, "rgba(0,0,0,0.4)");
      shadowGrad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = shadowGrad;
      ctx.beginPath();
      ctx.arc(0, 180, 60, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // --- CUTE MONSTER 1: BABY DRAGON 🐲 ---
      if (stageId === "stage1") {
        const wingFlap = Math.sin(animTime * 6) * 0.3;
        ctx.save();
        ctx.translate(-35, -10);
        ctx.rotate(-0.4 + wingFlap);
        ctx.beginPath();
        ctx.ellipse(0, 0, 22, 12, -0.2, 0, Math.PI * 2);
        ctx.fillStyle = "#d97706";
        ctx.fill();
        ctx.restore();

        ctx.save();
        ctx.translate(35, -10);
        ctx.rotate(0.4 - wingFlap);
        ctx.beginPath();
        ctx.ellipse(0, 0, 22, 12, 0.2, 0, Math.PI * 2);
        ctx.fillStyle = "#d97706";
        ctx.fill();
        ctx.restore();

        draw3DSphere(0, 0, 48, "#f59e0b", "#fef08a", "#b45309");
        draw3DSphere(-22, -42, 10, "#fbbf24", "#fffbeb", "#d97706");
        draw3DSphere(22, -42, 10, "#fbbf24", "#fffbeb", "#d97706");
        draw3DSphere(0, 15, 26, "#fef08a", "#ffffff", "#fde047");

        const isBlinking = Math.sin(animTime * 0.8) > 0.95;
        if (isHit) {
          ctx.strokeStyle = "#78350f";
          ctx.lineWidth = 4;
          ctx.beginPath();
          ctx.moveTo(-22, -10); ctx.lineTo(-14, -5); ctx.lineTo(-22, 0);
          ctx.moveTo(22, -10); ctx.lineTo(14, -5); ctx.lineTo(22, 0);
          ctx.stroke();
        } else if (isBlinking) {
          ctx.strokeStyle = "#78350f";
          ctx.lineWidth = 3.5;
          ctx.beginPath();
          ctx.arc(-16, -5, 8, Math.PI, 0);
          ctx.arc(16, -5, 8, Math.PI, 0);
          ctx.stroke();
        } else {
          draw3DSphere(-16, -5, 11, "#1e1b4b", "#4338ca", "#0f172a");
          draw3DSphere(16, -5, 11, "#1e1b4b", "#4338ca", "#0f172a");
          ctx.fillStyle = "#ffffff";
          ctx.beginPath();
          ctx.arc(-13, -8, 4, 0, Math.PI * 2);
          ctx.arc(19, -8, 4, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.fillStyle = "rgba(244, 63, 94, 0.45)";
        ctx.beginPath();
        ctx.arc(-26, 8, 7, 0, Math.PI * 2);
        ctx.arc(26, 8, 7, 0, Math.PI * 2);
        ctx.fill();
      }

      // --- CUTE MONSTER 2: COFFEE BEAR 🐻☕ ---
      else if (stageId === "stage2") {
        draw3DSphere(-34, -36, 16, "#78350f", "#b45309", "#451a03");
        draw3DSphere(34, -36, 16, "#78350f", "#b45309", "#451a03");
        draw3DSphere(-34, -36, 8, "#fde047", "#fef08a", "#ca8a04");
        draw3DSphere(34, -36, 8, "#fde047", "#fef08a", "#ca8a04");

        const pawWave = Math.sin(animTime * 5) * 8;
        draw3DSphere(-46, 10 + pawWave, 12, "#92400e", "#d97706", "#451a03");
        draw3DSphere(46, 10 - pawWave, 12, "#92400e", "#d97706", "#451a03");

        draw3DSphere(0, 0, 48, "#92400e", "#d97706", "#451a03");

        ctx.save();
        ctx.translate(0, -48);
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.roundRect(-16, -15, 32, 20, 6);
        ctx.fill();
        ctx.fillStyle = "#ca8a04";
        ctx.fillRect(-14, -13, 28, 4);
        ctx.restore();

        draw3DSphere(0, 6, 18, "#fef3c7", "#ffffff", "#fde047");
        draw3DSphere(0, 0, 6, "#451a03", "#78350f", "#000000");

        if (isHit) {
          ctx.strokeStyle = "#451a03";
          ctx.lineWidth = 3.5;
          ctx.beginPath();
          ctx.moveTo(-18, -12); ctx.lineTo(-10, -4);
          ctx.moveTo(-10, -12); ctx.lineTo(-18, -4);
          ctx.moveTo(10, -12); ctx.lineTo(18, -4);
          ctx.moveTo(18, -12); ctx.lineTo(10, -4);
          ctx.stroke();
        } else {
          draw3DSphere(-18, -8, 8, "#1e1b4b", "#4338ca", "#000000");
          draw3DSphere(18, -8, 8, "#1e1b4b", "#4338ca", "#000000");
          ctx.fillStyle = "#ffffff";
          ctx.beginPath();
          ctx.arc(-16, -10, 3, 0, Math.PI * 2);
          ctx.arc(20, -10, 3, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.fillStyle = "rgba(244, 63, 94, 0.4)";
        ctx.beginPath();
        ctx.arc(-26, 5, 6, 0, Math.PI * 2);
        ctx.arc(26, 5, 6, 0, Math.PI * 2);
        ctx.fill();
      }

      // --- CUTE MONSTER 3: FOX SPHINX 🦊✨ ---
      else if (stageId === "stage3") {
        const tailWag = Math.sin(animTime * 4) * 0.4;
        ctx.save();
        ctx.translate(28, 15);
        ctx.rotate(0.5 + tailWag);
        draw3DSphere(20, -10, 18, "#ea580c", "#fb923c", "#9a3412");
        draw3DSphere(32, -18, 10, "#ffffff", "#ffffff", "#e2e8f0");
        ctx.restore();

        ctx.save();
        ctx.fillStyle = "#ea580c";
        ctx.beginPath();
        ctx.moveTo(-38, -20); ctx.lineTo(-20, -52); ctx.lineTo(-10, -28);
        ctx.closePath(); ctx.fill();
        ctx.fillStyle = "#fde047";
        ctx.beginPath();
        ctx.moveTo(-33, -22); ctx.lineTo(-20, -45); ctx.lineTo(-14, -28);
        ctx.closePath(); ctx.fill();
        ctx.fillStyle = "#ea580c";
        ctx.beginPath();
        ctx.moveTo(38, -20); ctx.lineTo(20, -52); ctx.lineTo(10, -28);
        ctx.closePath(); ctx.fill();
        ctx.fillStyle = "#fde047";
        ctx.beginPath();
        ctx.moveTo(33, -22); ctx.lineTo(20, -45); ctx.lineTo(14, -28);
        ctx.closePath(); ctx.fill();
        ctx.restore();

        draw3DSphere(0, 0, 46, "#ea580c", "#fb923c", "#9a3412");
        draw3DSphere(0, 12, 22, "#ffffff", "#ffffff", "#cbd5e1");
        draw3DSphere(0, 2, 5, "#0f172a", "#334155", "#000000");

        if (isHit) {
          ctx.strokeStyle = "#431407";
          ctx.lineWidth = 3.5;
          ctx.beginPath();
          ctx.arc(-16, -8, 7, 0, Math.PI);
          ctx.arc(16, -8, 7, 0, Math.PI);
          ctx.stroke();
        } else {
          draw3DSphere(-16, -8, 10, "#0f172a", "#1e293b", "#000000");
          draw3DSphere(16, -8, 10, "#0f172a", "#1e293b", "#000000");
          ctx.fillStyle = "#ffffff";
          ctx.beginPath();
          ctx.arc(-13, -11, 4, 0, Math.PI * 2);
          ctx.arc(19, -11, 4, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.fillStyle = "rgba(244, 63, 94, 0.45)";
        ctx.beginPath();
        ctx.arc(-26, 4, 6, 0, Math.PI * 2);
        ctx.arc(26, 4, 6, 0, Math.PI * 2);
        ctx.fill();
      }

      // --- CUTE MONSTER 4: HOTEL BUNNY 🐰🏨 ---
      else if (stageId === "stage4") {
        const earWiggle = Math.sin(animTime * 5) * 0.15;
        // Long Floppy Bunny Ears
        draw3DSphere(-22 + earWiggle * 10, -52, 14, "#f472b6", "#fbcfe8", "#db2777");
        draw3DSphere(22 - earWiggle * 10, -52, 14, "#f472b6", "#fbcfe8", "#db2777");
        draw3DSphere(-22 + earWiggle * 10, -52, 7, "#ffffff", "#ffffff", "#f1f5f9");
        draw3DSphere(22 - earWiggle * 10, -52, 7, "#ffffff", "#ffffff", "#f1f5f9");

        // Main White Round Bunny Body
        draw3DSphere(0, 0, 48, "#f1f5f9", "#ffffff", "#cbd5e1");
        // Pink Nose & Mouth
        draw3DSphere(0, 4, 6, "#f43f5e", "#fda4af", "#9f1239");

        if (isHit) {
          ctx.strokeStyle = "#881337";
          ctx.lineWidth = 3.5;
          ctx.beginPath();
          ctx.moveTo(-18, -10); ctx.lineTo(-10, -2);
          ctx.moveTo(-10, -10); ctx.lineTo(-18, -2);
          ctx.moveTo(10, -10); ctx.lineTo(18, -2);
          ctx.moveTo(18, -10); ctx.lineTo(10, -2);
          ctx.stroke();
        } else {
          draw3DSphere(-16, -6, 9, "#1e1b4b", "#4338ca", "#000000");
          draw3DSphere(16, -6, 9, "#1e1b4b", "#4338ca", "#000000");
          ctx.fillStyle = "#ffffff";
          ctx.beginPath();
          ctx.arc(-13, -9, 3.5, 0, Math.PI * 2);
          ctx.arc(19, -9, 3.5, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.fillStyle = "rgba(244, 63, 94, 0.45)";
        ctx.beginPath();
        ctx.arc(-26, 6, 7, 0, Math.PI * 2);
        ctx.arc(26, 6, 7, 0, Math.PI * 2);
        ctx.fill();
      }

      // --- CUTE MONSTER 5: SHOPPING SLIME 🧪🛍️ ---
      else if (stageId === "stage5") {
        // Antennae
        const antWiggle = Math.sin(animTime * 7) * 6;
        ctx.strokeStyle = "#10b981";
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(0, -40); ctx.lineTo(antWiggle, -60);
        ctx.stroke();
        draw3DSphere(antWiggle, -62, 8, "#34d399", "#a7f3d0", "#059669");

        // Jelly Slime Body
        draw3DSphere(0, 5, 50, "#10b981", "#6ee7b7", "#047857");
        draw3DSphere(0, -15, 20, "rgba(255,255,255,0.4)", "#ffffff", "rgba(255,255,255,0)");

        if (isHit) {
          ctx.strokeStyle = "#064e3b";
          ctx.lineWidth = 4;
          ctx.beginPath();
          ctx.arc(-16, -5, 7, Math.PI, 0);
          ctx.arc(16, -5, 7, Math.PI, 0);
          ctx.stroke();
        } else {
          draw3DSphere(-16, -5, 11, "#064e3b", "#047857", "#000000");
          draw3DSphere(16, -5, 11, "#064e3b", "#047857", "#000000");
          ctx.fillStyle = "#ffffff";
          ctx.beginPath();
          ctx.arc(-13, -8, 4.5, 0, Math.PI * 2);
          ctx.arc(19, -8, 4.5, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.fillStyle = "rgba(251, 113, 133, 0.4)";
        ctx.beginPath();
        ctx.arc(-26, 8, 7, 0, Math.PI * 2);
        ctx.arc(26, 8, 7, 0, Math.PI * 2);
        ctx.fill();
      }

      // --- CUTE MONSTER 6: MEDICAL KITTY 🐱🩺 ---
      else {
        // Pointy Cat Ears
        ctx.save();
        ctx.fillStyle = "#38bdf8";
        ctx.beginPath();
        ctx.moveTo(-36, -20); ctx.lineTo(-24, -50); ctx.lineTo(-12, -28);
        ctx.closePath(); ctx.fill();
        ctx.fillStyle = "#f472b6";
        ctx.beginPath();
        ctx.moveTo(-31, -22); ctx.lineTo(-24, -42); ctx.lineTo(-16, -28);
        ctx.closePath(); ctx.fill();

        ctx.fillStyle = "#38bdf8";
        ctx.beginPath();
        ctx.moveTo(36, -20); ctx.lineTo(24, -50); ctx.lineTo(12, -28);
        ctx.closePath(); ctx.fill();
        ctx.fillStyle = "#f472b6";
        ctx.beginPath();
        ctx.moveTo(31, -22); ctx.lineTo(24, -42); ctx.lineTo(16, -28);
        ctx.closePath(); ctx.fill();
        ctx.restore();

        // Round White Kitty Body
        draw3DSphere(0, 0, 48, "#e0f2fe", "#ffffff", "#7dd3fc");

        // Whiskers
        ctx.strokeStyle = "#0284c7";
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(-28, 4); ctx.lineTo(-46, 2);
        ctx.moveTo(-28, 10); ctx.lineTo(-44, 12);
        ctx.moveTo(28, 4); ctx.lineTo(46, 2);
        ctx.moveTo(28, 10); ctx.lineTo(44, 12);
        ctx.stroke();

        // Pink Cat Nose
        draw3DSphere(0, 2, 5, "#f43f5e", "#fda4af", "#9f1239");

        if (isHit) {
          ctx.strokeStyle = "#0c4a6e";
          ctx.lineWidth = 3.5;
          ctx.beginPath();
          ctx.arc(-16, -8, 7, 0, Math.PI);
          ctx.arc(16, -8, 7, 0, Math.PI);
          ctx.stroke();
        } else {
          draw3DSphere(-16, -8, 10, "#0c4a6e", "#0369a1", "#000000");
          draw3DSphere(16, -8, 10, "#0c4a6e", "#0369a1", "#000000");
          ctx.fillStyle = "#ffffff";
          ctx.beginPath();
          ctx.arc(-13, -11, 4, 0, Math.PI * 2);
          ctx.arc(19, -11, 4, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.fillStyle = "rgba(244, 63, 94, 0.45)";
        ctx.beginPath();
        ctx.arc(-26, 6, 7, 0, Math.PI * 2);
        ctx.arc(26, 6, 7, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();

      // Render Star Spark Particles on Hit
      starParticles.forEach((sp) => {
        sp.x += sp.vx;
        sp.y += sp.vy;
        sp.life -= 0.035;

        if (sp.life > 0) {
          ctx.save();
          ctx.globalAlpha = sp.life;
          drawStar(sp.x, sp.y, 5, sp.size * sp.life, (sp.size / 2) * sp.life, sp.color);
          ctx.restore();
        }
      });

      starParticles = starParticles.filter((sp) => sp.life > 0);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [stageId, isHit]);

  return (
    <div className="relative flex items-center justify-center py-1">
      <canvas
        ref={canvasRef}
        width={260}
        height={180}
        className="w-full max-w-[260px] h-[180px] drop-shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-transform"
      />
    </div>
  );
}
