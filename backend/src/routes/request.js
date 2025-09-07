const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middleware/userAuth");

requestRouter.post("/sendConnectionRequest", userAuth, (req, res) => {
  const user = req.user;
  try {
    res.send(
      "connection request made by : " + user.firstName + "" + user.lastName
    );
  } catch (err) {
    res.status(501).send("ERROR : " + err.message);
  }
});

module.exports = { requestRouter };
