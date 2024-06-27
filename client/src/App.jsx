import "./styles/App.css";
import { Route, Routes } from "react-router-dom";
// Components
import Home from "./pages/Home";
import Login2 from "./pages/Login";
import Signup from "./pages/Signup";
import About from "./pages/About";
import Emergency from "./pages/Emergency";
import Contact from "./components/Home/Contact";
import PrivateRoute from "./components/Auth/PrivateRoute";
import Navbar from "./components/Common/Navbar";

// Blood Donation Features
import HomePage from "./components/Donate-Blood/HomePage"
import Login from "./components/Donate-Blood/auth/Login"
import Register from "./components/Donate-Blood/auth/Register";
import Donar from "./components/Donate-Blood/Dashboard/Donar";
import Hospitals from "./components/Donate-Blood/Dashboard/Hospitals";
import Consumer from "./components/Donate-Blood/Dashboard/Consumer";
import Donation from "./components/Donate-Blood/Dashboard/Donation";
import Analytics from "./components/Donate-Blood/Dashboard/Analytics";
import DonarList from "./components/Donate-Blood/Admin/DonarList";
import HospitalList from "./components/Donate-Blood/Admin/HospitalList";
import AdminHome from "./components/Donate-Blood/Admin/AdminHome";
import ProtectedRoute from "./components/Routes/ProtectedRoute";
import PublicRoute from "./components/Routes/PublicRoute";

// Doctor Appointments
import Dashboard from "./pages/Dashboard";
import UserDashboard from "./components/Dashboard/UserDashboard";
import MyProfile from "./components/Dashboard/MyProfile";
import BookAppHomePage from "./components/Dashboard/BookAppHomePage";
import BookAppointment from "./components/Dashboard/Book Appointment/BookAppointment";
import Appointments from "./components/Dashboard/Book Appointment/Appointments";
import NotificationPage from "./components/Dashboard/Book Appointment/NotificationPage";
import ApplyDoctor from "./components/Dashboard/Book Appointment/ApplyDoctor";
// Doctor Routes For Book Appointments
import Profile from "./components/Dashboard/Doctor/Profile";
import DoctorAppointments from "./components/Dashboard/Doctor/DoctorAppointments";
import Settings from "./components/Dashboard/Settings/index";
// Admin Routes For Book Appointments
import Doctors from "./components/Dashboard/admin/Doctor";
import Users from "./components/Dashboard/admin/Users";

// Real Time Video Call Features
import LobbyScreen from "./components/WebRTC/screens/LobbyScreen";
import RoomPage from "./components/WebRTC/screens/RoomPage";

// Diseases Predictors Home Page
import DiseasePredictorPage from "./components/Disease Predictor/DiseasePredictorHome";

// AI Chat-Bot Feature
import AIChatBot from "./components/AI Features/AIChat-Bot/AIChatBot";
import Error from "./pages/Error";

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

        {/* Private Route - for Only Logged in User */}
        <Route
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path="/dashboard/predict_disease" element={<DiseasePredictorPage />} />
          <Route path="/dashboard/my-profile" element={<MyProfile />} />
          <Route path="/dashboard/addtoCall" element={<LobbyScreen />} />
          <Route path="/dashboard/room/:roomId" element={<RoomPage />} />
          <Route path="/dashboard/settings" element={<Settings />} />
          <Route path="/dashboard/user-dashboard" element={<UserDashboard />} />
          {/* AI Chat Bot */}
          <Route path="/dashboard/ai-chat_bot" element={<AIChatBot />} />
          {/* Booking Appointments Features */}
          <Route path="/dashboard/home-page" element={<BookAppHomePage />} />
          <Route path="/dashboard/doctor/book-appointment/:doctorId" element={<BookAppointment />} />
          <Route path="/dashboard/apply-doctor" element={<ApplyDoctor />} />
          <Route path="/dashboard/appointments" element={<Appointments />} />
          <Route path="/dashboard/doctor/profile/:id" element={<Profile />} />
          <Route path="/dashboard/doctor-appointments" element={<DoctorAppointments />} />
          <Route path="/dashboard/notification" element={<NotificationPage />} />
          {/* Admin Routes */}
          <Route path="/dashboard/admin/doctors" element={<Doctors />} />
          <Route path="/dashboard/admin/users" element={<Users />} />
        </Route>

        {/* ProtectedRoute For Blood Donation Features*/}
        <Route>
          <Route path="/admin" element= {<ProtectedRoute> <AdminHome/> </ProtectedRoute>} />
          <Route path="/donar-list" element= {<ProtectedRoute> <DonarList/> </ProtectedRoute>} />
          <Route path="/hospital-list" element={<ProtectedRoute> <HospitalList/> </ProtectedRoute>} />
          <Route path="/hospital" element={<ProtectedRoute> <Hospitals/> </ProtectedRoute>} />
          <Route path="/analytics" element={<ProtectedRoute> <Analytics/> </ProtectedRoute>} />
          <Route path="/consumer" element={<ProtectedRoute> <Consumer/> </ProtectedRoute>} />
          <Route path="/donation" element={<ProtectedRoute> <Donation/> </ProtectedRoute>} />
          <Route path="/donar" element={ <ProtectedRoute> <Donar/> </ProtectedRoute> } />
          <Route path="/home" element={<ProtectedRoute> <HomePage/> </ProtectedRoute>} />
        </Route>
        {/* PublicRoute For Blood Donation Features*/}
        <Route>
          <Route path="/login" element={<PublicRoute> <Login /> </PublicRoute>} />
          <Route path="/register" element={<PublicRoute> <Register /> </PublicRoute>} />
        </Route>
        {/* To Handle Not Found Pages */}
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;