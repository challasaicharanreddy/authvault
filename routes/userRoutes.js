const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const authorizeRoles = require("../middleware/roleMiddleware");

// ─── Protected Route (any logged in user) ─────────────────
router.get("/dashboard", verifyToken, (req, res) => {
  res.status(200).json({
    message: `Welcome ${req.user.email}!`,
    user: req.user,
  });
});

// ─── Admin Only Route ──────────────────────────────────────
router.get("/admin", verifyToken, authorizeRoles("admin"), (req, res) => {
  res.status(200).json({
    message: "Welcome Admin!",
    user: req.user,
  });
});

module.exports = router;