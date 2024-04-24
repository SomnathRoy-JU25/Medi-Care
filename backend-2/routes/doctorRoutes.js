const express = require("express");
const {auth, isDoc} = require("../middlewares/auth")
// const authmw = require("../middlewares/authmw");
const {
  getDoctorInfoController,
  UpdateProfileController,
  getDoctorByIdController,
  doctorAppointmentController,
  updateStatusController,
} = require("../controllers/doctorCtrl");

const router = express.Router();

// POST single doctor info
router.post("/getDoctorInfo", auth, isDoc, getDoctorInfoController);
// POST update profile
router.post("/updateProfile", auth, isDoc, UpdateProfileController);

// POST || getDoctor by ID
// router.post("/getDoctorById", auth, isDoc, getDoctorByIdController);
router.post("/getDoctorById", getDoctorByIdController);

//Get || Appointments
router.get("/doctor-appointments", auth, doctorAppointmentController);

// POST || update appointment status
router.post("/update-status", auth, isDoc, updateStatusController);

module.exports = router;
