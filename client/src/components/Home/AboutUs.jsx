import React from "react";
import image from "../../assets/images/aboutimg.jpg";
import "../../styles/hero.css";

const AboutUs = () => {
  return (
    <>
      <section className="container px-20 ">
        <h2 className="page-heading about-heading underline">About Us</h2>
        <div className="about">
          <div className="hero-img radius">
            <img
              src={image}
              alt="hero"
            />
          </div>
          <div className="hero-content">
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Quibusdam tenetur doloremque molestias repellat minus asperiores
              in aperiam dolor, quaerat praesentium. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Voluptatibus, repudiandae! Lorem
              ipsum dolor sit amet consectetur adipisicing elit. Provident
              quibusdam doloremque ex? Officia atque ab dolore? Tempore totam
              non ea!
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUs;
