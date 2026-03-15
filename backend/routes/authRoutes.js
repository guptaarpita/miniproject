const express = require("express");
const router = express.Router();
const {
  sendRegistrationOTP,
  verifyOTPAndRegister,
  resendOTP,
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  linkWallet,
} = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");
const {
  validateRegister,
  validateLogin,
  validate,
} = require("../utils/validators");

// Public routes
router.post("/send-otp", validateRegister, validate, sendRegistrationOTP);
router.post("/verify-otp", verifyOTPAndRegister);
router.post("/resend-otp", resendOTP);
router.post("/register", validateRegister, validate, registerUser);
router.post("/login", validateLogin, validate, loginUser);

// Private routes
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);
router.post("/link-wallet", protect, linkWallet);

module.exports = router;
