import React, { useState, useEffect, useCallback, useRef } from "react";
import { Excalidraw, WelcomeScreen } from "@excalidraw/excalidraw";
import "@excalidraw/excalidraw/index.css";
import Branding from "./Branding";

// --- Configuration ---
const STORAGE_KEY = "neurootix-whiteboard-data";
const SAVE_DEBOUNCE_MS = 500;

// --- Utility: Debounce Function ---
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

  // 1. Load Data
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

  // 2. Auto-Save
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

  if (!isLoaded) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-neutral-950 text-emerald-500 font-mono">
        LOADING SYSTEM...
      </div>
    );
  }

  return (
    <div className="h-screen w-screen relative overflow-hidden bg-[#121212]">
      {/* Excalidraw Container */}
      <div className="absolute inset-0 z-0 custom-excalidraw-styles">
        <Excalidraw
          excalidrawAPI={(api) => (excalidrawAPIRef.current = api)}
          initialData={initialData}
          onChange={handleChange}
          theme="dark"
          UIOptions={{
            canvasActions: {
              loadScene: true,
              saveToActiveFile: true,
              toggleTheme: true,
              export: { saveFileToDisk: true },
            },
          }}
        >
          {/* Native Welcome Screen (Only shows when canvas is empty) */}
          <WelcomeScreen>
            <WelcomeScreen.Hints.MenuHint />
            <WelcomeScreen.Hints.ToolbarHint />
            <WelcomeScreen.Center>
              <WelcomeScreen.Center.Heading>
                Start Your Diagram
              </WelcomeScreen.Center.Heading>
              <WelcomeScreen.Center.Menu>
                <WelcomeScreen.Center.MenuItemLoadScene />
                <WelcomeScreen.Center.MenuItemHelp />
              </WelcomeScreen.Center.Menu>
            </WelcomeScreen.Center>
          </WelcomeScreen>
        </Excalidraw>
      </div>

      <Branding />
    </div>
  );
};

export default ExcalidrawBoard;
