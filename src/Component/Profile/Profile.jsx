import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Modal from "react-modal";

Modal.setAppElement("#root");

function Profile() {
  const [user, setUser] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [editName, setEditName] = useState("");
  const [editPhoto, setEditPhoto] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setEditName(parsedUser.name);
      setEditPhoto(parsedUser.photo?.url || "https://via.placeholder.com/150");
    }
  }, []);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setEditPhoto(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    const updatedUser = {
      ...user,
      name: editName,
      photo: { url: editPhoto },
    };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setEditOpen(false);
  };

  if (!user) {
    return <p className="text-gray-500 text-center mt-10">Please log in first.</p>;
  }

  return (
    <div className="text-center mt-10">
      <div className="bg-gray-200 shadow-md rounded-lg p-6 w-full max-w-md mx-auto">
        <img
          src={user.photo?.url || "https://via.placeholder.com/150"}
          alt="profile"
          className="rounded-full w-40 h-40 object-cover mx-auto"
        />
        <h2 className="text-xl font-semibold mt-4">{user.name}</h2>
        <p className="text-gray-600">{user.email}</p>

        <div className="flex items-center justify-center space-x-4 mt-4">
          <button
            className="px-5 py-2 rounded-lg bg-gray-500 text-white hover:bg-black transition w-32 border"
            onClick={() => setEditOpen(true)}
          >
            Edit Profile
          </button>

          <NavLink to="/home">
            <button
              className="px-5 py-2 bg-gray-500 text-white rounded-lg hover:bg-black transition duration-200"
              onClick={() => {
                localStorage.removeItem("user");
                localStorage.removeItem("jwt");
                setUser(null);
              }}
            >
              Logout
            </button>
          </NavLink>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <Modal
        isOpen={editOpen}
        onRequestClose={() => setEditOpen(false)}
        contentLabel="Edit Profile"
        className="max-w-xl mx-auto mt-20 bg-white p-6 rounded-2xl shadow-2xl outline-none"
        overlayClassName="fixed inset-0 bg-black/50 flex justify-center items-start z-50"
      >
        <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>
        <div className="flex flex-col items-center space-y-4">
          <div className="relative w-32 h-32">
            <img
              src={editPhoto}
              alt="preview"
              className="rounded-full w-32 h-32 object-cover border-2 border-gray-300"
            />
            <label
              htmlFor="fileInput"
              className="absolute bottom-0 right-0 bg-gray-700 text-white rounded-full p-2 cursor-pointer hover:bg-black transition"
            >
              ✎
            </label>
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="hidden"
            />
          </div>

          <input
            type="text"
            className="border rounded p-2 w-full text-center"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
          />

          <div className="flex space-x-4 mt-4">
            <button
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              onClick={() => setEditOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Profile;