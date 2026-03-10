const rateLimit = require("express-rate-limit");

// ─── General Rate Limiter (all routes) ────────────────────
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // max 100 requests per 15 minutes
  message: {
    message: "Too many requests, please try again after 15 minutes.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// ─── Auth Rate Limiter (login/register routes) ────────────
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // max 10 requests per 15 minutes
  message: {
    message: "Too many login attempts, please try again after 15 minutes.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = { generalLimiter, authLimiter };