const bcrypt = require("bcrypt");
const { createUser } = require("../models/userModel");
const { readUsers, writeUsers } = require("../config/db");
const { generateAccessToken, generateRefreshToken } = require("../utils/generateToken");

// ─── REGISTER ─────────────────────────────────────────────
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1. Validate fields
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    // 2. Check if email already exists
    const users = readUsers();
    const existingUser = users.find((user) => user.email === email);

    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // 3. Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Create new user
    const newUser = createUser(name, email, hashedPassword);

    // 5. Save user
    users.push(newUser);
    writeUsers(users);

    // 6. Respond
    res.status(201).json({ message: "User registered successfully!" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// ─── LOGIN ────────────────────────────────────────────────
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Validate fields
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 2. Check if user exists
    const users = readUsers();
    const user = users.find((u) => u.email === email);

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // 3. Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // 4. Generate tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // 5. Send refresh token as HTTP-only cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // 6. Send access token and user info
    res.status(200).json({
      message: "Login successful!",
      accessToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// ─── FORGOT PASSWORD ───────────────────────────────────────
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const { readTokens, writeTokens } = require("../config/db");

const forgotPassword = async (req, res) => {
    console.log("🔥 Forgot password route hit!");  // ADD THIS
    console.log("Email received:", req.body.email); // ADD THIS
  try {
    const { email } = req.body;

    // 1. Validate email
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // 2. Check if user exists
    const users = readUsers();
    const user = users.find((u) => u.email === email);

    if (!user) {
      // Don't reveal if email exists or not (security!)
      return res.status(200).json({ message: "If this email exists, a reset link has been sent." });
    }

    // 3. Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiry = Date.now() + 15 * 60 * 1000; // 15 minutes

    // 4. Save token
    const tokens = readTokens();
    // Remove any existing token for this email
    const filteredTokens = tokens.filter((t) => t.email !== email);
    filteredTokens.push({ email, resetToken, resetTokenExpiry });
    writeTokens(filteredTokens);

    // 5. Send reset email
    const resetLink = `http://localhost:3000/reset-password?token=${resetToken}&email=${email}`;

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Password Reset Request</h2>
        <p>Hello <strong>${user.name}</strong>,</p>
        <p>You requested to reset your password. Click the button below:</p>
        <a href="${resetLink}" 
           style="background-color: #4CAF50; color: white; padding: 12px 24px; 
                  text-decoration: none; border-radius: 4px; display: inline-block;">
          Reset Password
        </a>
        <p style="color: #999; margin-top: 20px;">
          This link expires in <strong>15 minutes</strong>.
          If you didn't request this, ignore this email.
        </p>
      </div>
    `;

    await sendEmail(email, "Password Reset Request - AuthVault", html);

    res.status(200).json({ message: "If this email exists, a reset link has been sent." });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// ─── RESET PASSWORD ───────────────────────────────────────
const resetPassword = async (req, res) => {
  try {
    const { email, token, newPassword } = req.body;

    // 1. Validate fields
    if (!email || !token || !newPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    // 2. Find token
    const tokens = readTokens();
    const resetRecord = tokens.find(
      (t) => t.email === email && t.resetToken === token
    );

    if (!resetRecord) {
      return res.status(400).json({ message: "Invalid or expired reset token" });
    }

    // 3. Check token expiry
    if (Date.now() > resetRecord.resetTokenExpiry) {
      return res.status(400).json({ message: "Reset token has expired" });
    }

    // 4. Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // 5. Update user password
    const users = readUsers();
    const userIndex = users.findIndex((u) => u.email === email);
    users[userIndex].password = hashedPassword;
    writeUsers(users);

    // 6. Delete used token
    const updatedTokens = tokens.filter((t) => t.email !== email);
    writeTokens(updatedTokens);

    res.status(200).json({ message: "Password reset successful! Please login." });

  } catch (error) {
    console.error("❌ Forgot password error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { register, login, forgotPassword, resetPassword};