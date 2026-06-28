'use client';

import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.cursor = 'none';

    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX - 12}px, ${e.clientY - 12}px, 0)`;
      }
    };

    const handleMouseLeave = () => {
      if (cursorRef.current) cursorRef.current.style.opacity = '0';
    };

    const handleMouseEnter = () => {
      if (cursorRef.current) cursorRef.current.style.opacity = '1';
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.body.style.cursor = '';
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-6 h-6 rounded-full border-2 border-brand-pink pointer-events-none z-50 mix-blend-difference transition-opacity duration-300"
        style={{ willChange: 'transform' }}
      />
      <style jsx global>{`
        a, button, [role="button"], input, textarea, select {
          cursor: none !important;
        }
      `}</style>
    </>
  );
}
