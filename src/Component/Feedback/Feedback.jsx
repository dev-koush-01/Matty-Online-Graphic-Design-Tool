import React, { useState } from "react";

const FeedbackForm = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comments, setComments] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ rating, comments });
    alert("Thank you for your feedback!");
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-black">
      <div className="flex-grow flex justify-center items-center px-4 py-10">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-200 transition-all duration-500 hover:shadow-xl hover:scale-[1.02]">
          {/* Heading */}
          <h2 className="text-2xl font-bold mb-6 text-center tracking-wide text-gray-900">
            Share Your Feedback
          </h2>

          {/* Rating */}
          <label className="block mb-2 text-gray-600 text-sm">
            Rate Your Experience:
          </label>
          <div className="flex justify-center gap-2 mb-6">
            {[...Array(5)].map((_, index) => {
              const starValue = index + 1;
              return (
                <svg
                  key={index}
                  onClick={() => setRating(starValue)}
                  onMouseEnter={() => setHover(starValue)}
                  onMouseLeave={() => setHover(0)}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill={(hover || rating) >= starValue ? "#facc15" : "none"}
                  stroke="#facc15"
                  strokeWidth="2"
                  className="w-10 h-10 cursor-pointer transition-transform transform hover:scale-125 hover:rotate-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 17.75l-6.172 3.245 1.18-6.877-5-4.873 6.9-1.003L12 2.75l3.092 6.292 6.9 1.003-5 4.873 1.18 6.877z"
                  />
                </svg>
              );
            })}
          </div>

          {/* Comments */}
          <label className="block mb-2 text-gray-600 text-sm">
            Your Comments:
          </label>
          <textarea
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            placeholder="Let us know your thoughts..."
            className="w-full border border-gray-300 bg-gray-50 text-black rounded-md p-3 mb-6 focus:ring-2 focus:ring-gray-400 focus:outline-none transition-all duration-300"
            rows="4"
          />

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-black text-white font-semibold py-2 rounded-lg hover:bg-gray-800 transition-all duration-300 transform hover:-translate-y-1"
          >
            Submit Feedback
          </button>

          {/* Footer text */}
          <p className="text-sm text-gray-500 mt-6 text-center">
            We appreciate your time and thoughts — they help us make Matty even
            better.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeedbackForm;
