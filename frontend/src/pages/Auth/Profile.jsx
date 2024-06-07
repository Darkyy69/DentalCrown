import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Profile = () => {
  const { auth } = useAuth();
  const user = auth.user;
  console.log(user);
  return (
    <div className="flex flex-col items-center justify-center h-[80vh]">
      <h1 className="text-4xl font-bold mb-8">Welcome {user.username}!</h1>
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h2 className="text-2xl font-bold mb-4">User Information</h2>
            <p>
              <span className="font-bold">Username:</span> {user.username}
            </p>
            <p>
              <span className="font-bold">First Name:</span> {user.first_name}
            </p>
            <p>
              <span className="font-bold">Last Name:</span> {user.last_name}
            </p>
            <p>
              <span className="font-bold">Email:</span> {user.email}
            </p>
            <p>
              <span className="font-bold">Role:</span> {user.role}
            </p>
            <p>
              <span className="font-bold">Phone Number:</span>{" "}
              {user.phone_number}
            </p>
            <p>
              <span className="font-bold">Birth Date:</span> {user.birth_date}
            </p>
            <p>
              <span className="font-bold">Address:</span> {user.address}
            </p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <img
              src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              alt="Profile Image"
              className="w-40 h-40 rounded-full object-cover"
            />
            <Link
              to="/edit-profile"
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Edit Profile
            </Link>
          </div>
        </div>
        <div className="flex space-x-4 mt-8">
          <Link
            to="/"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Home
          </Link>
          <Link
            to="/products"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
