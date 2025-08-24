const mongoose = require("mongoose")

require("dotenv").config();
async function connectDB() {
    await mongoose.connect(process.env.DB_URL);
}

module.exports = connectDB;