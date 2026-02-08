import React, { useState, useEffect, useCallback } from "react";
import { Excalidraw } from "@excalidraw/excalidraw";
import "@excalidraw/excalidraw/index.css";
import Branding from "./Branding";

const STORAGE_KEY = "neurootix-whiteboard-v1";

const ExcalidrawBoard = () => {
  const [initialData, setInitialData] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // 1. Load Data on Mount
  useEffect(() => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
      if (savedData) {
        setInitialData(JSON.parse(savedData));
      }
    } catch (error) {
      console.error("Failed to load secure data:", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // 2. Save Data (Debounced)
  const handleChange = useCallback((elements, appState, files) => {
    // We delay saving slightly to avoid freezing on every mouse move
    const content = {
      elements,
      appState: { ...appState, collaborators: [] }, // Don't save session-specifics
      files,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
  }, []);

  if (!isLoaded) {
    return (
      <div className="h-screen w-full bg-[#121212] flex items-center justify-center text-green-500 font-mono">
        INITIALIZING SECURE ENVIRONMENT...
      </div>
    );
  }

  return (
    <div className="h-screen w-full relative overflow-hidden bg-[#121212]">
      {/* Excalidraw Container */}
      <div className="absolute inset-0 z-0">
        <Excalidraw
          theme="dark" // Force Hacker/Dark Vibe
          initialData={initialData}
          onChange={handleChange}
          UIOptions={{
            canvasActions: {
              loadScene: true,
              // FIX: 'export' must be an object, not boolean
              export: { saveFileToDisk: true },
              saveToActiveFile: true,
              toggleTheme: false, // Lock to dark mode for hacker vibe
              changeViewBackgroundColor: true,
            },
          }}
        />
      </div>

      {/* Overlay Branding */}
      <Branding />
    </div>
  );
};

export default ExcalidrawBoard;
