import React from "react";
import Hero from "../components/Home/Hero";
import AboutUs from "../components/Home/AboutUs";
import HomeCircles from "../components/Home/HomeCircles";
import Footer from "../components/Home/Footer";
import Contact from "../components/Home/Contact";
import Testimonial from "../components/Home/Testimonial";
const Home = () => {
  return (
    <div className="container px-10 mt-0"> {/* Ensure minimum height to cover the entire screen */}
        <Hero />
        <AboutUs />
        <HomeCircles />
        <Contact/>
        <Testimonial/>
        <Footer/>
    </div>
  );
};

export default Home;
