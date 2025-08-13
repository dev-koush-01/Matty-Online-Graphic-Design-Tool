import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    profileImage: null,
  });

  const [preview, setPreview] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profileImage") {
      const file = files[0];
      setFormData({ ...formData, profileImage: file });
      if (file) setPreview(URL.createObjectURL(file));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signup data:", formData);
    // TODO: Call backend API for signup
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white">
      <main className="flex justify-center items-center flex-1 px-4">
        <form
          onSubmit={handleSubmit}
          className={`bg-white p-8 rounded-2xl shadow-lg w-full max-w-md border border-gray-200 transform transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          } hover:shadow-2xl hover:scale-[1.02]`}
        >
          <h2 className="text-2xl font-bold text-center mb-2 text-gray-800">
            Join Our Community
          </h2>
          <p className="text-sm text-gray-500 text-center mb-6">
            Create your account to get started.
          </p>

          {/* Username */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-300"
              placeholder="Choose a username"
              required
            />
          </div>

          {/* Profile Image */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Profile Image
            </label>
            <div
              className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-pointer hover:border-gray-400 transition-all duration-300"
              onClick={() => document.getElementById("profileImage").click()}
            >
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-24 h-24 rounded-full object-cover mb-2 border transform transition-all duration-500"
                />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-gray-400 mb-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a1 1 0 001 1h14a1 1 0 001-1v-1m-4-4l-4-4m0 0l-4 4m4-4v12"
                  />
                </svg>
              )}
              <p className="text-sm text-gray-500">
                {preview ? "Change image" : "Click to upload"}
              </p>
            </div>
            <input
              id="profileImage"
              type="file"
              name="profileImage"
              accept="image/*"
              onChange={handleChange}
              className="hidden"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-300"
              placeholder="Enter a valid email address"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-300"
              placeholder="Create a strong password"
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition-all duration-300 transform hover:-translate-y-1 font-medium"
          >
            Sign Up
          </button>

          {/* Links */}
          <div className="mt-4 text-sm text-center text-gray-500">
            <Link to="/login" className="hover:underline">
              Already have an account? Login
            </Link>
          </div>
        </form>
      </main>
    </div>
  );
}
