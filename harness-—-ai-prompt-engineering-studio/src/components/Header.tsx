import React from 'react';
import { HarnessLogo } from './HarnessLogo';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#050b14]/85 border-b border-teal-500/20 px-4 lg:px-8 py-3.5 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <HarnessLogo size="md" />

        {/* Clean status pill */}
        <div className="flex items-center gap-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
            <span className="font-semibold tracking-wider text-[11px] uppercase">
              Production Studio
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

