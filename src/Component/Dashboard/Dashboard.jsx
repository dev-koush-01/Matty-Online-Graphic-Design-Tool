import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HistorySection from "../HistorySection/HistorySection";
import DOMPurify from "dompurify";

export default function App() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState(5);
    const [animateProjects, setAnimateProjects] = useState(false);
  const [animateTasks, setAnimateTasks] = useState(false);
    const username = "User";
  const [projects] = useState([
    { id: 1, name: "Summer Poster", thumbnail: "https://placehold.co/200x120?text=Poster+1" },
    { id: 2, name: "Instagram Story", thumbnail: "https://placehold.co/200x120?text=Story+1" },
    { id: 3, name: "Logo Design", thumbnail: "https://placehold.co/200x120?text=Logo" },
    { id: 4, name: "Business Card", thumbnail: "https://placehold.co/200x120?text=Card" },
    { id: 5, name: "YouTube Banner", thumbnail: "https://placehold.co/200x120?text=Banner" },
    { id: 6, name: "Pinterest Pin", thumbnail: "https://placehold.co/200x120?text=Pin" },
    { id: 7, name: "Flyer Design", thumbnail: "https://placehold.co/200x120?text=Flyer" },
    { id: 8, name: "Resume Template", thumbnail: "https://placehold.co/200x120?text=Resume" },
    { id: 9, name: "Brochure", thumbnail: "https://placehold.co/200x120?text=Brochure" },
    { id: 10, name: "Invitation Card", thumbnail: "https://placehold.co/200x120?text=Invite" },
    { id: 11, name: "Poster 2", thumbnail: "https://placehold.co/200x120?text=Poster+2" },
    { id: 12, name: "Mockup", thumbnail: "https://placehold.co/200x120?text=Mockup" },
    { id: 13, name: "Product Label", thumbnail: "https://placehold.co/200x120?text=Label" },
    { id: 14, name: "Book Cover", thumbnail: "https://placehold.co/200x120?text=Book" }
  ]);
    const getGreeting = () => {
      const hour = new Date().getHours();
      if (hour < 12) return "Good Morning";
      if (hour < 18) return "Good Afternoon";
      return "Good Evening";
    };
  
    
  
    const safeUsername = DOMPurify.sanitize(username);
  return (
    <div className="p-6">
      <div className="mb-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>
      {/* Add New Project Button */}
       <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-4xl mb-8 border border-gray-200 animate-slideUp">
          <h1 className="text-2xl font-bold mb-2 text-black">
            {getGreeting()},{" "}
            <span className="text-gray-600">{safeUsername}</span>!
          </h1>
          <p className="text-gray-500">
            Here’s an overview of your recent activity and updates.
          </p>
        </div>

      <button onClick={() => navigate("/editor")}
  className="mt-4 px-6 py-2 rounded-full border border-white bg-black text-white font-medium hover:bg-white hover:text-black transition-all duration-200 shadow-sm hover:shadow-lg"
>
  + Add New Project
</button>

      {/* History Section */}
      <HistorySection projects={projects} />
    </div>
  );
}