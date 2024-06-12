import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileDropdown from "../Auth/ProfileDropdown";
import { AIFeatureLinks } from "./AIFeatureLinks";
import { BsChevronDown } from "react-icons/bs";
import logo from "../../assets/images/Logo.png";
import { Menu, X, ChevronRight } from "lucide-react";
const menuItems = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "AI Features",
    href: "/dashboard/ai-chat_bot",
  },
  {
    name: "Donate Blood",
    href: "/login",
  },
  {
    name: "Book Appointment",
    href: "/dashboard/home-page",
  },
  {
    name: "Emergency",
    href: "/emergency",
  },
  {
    name: "About Us",
    href: "/about",
  },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="Navbar mx-auto top-0 left-0 right-0 transition-all duration-300 ease-in-out bg-primaryBG shadow-md bg-base-100 text-black w-full static">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-12 lg:px-12">
        <div className="inline-flex items-center space-x-9">
          <span className="bg-white rounded-full shadow-md">
            <Link to="/">
              <img
                className="h-20 w-30 rounded-full border border-gray-200"
                src={logo}
                alt="Logo"
              />
            </Link>
          </span>
        </div>
        <div className="hidden lg:flex items-center justify-center">
          <ul className="ml-8 flex space-x-10 hover:cursor-pointer">
            {menuItems.map((item) => (
              <li
                className="text-blue relative"
                key={item.name}
                onMouseEnter={() =>
                  item.name === "AI Features" && setIsMenuOpen(true)
                }
                onMouseLeave={() =>
                  item.name === "AI Features" && setIsMenuOpen(false)
                }
              > 
                {item.name === "AI Features" ? (
                  <>
                    <span className="space-x-1 inline-flex items-center text-sm font-semibold text-gray-800 hover:text-blue hover:cursor-pointer hover:text-sm">
                      <div>{item.name}</div>
                      <div>
                        <BsChevronDown size={16}/>
                      </div>
                    </span>
                    {isMenuOpen && (
                      <div className="relative">
                        <div className="absolute top-full w-64 bg-white shadow-lg rounded-2xl 
                        overflow-auto z-10">
                          {AIFeatureLinks.map((link) => (
                            <Link
                              key={link.title}
                              to={link.path}
                              className="block px-4 py-3 text-sm text-gray-800 hover:bg-gray-400
                              font-normal transition-colors duration-200 border-purple-800
                              hover:text-purple-800 hover:font-bold"
                            >
                              {link.title}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <Link to={item.href}>
                    <a className="inline-flex items-center text-sm font-semibold text-gray-800 hover:text-blue hover:cursor-pointer hover:text-sm">
                      {item.name}
                    </a>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className="hidden space-x-2 lg:block">
          {token === null && (
            <Link to="/signup">
              <button className="rounded-md border bg-transparent px-3 py-2 text-sm font-semibold text-black hover:bg-black/10 
              hover:scale-75 transition-all duration-300">
                Sign Up
              </button>
            </Link>
          )}
          {token === null && (
            <Link to="/login2">
              <button className="rounded-md border px-3 py-2 font-bold font-sans text-gray-800
                    bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB]
                    text-[13px] sm:text-[16px] shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] 
                    hover:shadow-none hover:scale-75 transition-all duration-300">
                Log In
              </button>
            </Link>
          )}
          {token !== null &&
            (user.accountType === "Doctor" || user.accountType === "User") && (
              <ProfileDropdown />
            )}
        </div>
        <div className="lg:hidden">
          <Menu onClick={toggleMenu} className="h-6 w-6 cursor-pointer" />
        </div>
        {isMenuOpen && (
          <div className="absolute inset-x-0 top-0 z-50 origin-top-right transform p-2 transition lg:hidden">
            <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="px-5 pb-6 pt-5">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center space-x-2">
                    <span>
                      <a href="/">
                        <img className="h-10" src={logo} alt="" />
                      </a>
                    </span>
                  </div>
                  <div className="-mr-2">
                    <button
                      type="button"
                      onClick={toggleMenu}
                      className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                      <span className="sr-only">Close menu</span>
                      <X className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <div className="mt-6">
                  <nav className="grid gap-y-4">
                    {menuItems.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="-m-3 flex items-center rounded-md p-3 text-sm font-semibold hover:bg-gray-50"
                      >
                        <span className="ml-3 text-base font-medium text-gray-900">
                          {item.name}
                        </span>
                        <span>
                          <ChevronRight className="ml-3 h-4 w-4" />
                        </span>
                      </a>
                    ))}
                  </nav>
                </div>
                <div className="mt-2 space-y-2">
                  {token === null && (
                    <Link to="/signup">
                      <button
                        className="w-full rounded-md border border-black px-3 py-2 text-sm font-semibold
                     text-black shadow-sm focus-visible:outline focus-visible:outline-2 
                     focus-visible:outline-offset-2 focus-visible:outline-black"
                      >
                        Sign Up
                      </button>
                    </Link>
                  )}

                  {token === null && (
                    <Link to="/login2">
                      <button
                        className="w-full rounded-md border border-black px-3 py-2 text-sm font-semibold
                     text-black shadow-sm focus-visible:outline focus-visible:outline-2 
                     focus-visible:outline-offset-2 focus-visible:outline-black"
                      >
                        Log In
                      </button>
                    </Link>
                  )}
                  {user !== null || (token !== null && <ProfileDropdown />)}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
