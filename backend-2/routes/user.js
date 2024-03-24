// Import the required modules
const express = require("express")
const router = express.Router()

// Import the required controllers and middleware functions
const {
  login,
  signup,
  // changePassword,
} = require("../controllers/Auth")
// const {
//   resetPasswordToken,
//   resetPassword,
// } = require("../controllers/resetPassword")

// const { auth } = require("../middlewares/auth")


// Route for user login
router.post("/login", login)

// Route for user signup
router.post("/signup", signup)


// Route for Changing the password
// router.post("/changepassword", auth, changePassword)


// Export the router for use in the main application
module.exports = router;