const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middleware/userAuth");
const User = require("../models/user");
const { validateEditProfileData } = require("../../utils/validation");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  const user = req.user;
  console.log(user);
  try {
    res.send(user);
  } catch (err) {
    res.status(501).send("ERROR : " + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    const updates = req.body;
    const isAllowed = validateEditProfileData(req);
    if (!isAllowed) {
      return res.status(400).send("Invalid fields in update!");
    }

    //  update fields in req.user
    Object.keys(updates).forEach((key) => (req.user[key] = updates[key]));

    // Save updated user
    await req.user.save();
    console.log(req.user);
    res.json({ message: "Profile updated successfully", user: req.user });
  } catch (err) {
    res.status(500).send("ERROR : " + err.message);
  }
});

module.exports = { profileRouter };
