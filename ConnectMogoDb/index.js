const mongoose = require("mongoose");

const MONGODB_COMPASS_URL = process.env.MONGODB_COMPASS_URL;

async function connect() {
  try {
    await mongoose.connect(MONGODB_COMPASS_URL);
    console.log("Connect to DB Successfully!!!");
  } catch (error) {
    console.log("Connect Failure!!!");
  }
}

module.exports = { connect };
