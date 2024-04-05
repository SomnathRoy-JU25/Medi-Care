import React from "react";
import "../../styles/hero.css";
import SwiperCompo from "./SwiperCompo";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>
          MediCare : <br />
          Your Partner in Health and Well-being.
        </h1>
        <p>
          MediCare provides expert medical support, aiming to minimize
          discomfort and empower individuals on their path to health. Our team
          delivers personalized care for a comforting experience.
        </p>
      </div>
      <div className="hero-img w-52">
        <SwiperCompo />
      </div>
    </section>
  );
};

export default Hero;
