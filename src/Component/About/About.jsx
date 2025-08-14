import React from "react";
import "../../animations.css";

const About = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-grow flex justify-center items-center px-4 py-12">
        <div
          className="bg-white p-10 rounded-2xl shadow-lg max-w-3xl w-full border border-gray-200 
                     transform transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl 
                     animate-slideUpFade"
        >
          {/* Title */}
          <h2 className="text-4xl font-extrabold mb-4 text-gray-900 text-center animate-fadeIn">
            About <span className="text-gray-500">Matty</span>
          </h2>
          <p className="text-gray-600 leading-relaxed mb-8 text-center animate-fadeIn delay-100">
            Matty is an innovative online platform designed to make your
            project management experience smooth and collaborative. Whether you
            are working solo or in a team, Matty provides tools for planning,
            tracking, and executing projects efficiently.
          </p>

          {/* Mission */}
          <div className="mb-8 animate-fadeIn delay-200">
            <h3 className="text-2xl font-semibold mb-3 text-gray-900">
              Our Mission
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Our mission is to simplify the way people collaborate on creative
              and technical projects by providing a clean, user-friendly, and
              feature-rich environment.
            </p>
          </div>

          {/* Why Choose Us */}
          <div className="animate-fadeIn delay-300">
            <h3 className="text-2xl font-semibold mb-4 text-gray-900">
              Why Choose Us?
            </h3>
            <ul className="space-y-3">
              {[
                "Simple and intuitive interface",
                "Seamless real-time collaboration",
                "Secure and reliable infrastructure",
                "Customizable tools to fit your workflow",
              ].map((item, index) => (
                <li
  key={index}
  className={`flex items-start space-x-3 text-gray-700 fade-in-up`}
  style={{ animationDelay: `${0.4 + index * 0.15}s` }}
>

                  {/* Inline Check Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-900 flex-shrink-0 mt-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;