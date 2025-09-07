const express = require("express");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/database");
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cookieParser());

const { authRouter } = require("./routes/auth");
const { profileRouter } = require("./routes/profile");
const { requestRouter } = require("./routes/request");

app.use("/", authRouter);
app.use("/", requestRouter);
app.use("/", profileRouter);

connectDB()
  .then(() => {
    console.log("Database connection is Established...");
    app.listen(3000, () => {
      console.log("Server is successfully runnimg on the port no. 5000.");
    });
  })
  .catch((err) => {
    console.log("Database Connection failed !" + err.message);
  });
