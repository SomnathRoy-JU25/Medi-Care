// Import the required modules
const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/auth");
// const authmw = require("../middlewares/authmw");
// Import the required controllers and middleware functions
const {
  login,
  signup,
  // changePassword,
} = require("../controllers/Auth");

const {
  authcontroller,
  applyDoctorController,
  GetAllNotificationController,
  deleteNotificationController,
  getAllDoctorsController,
  bookAppointmentController,
  bookingAvailabilityController,
  userAppointmentsController,
  PredictDiseaseController,
} = require("../controllers/userctrl");

// apply doctor || POST
router.post("/apply-doctor", auth, applyDoctorController);

// Appointment lists
router.get("/user-appointments", userAppointmentsController);

// BOOK Appoinment
router.post("/book-appointment", bookAppointmentController);

//BOOKING Availability
router.post("/booking-availability", auth, bookingAvailabilityController);

// notification || POST
router.post("/get-all-notification", GetAllNotificationController);
// Delele
router.post("/delete-all-notification", deleteNotificationController);

// GET all doctors
router.get("/getAllDoctors", getAllDoctorsController);

router.post("/getUserData", auth, authcontroller);

// Route for user login
router.post("/login", login);

// Route for user signup
router.post("/signup", signup);

// POST || predict disease
router.post("/predict_disease", auth, PredictDiseaseController);

// Export the router for use in the main application
module.exports = router;
