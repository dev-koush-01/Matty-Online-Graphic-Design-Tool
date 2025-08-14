import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Try loading from localStorage first
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      // If not in localStorage, fetch from backend
      fetchUserFromBackend();
    }
  }, []);

  const fetchUserFromBackend = async () => {
    try {
      const token = localStorage.getItem("jwt");
      if (!token) return;

      const { data } = await axios.get("http://localhost:4001/api/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user)); // store for next time
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
    }
  };

  return (
    <div className="text-center">
      {user ? (
        <div className="bg-gray-200 shadow-md rounded-lg p-6 w-full h-full">
          <img
            src={user?.photo?.url || "https://via.placeholder.com/150"}
            alt="profile"
            className="rounded-full w-40 h-40 object-cover mx-auto"
          />
          <h2 className="text-xl font-semibold mt-4">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>

          <div className="flex items-center justify-center space-x-4 mt-4">
            <div className="px-5 py-2 rounded-lg bg-gray-500 text-white hover:bg-black transition w-32 border">
              Edit Profile
            </div>

            <NavLink to="/home">
              <button
                className="px-5 py-2 bg-gray-500 text-white rounded-lg hover:bg-black transition duration-200"
                onClick={() => {
                  localStorage.removeItem("user");
                  localStorage.removeItem("jwt");
                }}
              >
                Logout
              </button>
            </NavLink>
          </div>
        </div>
      ) : (
        <p className="text-gray-500">Please log in first.</p>
      )}
    </div>
  );
}

export default Profile;
