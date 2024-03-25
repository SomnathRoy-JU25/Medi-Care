import React from "react";
import {
  BarChart,
  Wallet,
  Newspaper,
  BellRing,
  Paperclip,
  LogIn,
} from "lucide-react";
import image from "../../assets/images/heroimg.jpg";
import { BiLogOut } from "react-icons/bi";

const UserDashboard = () => {
  return (
    <div>
      <aside className=" h-screen w-64 col overflow-y-auto border-r bg-gray-200 px-5 py-28">
        <a href="#">
          <div className="flex mt-6 items-center justify-between">
            <a href="#" className=" items-center gap-x-2">
              <img
                className="h-12 w-12 flex rounded-full object-cover"
                src={image}
                alt="avatar"
              />
              <span className="text-sm font-medium text-gray-700">
                <span className="text-red-500 "> Hello, <br /> </span>  Sahanur Alam
              </span>
            </a>
            <a
              href="#"
              className="rotate-180 text-gray-800  duration-200 hover:text-gray-900"
            >
            </a>
          </div>
        </a>
        <div className="mt-6 flex flex-1 flex-col justify-between">
          <nav className="-mx-3 space-y-6 ">
            <div className="space-y-3 ">
              <label className="px-3 text-xs font-semibold uppercase text-gray-900">
                analytics
              </label>
              <a
                className="flex items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                href="#"
              >
                <BarChart className="h-5 w-5" aria-hidden="true" />
                <span className="mx-2 text-sm font-medium">Dashboard</span>
              </a>
              <a
                className="flex items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                href="#"
              >
                <Wallet className="h-5 w-5" aria-hidden="true" />
                <span className="mx-2 text-sm font-medium">Sales</span>
              </a>
            </div>
            <div className="space-y-3 ">
              <label className="px-3 text-xs font-semibold uppercase text-gray-900">
                content
              </label>
              <a
                className="flex items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                href="#"
              >
                <Newspaper className="h-5 w-5" aria-hidden="true" />
                <span className="mx-2 text-sm font-medium">Blogs</span>
              </a>
              <a
                className="flex items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                href="#"
              >
                <BellRing className="h-5 w-5" aria-hidden="true" />
                <span className="mx-2 text-sm font-medium">Notifications</span>
              </a>
              <a
                className="flex items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                href="#"
              >
                <Paperclip className="h-5 w-5" aria-hidden="true" />
                <span className="mx-2 text-sm font-medium">Checklists</span>
              </a>
            </div>
          </nav>
          <div className="mt-6">
            <div className="rounded-lg bg-gray-100 p-3 ">
              <h2 className="text-sm font-medium text-gray-800">
                New feature availabel!
              </h2>
              <p className="mt-1 text-xs text-gray-500">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus
                harum officia eligendi velit.
              </p>
              <img
                className="mt-2 h-32 w-full rounded-lg object-cover"
                src={image}
                alt="Feature"
              />
            </div>
            <div className="space-y-3">
              <div className="mt-6 flex items-center justify-between">
                <a
                  className="flex items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700 bg-blue"
                  href="#"
                >
                  <BiLogOut className="h-5 w-5" aria-hidden="true" />
                  <span className="mx-2 text-sm font-medium">Logout</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default UserDashboard;
