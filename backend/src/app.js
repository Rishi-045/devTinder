const User = require("./models/user");
const bcrypt = require("bcrypt");
const express = require("express");
require("dotenv").config();
const { validateSignUpData } = require("../utils/validation");

const connectDB = require("./config/database");

const app = express();
app.use(express.json());

app.post("/signup", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    validateSignUpData(req);
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);

    const user = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });
    await user.save();
    res.send("User added successfully");
  } catch (err) {
    res.status(501).send("Unable to add User" + err);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("User not found. Please sign up first.");
    }
    const encryptPassword = user.password;
    const isPasswordValid = await bcrypt.compare(password, encryptPassword);
    if (!isPasswordValid) {
      throw new Error("Incorrect Password");
    }
    res.send("Logged in Successfully.......");
  } catch (err) {
    res.status(501).send("Error : " + err.message);
  }
});

app.get("/user", async (req, res) => {
  const { email } = req.body;
  try {
    const data = await User.findOne({ email: email });
    if (!data) {
      res.send("User not found!");
    } else {
      res.send({
        data: data,
      });
    }
  } catch (e) {
    res.status(501).send("Something went wrong!");
  }
});

app.delete("/delete/userid/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.send("User deleted successfully..");
  } catch (e) {
    res.status(501).send("User does not exits");
  }
});

app.patch("/user/update/:id", async (req, res) => {
  try {
    const userId = req.params?.id;
    const userData = req.body;
    console.log(userData);
    const ALLOWED_UPADATES = ["photoUrl", "about", "skills", "age", "gender"];
    const isALLOWED = Object.keys(userData).every((k) =>
      ALLOWED_UPADATES.includes(k)
    );
    if (!isALLOWED) {
      throw new Error("Update not allowed!");
    }
    if (userData?.skills?.length > 10) {
      throw new Error("Skills cannot be more than 10.");
    }
    await User.updateOne({ _id: userId }, userData, { runValidators: true });
    res.send("User data updated...");
  } catch (err) {
    res.status(501).send("Something went wrong." + err.message);
  }
});

connectDB()
  .then(() => {
    console.log("Database connection is Established...");
    app.listen(3000, () => {
      console.log("Server is successfully runnimg on the port no. 5000.");
    });
  })
  .catch((err) => {
    console.log("Database Connection failed !");
  });
