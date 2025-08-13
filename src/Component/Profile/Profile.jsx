import React, { useState } from "react";
import { Link , NavLink } from "react-router-dom";


function Profile() {
  const [user, setUser] = useState({
    name: "shashank ",
    email: "shashank123@example.com",
    picture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRK0mYlUkYYodSiXrCmjrkmKOsyYCm8yw4mMg&s",
  });

 

  return (
    <div className="text-center ">
      {user ? (
        <div className="bg-gray-200 shadow-md rounded-lg p-6 w-full h-full ">
          <img 
            src={user.picture}
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
    >
      Logout
    </button>
  </NavLink>
</div>

          
          
        </div>
      ) : (
        <p className="text-gray-500">No user logged in.</p>
      )}
    </div>
  );
}

export default Profile;
