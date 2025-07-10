import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const MONGO_URI = process.env.MONGO_URI;

const connectDB = () => {
  try {
    mongoose.connect(MONGO_URI).then(() => {
      console.log("MongoDB connected !!");
    });
  } catch (error) {
    console.log("Error connecting mongoDB", error);
  }
};

export default connectDB;
