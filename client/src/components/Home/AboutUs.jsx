import React from "react";
import image from "../../assets/images/aboutimg.jpg";
import "../../styles/hero.css";
import { Link } from "react-router-dom";
const AboutUs = () => {
  return (
    <>
      <section className="container">
        <Link to={"/about"}>
          <h2 className="page-heading about-heading">About Us</h2>
          <div className="about mt-8">
            <div className="hero-img w-0">
              <img src={image} alt="hero" />
            </div>
            <div className="hero-content">
              <p>
                "Medi-Care is dedicated to revolutionizing the healthcare
                experience by seamlessly integrating cutting-edge technology
                with compassionate, personalized care. Our platform offers a
                wide range of services, from convenient doctor consultations to
                life-saving emergency medical aid, all designed to empower
                individuals to take control of their health and well-being. With
                our AI-powered health assistance and blood donation
                coordination, we strive to make accessing quality healthcare
                easier and more efficient for everyone."
              </p>
            </div>
          </div>
        </Link>
      </section>
    </>
  );
};

export default AboutUs;
