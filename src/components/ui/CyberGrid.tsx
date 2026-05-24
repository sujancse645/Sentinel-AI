"use client";

export function CyberGrid() {
  return (
    <div className="absolute inset-0 z-[-1] pointer-events-none overflow-hidden">
      {/* Base dark gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-blue/10 via-background to-background"></div>
      
      {/* Animated perspective grid */}
      <div 
        className="absolute w-[200%] h-[200%] top-0 left-[-50%] animate-mesh-move opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 245, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 245, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          transform: 'perspective(1000px) rotateX(60deg) translateY(-100px) translateZ(-200px)',
          transformOrigin: 'top center',
        }}
      ></div>
      
      {/* Scanline overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0)_50%,rgba(0,0,0,0.2)_50%)] bg-[length:100%_4px] pointer-events-none opacity-20 mix-blend-overlay"></div>
    </div>
  );
}
