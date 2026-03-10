const { v4: uuidv4 } = require("uuid");

const createUser = (name, email, hashedPassword, role = "user") => {
  return {
    id: uuidv4(),
    name,
    email,
    password: hashedPassword,
    role,
    createdAt: new Date().toISOString(),
  };
};

module.exports = { createUser };