import React, { useEffect, useRef } from 'react';

const FLOATING_TERMS = [
  'RAG',
  'LLM',
  'MCP',
  'AGENT',
  'VISION',
  'VECTOR',
  'EMBEDDING',
  'PYTHON',
  'SQL',
  'API',
  'AI',
  'PROMPT'
];

const MATH_SYMBOLS = ['λ', 'σ', '{ }', '[ ]', 'f(x)', '∂/∂x', '=>', '◈', '∑', '∇'];

// Peacock palette colors
const PEACOCK_COLORS = [
  'rgba(20, 184, 166, 0.6)',  // Teal
  'rgba(6, 182, 212, 0.6)',   // Turquoise
  'rgba(16, 185, 129, 0.55)', // Emerald
  'rgba(59, 130, 246, 0.6)',  // Royal Blue
  'rgba(139, 92, 246, 0.55)', // Violet
  'rgba(245, 158, 11, 0.45)', // Subtle Gold
];

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
}

interface TextParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  text: string;
  size: number;
  opacity: number;
  color: string;
}

export const PeacockCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Initialize point particles
    const particleCount = Math.min(45, Math.floor(width / 35));
    const particles: Particle[] = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      radius: Math.random() * 2 + 1,
      color: PEACOCK_COLORS[Math.floor(Math.random() * PEACOCK_COLORS.length)],
    }));

    // Initialize floating terms
    const textParticles: TextParticle[] = FLOATING_TERMS.concat(MATH_SYMBOLS).map((term) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      text: term,
      size: Math.random() * 3 + 11,
      opacity: Math.random() * 0.25 + 0.12,
      color: PEACOCK_COLORS[Math.floor(Math.random() * PEACOCK_COLORS.length)],
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle luminous background gradients
      const grad1 = ctx.createRadialGradient(
        width * 0.2,
        height * 0.15,
        0,
        width * 0.2,
        height * 0.15,
        width * 0.45
      );
      grad1.addColorStop(0, 'rgba(13, 148, 136, 0.08)');
      grad1.addColorStop(1, 'transparent');
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      const grad2 = ctx.createRadialGradient(
        width * 0.8,
        height * 0.35,
        0,
        width * 0.8,
        height * 0.35,
        width * 0.5
      );
      grad2.addColorStop(0, 'rgba(124, 58, 237, 0.07)');
      grad2.addColorStop(1, 'transparent');
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);

      const grad3 = ctx.createRadialGradient(
        width * 0.5,
        height * 0.85,
        0,
        width * 0.5,
        height * 0.85,
        width * 0.4
      );
      grad3.addColorStop(0, 'rgba(6, 182, 212, 0.05)');
      grad3.addColorStop(1, 'transparent');
      ctx.fillStyle = grad3;
      ctx.fillRect(0, 0, width, height);

      // Draw connection lines between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const alpha = (1 - dist / 120) * 0.15;
            ctx.strokeStyle = `rgba(20, 184, 166, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Update and draw floating particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Update and draw floating terms and math symbols
      ctx.font = '500 12px "JetBrains Mono", monospace';
      textParticles.forEach((tp) => {
        tp.x += tp.vx;
        tp.y += tp.vy;

        if (tp.x < -60) tp.x = width + 50;
        if (tp.x > width + 60) tp.x = -50;
        if (tp.y < -30) tp.y = height + 20;
        if (tp.y > height + 30) tp.y = -20;

        ctx.save();
        ctx.font = `600 ${tp.size}px "JetBrains Mono", monospace`;
        ctx.fillStyle = tp.color.replace(/[\d\.]+\)$/, `${tp.opacity})`);
        ctx.fillText(tp.text, tp.x, tp.y);
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-80"
    />
  );
};
