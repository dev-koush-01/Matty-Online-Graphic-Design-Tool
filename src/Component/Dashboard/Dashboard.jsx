import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HistorySection from "../HistorySection/HistorySection";
import DOMPurify from "dompurify";
import axios from "axios";
import toast from "react-hot-toast";

export default function App() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("User");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.name) setUsername(user.name);

    const fetchProjects = async () => {
      try {
        const { data } = await axios.get("http://localhost:4001/api/projects/user", {
          withCredentials: true,
        });
        setProjects(data.projects || []);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch projects");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const safeUsername = DOMPurify.sanitize(username);

  return (
    <div className="p-6">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>

      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-4xl mb-8 border border-gray-200 animate-slideUp">
        <h1 className="text-2xl font-bold mb-2 text-black">
          {getGreeting()},{" "}
          <span className="text-gray-600">{safeUsername}</span>!
        </h1>
        <p className="text-gray-500">
          Here’s an overview of your recent activity and updates.
        </p>
      </div>

      <button
        onClick={() => navigate("/editor")}
        className="mt-4 px-6 py-2 rounded-full border border-white bg-black text-white font-medium hover:bg-white hover:text-black transition-all duration-200 shadow-sm hover:shadow-lg"
      >
        + Add New Project
      </button>

      {loading ? (
        <p className="mt-4 text-gray-500">Loading projects...</p>
      ) : projects.length === 0 ? (
        <p className="mt-4 text-gray-500">No projects created yet.</p>
      ) : (
        <HistorySection
          projects={projects}
          onProjectClick={(project) =>
            navigate(`/editor/${project._id}`)
          }
        />
      )}
    </div>
  );
}

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 18) return "Good Afternoon";
  return "Good Evening";
}
