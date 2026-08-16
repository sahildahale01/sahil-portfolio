import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailPosition, setTrailPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only run on desktop with mouse pointer
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      setPosition({ x: e.clientX, y: e.clientY });

      // Check if target is clickable
      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable = 
          target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.tagName === 'INPUT' ||
          target.closest('button') !== null ||
          target.closest('a') !== null ||
          target.getAttribute('role') === 'button' ||
          target.classList.contains('cursor-pointer');

        setIsPointer(isClickable);
      }
    };

    const handleMouseDown = () => setIsHovered(true);
    const handleMouseUp = () => setIsHovered(false);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  // Smooth lerp for trailing ring
  useEffect(() => {
    let animationFrameId: number;

    const lerpTrail = () => {
      setTrailPosition(prev => ({
        x: prev.x + (position.x - prev.x) * 0.18,
        y: prev.y + (position.y - prev.y) * 0.18
      }));
      animationFrameId = requestAnimationFrame(lerpTrail);
    };

    animationFrameId = requestAnimationFrame(lerpTrail);
    return () => cancelAnimationFrame(animationFrameId);
  }, [position]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Central crisp dot */}
      <div
        className={`fixed top-0 left-0 h-2 w-2 rounded-full bg-red-500 transition-transform duration-75 ease-out shadow-[0_0_8px_rgba(59,130,246,0.8)] ${
          isHovered ? 'scale-150 bg-red-400' : isPointer ? 'scale-125 bg-red-400' : 'scale-100'
        }`}
        style={{
          transform: `translate3d(${position.x - 4}px, ${position.y - 4}px, 0)`
        }}
      />

      {/* Trailing glass ring */}
      <div
        className={`fixed top-0 left-0 rounded-full border border-red-500/40 bg-red-500/5 transition-all duration-300 ${
          isPointer
            ? 'h-12 w-12 border-red-500/60 bg-red-500/10 scale-110 shadow-[0_0_15px_rgba(59,130,246,0.4)]'
            : isHovered
            ? 'h-8 w-8 border-red-500/80 bg-red-500/20 scale-90'
            : 'h-9 w-9 scale-100'
        }`}
        style={{
          transform: `translate3d(${trailPosition.x - (isPointer ? 24 : 18)}px, ${
            trailPosition.y - (isPointer ? 24 : 18)
          }px, 0)`
        }}
      />
    </div>
  );
}
