const express = require("express");
const authMiddelware = require("../middlewares/authMiddelware");
const {
  createInventoryController,
  getInventoryController,
  getDonarsController,
  getHospitalController,
  getInventoryHospitalController,
  getRecentInventoryController,
} = require("../controllers/inventoryController");


const {
  bloodGroupDetailsContoller,
} = require("../controllers/inventoryController");

const router = express.Router();

// Analytics Routes For GET BLOOD DATA
router.get("/bloodGroups-data", authMiddelware, bloodGroupDetailsContoller);

// ADD INVENTORY || POST
router.post("/create-inventory", authMiddelware, createInventoryController);

//GET ALL BLOOD RECORDS
router.get("/get-inventory", authMiddelware, getInventoryController);

//GET RECENT BLOOD RECORDS
router.get("/get-recent-inventory", authMiddelware, getRecentInventoryController);

//GET HOSPITAL BLOOD RECORDS
router.post("/get-inventory-hospital", authMiddelware, getInventoryHospitalController);

//GET DONAR RECORDS
router.get("/get-donars", authMiddelware, getDonarsController);

//GET HOSPITAL RECORDS
router.get("/get-hospitals", authMiddelware, getHospitalController);


module.exports = router;
