// NavigationBar.js
import React from "react";
import "../HomePage.css";

const NavigationBar = ({ tabProgress, currentPage }) => {
  return (
    <div className="desktop:grid-col-2">
      <ul className="side-menu-list padding-left-2">
        <li id="progressbar">
          <div
            className={`${
              tabProgress === 25 ? "progressbardiv25" :
              tabProgress === 50 ? "progressbardiv50" :
              tabProgress === 75 ? "progressbardiv75" :
              "progressbardiv100"
            }`}
          ></div>
        </li>
        <li className={`${currentPage === "Home" ? "activeState" : "done"}`}>Welcome</li>
        <li className={`${tabProgress === 50 ? "activeState" : tabProgress < 75 ? "list" : "done"}`}>Symptom</li>
        <li className={`${tabProgress === 100 ? "activeState" : tabProgress < 100 ? "list" : "done"}`}>Disease</li>
      </ul>
    </div>
  );
};

export default NavigationBar;
