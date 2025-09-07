const jwt = require("jsonwebtoken");
const User = require("../models/user");

require("dotenv").config();
const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    const secretKey = process.env.SECRET_KEY;
    if (!token) {
      throw new Error("Token expires....");
    }

    const decoded = jwt.verify(token, secretKey);
    const user = await User.findOne({ _id: decoded?._id });
    if (!user) {
      throw new Error("User does not exist!");
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
};

module.exports = { userAuth };
