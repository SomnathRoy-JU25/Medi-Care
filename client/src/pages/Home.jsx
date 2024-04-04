import React from "react";
import Navbar from "../components/Common/Navbar";
import Hero from "../components/Home/Hero";
import AboutUs from "../components/Home/AboutUs";
import HomeCircles from "../components/Home/HomeCircles";
import Footer from "../components/Home/Footer";
const Home = () => {
  return (
    <div className="container px-10"> {/* Ensure minimum height to cover the entire screen */}
      <Navbar />
      <div className="flex-grow"> {/* Allow this div to take up remaining vertical space */}
        <Hero />
        <AboutUs />
        <HomeCircles />
        <Footer/>
      </div>
    </div>
  );
};

export default Home;
