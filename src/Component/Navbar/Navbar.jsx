import { useState } from "react";
import { Link , NavLink } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center relative">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <span className="text-xl font-bold text-gray-800">DesignHub</span>
      </div>

      
      { /* Navbar item  */}
          
      <ul className="hidden md:flex space-x-6  mb-2 md:mb-0 pl-240 font-medium">
        {/* <li className="hover:text-black cursor-pointer">Home</li>
        <li className="hover:text-black cursor-pointer">About</li>
        <li className="hover:text-black cursor-pointer">Contact</li> */}
       
       <NavLink to='/login'> <li className="hover:text-black cursor-pointer text-center md:text-left   mb-2 md:mb-0 ">Login</li> </NavLink>

       
      </ul>

    
      <div
        className="flex flex-col space-y-1 cursor-pointer "
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="block w-6 h-0.5 bg-black"></span>
        <span className="block w-6 h-0.5 bg-black"></span>
        <span className="block w-6 h-0.5 bg-black"></span>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className=" bg-gray-300 absolute top-16 right-0 w-50 h-screen  shadow-md p-6 space-y-4  text-gray-700 font-medium">
       <li> <NavLink to= '/home' className="hover:text-black hover:underline cursor-pointer">Home</NavLink> </li>
        <li> <NavLink to='/about' className=" hover:text-black hover:underline cursor-pointer">About</NavLink> </li>
        <li> <NavLink to='/contact' className="hover:text-black hover:underline cursor-pointer">Contact</NavLink> </li>
        <li> <NavLink  to='/Login' className="hover:text-black hover:underline cursor-pointer">Login</NavLink> </li>
        <li> <NavLink to='/profile'  className="hover:text-black hover:underline cursor-pointer">Profile</NavLink></li>
       <li>   <NavLink to='administration' className="hover:text-black hover:underline cursor-pointer">Administration-interface</NavLink> </li>
      <li> <NavLink  to='/canvas' className="hover:text-black hover:underline cursor-pointer">Canvas</NavLink> </li>
      <li> <NavLink  to='/chatbot' className="hover:text-black hover:underline cursor-pointer">Chatbot-interface</NavLink> </li>
      <li> <NavLink  to='/feature' className="hover:text-black hover:underline cursor-pointer">Feature</NavLink> </li>
      <li> <NavLink  to='/finance' className="hover:text-black hover:underline cursor-pointer">Finance</NavLink></li>
      <li> <NavLink to='/setting'  className="hover:text-black hover:underline cursor-pointer">Setting</NavLink> </li>
        
      
        
        
        
        
        </ul>
      )}
    </nav>
  );
}
