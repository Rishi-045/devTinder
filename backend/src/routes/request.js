const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middleware/userAuth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      const allowedStatus = ["ignored", "interested"];
      const isStatusAllowed = allowedStatus.includes(status);
      if (!isStatusAllowed) {
        return res.status(400).json({
          message: `Invalid status type : ${status}`,
        });
      }

      // if toUserId is not in our db
      const isToUserExist = await User.findById(toUserId);
      if (!isToUserExist) {
        return res.status(400).json({
          message: "Invalid request",
        });
      }

      // if connection request already exist
      const isConnectionRequestExist = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });
      if (isConnectionRequestExist) {
        return res.status(400).json({
          message: "Connection request exist!.",
        });
      }
      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      const data = await connectionRequest.save();
      console.log(data);
      res.json({
        message: `Profile marked as ${status}.`,
        data: data,
      });
    } catch (err) {
      res.status(501).send("ERROR : " + err.message);
    }
  }
);

module.exports = { requestRouter };
