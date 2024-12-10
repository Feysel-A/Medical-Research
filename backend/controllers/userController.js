const userService = require("../services/userService");
const { generateToken } = require('../config/jwtConfig');
// Handles the user registration logic
const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required." });
    }

    // Call the service to register the user
    const result = await userService.register(username, password);

    res.status(201).json({
      message: "User registered successfully.",
      userId: result.insertId,
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({
      message: "An error occurred while registering the user.",
      error,
    });
  }
};

// Handles user login
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required." });
    }

    // Authenticate the user
    const user = await userService.authenticate(username, password);

    if (!user) {
      return res.status(401).json({ message: "Invalid username or password." });
    }
    // Generate JWT token
    const token = generateToken(user);

    res.status(200).json({ message: "Login successful.", token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "An error occurred while logging in." });
  }
};
module.exports = { registerUser, loginUser };
