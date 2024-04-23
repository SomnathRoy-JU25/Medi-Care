import React from "react";
import { useSelector } from "react-redux";
import { message, Badge } from 'antd';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoMdNotifications } from "react-icons/io";
import { adminMenu, userMenu } from "../Data/Data";

const Layout = ({ children }) => {
  const { user } = useSelector(state => state.profile);
  const location = useLocation();
  const navigate = useNavigate();

  // Doctor menu
  const doctorMenu = [
    {
      name: "Home",
      path: "/dashboard/home-page",
      icon: "fa-solid fa-house",
    },
    {
      name: "Appointments",
      path: "/dashboard/doctor-appointments",
      icon: "fa-solid fa-list",
    },
    {
      name: "Apply Doctor",
      path: "/dashboard/apply-doctor",
      icon: "fa-solid fa-user-doctor",
    },
    {
      name: "Profile",
      path: `/dashboard/doctor/profile/${user?._id}`,
      icon: "fa-solid fa-user",
    },
  ];

  // Rendering menu
  let SidebarMenu;
  if (user?.isAdmin) {
    SidebarMenu = adminMenu;
  } else if (user?.isDoctor) {
    SidebarMenu = doctorMenu;
  } else {
    SidebarMenu = userMenu;
  }

  return (
    <>
      <div className="bg-gray-100 min-h-screen flex">
        {/* Sidebar */}
        <div className="w-1/4 bg-white shadow-md">
          <div className="py-4 px-6">
            <div className="text-center mb-4">
              <h1 className="text-lg font-semibold">Medicare</h1>
              <hr className="my-4" />
            </div>
            <div>
              {SidebarMenu.map((menu) => {
                const isActive = location.pathname === menu.path;
                return (
                  <div key={menu.name} className={`flex items-center py-2 px-4 rounded-lg ${isActive ? "bg-blue-500 text-white" : "hover:bg-gray-200"}`}>
                    <i className={`${menu.icon} mr-2 text-gray-600`}></i>
                    <Link to={menu.path} className={`text-gray-800 ${isActive && "font-semibold"}`}>{menu.name}</Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {/* Content */}
        <div className="w-3/4 bg-gray-200 p-6">
          <div className="flex justify-between items-center mb-4">
            <Badge count={user?.notification.length} onClick={() => { navigate('/dashboard/notification') }}>
              <IoMdNotifications size={25} className="text-gray-600" />
            </Badge>
            <Link to="/dashboard/doctor/profile/:id" className="text-gray-800">{user?.name}</Link>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-md">{children}</div>
        </div>
      </div>
    </>
  );
};

export default Layout;
