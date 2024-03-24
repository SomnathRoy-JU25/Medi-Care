import React from "react";
import { BiDonateBlood, BiUserCircle } from "react-icons/bi";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { setToken } from "../../../redux/features/auth/authSlice"
import { setUser } from "../../../redux/features/auth/profileSlice"

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  // Logout handler
  const handleLogout = () => {
    dispatch(setToken(null))
    dispatch(setUser(null))
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    toast.success("Logged Out",{duration:2000})
    navigate("/")
  };

  return (
    <nav className="bg-gray-900 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <BiDonateBlood className="text-red-500 text-3xl mr-2" />
          <span className="text-white text-xl font-bold">Donate Blood</span>
        </div>
        <ul className="flex items-center space-x-4">
          <li className="mx-4">
            <p className="text-white items-center flex space-x-2">
              <BiUserCircle className="text-2xl mr-1" />
              <span className="font-semibold text-pretty">
                {user?.name || user?.hospitalName || user?.organisationName}
              </span>
              <span className="badge rounded-lg bg-gray-700 text-white text-md">
                {user?.role}
              </span>
            </p>
          </li>
          {/* Conditional rendering for navigation links */}
          {location.pathname === "/home" ||
          location.pathname === "/donar" ||
          location.pathname === "/hospital" ? (
            <li className="mx-4">
              <button>
                <Link
                  to="/analytics"
                  className="bg-gradient-to-r from-green-500 to-green-600 text-white py-2 px-4 rounded-md
                    hover:from-green-600 hover:to-green-700 transition duration-300 shadow-md hover:shadow-lg
                    focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                >
                  Analytics
                </Link>
              </button>
            </li>
          ) : (
            <li className="mx-4">
              <button>
                <Link
                  to="/home"
                  className="bg-gradient-to-r from-purple-500 to-purple-600 text-white py-2 px-4 rounded-md
                    hover:from-purple-600 hover:to-purple-700 transition duration-300 shadow-md hover:shadow-lg
                    focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
                >
                  Home
                </Link>
              </button>
            </li>
          )}
          <li className="mx-4">
            <button
              className="bg-gradient-to-r from-red-500 to-red-600 text-white py-2 px-4 rounded-md
                hover:from-red-600 hover:to-red-700 transition duration-300 shadow-md hover:shadow-lg
                focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
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
