import React from "react";
import { Menu, ChevronDown } from "lucide-react";
import logo from "../../assets/images/Logo.png";
import { Link } from "react-router-dom";

const menuItems = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "About",
    href: "/about",
  },
  {
    name: "AI Features",
    href: "/contact",
  },
  {
    name: "Donate Blood",
    href: "/login",
  },
  {
    name: "Book Appointment",
    href: "/login2",
  },
];

const BloodNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="fixed top-0 left-0 right-0 transition-all duration-300 ease-in-out bg-primaryBG shadow-md bg-base-100 text-black mt-0">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-12 lg:px-12">
        <div className="inline-flex items-center space-x-2">
          <span className="bg-white rounded-full p-1 shadow-md">
            <a href="/">
              <img
                className="h-20 w-30 rounded-full border border-gray-200"
                src={logo}
                alt="Logo"
              />
            </a>
          </span>
        </div>
        <div className="hidden lg:flex items-center justify-center">
          <ul className="ml-8 flex space-x-10 hover:cursor-pointer">
            {menuItems.map((item) => (
              <li className="text-blue" key={item.name}>
                <Link
                  to={item.href}
                  className="inline-flex items-center text-sm font-semibold text-gray-800 hover:text-blue hover:cursor-pointer hover:text-sm"
                >
                  {item.name}
                  <span>
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="px-4">
            <button
              type="button"
              className="rounded-full bg-transparent px-3 py-2 text-sm font-semibold
               text-black hover:bg-black/10 focus-visible:outline focus-visible:outline-2 
               focus-visible:outline-offset-2 focus-visible:outline-black bg-slate-300
               "
            >
              <ul className="ml-1 inline-flex space-x-0 hover:cursor-pointer">
                <li>
                  <a className="inline-flex items-center text-sm font-semibold text-green-600 hover:text-red hover:cursor-pointer hover:text-sm">
                    Emergency
                  </a>
                </li>
              </ul>
            </button>
          </div>
        </div>

        <div className="lg:hidden">
          <Menu onClick={toggleMenu} className="h-6 w-6 cursor-pointer" />
        </div>
      </div>
    </div>
  );
};
export default BloodNavbar;
