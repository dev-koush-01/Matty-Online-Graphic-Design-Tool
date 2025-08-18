import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const isLoggedIn = localStorage.getItem("jwt");

  return (
    <nav className="bg-white shadow-md w-full px-8 py-4 flex justify-between items-center relative z-50">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <span className="text-xl font-bold text-gray-800">Matty</span>
      </div>

      {/* Hamburger menu button - ALWAYS VISIBLE ON ALL SCREENS */}
      <div
        className="flex flex-col space-y-1 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="block w-6 h-0.5 bg-black"></span>
        <span className="block w-6 h-0.5 bg-black"></span>
        <span className="block w-6 h-0.5 bg-black"></span>
      </div>

      {/* Mobile/Desktop Menu (now serves as the main navigation for all screens) */}
      {isOpen && (
        <ul className="bg-gray-300 absolute top-full right-0 w-64 shadow-md p-6 space-y-4 text-gray-700 font-medium">
          {/* Always visible links */}
          <li>
            <NavLink 
              to='/home' 
              className="hover:text-black hover:underline cursor-pointer block"
              onClick={() => setIsOpen(false)}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink 
              to='/about' 
              className="hover:text-black hover:underline cursor-pointer block"
              onClick={() => setIsOpen(false)}
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink 
              to='/contact' 
              className="hover:text-black hover:underline cursor-pointer block"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </NavLink>
          </li>

          {/* Conditional rendering based on login status */}
          {isLoggedIn ? (
            <>
              <li>
                <NavLink 
                  to='/dashboard' 
                  className="hover:text-black hover:underline cursor-pointer block"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to='/profile' 
                  className="hover:text-black hover:underline cursor-pointer block"
                  onClick={() => setIsOpen(false)}
                >
                  Profile
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to='/canvas' 
                  className="hover:text-black hover:underline cursor-pointer block"
                  onClick={() => setIsOpen(false)}
                >
                  Canvas
                </NavLink>
              </li>
              
              <li>
                <NavLink 
                  to='/feedback' 
                  className="hover:text-black hover:underline cursor-pointer block"
                  onClick={() => setIsOpen(false)}
                >
                  Feedback
                </NavLink>
              </li>
              <li className="pt-4">
                <NavLink to="/home">
                  <button
                    className="border rounded-2xl flex items-center justify-center hover:bg-gray-400 w-full py-2"
                    onClick={() => {
                      localStorage.removeItem("user");
                      localStorage.removeItem("jwt");
                      setIsOpen(false);
                    }}
                  >
                    Logout
                  </button>
                </NavLink>
              </li>
            </>
          ) : (
            <li>
              <NavLink 
                to='/login' 
                className="hover:text-black hover:underline cursor-pointer block"
                onClick={() => setIsOpen(false)}
              >
                Login
              </NavLink>
            </li>
          )}
        </ul>
      )}
    </nav>
  );
}