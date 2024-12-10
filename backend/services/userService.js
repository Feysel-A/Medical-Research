const bcrypt = require("bcrypt");
const db = require("../config/db");

// Service function to handle user registration
const register = async (username, password) => {
  // Hash the password for security
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insert the user into the database
  const query = "INSERT INTO Users (username, password_hash) VALUES (?, ?)";
  const [result] = await db.query(query, [username, hashedPassword]);

  return result; // Returns the result of the query (e.g., insertId)
};
// Authenticate user credentials
const authenticate = async (username, password) => {
  // Find the user by username
  const query = "SELECT * FROM Users WHERE username = ?";
  const [rows] = await db.query(query, [username]);

  if (rows.length === 0) {
    return null; // User not found
  }

  const user = rows[0];

  // Compare the provided password with the hashed password
  const isPasswordValid = await bcrypt.compare(password, user.password_hash);

  if (!isPasswordValid) {
    return null; // Invalid credentials
  }

  return user; // Return the user if authentication succeeds
};
module.exports = { register, authenticate };
