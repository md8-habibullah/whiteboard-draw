import React from "react";

const Loading = () => (
  <div className="h-screen w-screen flex flex-col items-center justify-center bg-neutral-50 dark:bg-[#121212]">
    <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mb-4"></div>
    <span className="text-neutral-400 font-mono text-xs tracking-widest animate-pulse">
      INITIALIZING SECURE WORKSPACE...
    </span>
  </div>
);

export default Loading;
