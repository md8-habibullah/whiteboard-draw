import React from "react";

const Branding = () => {
  return (
    <div className="absolute bottom-3 right-3 z-50 pointer-events-auto">
      <div className="flex items-center gap-2 px-3 py-2 bg-white/5 dark:bg-black/20 backdrop-blur-md border border-neutral-200/20 dark:border-neutral-800/50 rounded-lg shadow-sm transition-all hover:shadow-md hover:bg-white/10 dark:hover:bg-black/40">
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-medium">
          Drafted by
        </span>
        <a
          href="https://habibullah.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-bold text-neutral-800 dark:text-neutral-200 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-mono"
        >
          HABIBULLAH
        </a>
      </div>
    </div>
  );
};

export default Branding;
