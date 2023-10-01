/* eslint-disable consistent-return */
const jwt = require("jsonwebtoken");
// eslint-disable-next-line import/no-unresolved, import/extensions
const db = require("../database");

const authenticateUser = async (req, res, next) => {
  try {
    const accessToken = req.header("Authorization");

    if (!accessToken) {
      return res.status(400).json({
        message: "Invalid authentication. No token present",
      });
    }

    const decodeToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN);

    if (!decodeToken) {
      return res.status(400).json({
        message: "Invalid authentication. Wrong token",
      });
    }

    // console.log(decodeToken);

    // const userQuery = "SELECT * FROM users WHERE user_id = ?";
    // const [rows] = db.query(userQuery, [decodeToken.user_id]);

    // console.log(rows);
    // if (rows.length === 0) {
    //   return res.status(404).json({
    //     message: "User not found",
    //   });
    // }

    // // eslint-disable-next-line prefer-destructuring
    req.user = {
      user_id: decodeToken.user_id,
    };

    next();
  } catch (error) {
    return res.status(500).json({
      message: `Authentication failed due to ${error.message}`,
    });
  }
};

module.exports = authenticateUser;
