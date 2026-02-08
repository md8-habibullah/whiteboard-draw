import React from "react";

const Branding = () => {
  return (
    <div
      style={{
        position: "absolute",
        bottom: "1rem",
        right: "1rem",
        zIndex: 50,
        pointerEvents: "auto",
        fontFamily: "'Courier New', Courier, monospace",
      }}
    >
      <div className="group relative">
        {/* Glow Effect */}
        <div className="absolute -inset-1 bg-green-500 rounded-lg opacity-20 blur group-hover:opacity-40 transition duration-1000"></div>

        <div className="relative bg-black/80 border border-green-800/50 rounded-lg px-4 py-2 backdrop-blur-md shadow-2xl flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-gray-400 text-xs tracking-widest uppercase">
            System Crafted By
          </span>
          <a
            href="https://habibullah.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-500 font-bold text-sm tracking-tighter hover:text-green-400 hover:underline decoration-green-500/50 underline-offset-4 transition-colors"
          >
            HABIBULLAH<span className="animate-pulse">_</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Branding;
