import React from "react";
import { BiDonateBlood, BiUserCircle } from "react-icons/bi";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  // Logout handler
  const handleLogout = () => {
    localStorage.clear();
    alert("Logout Successful");
    // navigate("/login");
    navigate("/");
  };

  return (
    <nav className="bg-gray-900 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <BiDonateBlood className="text-red-500 text-3xl mr-2" />
          <span className="text-white text-xl font-bold">Donate Blood</span>
        </div>
        <ul className="flex items-center">
          <li className="mx-4">
            <p className="text-white flex items-center">
              <BiUserCircle className="text-2xl mr-1" /> Welcome{" "}
              <span className="font-semibold">
                {user?.name || user?.hospitalName || user?.organisationName}
              </span>
              &nbsp;
              <span className="badge bg-gray-700 text-white text-sm ml-1">
                {user?.role}
              </span>
            </p>
          </li>
          {/* Conditional rendering for navigation links */}
          {location.pathname === "/home" ||
          location.pathname === "/donar" ||
          location.pathname === "/hospital" ? (
            <li className="mx-4">
              <Link
                to="/analytics"
                className="text-white hover:text-gray-400 transition duration-300"
              >
                Analytics
              </Link>
            </li>
          ) : (
            <li className="mx-4">
              <Link
                to="/home"
                className="text-white hover:text-gray-400 transition duration-300"
              >
                Home
              </Link>
            </li>
          )}
          <li className="mx-4">
            <button
              className="bg-gradient-to-r from-red-500 to-red-600 text-white py-2 px-4 rounded-md hover:from-red-600 hover:to-red-700 transition duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
              onClick={handleLogout}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
