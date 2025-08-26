const User = require("./models/user");
const express = require("express");
require("dotenv").config();

const connectDB = require("./config/database");

const app = express();
app.use(express.json());

app.post("/signup", async (req, res) => {
  const userData = req.body
  console.log(userData)
  try {
    const user = new User(userData);
    await user.save();
    res.send("User added successfully");
  } catch (err) {
    res.status(501).send("Unable to add User" + err);
  }
});

app.get("/user", async (req, res) => {
  try {
    const data = await User.findOne({ email: "rohit.sharma@example.com" });
    if (!data) {
      res.send("User not found!");
    } else {
      res.send({
        data: data,
      });
    }
  } catch (e) {
    res.status(501).send("User does not exits");
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

app.patch("/user/update", async(req,res)=>{
  const userData = req.body;
  try{
      await User.updateOne(
        { _id: userData.userId },   
        userData,                   
        { runValidators: true }     
      );
      res.send("User data updated...");
  }
  catch(err){
    res.status(501).send("Something went wrong.")
  }
})



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
