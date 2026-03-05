const express = require("express");
const router = express.Router();
const {
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
router.post("/register", validateRegister, validate, registerUser);
router.post("/login", validateLogin, validate, loginUser);

// Private routes
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);
router.post("/link-wallet", protect, linkWallet);

module.exports = router;
