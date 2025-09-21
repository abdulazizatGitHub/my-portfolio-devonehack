// src/components/overlays/MatrixRain.tsx
'use client';

import React, { useEffect } from 'react';

interface MatrixRainProps {
  isActive: boolean;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
}

export const MatrixRain: React.FC<MatrixRainProps> = ({ isActive, canvasRef }) => {
  useEffect(() => {
    if (!isActive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const columns = Math.floor(width / 20);
    const drops = Array(columns).fill(0);

    const draw = () => {
      if (!ctx) return;

      // Semi-transparent black background for trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = '#0F0'; // green characters
      ctx.font = '16px monospace';

      for (let i = 0; i < drops.length; i++) {
        const text = Math.random() > 0.5 ? '1' : '0';
        ctx.fillText(text, i * 20, drops[i] * 20);

        drops[i]++;
        if (drops[i] * 20 > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    // Handle window resize
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isActive, canvasRef]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-40 pointer-events-none">
      <canvas ref={canvasRef} className="w-full h-full opacity-80" />

      {/* Overlay text and effects */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-50 pointer-events-none">
        <div className="text-green-400 font-mono text-lg mb-4 animate-pulse text-glow">
          NEURAL MATRIX ACTIVATED
        </div>
        <div className="text-green-300 font-mono text-sm mb-2">
          Entering the neural reality...
        </div>
        <div className="text-green-200 font-mono text-xs">
          🔴 Follow the white rabbit
        </div>

        {/* Matrix-style loading bar */}
        <div className="mt-6 w-64 h-2 bg-black/50 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-green-600 to-green-400 rounded-full animate-pulse"></div>
        </div>

        {/* Floating symbols */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-green-400 font-mono text-xs animate-bounce opacity-60"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            >
              {Math.random() > 0.5 ? '1' : '0'}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
