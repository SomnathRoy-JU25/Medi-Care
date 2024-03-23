import React from "react";
import logo from "../../assets/images/Logo.jpg";
import { FaInstagram, FaFacebookF, FaTwitterSquare } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-100 mb-0">
      <div className="container mx-auto py-10 px-4 lg:px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="w-full lg:w-1/2 lg:col-span-2">
            <div className="flex items-center mb-8">
              <a href="/">
                <img className="h-20 w-30 rounded-full" src={logo} alt="Logo" />
              </a>
            </div>
            <p className="text-gray-700 mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
              nec urna magna.
            </p>
          </div>
          <div className="w-full lg:w-1/4">
            <h3 className="text-gray-800 text-lg font-semibold mb-4">
              Company
            </h3>
            <ul className="text-gray-700">
              <li className="mb-2">
                <a href="#" className="hover:text-gray-900">
                  Features
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-gray-900">
                  Pricing
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-gray-900">
                  Affiliate Program
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900">
                  Press Kit
                </a>
              </li>
            </ul>
          </div>
          <div className="w-full lg:w-1/4">
            <h3 className="text-gray-800 text-lg font-semibold mb-4">
              Support
            </h3>
            <ul className="text-gray-700">
              <li className="mb-2">
                <a href="#" className="hover:text-gray-900">
                  Account
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-gray-900">
                  Help
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-gray-900">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900">
                  Customer Support
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-white border-t border-gray-200 justify-center items-center  flex flex-grow-0">
        <div className="container mx-auto py-0 px-4 lg:px-0 justify-between ">
          <div className="flex flex-wrap items-center justify-between">
            <div className="w-full md:w-1/2 lg:w-auto mb-4 lg:mb-0">
              <p className="text-gray-700">
                &copy; Copyright 2024. All Rights Reserved.
              </p>
            </div>

            <div className="flex items-center space-x-4 ">
              <div>
                <a
                  href="#"
                  className="flex items-center justify-center h-10 w-10 rounded-full border border-gray-300 hover:border-gray-400"
                >
                  <FaFacebookF className="text-gray-600" />
                </a>
              </div>
              <div>
                <a
                  href="#"
                  className="flex items-center justify-center h-10 w-10 rounded-full border border-gray-300 hover:border-gray-400"
                >
                  <FaTwitterSquare className="text-gray-600" />
                </a>
              </div>
              <div>
                <a
                  href="#"
                  className="flex items-center justify-center h-10 w-10 rounded-full border border-gray-300 hover:border-gray-400"
                >
                  <FaInstagram className="text-gray-600" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
