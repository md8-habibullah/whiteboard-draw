import React from "react";
import ExcalidrawBoard from "./components/ExcalidrawBoard";

function App() {
  return (
    // "dark" class added to support Tailwind dark mode if configured
    <div className="dark antialiased">
      <ExcalidrawBoard />
    </div>
  );
}

export default App;
