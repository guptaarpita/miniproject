const express = require("express");
const router = express.Router();
const {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  publishBook,
  rateBook,
  getMyBooks,
} = require("../controllers/bookController.js");
const { protect, authorize } = require("../middleware/authMiddleware");

// Public
router.get("/", getBooks);
router.get("/:id", getBookById);

// Author only
router.get("/user/my-books", protect, authorize("author"), getMyBooks);
router.post("/", protect, authorize("author"), createBook);
router.put("/:id", protect, authorize("author"), updateBook);
router.delete("/:id", protect, authorize("author", "admin"), deleteBook);
router.post("/:id/publish", protect, authorize("author"), publishBook);

// Any authenticated user
router.post("/:id/rate", protect, rateBook);

module.exports = router;
