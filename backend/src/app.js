const User = require("./models/user");
const express = require("express");
require("dotenv").config();

const connectDB = require("./config/database");

const app = express();
app.use(express.json());

app.post("/signup", async (req, res) => {
  try {
    const data = {
      firstName: "Rahul",
      lastName: "Dravid",
      email: "rahul@gmail.com",
      password: "rahul@1234",
    };
    // creating new instance of User model
    const user = new User(data);
    await user.save();
    res.send("User added sucessfully");
  } catch (err) {
    res.status(501).send("Unable to add User" + err);
  }
});




app.get("/user/:id", async(req,res)=>{
    try{
        
    const {id} = req.params;
  console.log(id);
    const data = await User.find({_id : id});
    res.send({
        data : data,
    });
    }catch(e){
        res.status(501).send("User does not exits");
    }
})


app.delete("/delete/userid/:id", async(req,res)=>{
    try{
        
    const {id} = req.params;
    const data = await User.deleteOne({_id : id});
    res.send("User deleted successfully..");
    }catch(e){
        res.status(501).send("User does not exits");
    }
})

app.put("/update/userid/:id", async(req,res)=>{
try{
        const {id} = req.params;
    const updatedData = req.body;

    await User.updateOne({_id:id,$set:updatedData})
    res.send("user data updated successfully..")
}catch(err){
    res.status(501).send("User does't exist in the database");
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
