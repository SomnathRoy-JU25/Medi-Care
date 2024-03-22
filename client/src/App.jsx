import "./App.css";
import { Route, Routes } from "react-router-dom";
// Components
import Home from "./pages/Home";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import Navbar from "./components/Common/Navbar";

//Video Call
// import CallPage from "./components/VideoCallFeature/CallPage";
// import RoomPage from "./components/VideoCallFeature/RoomPage";

function App() {

  return (
    <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
    </div>
  );
}

export default App;
