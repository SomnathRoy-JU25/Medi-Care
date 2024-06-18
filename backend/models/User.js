// Import the Mongoose library
const mongoose = require("mongoose");

// Define the user schema using the Mongoose Schema constructor
const userSchema2 = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    accountType: {
      type: String,
      enum: ["User", "Doctor"],
    },
    additionalDetails: {
      type: mongoose.Schema.Types.ObjectId,
      // required: true,
      ref: "Profile",
    },
    contactNumber: {
      type: Number,
    },
    token: {
      type: String,
    },
    resetPasswordExpires: {
      type: Date,
    },
    image: {
      type: String,
    },
    isDoctor: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    notification: {
      type: Array,
      default: [0],
    },
    seennotification: {
      type: Array,
      default: [],
    },
    // Add timestamps for when the document is created and last modified
  },
  { timestamps: true }
);

module.exports = mongoose.model("Users", userSchema2);
