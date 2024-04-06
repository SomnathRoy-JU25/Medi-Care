import React from "react";
import Hero from "../components/Home/Hero";
import AboutUs from "../components/Home/AboutUs";
import HomeCircles from "../components/Home/HomeCircles";
import Footer from "../components/Home/Footer";
import Contact from "./Contact";
const Home = () => {
  return (
    <div className="container px-10 mt-0"> {/* Ensure minimum height to cover the entire screen */}
        <Hero />
        <AboutUs />
        <HomeCircles />
        <Contact/>
        <Footer/>
    </div>
  );
};

export default Home;
