const express = require("express");
const { validateSignUpData } = require("../../utils/validation");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    validateSignUpData(req);

    const user = new User({
      firstName,
      lastName,
      email,
      password,
    });
    await user.save();
    res.send("User added successfully");
  } catch (err) {
    res.status(501).send("Unable to add User" + err);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("User not found. Please sign up first.");
    }

    const isPasswordValid = await user.validatePassword(password);
    if (!isPasswordValid) {
      throw new Error("Incorrect Password");
    }
    // create jwt token and send it in cookie
    const token = user.getJWT();
    console.log(token);
    res.cookie("token", token);
    res.send("Logged in Successfully.......");
  } catch (err) {
    res.status(501).send("Error : " + err.message);
  }
});

authRouter.post("/logout", (req, res) => {
  res.clearCookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send("Logout Successfully........");
});

module.exports = { authRouter };
