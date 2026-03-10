const fs = require("fs");
const path = require("path");

const usersFilePath = path.join(__dirname, "../data/users.json");
const tokensFilePath = path.join(__dirname, "../data/resetTokens.json");

// ─── Users ────────────────────────────────────────────────
const readUsers = () => {
  const data = fs.readFileSync(usersFilePath, "utf-8");
  return JSON.parse(data);
};

const writeUsers = (users) => {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
};

// ─── Reset Tokens ─────────────────────────────────────────
const readTokens = () => {
  if (!fs.existsSync(tokensFilePath)) return [];
  const data = fs.readFileSync(tokensFilePath, "utf-8");
  return JSON.parse(data);
};

const writeTokens = (tokens) => {
  fs.writeFileSync(tokensFilePath, JSON.stringify(tokens, null, 2));
};

module.exports = { readUsers, writeUsers, readTokens, writeTokens };