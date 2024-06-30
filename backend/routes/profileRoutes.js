const express = require("express")
const router = express.Router()
const { auth  } = require("../middlewares/auth")
const {
  deleteAccount,
  updateProfile,
  updateDisplayPicture,
} = require("../controllers/ProfileController")

// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************
router.delete("/deleteProfile", auth, deleteAccount)
router.put("/updateProfile",  auth, updateProfile)
router.put("/updateDisplayPicture", auth, updateDisplayPicture)


module.exports = router;
