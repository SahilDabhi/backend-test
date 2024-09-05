require("dotenv").config();
const { default: mongoose } = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("connected to database");
  } catch (error) {
    console.log(error);
    process.exit(0);
  }
};

module.exports = connectDb;
