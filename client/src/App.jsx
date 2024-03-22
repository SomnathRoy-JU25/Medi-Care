import "./App.css";
import { Route, Routes } from "react-router-dom";
// Components
import Home from "./pages/Home";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import Navbar from "./components/Common/Navbar";
import Footer from "./components/Common/Footer";
import About from "./pages/About";
import Contact from "./pages/Contact";


//Video Call
// import CallPage from "./components/VideoCallFeature/CallPage";
// import RoomPage from "./components/VideoCallFeature/RoomPage";

function App() {
  return (
    <div>
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
