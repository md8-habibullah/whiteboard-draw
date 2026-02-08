import ExcalidrawBoard from "./components/ExcalidrawBoard";

function App() {
  return (
    // Ensure the background matches the dark theme to prevent white flashes
    <div style={{ width: "100vw", height: "100vh", background: "#121212" }}>
      <ExcalidrawBoard />
    </div>
  );
}

export default App;
