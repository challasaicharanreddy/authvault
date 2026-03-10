const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    // 1. Get token from Authorization header
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

    // 2. Check if token exists
    if (!token) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }

    // 3. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. Attach user info to request
    req.user = decoded;

    // 5. Move to next middleware/route
    next();

  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired. Please login again." });
    }
    return res.status(403).json({ message: "Invalid token." });
  }
};

module.exports = verifyToken;