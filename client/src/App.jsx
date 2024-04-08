import "./styles/App.css";
import { Route, Routes } from "react-router-dom";
// Components
import Home from "./pages/Home";
import Login2 from "./pages/Login";
import Signup from "./pages/Signup";
import About from "./pages/About";
import Contact from "./components/Home/Contact";
import Emergency from "./pages/Emergency";

import HomePage from "./pages/HomePage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ProtectedRoute from "./components/Routes/ProtectedRoute";
import PublicRoute from "./components/Routes/PublicRoute";
import Donar from "./pages/Dashboard/Donar";
import Hospitals from "./pages/Dashboard/Hospitals";
import Consumer from "./pages/Dashboard/Consumer";
import Donation from "./pages/Dashboard/Donation";
import Analytics from "./pages/Dashboard/Analytics";
import DonarList from "./pages/Admin/DonarList";
import HospitalList from "./pages/Admin/HospitalList";
import AdminHome from "./pages/Admin/AdminHome";

//Video Call
import CallPage from "./components/VideoCallFeature/CallPage";
import RoomPage from "./components/VideoCallFeature/RoomPage";

import UserDashboard from "./components/Dashboard/UserDashboard";
import MyProfile from "./components/Dashboard/MyProfile";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/Auth/PrivateRoute";
import Settings from "./components/Dashboard/Settings/index"
import Navbar from "./components/Common/Navbar";
import BookAppointment from "./components/Dashboard/BookAppointment";
import AIChatBot from "./components/AIChat-Bot/AIChatBot";
function App() {
  return (
    <div className="flex min-h-screen w-screen flex-col font-inter">
     <Navbar/>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login2" element={<Login2 />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/emergency" element={<Emergency />} />
          {/* Private Route - for Only Logged in User */}
          <Route
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          >
            <Route path="dashboard/my-profile" element={<MyProfile />} />
            <Route path="dashboard/addtoCall" element={<CallPage />} />
            <Route path="dashboard/room/:roomId" element={<RoomPage />} />
            <Route path="dashboard/settings" element={<Settings />} />
            <Route path="/dashboard/book-appointment" element={<BookAppointment />} />
            <Route path="/dashboard/user-dashboard" element={<UserDashboard />} />
            {/* AI Chat Bot */}
            <Route path="/dashboard/ai-chat_bot" element={<AIChatBot/>} />
          </Route>

          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminHome />
              </ProtectedRoute>
            }
          />
          <Route
            path="/donar-list"
            element={
              <ProtectedRoute>
                <DonarList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/hospital-list"
            element={
              <ProtectedRoute>
                <HospitalList />
              </ProtectedRoute>
            }
          />

          <Route
            path="/hospital"
            element={
              <ProtectedRoute>
                <Hospitals />
              </ProtectedRoute>
            }
          />
          <Route
            path="/analytics"
            element={
              <ProtectedRoute>
                <Analytics />
              </ProtectedRoute>
            }
          />
          <Route
            path="/consumer"
            element={
              <ProtectedRoute>
                <Consumer />
              </ProtectedRoute>
            }
          />
          <Route
            path="/donation"
            element={
              <ProtectedRoute>
                <Donation />
              </ProtectedRoute>
            }
          />

          <Route
            path="/donar"
            element={
              <ProtectedRoute>
                <Donar />
              </ProtectedRoute>
            }
          />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
        </Routes>
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
