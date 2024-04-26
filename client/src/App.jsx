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
import Settings from "./components/Dashboard/Settings/index";
import Navbar from "./components/Common/Navbar";
import BookAppointment from "./components/Dashboard/Book Appointment/BookAppointment";
import AIChatBot from "./components/AI Features/AIChat-Bot/AIChatBot";
import VoiceEnableHeathCare from "./components/AI Features/Voice-enable-health-assistance/VoiceEnableHeathCare";
import AIHealthEducation from "./components/AI Features/AI Health Education/AIHealthEducation";

// Doctor Appointments
import Appointments from "./components/Dashboard/Book Appointment/Appointments";
import BookAppHomePage from "./components/Dashboard/BookAppHomePage";
import ApplyDoctor from "./components/Dashboard/Book Appointment/ApplyDoctor";
import Doctors from "./components/Dashboard/admin/Doctor";
import Users from "./components/Dashboard/admin/Users";
import Profile from "./components/Dashboard/Doctor/Profile";
import DoctorAppointments from "./components/Dashboard/Doctor/DoctorAppointments";
import NotificationPage from "./components/Dashboard/Book Appointment/NotificationPage";
function App() {
  return (
    <div className="flex min-h-screen w-screen flex-col font-inter">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login2" element={<Login2 />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/emergency" element={<Emergency />} />
        <Route
          path="/voice-enable-health-assistance"
          element={<VoiceEnableHeathCare />}
        />
      

        {/* Private Route - for Only Logged in User */}
        <Route
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        > 
          <Route path="/dashboard/predict_disease" element={<AIHealthEducation />} />
          <Route path="/dashboard/my-profile" element={<MyProfile />} />
          <Route path="/dashboard/addtoCall" element={<CallPage />} />
          <Route path="/dashboard/room/:roomId" element={<RoomPage />} />
          <Route path="/dashboard/settings" element={<Settings />} />
          <Route path="/dashboard/user-dashboard" element={<UserDashboard />} />
          {/* AI Chat Bot */}
          <Route path="/dashboard/ai-chat_bot" element={<AIChatBot />} />

          {/* Booking Appointments Features */}
          <Route path="/dashboard/home-page" element={<BookAppHomePage />} />
          <Route
            path="/dashboard/doctor/book-appointment/:doctorId"
            element={<BookAppointment />}
          />
          <Route path="/dashboard/apply-doctor" element={<ApplyDoctor />} />
          <Route path="/dashboard/appointments" element={<Appointments />} />

          {/* Admin Routes */}
          <Route path="/dashboard/admin/doctors" element={<Doctors />} />
          <Route path="/dashboard/admin/users" element={<Users />} />

          <Route path="/dashboard/doctor/profile/:id" element={<Profile />} />
          <Route
            path="/dashboard/doctor-appointments"
            element={<DoctorAppointments />}
          />
          <Route
            path="/dashboard/notification"
            element={<NotificationPage />}
          />
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
      {/* <Footer /> */}
    </div>
  );
}

export default App;
