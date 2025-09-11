const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const connectionRequestSchema = new Schema(
  {
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
  },
  { timestamps: true }
);

//indexs
connectionRequestSchema.index({fromUserId : 1, toUserId : 1})

//pre save hook
connectionRequestSchema.pre("save", function (next) {
    if (this.fromUserId.equals(this.toUserId)) {
      throw new Error ("You cannot sent connection request to yourself..");
    }

  next();
});

module.exports = mongoose.model("ConnectionRequest", connectionRequestSchema);
