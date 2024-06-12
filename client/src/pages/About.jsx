import React from "react";
import { Menu, X, MapPin } from "lucide-react";
import Testimonial from "../components/Home/Testimonial";
import Footer from "../components/Home/Footer";
import { Link } from "react-router-dom";
import Contact from "../components/Home/Contact";
const locations = [
  {
    title: "Bengaluru office",
    timings: "Mon-Sat 9am to 5pm.",
    address: "100, Electronic City Phase-1, Bengaluru, Karnataka 560100 IN",
  },
  {
    title: "Head office",
    timings: "Mon-Sat 9am to 5pm.",
    address: "12th Main Rd, Indiranagar, Bengaluru, Karnataka 560008 IN",
  },
  {
    title: "Karnataka office",
    timings: "Mon-Sat 9am to 5pm.",
    address:
      "42, Residency Rd, Shanthala Nagar, Ashok Nagar, Bengaluru, Karnataka 560025 IN",
  },
];

const users = [
  {
    name: "Gabrielle Fernandez",
    image:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=600&w=600&ixid=eyJhcHBfaWQiOjE3Nzg0fQ",
    position: "Marketing Lead",
  },
  {
    name: "Somnath Roy",
    // image: "https://i.ibb.co/djQdt9L/MyPics.jpg",
    image : "https://i.ibb.co/q18nQ6y/My-Photo-AI.png",
    position: "MERN Stack developer",
  },
  {
    name: "Victória Silva",
    image:
      "https://images.generated.photos/vBRCiI_3UM4l40sU8s7fCwbJwzDwRTGpebzPkfHFsY4/rs:fit:512:512/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/ODgyMTAyLmpwZw.jpg",
    position: "Back-end developer",
  },
];

const About = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="container px-10">
      <div className="mx-auto max-w-7xl px-4">
        {/* greetings */}
        <div className="flex items-center">
          <div className="space-y-4 md:w-3/4">
            <p className="text-3xl font-bold text-gray-900 md:text-4xl">
              Meet our team
            </p>
            <p className="max-w-4xl text-base text-gray-700 md:text-xl">
              Our philosophy is simple — hire a team of diverse, passionate
              people and foster a culture that empowers you to do your best
              work.
            </p>
          </div>
        </div>
        {/* TEAM */}
        <div className="flex flex-row border-b border-gray-300 py-12 pb-16  place-content-evenly">
          {users.map((user) => (
            <div
              className="rounded-md border shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)]
            hover:shadow-[0_10px_20px_rgba(240,_46,_170,_0.7)]"
              key={user.name}
            >
              <img
                src={user.image}
                alt={user.name}
                className="h-[330px] w-full rounded-xl object-cover photo"
              />
              <p className="mt-6 w-full px-2 text-xl  font-semibold text-gray-900">
                {user.name}
              </p>
              <p className="w-full px-2 pb-6 text-sm font-semibold text-gray-500">
                {user.position}
              </p>
            </div>
          ))}
        </div>
        {/* Hero Map */}
        <div className="flex flex-col space-y-8 pb-10 pt-12 md:pt-24">
          <p className="text-3xl font-bold text-gray-900 md:text-5xl md:leading-10">
            Made with love, right here in India
          </p>
          <p className="max-w-4xl text-base text-gray-600 md:text-xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
            veritatis voluptates neque itaque repudiandae sint, explicabo
            assumenda quam ratione placeat?
          </p>
        </div>
        <div className="w-full space-y-4">
          <img
            className="h-[200px] w-full rounded-xl object-cover md:h-full"
            src="https://dev-ui-image-assets.s3.ap-south-1.amazonaws.com/google-map.jpg"
            alt=""
          />
        </div>
        {/* locations */}
        <div className="my-8 flex flex-col gap-y-6 md:flex-row lg:justify-around">
          {locations.map((location) => (
            <div
              key={location.title}
              className="flex flex-col space-y-3 md:w-2/4 lg:w-1/5"
            >
              <MapPin className="h-5 w-5" />
              <p className="w-full text-xl font-semibold  text-gray-900">
                {location.title}
              </p>
              <p className="w-full text-base text-gray-700">
                {location.timings}
              </p>
              <p className="text-sm font-medium">{location.address}</p>
            </div>
          ))}
        </div>
        <hr className="mt-20" />
      </div>
      <Contact/>
      <Testimonial />
      <Footer />
    </div>
  );
};

export default About;
