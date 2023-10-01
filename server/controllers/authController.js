/* eslint-disable comma-dangle */
/* eslint-disable consistent-return */
/* eslint-disable function-paren-newline */
/* eslint-disable operator-linebreak */
/* eslint-disable object-curly-newline */
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../database");

// Register user
const register = (req, res) => {
  const { username, email, password, name, address, phone } = req.body;

  const newUsername = username.toLowerCase().replace(/ /g, "");

  if (!name) {
    return res.status(400).json({
      message: "Please provide your name",
    });
  }
  if (!username) {
    return res.status(400).json({
      message: "Please provide your username",
    });
  }
  if (!email) {
    return res.status(400).json({
      message: "Please provide your email",
    });
  }
  if (!password) {
    return res.status(400).json({
      message: "Please provide password",
    });
  }
  if (password.length < 6) {
    return res.status(400).json({
      message: "Please enter password greater than 6 characters",
    });
  }
  if (!address) {
    return res.status(400).json({
      message: "Please provide your address",
    });
  }
  if (!phone) {
    return res.status(400).json({
      message: "Please provide your phone number",
    });
  }
  // Checking if user email already exist
  const checkQuery = "SELECT * FROM users WHERE email = ?";

  db.query(checkQuery, [email], async (error, results) => {
    if (error) {
      return res.status(500).json({
        message: `Error in registering user: ${error.message}`,
      });
    }
    if (results.length > 0) {
      return res.status(400).json({
        message: "User email already exist. Please login",
        existingUser: results,
      });
    }
    // Create new user
    // Hashing password
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert query
    const insertQuery =
      "INSERT INTO users (username, email, password, name, address, phone) VALUES (?, ?, ?, ?, ?, ?)";

    db.query(
      insertQuery,
      [newUsername, email, hashedPassword, name, address, phone],
      // eslint-disable-next-line no-shadow
      (error, result) => {
        // If error
        if (error) {
          return res.status(500).json({
            message: `Error in registering user: ${error.message}`,
          });
        }

        const registeredUser = {
          name,
          username: newUsername,
          email,
          password: hashedPassword,
          address,
          phone,
        };
        // Registered user
        return res.status(200).json({
          message: "User registered successfully",
          user: registeredUser,
        });
      }
    );
  });
};

// Login user
const login = (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({
      message: "Please provide your email",
    });
  }
  if (!password) {
    return res.status(400).json({
      message: "Please provide password",
    });
  }

  const findQuery = "SELECT * FROM users WHERE email = ?";

  db.query(findQuery, [email], (error, result) => {
    if (error) {
      return res.status(500).json({
        message: `Failed to login user. ${error.message}`,
      });
    }

    if (result.length === 0) {
      return res.status(404).json({
        message: "User not found with this email address",
      });
    }

    const comparePassword = bcrypt.compare(password, result[0].password);

    if (!comparePassword) {
      return res.status(400).json({
        message: "Invalid Credentials",
      });
    }

    // eslint-disable-next-line no-use-before-define
    const accessToken = createAccessToken({
      user_id: result[0].user_id,
    });

    const loggedInUser = {
      user_id: result[0].user_id,
      email,
      name: result[0].name,
      username: result[0].username,
      role: result[0].role,
      address: result[0].address,
      phone: result[0].phone,
    };

    return res.status(200).json({
      message: "User logged in successfully",
      user: loggedInUser,
      accessToken,
    });
  });
};

// Logout user
const logout = (req, res) => {
  // Clearing refresh token from cookie
  res.clearCookie("token", {
    path: "/token",
  });

  return res.status(200).json({
    message: "User logged out successfully",
  });
};

const createAccessToken = (payload) =>
  jwt.sign(payload, process.env.ACCESS_TOKEN, {
    expiresIn: "7d",
  });

const authUser = (req, res) => {
  res.status(200).json({
    message: "User is authenticated",
    valid: true,
  });
};

const authAdmin = (req, res) => {
  res.status(200).json({
    message: "Admin is authenticated",
    valid: true,
  });
};

module.exports = {
  register,
  login,
  logout,
  authUser,
  authAdmin,
};
