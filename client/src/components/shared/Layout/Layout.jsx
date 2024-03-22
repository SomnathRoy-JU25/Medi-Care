import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <>
      <div className="header">
        <Header />
      </div>
      <div className="flex flex-row">
        <div className="w-1/4">
          <Sidebar />
        </div>
        <div className="w-3/4">{children}</div>
      </div>
    </>
  );
};

export default Layout;
