const express = require("express");
const authMiddelware = require("../middlewares/authMiddelware");
const { auth , isAdmin } = require("../middlewares/auth");
const {
  getDonarsListController,
  getHospitalListController,
  deleteDonarController,
} = require("../controllers/adminController");
const adminMiddleware = require("../middlewares/adminMiddleware");

const {
  getAllUsersController,
  getAllDoctorsController,
  changeAccountStatusController,
} = require("../controllers/BookAppAdminCtrl");


//router object
const router = express.Router();

//Routes
// GET || users
router.get("/getAllUsers", getAllUsersController);

// GET || doctors
router.get("/getAllDoctors", getAllDoctorsController);

// POST account status
router.post("/changeAccountStatus", auth, isAdmin, changeAccountStatusController);

//GET || DONAR LIST
router.get("/donar-list", authMiddelware, adminMiddleware, getDonarsListController);

//GET || HOSPITAL LIST
router.get( "/hospital-list", authMiddelware, adminMiddleware, getHospitalListController);

// DELETE DONAR || GET
router.delete("/delete-donar/:id", authMiddelware, adminMiddleware, deleteDonarController);

//EXPORT
module.exports = router;
