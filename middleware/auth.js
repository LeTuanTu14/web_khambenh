const jwt = require("jsonwebtoken");
require("dotenv").config();
const verifyToken = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader)
    return res
      .status(401)
      .json({ success: false, message: "Chưa có token!!!" });
  try {
    const decoded = jwt.verify(authHeader, process.env.ACCESS_TOKEN_SECRET);
    req.id = decoded.id;
    next();
  } catch (error) {
    return res
      .status(403)
      .json({ success: false, message: "Token không hợp lệ!!!" });
  }
};
module.exports = { verifyToken };
