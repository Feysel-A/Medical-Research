const jwt = require("jsonwebtoken");

// Secret key for signing JWTs
const SECRET_KEY = "your_secret_key"; // Replace with a secure, environment-stored value

// Generate JWT Token
const generateToken = (user) => {
  return jwt.sign(
    { userId: user.user_id, username: user.username }, // Payload
    SECRET_KEY, // Secret key
    { expiresIn: "1d" } // Expiration time
  );
};

module.exports = { generateToken, SECRET_KEY };
