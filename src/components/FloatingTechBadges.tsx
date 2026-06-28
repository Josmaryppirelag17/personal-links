import { useEffect, useMemo, useRef } from 'react';
import { Technology } from '../types';
import { SUPPORTED_TECHS } from '../data/cyberData';

interface FloatingTechBadgesProps {
  activeTechIds: string[];
}

interface PhysicsBadge {
  tech: Technology;
  curX: number;
  curY: number;
  targetX: number;
  targetY: number;
  vx: number;
  vy: number;
  angle: number; // base orbit angle
  orbitRadius: number;
  element: HTMLDivElement | null;
}

export default function FloatingTechBadges({ activeTechIds }: FloatingTechBadgesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<PhysicsBadge[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });

  // Filter tech specs
  const activeTechs = useMemo(
    () => SUPPORTED_TECHS.filter((t) => activeTechIds.includes(t.id)),
    [activeTechIds],
  );

  // Handle cursor tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY, active: true };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Initialize and select random positions for the badges across the screen
  useEffect(() => {
    const width = window.innerWidth || 1200;
    const height = window.innerHeight || 800;

    const badges: PhysicsBadge[] = activeTechs.map((tech) => {
      // Scatter random initial positions completely across the visible area
      const margin = 120;
      const rx = margin + Math.random() * (width - margin * 2);
      const ry = margin + Math.random() * (height - margin * 2);

      // Random starting momentum vectors for continuous slow drifts
      const speed = 0.6 + Math.random() * 0.9; 
      const startAngle = Math.random() * Math.PI * 2;
      const vx = Math.cos(startAngle) * speed;
      const vy = Math.sin(startAngle) * speed;

      return {
        tech,
        curX: rx,
        curY: ry,
        targetX: rx,
        targetY: ry,
        vx,
        vy,
        angle: startAngle,
        orbitRadius: 0,
        element: null
      };
    });

    badgesRef.current = badges;
  }, [activeTechs]); 

  // Run Physics Loop
  useEffect(() => {
    let animId: number;
    let baseTime = 0;

    const loop = () => {
      baseTime += 0.005; // Standard continuous float speed
      const width = window.innerWidth;
      const height = window.innerHeight;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const mouseActive = mouseRef.current.active;

      badgesRef.current.forEach((badge, idx) => {
        // Dynamic binding check - ALWAYS query fallback to avoid null ref callback issues
        if (!badge.element && containerRef.current) {
          badge.element = containerRef.current.querySelector(`#tech-badge-${badge.tech.id}`) as HTMLDivElement | null;
        }
        if (!badge.element) return;

        // 1. Repel forces from Cursor
        let repelForceX = 0;
        let repelForceY = 0;
        let hoverRatio = 0;

        const dx = badge.curX - mx;
        const dy = badge.curY - my;
        const distSq = dx * dx + dy * dy;
        const dist = Math.sqrt(distSq);

        if (mouseActive) {
          const repelRadius = 180; // expanded sphere of repulsion influence
          if (dist < repelRadius && dist > 1) {
            // Stronger push the closer the mouse is with exponential decay
            const strength = Math.pow(1 - dist / repelRadius, 1.5) * 5.0;
            repelForceX = (dx / dist) * strength;
            repelForceY = (dy / dist) * strength;
            hoverRatio = 1 - (dist / repelRadius);
          }
        }

        // Apply mouse repel forces directly to velocities
        badge.vx += repelForceX;
        badge.vy += repelForceY;

        // Add a gentle noise/wander force so they weave organically and never get completely uniform
        const wanderAngle = baseTime * 1.2 + idx * 3.7;
        const wanderStrength = 0.03;
        badge.vx += Math.cos(wanderAngle) * wanderStrength;
        badge.vy += Math.sin(wanderAngle) * wanderStrength;

        // Speed limiting & Damping to keep movement slow, majestic, and continuous
        const speed = Math.sqrt(badge.vx * badge.vx + badge.vy * badge.vy);
        const minSpeed = 0.5;
        const maxSpeed = 3.5; // Allow fast speed briefly when repelled

        if (speed > maxSpeed) {
          badge.vx = (badge.vx / speed) * maxSpeed;
          badge.vy = (badge.vy / speed) * maxSpeed;
        } else if (speed < minSpeed && speed > 0.01) {
          badge.vx = (badge.vx / speed) * minSpeed;
          badge.vy = (badge.vy / speed) * minSpeed;
        }

        // Apply light general drag so extreme boosts from mouse repel decay gracefully
        badge.vx *= 0.98;
        badge.vy *= 0.98;

        // 3. Apply position updates
        badge.curX += badge.vx;
        badge.curY += badge.vy;

        // 4. Viewport boundaries protection (Bounce off borders with vector inversion)
        const margin = 45;
        if (badge.curX < margin) {
          badge.curX = margin;
          badge.vx = Math.abs(badge.vx) * 0.8; // bounce back with gentle energy loss
        } else if (badge.curX > width - margin) {
          badge.curX = width - margin;
          badge.vx = -Math.abs(badge.vx) * 0.8;
        }

        if (badge.curY < margin) {
          badge.curY = margin;
          badge.vy = Math.abs(badge.vy) * 0.8;
        } else if (badge.curY > height - margin) {
          badge.curY = height - margin;
          badge.vy = -Math.abs(badge.vy) * 0.8;
        }

        // 5. Update direct DOM properties
        const scale = 0.85 + (hoverRatio * 0.25);
        badge.element.style.transform = `translate3d(${badge.curX - 44}px, ${badge.curY - 44}px, 0) scale(${scale})`;

        // Dynamic reactive color glowing frames based on math calculations
        const borderGlow = badge.element.firstElementChild as HTMLElement;
        if (borderGlow) {
          if (hoverRatio > 0.05) {
            borderGlow.style.borderColor = '#fd1eb1';
            borderGlow.style.boxShadow = `0 0 ${12 + hoverRatio * 24}px rgba(253, 30, 177, ${0.2 + hoverRatio * 0.4})`;
          } else {
            borderGlow.style.borderColor = 'rgba(24, 190, 199, 0.15)';
            borderGlow.style.boxShadow = 'none';
          }
        }
      });

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden z-0"
      id="neon-physics-aquarium"
    >
      {activeTechs.map((tech) => (
        <div
          key={tech.id}
          ref={(el) => {
            if (el) {
              const b = badgesRef.current.find((item) => item.tech.id === tech.id);
              if (b) b.element = el;
            }
          }}
          className="absolute left-0 top-0 w-22 h-22 select-none pointer-events-none transition-shadow duration-300"
          style={{ willChange: 'transform' }}
          id={`tech-badge-${tech.id}`}
        >
          {/* Cybernetic Badge Construction */}
          <div className="relative w-full h-full flex flex-col items-center justify-center p-2 rounded-none border border-dashed border-brand-cyan/20 bg-brand-bg/80 backdrop-blur-md transition-all duration-300">

            {/* Hexagon Outline Accent Frame */}
            <div className="absolute inset-0.5 border border-brand-cyan/40 rounded-none pointer-events-none group-hover:border-brand-pink/70 transition-colors duration-300" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-brand-cyan group-hover:bg-brand-pink transition-colors duration-300" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-brand-cyan group-hover:bg-brand-pink transition-colors duration-300" />

            {/* SVG Vector Path */}
            <svg
              viewBox="0 0 24 24"
              className="w-8 h-8 transition-all duration-500 group-hover:rotate-[360deg]"
              style={{ fill: tech.color }}
            >
              <path d={tech.svgPath} />
            </svg>

            {/* Glowing Tag Title */}
            <span
              className="mt-1 text-[9px] font-mono font-bold tracking-widest uppercase transition-colors duration-300"
              style={{ color: tech.color }}
            >
              {tech.name}
            </span>

            {/* Hover Glitch Corner lines */}
            <span className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-brand-pink opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-brand-cyan opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </div>
      ))}
    </div>
  );
}
