import React, { useState, useEffect, useCallback } from "react";
import { Excalidraw } from "@excalidraw/excalidraw";
import "@excalidraw/excalidraw/index.css";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const initialScene = {
  elements: [],
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
  }
};

const ExcalidrawEditor = ({ defaultTheme = "light" }) => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [theme, setTheme] = useState(defaultTheme);
  const [excalidrawAPI, setExcalidrawAPI] = useState(null);
  const [sceneData, setSceneData] = useState(initialScene);
  const [projectName, setProjectName] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [isExistingProject, setIsExistingProject] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const toggleTheme = () => setTheme(prev => (prev === "light" ? "dark" : "light"));

  // Memoized scene update handler
  const handleSceneChange = useCallback((elements, appState) => {
    setSceneData(prev => {
      // Only update if there are actual changes
      if (JSON.stringify(prev.elements) !== JSON.stringify(elements) ||
          JSON.stringify(prev.appState) !== JSON.stringify(appState)) {
        return { elements, appState };
      }
      return prev;
    });
  }, []);

  useEffect(() => {
    if (!projectId) {
      setIsLoading(false);
      return;
    }

    const fetchProject = async () => {
      try {
        const { data } = await axios.get(`http://localhost:4001/api/projects/${projectId}`, {
          withCredentials: true,
        });
        if (data.project) {
          setSceneData({
            elements: data.project.elements || initialScene.elements,
            appState: data.project.appState || initialScene.appState
          });
          setProjectName(data.project.name || "");
          setIsExistingProject(true);
        }
      } catch (err) {
        toast.error("Failed to load project");
        navigate("/editor");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProject();
  }, [projectId, navigate]);

  const saveProject = async () => {
    if (!projectName.trim()) {
      toast.error("Please enter project name!");
      return;
    }

    try {
      const elements = excalidrawAPI?.getSceneElements() || sceneData.elements;
      const appState = excalidrawAPI?.getAppState() || sceneData.appState;
      
      let thumbnail = "";
      const canvas = document.querySelector("canvas");
      if (canvas) thumbnail = canvas.toDataURL("image/png");

      const projectData = {
        name: projectName,
        elements,
        appState,
        thumbnail
      };

      if (isExistingProject && projectId) {
        await axios.put(
          `http://localhost:4001/api/projects/${projectId}`,
          projectData,
          { withCredentials: true }
        );
        toast.success("Project updated successfully!");
      } else {
        const { data } = await axios.post(
          "http://localhost:4001/api/projects/create",
          projectData,
          { withCredentials: true }
        );
        setIsExistingProject(true);
        navigate(`/editor/${data.project._id}`);
        toast.success("Project created successfully!");
      }
      setShowPopup(false);
    } catch (error) {
      console.error("Save project error:", error);
      toast.error("Error saving project");
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div style={{ height: "100vh", width: "100vw", position: "relative" }}>
      <button
        onClick={() => setShowPopup(true)}
        style={{
          position: "absolute",
          top: 10,
          right: 150,
          zIndex: 1000,
          background: theme === "light" ? "black" : "white",
          color: theme === "light" ? "white" : "black",
          border: "none",
          padding: "8px 12px",
          borderRadius: "6px",
          cursor: "pointer"
        }}
      >
        Save Project
      </button>

      <button
        onClick={toggleTheme}
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          zIndex: 1000,
          background: theme === "light" ? "black" : "white",
          color: theme === "light" ? "white" : "black",
          border: "none",
          padding: "8px 12px",
          borderRadius: "6px",
          cursor: "pointer"
        }}
      >
        Toggle Theme
      </button>

      <Excalidraw
        ref={(api) => setExcalidrawAPI(api)}
        initialData={sceneData}
        theme={theme}
        UIOptions={{ canvasActions: { loadScene: false, saveAsImage: true } }}
        onChange={handleSceneChange}
      />

      {showPopup && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-black border-2 border-black p-5 rounded-xl z-[2000] w-[300px] text-center shadow-lg">
          <h2 className="mb-4 text-xl font-bold">Save Project</h2>
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="Project Name"
            className="w-full p-2 mb-4 rounded border border-gray-300"
            autoFocus
          />
          <div className="flex justify-center">
            <button
              onClick={saveProject}
              className="bg-black text-white px-4 py-2 mr-2 rounded hover:bg-gray-800 transition"
            >
              {isExistingProject ? "Update" : "Create"}
            </button>
            <button
              onClick={() => setShowPopup(false)}
              className="bg-gray-200 text-black px-4 py-2 rounded hover:bg-gray-300 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExcalidrawEditor;