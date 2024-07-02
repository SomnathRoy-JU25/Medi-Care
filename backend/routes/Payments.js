const express = require("express");
const router = express.Router();
const { capturePayment, verifyPayment } = require("../controllers/Payments");

router.post("/capturePayment", capturePayment);
router.post("/verifyPayment", verifyPayment);

module.exports = router;
