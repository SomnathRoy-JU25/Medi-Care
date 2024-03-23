import React from "react";
import Navbar from "../components/Common/Navbar";
import Hero from "../components/Home/Hero";
import AboutUs from "../components/Home/AboutUs";
import HomeCircles from "../components/Home/HomeCircles";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen"> {/* Ensure minimum height to cover the entire screen */}
      <Navbar />
      <div className="flex-grow"> {/* Allow this div to take up remaining vertical space */}
        <Hero />
        <AboutUs />
        <HomeCircles />
      </div>
    </div>
  );
};

export default Home;
