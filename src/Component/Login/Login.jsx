import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => setIsVisible(true), []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4001/api/users/login",
        formData,
        { withCredentials: true, headers: { "Content-Type": "application/json" } }
      );

      const userData = {
        name: data.user.name,
        email: data.user.email,
        photo: data.user.photo,
        token: data.token,
      };

      localStorage.setItem("jwt", data.token);
      localStorage.setItem("user", JSON.stringify(userData));

      toast.success(data.message || "Login successful");
      setFormData({ email: "", password: "" });
        // Check for admin email
    if (data.user.email === "admin@matty.com") {
      navigate("/administration"); // admin page
    } else {
      navigate("/dashboard"); // regular user page
    }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  // ✅ Google Sign-In handler
const handleGoogleSignup = async () => {
  const width = 500, height = 600;
  const left = window.screen.width / 2 - width / 2;
  const top = window.screen.height / 2 - height / 2;

   window.open(
    "http://localhost:4001/api/users/google",
    "Google Signup",
    `width=${width},height=${height},top=${top},left=${left}`
  );

  window.addEventListener("message", (event) => {
    if (event.origin !== "http://localhost:4001") return;
    const { token, user } = event.data;
    localStorage.setItem("jwt", token);
    localStorage.setItem("user", JSON.stringify(user));
    toast.success("Google login successful!");
    navigate("/administration");
  });
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
          <h2 className="text-2xl font-bold text-center mb-2 text-gray-800">Welcome Back</h2>
          <p className="text-sm text-gray-500 text-center mb-6">
            Login to continue where you left off.
          </p>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-gray-700">Email</label>
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
            <label className="block text-sm font-medium mb-1 text-gray-700">Password</label>
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

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition-all duration-300 transform hover:-translate-y-1 font-medium"
          >
            Login
          </button>

          {/* Google Signup */}
          <button
            type="button"
            onClick={handleGoogleSignup}
            className="w-full mt-3 border border-gray-300 py-2 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md active:scale-95"
          >
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              alt="Google"
              className="w-5 h-5 transition-transform duration-300 group-hover:rotate-6"
            />
            <span className="font-medium text-gray-700">Continue with Google</span>
          </button>

          

          {/* Links */}
          <div className="mt-4 text-sm text-center text-gray-500">
            <a href="#" className="hover:underline">Forgot Password?</a>
            <br />
            <Link to="/signup" className="hover:underline">Don’t have an account? Sign Up</Link>
          </div>
        </form>
      </main>
    </div>
  );
}
