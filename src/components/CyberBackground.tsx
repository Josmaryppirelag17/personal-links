import { useEffect, useRef } from 'react';

export default function CyberBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Track state on resize
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Track mouse coordinates with interpolation (tweening/easing)
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Particles/Cyber Circuits array
    const nodes: Array<{ x: number; y: number; vx: number; vy: number; r: number; color: string }> = [];
    const nodeCount = Math.min(60, Math.floor((width * height) / 25000));

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 2 + 1,
        color: Math.random() > 0.5 ? '#fd1eb1' : '#18bec7',
      });
    }

    let globalFrame = 0;

    const draw = () => {
      globalFrame++;
      // Smooth mouse tracking
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Dark futuristic background base (deep High Density space-blue)
      ctx.fillStyle = '#111232';
      ctx.fillRect(0, 0, width, height);

      // Render glowing ambient radial backing centered on viewport center
      const bgGrad = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, Math.max(width, height) * 0.7);
      bgGrad.addColorStop(0, '#1a1b3a');
      bgGrad.addColorStop(1, '#111232');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Hover glow spot around coordinates
      const cursorGlow = ctx.createRadialGradient(mx, my, 5, mx, my, 250);
      cursorGlow.addColorStop(0, 'rgba(24, 190, 199, 0.12)');
      cursorGlow.addColorStop(1, 'rgba(17, 18, 50, 0)');
      ctx.fillStyle = cursorGlow;
      ctx.fillRect(0, 0, width, height);

      // Render Cyber Techno Grid (40x40 dense grid from Design)
      const gridSize = 40;
      ctx.strokeStyle = 'rgba(24, 190, 199, 0.05)';
      ctx.lineWidth = 1;

      // Vertical Grid Lines
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();

        // Extra glowing intersections near mouse
        const dx = Math.abs(x - mx);
        if (dx < 160) {
          ctx.strokeStyle = `rgba(253, 30, 177, ${0.12 * (1 - dx / 160)})`;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(x, Math.max(0, my - 80));
          ctx.lineTo(x, Math.min(height, my + 80));
          ctx.stroke();
          ctx.strokeStyle = 'rgba(24, 190, 199, 0.05)';
          ctx.lineWidth = 1;
        }
      }

      // Horizontal Grid Lines
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();

        // Highlight nearest mouse
        const dy = Math.abs(y - my);
        if (dy < 160) {
          ctx.strokeStyle = `rgba(24, 190, 199, ${0.12 * (1 - dy / 160)})`;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(Math.max(0, mx - 80), y);
          ctx.lineTo(Math.min(width, mx + 80), y);
          ctx.stroke();
          ctx.strokeStyle = 'rgba(24, 190, 199, 0.05)';
          ctx.lineWidth = 1;
        }
      }

      // Render Circuit Particles
      nodes.forEach((node) => {
        // slow wander
        node.x += node.vx;
        node.y += node.vy;

        // Bouncing logic
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        // Draw node dot
        ctx.fillStyle = node.color;
        ctx.shadowColor = node.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
        ctx.fill();

        // Draw magnetic connection line to mouse cursor
        const dMouseX = node.x - mx;
        const dMouseY = node.y - my;
        const dMouseDist = Math.sqrt(dMouseX * dMouseX + dMouseY * dMouseY);

        if (dMouseDist < 180) {
          const intensity = 1 - dMouseDist / 180;
          ctx.strokeStyle = node.color === '#fd1eb1'
            ? `rgba(253, 30, 177, ${intensity * 0.25})`
            : `rgba(24, 190, 199, ${intensity * 0.25})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(mx, my);
          ctx.stroke();
        }
      });

      // Reset shadows for layout
      ctx.shadowBlur = 0;

      // Horizontal cursor crosshair
      ctx.strokeStyle = 'rgba(255,0,127,0.06)';
      ctx.beginPath();
      ctx.moveTo(0, my);
      ctx.lineTo(width, my);
      ctx.stroke();

      ctx.strokeStyle = 'rgba(0,240,255,0.06)';
      ctx.beginPath();
      ctx.moveTo(mx, 0);
      ctx.lineTo(mx, height);
      ctx.stroke();

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      id="cyberpunk-interactive-hud"
    />
  );
}
