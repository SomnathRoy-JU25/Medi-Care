import "./App.css";
import { Route, Routes } from "react-router-dom";
// Components
import Home from "./pages/Home";
import Login2 from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import Navbar from "./components/Common/Navbar";
import Footer from "./components/Common/Footer";
import About from "./pages/About";
import Contact from "./pages/Contact";

import HomePage from "./pages/HomePage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/Routes/ProtectedRoute";
import PublicRoute from "./components/Routes/PublicRoute";
import Donar from "./pages/Dashboard/Donar";
import Hospitals from "./pages/Dashboard/Hospitals";
import OrganisationPage from "./pages/Dashboard/OrganisationPage";
import Consumer from "./pages/Dashboard/Consumer";
import Donation from "./pages/Donation";
import Analytics from "./pages/Dashboard/Analytics";
import DonarList from "./pages/Admin/DonarList";
import HospitalList from "./pages/Admin/HospitalList";
import OrgList from "./pages/Admin/OrgList";
import AdminHome from "./pages/Admin/AdminHome";

//Video Call
// import CallPage from "./components/VideoCallFeature/CallPage";
// import RoomPage from "./components/VideoCallFeature/RoomPage";

function App() {
  return (
       <div className="flex min-h-screen w-screen flex-col font-inter">
        <div>
         {/* <Navbar /> */}
        <div>
        <div>
        <ToastContainer />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login2" element={<Login2 />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
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
              path="/org-list"
              element={
                <ProtectedRoute>
                  <OrgList />
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
              path="/orgnaisation"
              element={
                <ProtectedRoute>
                  <OrganisationPage />
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
          
        </div>
        <hr />
        {/* <Footer /> */}
      </div>
    </div>
  );
}

export default App;
