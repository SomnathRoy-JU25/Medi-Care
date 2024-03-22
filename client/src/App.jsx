import { useEffect } from "react";
import "./App.css";
// Redux
import { useDispatch, useSelector } from "react-redux";
// React Router
import { Route, Routes, useNavigate } from "react-router-dom";
// Components
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Common/Navbar";

//Video Call
// import CallPage from "./components/VideoCallFeature/CallPage";
// import RoomPage from "./components/VideoCallFeature/RoomPage";

function App() {

  return (
    <div className="flex min-h-screen w-screen flex-col bg-purple-300 font-inter">
      <div className="bg-purple-800">
        <Navbar />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/about" element={<About />} />

        <Route path="/contact" element={<Contact />} />

        <Route path="login" element={<Login />} />

        <Route path="signup" element={<Signup />} />

        {/* 404 Page */}
        {/* <Route path="*" element={<Error />} /> */}
      </Routes>
    </div>
  );
}

export default App;
