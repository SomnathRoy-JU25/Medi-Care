import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import { logout } from "../../services/operations/authAPI";
import { IoVideocam } from "react-icons/io5";
import { FaUserDoctor } from "react-icons/fa6";
import { BsChatTextFill } from "react-icons/bs";
import { GoHomeFill } from "react-icons/go";
import { FaSignOutAlt } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";

export default function SidebarFour() {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeNavLink, setActiveNavLink] = useState("");

  const handleNavLinkClick = (to) => {
    setActiveNavLink(to);
  };

  return (
    <div className="flex h-auto w-16 flex-col items-center overflow-y-auto border-r bg-white py-2">
      <div className="flex flex-1 flex-col items-center space-y-5 ">
        <NavLink
          to={"/dashboard/my-profile"}
          onClick={() => handleNavLinkClick("/dashboard/my-profile")}
          className={`rounded-lg p-1.5 text-gray-700 transition-colors duration-200 focus:outline-none ${
            activeNavLink === "/dashboard/my-profile" ? "bg-gray-200" : ""
          }`}
        >
          <GoHomeFill size={27} />
        </NavLink>
        
        <NavLink
          to={"/dashboard/home-page"}
          onClick={() => handleNavLinkClick("/dashboard/home-page")}
          className={`rounded-lg p-1.5 text-gray-700 transition-colors duration-200 focus:outline-none ${
            activeNavLink === "/dashboard/home-page" ? "bg-gray-200" : ""
          }`}
        >
          <FaUserDoctor size={26} />
        </NavLink>


        <NavLink
          to={"/dashboard/addtoCall"}
          onClick={() => handleNavLinkClick("/dashboard/addtoCall")}
          className={`rounded-lg p-1.5 text-gray-700 transition-colors duration-200 focus:outline-none ${
            activeNavLink === "/dashboard/addtoCall" ? "bg-gray-200" : ""
          }`}
        >
          <IoVideocam size={26} />
        </NavLink>

        <NavLink
          to={"/dashboard/ai-chat_bot"}
          onClick={() => handleNavLinkClick("/dashboard/ai-chat_bot")}
          className={`rounded-lg p-1.5 text-gray-700 transition-colors duration-200 focus:outline-none ${
            activeNavLink === "/dashboard/ai-chat_bot" ? "bg-gray-200" : ""
          }`}
        >
          <BsChatTextFill size={26} />
        </NavLink>

        <NavLink
          onClick={() => {
            dispatch(logout(navigate));
          }}
          className={`rounded-lg p-1.5 text-gray-700 transition-colors duration-200 focus:outline-none`}
        >
          <FaSignOutAlt size={26} />
        </NavLink>
      </div>

      <div className="flex flex-col items-center space-y-4 mb-6">
        <NavLink
          to={"/dashboard/settings"}
          onClick={() => handleNavLinkClick("/dashboard/settings")}
          className={`rounded-lg p-1.5 text-gray-700 transition-colors duration-200 focus:outline-none ${
            activeNavLink === "/dashboard/settings" ? "bg-gray-200" : ""
          }`}
        >
          <IoSettings size={26} />
        </NavLink>

        <NavLink
          to={"/dashboard/my-profile"}
          onClick={() => handleNavLinkClick("/dashboard/my-profile")}
          className={`rounded-lg p-1.5 text-gray-700 transition-colors duration-200 focus:outline-none ${
            activeNavLink === "/dashboard/my-profile" ? "bg-gray-200" : ""
          }`}
        >
          <img
            className="h-8 w-8 rounded-full object-cover"
            src={user?.image}
            alt="User avatar"
          />
        </NavLink>
      </div>
    </div>
  );
}
