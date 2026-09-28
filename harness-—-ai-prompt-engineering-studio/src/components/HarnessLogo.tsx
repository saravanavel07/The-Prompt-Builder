import React from 'react';

interface HarnessLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export const HarnessLogo: React.FC<HarnessLogoProps> = ({ size = 'md', showText = true }) => {
  const isSm = size === 'sm';
  const isLg = size === 'lg';

  const iconDim = isSm ? 'w-8 h-8' : isLg ? 'w-14 h-14' : 'w-10 h-10';

  return (
    <div className="flex items-center gap-3 select-none">
      {/* Laptop Silhouette SVG containing structured prompt terminal */}
      <div className={`relative ${iconDim} flex items-center justify-center flex-shrink-0 group`}>
        {/* Glow halo */}
        <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/25 via-cyan-400/20 to-violet-500/20 rounded-lg blur-md group-hover:blur-lg transition-all duration-300" />
        
        <svg
          viewBox="0 0 48 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full relative z-10 drop-shadow-[0_0_12px_rgba(20,184,166,0.5)]"
        >
          {/* Laptop Screen Body */}
          <rect
            x="4"
            y="4"
            width="40"
            height="26"
            rx="3"
            className="fill-[#06121e] stroke-teal-400/80"
            strokeWidth="1.6"
          />
          {/* Screen Glare reflection */}
          <path
            d="M5 5L36 5L20 29L5 29Z"
            fill="url(#screenGrad)"
            opacity="0.12"
          />
          {/* Structured Prompt Symbol Lines */}
          {/* > AI PROMPT_ text prompt caret */}
          <path
            d="M8 10L11 12L8 14"
            stroke="#2dd4bf"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <line
            x1="14"
            y1="12"
            x2="24"
            y2="12"
            stroke="#06b6d4"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <rect
            x="26"
            y="10"
            width="3"
            height="4"
            className="fill-teal-300 animate-pulse"
          />

          {/* Solid structured block ███████████ */}
          <rect
            x="8"
            y="17"
            width="32"
            height="3"
            rx="1"
            className="fill-teal-500/80"
          />

          {/* Structured { HARNESS } brace symbol */}
          <path
            d="M10 22C8.5 22 8 22.8 8 24C8 25.2 8.5 26 10 26"
            stroke="#a78bfa"
            strokeWidth="1.3"
            strokeLinecap="round"
          />
          <line
            x1="13"
            y1="24"
            x2="35"
            y2="24"
            stroke="#38bdf8"
            strokeWidth="1.3"
            strokeDasharray="2 1.5"
          />
          <path
            d="M38 22C39.5 22 40 22.8 40 24C40 25.2 39.5 26 38 26"
            stroke="#a78bfa"
            strokeWidth="1.3"
            strokeLinecap="round"
          />

          {/* Laptop Hinge & Base Trapeze */}
          {/* ╲     ╱ */}
          {/*  ╲___╱ */}
          <path
            d="M12 30L6 38H42L36 30"
            className="fill-[#081827] stroke-cyan-500/70"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          {/* Laptop Base Opening Notch */}
          <line
            x1="20"
            y1="38"
            x2="28"
            y2="38"
            stroke="#f59e0b"
            strokeWidth="1.6"
            strokeLinecap="round"
          />

          {/* Definitions */}
          <defs>
            <linearGradient id="screenGrad" x1="0" y1="0" x2="48" y2="40" gradientUnits="userSpaceOnUse">
              <stop stopColor="#14b8a6" />
              <stop offset="1" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="font-extrabold tracking-wider text-xl bg-gradient-to-r from-teal-300 via-cyan-200 to-violet-300 bg-clip-text text-transparent font-['Plus_Jakarta_Sans']">
              THE PROMPTBUILDER
            </span>
            <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-teal-500/10 border border-teal-500/30 text-teal-300 tracking-widest font-semibold">
              v1.0
            </span>
          </div>
          <span className="text-[10.5px] uppercase tracking-widest font-mono text-slate-400 -mt-0.5">
            AI Prompt Engineering Studio
          </span>
        </div>
      )}
    </div>
  );
};
