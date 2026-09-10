import React, { useRef, useEffect } from "react";

export default function Boss3DCanvas({ stageId, isHit, hpPercent }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let angleX = 0;
    let angleY = 0;
    let angleZ = 0;
    let bobAngle = 0;

    // Sparks particles on hit
    let sparkParticles = [];

    const createSparks = () => {
      const pCount = 20;
      for (let i = 0; i < pCount; i++) {
        sparkParticles.push({
          x: canvas.width / 2,
          y: canvas.height / 2,
          vx: (Math.random() - 0.5) * 12,
          vy: (Math.random() - 0.5) * 12,
          life: 1.0,
          color: Math.random() > 0.5 ? "#f59e0b" : "#ef4444",
          size: Math.random() * 4 + 2,
        });
      }
    };

    if (isHit) {
      createSparks();
    }

    // 3D Point Projection Helper
    const project = (x, y, z, width, height) => {
      const fov = 260;
      const distance = 300;
      const scale = fov / (distance + z);
      const x2d = x * scale + width / 2;
      const y2d = y * scale + height / 2;
      return { x: x2d, y: y2d, scale };
    };

    // 3D Rotation Helper
    const rotate3D = (point, rx, ry, rz) => {
      let { x, y, z } = point;

      // Rotate X
      let rad = rx;
      let cos = Math.cos(rad);
      let sin = Math.sin(rad);
      let y1 = y * cos - z * sin;
      let z1 = y * sin + z * cos;

      // Rotate Y
      rad = ry;
      cos = Math.cos(rad);
      sin = Math.sin(rad);
      let x2 = x * cos + z1 * sin;
      let z2 = -x * sin + z1 * cos;

      // Rotate Z
      rad = rz;
      cos = Math.cos(rad);
      sin = Math.sin(rad);
      let x3 = x2 * cos - y1 * sin;
      let y3 = x2 * sin + y1 * cos;

      return { x: x3, y: y3, z: z2 };
    };

    // 3D Models Data Generator
    const getBossVertices = (type) => {
      const vertices = [];
      const edges = [];

      if (type === "stage1") {
        // Dragon Crystal Core (Octahedron + Ring)
        const size = 50;
        vertices.push(
          { x: 0, y: -size * 1.3, z: 0 },
          { x: size, y: 0, z: 0 },
          { x: 0, y: 0, z: size },
          { x: -size, y: 0, z: 0 },
          { x: 0, y: 0, z: -size },
          { x: 0, y: size * 1.3, z: 0 }
        );
        edges.push(
          [0, 1], [0, 2], [0, 3], [0, 4],
          [5, 1], [5, 2], [5, 3], [5, 4],
          [1, 2], [2, 3], [3, 4], [4, 1]
        );

        // Orbiting Ring
        const ringSegments = 12;
        const ringRadius = 75;
        const baseIndex = vertices.length;
        for (let i = 0; i < ringSegments; i++) {
          const theta = (i / ringSegments) * Math.PI * 2;
          vertices.push({
            x: Math.cos(theta) * ringRadius,
            y: Math.sin(theta) * 15,
            z: Math.sin(theta) * ringRadius,
          });
          edges.push([baseIndex + i, baseIndex + ((i + 1) % ringSegments)]);
        }
      } else if (type === "stage2") {
        // Coffee Golem Cube Matrix
        const s = 42;
        vertices.push(
          { x: -s, y: -s, z: -s }, { x: s, y: -s, z: -s },
          { x: s, y: s, z: -s }, { x: -s, y: s, z: -s },
          { x: -s, y: -s, z: s }, { x: s, y: -s, z: s },
          { x: s, y: s, z: s }, { x: -s, y: s, z: s }
        );
        edges.push(
          [0, 1], [1, 2], [2, 3], [3, 0],
          [4, 5], [5, 6], [6, 7], [7, 4],
          [0, 4], [1, 5], [2, 6], [3, 7]
        );

        // Outer Floating Cube Shell
        const s2 = 65;
        const baseIndex = vertices.length;
        vertices.push(
          { x: -s2, y: -s2, z: -s2 }, { x: s2, y: -s2, z: -s2 },
          { x: s2, y: s2, z: -s2 }, { x: -s2, y: s2, z: -s2 },
          { x: -s2, y: -s2, z: s2 }, { x: s2, y: -s2, z: s2 },
          { x: s2, y: s2, z: s2 }, { x: -s2, y: s2, z: s2 }
        );
        edges.push(
          [baseIndex + 0, baseIndex + 1], [baseIndex + 1, baseIndex + 2], [baseIndex + 2, baseIndex + 3], [baseIndex + 3, baseIndex + 0],
          [baseIndex + 4, baseIndex + 5], [baseIndex + 5, baseIndex + 6], [baseIndex + 6, baseIndex + 7], [baseIndex + 7, baseIndex + 4],
          [baseIndex + 0, baseIndex + 4], [baseIndex + 1, baseIndex + 5], [baseIndex + 2, baseIndex + 6], [baseIndex + 3, baseIndex + 7]
        );
      } else {
        // Sphinx Icosahedron / Pyramid Matrix
        const phi = (1 + Math.sqrt(5)) / 2;
        const a = 32;
        const b = a * phi;
        vertices.push(
          { x: -a, y: b, z: 0 }, { x: a, y: b, z: 0 }, { x: -a, y: -b, z: 0 }, { x: a, y: -b, z: 0 },
          { x: 0, y: -a, z: b }, { x: 0, y: a, z: b }, { x: 0, y: -a, z: -b }, { x: 0, y: a, z: -b },
          { x: b, y: 0, z: -a }, { x: b, y: 0, z: a }, { x: -b, y: 0, z: -a }, { x: -b, y: 0, z: a }
        );
        edges.push(
          [0, 1], [0, 5], [0, 7], [0, 10], [0, 11],
          [1, 5], [1, 7], [1, 8], [1, 9],
          [2, 3], [2, 4], [2, 6], [2, 10], [2, 11],
          [3, 4], [3, 6], [3, 8], [3, 9],
          [4, 5], [4, 9], [4, 11], [5, 9], [5, 11],
          [6, 7], [6, 8], [6, 10], [7, 8], [7, 10],
          [8, 9], [10, 11]
        );
      }

      return { vertices, edges };
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const width = canvas.width;
      const height = canvas.height;

      // Update angles
      angleX += 0.012;
      angleY += 0.018;
      angleZ += 0.008;
      bobAngle += 0.04;

      const bobOffsetY = Math.sin(bobAngle) * 8;

      const { vertices, edges } = getBossVertices(stageId || "stage1");

      // Draw background glow
      const glowGrad = ctx.createRadialGradient(
        width / 2,
        height / 2 + bobOffsetY,
        10,
        width / 2,
        height / 2 + bobOffsetY,
        110
      );
      
      const mainColor = stageId === "stage1" ? "rgba(245, 158, 11, " : stageId === "stage2" ? "rgba(168, 85, 247, " : "rgba(6, 182, 212, ";
      glowGrad.addColorStop(0, `${mainColor}${isHit ? 0.6 : 0.25})`);
      glowGrad.addColorStop(1, `${mainColor}0)`);

      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(width / 2, height / 2 + bobOffsetY, 120, 0, Math.PI * 2);
      ctx.fill();

      // Project vertices
      const projectedPoints = vertices.map((v) => {
        const rot = rotate3D(v, angleX, angleY, angleZ);
        rot.y += bobOffsetY;
        if (isHit) {
          rot.x += (Math.random() - 0.5) * 12;
          rot.y += (Math.random() - 0.5) * 12;
        }
        return project(rot.x, rot.y, rot.z, width, height);
      });

      // Draw edges with 3D gradient stroke
      ctx.lineWidth = isHit ? 3.5 : 2;
      ctx.strokeStyle = isHit
        ? "#ef4444"
        : stageId === "stage1"
        ? "#f59e0b"
        : stageId === "stage2"
        ? "#c084fc"
        : "#22d3ee";

      edges.forEach(([i, j]) => {
        const p1 = projectedPoints[i];
        const p2 = projectedPoints[j];
        if (p1 && p2) {
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      });

      // Draw 3D vertex nodes
      projectedPoints.forEach((p) => {
        ctx.fillStyle = isHit ? "#ffffff" : "#fef08a";
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(1, 3 * p.scale), 0, Math.PI * 2);
        ctx.fill();
      });

      // Render 3D Sparks on Hit
      sparkParticles.forEach((sp, idx) => {
        sp.x += sp.vx;
        sp.y += sp.vy;
        sp.life -= 0.04;

        if (sp.life > 0) {
          ctx.fillStyle = sp.color;
          ctx.globalAlpha = sp.life;
          ctx.beginPath();
          ctx.arc(sp.x, sp.y, sp.size * sp.life, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = 1.0;
        }
      });

      sparkParticles = sparkParticles.filter((sp) => sp.life > 0);

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
        className="w-full max-w-[260px] h-[180px] drop-shadow-[0_0_15px_rgba(245,158,11,0.3)] transition-transform"
      />
    </div>
  );
}
