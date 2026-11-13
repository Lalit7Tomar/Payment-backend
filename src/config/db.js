const mongoose = require("mongoose");
async function connecttoDB() {
  try {
    if (!process.env.MONGO_URI) {
      console.log("plz provide mongodb uri");
    }
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Database is connected");
  } catch (err) {
    console.log("Database connection failed", err);
    throw err;
  }
}
module.exports = connecttoDB;
