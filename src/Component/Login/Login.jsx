import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login data:", formData);
    // TODO: Call backend API for login
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
            Welcome Back
          </h2>
          <p className="text-sm text-gray-500 text-center mb-6">
            Login to continue where you left off.
          </p>

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
              placeholder="Enter your registered email"
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
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition-all duration-300 transform hover:-translate-y-1 font-medium"
          >
            Login
          </button>

          {/* Links */}
          <div className="mt-4 text-sm text-center text-gray-500">
            <a href="#" className="hover:underline">
              Forgot Password?
            </a>
            <br />
            <Link to="/signup" className="hover:underline">
              Don’t have an account? Sign Up
            </Link>
          </div>
        </form>
      </main>
    </div>
  );
}
