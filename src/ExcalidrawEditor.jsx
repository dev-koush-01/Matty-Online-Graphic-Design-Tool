import React, { useState } from "react";
import { Excalidraw } from "@excalidraw/excalidraw";
import "@excalidraw/excalidraw/index.css";

const initialScene = {
  elements: [
    {
      id: "rect-1",
      type: "rectangle",
      x: 100,
      y: 100,
      width: 200,
      height: 100,
      angle: 0,
      strokeColor: "#000000",
      backgroundColor: "transparent",
      fillStyle: "hachure",
      strokeWidth: 1,
      strokeStyle: "solid",
      roughness: 1,
      opacity: 100,
      groupIds: [],
      seed: 12345,
      version: 1,
      versionNonce: 123456,
      isDeleted: false,
      boundElements: null
    },
    {
      id: "text-1",
      type: "text",
      x: 150,
      y: 250,
      width: 210,
      height: 25,
      angle: 0,
      strokeColor: "#000000",
      backgroundColor: "transparent",
      fillStyle: "solid",
      strokeWidth: 1,
      strokeStyle: "solid",
      roughness: 0,
      opacity: 100,
      groupIds: [],
      seed: 67890,
      version: 1,
      versionNonce: 654321,
      isDeleted: false,
      boundElements: null,
      text: "Hello Matty!",
      fontSize: 20,
      fontFamily: 1,
      textAlign: "left",
      verticalAlign: "top",
      baseline: 20
    }
  ],
  appState: {
    viewBackgroundColor: "#ffffff",
    currentItemStrokeColor: "#000000",
    currentItemBackgroundColor: "transparent",
    currentItemFillStyle: "hachure",
    currentItemStrokeWidth: 1,
    currentItemRoughness: 1,
    currentItemOpacity: 100,
    zoom: { value: 1 },
    scrollX: 0,
    scrollY: 0
  },
  scrollToContent: true
};

const ExcalidrawEditor = ({ defaultTheme = "light" }) => {
  const [theme, setTheme] = useState(defaultTheme);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div style={{ height: "100vh", width: "100vw", position: "relative" }}>
      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          zIndex: 1000,
          background: "#007bff",
          color: "white",
          border: "none",
          padding: "8px 12px",
          borderRadius: "6px",
          cursor: "pointer"
        }}
      >
        Toggle Theme
      </button>

      <Excalidraw
        initialData={initialScene}
        theme={theme}
        UIOptions={{ canvasActions: { loadScene: false, saveAsImage: true } }}
      />
    </div>
  );
};

export default ExcalidrawEditor;