import React from 'react';
import { SceneId } from '../../types';

interface Background3DCanvasProps {
  activeScene: SceneId;
  scrollProgress: number;
}

export default function Background3DCanvas({ activeScene, scrollProgress }: Background3DCanvasProps) {
  // Pure professional solid background — all moving 3D objects, meshes, and particle loops removed
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#0b0f19] dark:bg-[#0b0f19]"
      aria-hidden="true"
    >
      {/* Subtle solid structural grid lines - static, non-moving */}
      <div 
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage: `linear-gradient(to right, #94a3b8 1px, transparent 1px), linear-gradient(to bottom, #94a3b8 1px, transparent 1px)`,
          backgroundSize: '48px 48px'
        }}
      />
    </div>
  );
}

