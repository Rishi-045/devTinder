const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const connectionRequestSchema = new Schema({
  fromUserId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  toUserId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: {
      values: ["ignored", "accepted", "rejected", "interested"],
      message: `{VALUE} is incorrect status type.`,
    },
  },
});

module.exports = mongoose.model("ConnectionRequest", connectionRequestSchema);
