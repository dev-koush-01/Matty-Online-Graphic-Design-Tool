import React from "react";
import facebook from "../../assets/facebook.png";
import twitter from "../../assets/twitter.png";
import linkedin from "../../assets/linkedin.png";


export default function Footer() {
  return (
    <footer className="bg-gray-400 text-white py-4 px-8 mt-auto">
      <div className="flex flex-col md:flex-row justify-between items-center">
        
        {/* Left side */}
        <div className="text-center md:text-left mb-2 md:mb-0">
          <p>
            Contact Us:{" "}
            <a
              href="mailto:support@matty.com"
              className="text-blue-400 hover:underline"
            >
              support@matty.com
            </a>
          </p>
          <p className="mt-1">Follow Us:</p>
          <div className="flex justify-center md:justify-start space-x-4 mt-1 w-5">
            <img src={facebook} alt="facebook" />
            
          
           
            <img src={twitter} alt="twitter" />
          
            
             <img src={linkedin} alt="linkedin" />
            
          </div>
        </div>

        {/* Right side */}
        <div className="text-sm text-center md:text-right">
          © 2025 Matty. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}