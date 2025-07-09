import mongoose from "mongoose";

const connectDB = () => {
  try {
    mongoose
      .connect(
        "mongodb+srv://sohann7704:1b02eZHy6FxfN81J@practice1.9gwxe27.mongodb.net/NotePrac01"
      )
      .then(() => {
        console.log("MongoDB connected !!");
      });
  } catch (error) {
    console.log("Error connecting mongoDB", error);
  }
};

export default connectDB;
