const express = require("express")
const router = express.Router()
const { auth } = require("../middlewares/auth")
const {
  deleteAccount,
  updateProfile,
  getAllUserDetails,
  updateDisplayPicture,
} = require("../controllers/profile")

// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************
// Delet User Account
router.delete("/deleteProfile", auth, deleteAccount)
router.get("/getUserDetails", auth, getAllUserDetails)
router.put("/updateProfile",  updateProfile)
router.put("/updateDisplayPicture", updateDisplayPicture)


module.exports = router;
