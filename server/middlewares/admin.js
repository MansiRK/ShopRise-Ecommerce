/* eslint-disable consistent-return */
const db = require("../database");

// const authenticateAdmin = async (req, res, next) => {
//   try {
//     const userId = req.users.user_id;
//     const userQuery = "SELECT role FROM users WHERE user_id = ?";
//     const [rows] = await db.query(userQuery, [userId]);

//     if (rows.length === 0) {
//       return res.status(400).json({
//         message: "User not found",
//       });
//     }

//     const user = rows[0];

//     if (user.role !== 1) {
//       return res.status(400).json({
//         message: "Unauthorized access",
//       });
//     }

//     next();
//   } catch (error) {
//     return res.status(500).json({
//       message: `Admin authentiction failed due to ${error.message}`,
//     });
//   }
// };

const authenticateAdmin = (req, res, next) => {
  try {
    const userId = req.user.user_id;

    const userQuery = "SELECT role FROM users WHERE user_id = ?";

    db.query(userQuery, [userId], (error, rows) => {
      if (error) {
        return res.status(500).json({
          message: `Failed due to ${error.message}`,
        });
      }
      if (rows.length === 0) {
        return res.status(400).json({
          message: "User not found",
        });
      }

      const userRole = rows[0].role;

      req.user = {
        user_id: userId,
        role: userRole,
      };
      // const user = rows[0].user_id;
      // console.log(user);

      // console.log(req.user);

      if (req.user.role !== 1) {
        return res.status(400).json({
          message: "Unauthorized access",
        });
      }
      next();
    });
  } catch (error) {
    res.status(500).json({
      message: `Admin authentiction failed due to ${error.message}`,
    });
  }
};

module.exports = authenticateAdmin;
