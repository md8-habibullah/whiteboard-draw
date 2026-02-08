import React, { useState, useEffect, useCallback, useRef } from "react";
import { Excalidraw } from "@excalidraw/excalidraw";
import "@excalidraw/excalidraw/index.css";
import Branding from "./Branding";
import Loading from "./Loading";

// --- Configuration ---
const STORAGE_KEY = "neurootix-whiteboard-data";
const SAVE_DEBOUNCE_MS = 500;

// --- Utility: Debounce Function (prevents excessive writes) ---
const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

const ExcalidrawBoard = () => {
  const [initialData, setInitialData] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const excalidrawAPIRef = useRef(null);

  // 1. Load Data from LocalStorage on Mount
  useEffect(() => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
      if (savedData) {
        const parsed = JSON.parse(savedData);
        setInitialData({
          elements: parsed.elements || [],
          appState: { ...parsed.appState, collaborators: [] },
          files: parsed.files || {},
        });
      }
    } catch (error) {
      console.error("Failed to load saved state:", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // 2. Persist Data (Auto-Save)
  // We use useCallback to create a stable function reference
  const handleChange = useCallback(
    debounce((elements, appState, files) => {
      try {
        const dataToSave = {
          elements,
          appState: {
            viewBackgroundColor: appState.viewBackgroundColor,
          },
          files,
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
      } catch (error) {
        console.error("Auto-save failed:", error);
      }
    }, SAVE_DEBOUNCE_MS),
    [],
  );

  if (!isLoaded) return <Loading />;

  return (
    <div className="h-screen w-screen relative overflow-hidden bg-[#121212]">
      {/* Wrapper ensures exact sizing */}
      <div className="absolute inset-0 z-0">
        <Excalidraw
          excalidrawAPI={(api) => (excalidrawAPIRef.current = api)}
          initialData={initialData}
          onChange={handleChange}
          theme="dark" // Sets default theme to dark
          UIOptions={{
            canvasActions: {
              loadScene: true,
              saveToActiveFile: true,
              toggleTheme: true,
              // FIX: We do NOT pass 'export: true' here to avoid the crash.
              // Excalidraw handles the default export behavior automatically.
            },
          }}
        />
      </div>

      <Branding />
    </div>
  );
};

export default ExcalidrawBoard;
