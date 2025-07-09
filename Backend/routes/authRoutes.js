import express from "express";
import User from "../models/user.models.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

router.post("/user/create", async (req, res) => {
  try {
    const { username, password } = req.body;
    const alreadyRegistred = await User.findOne({ username });
    if (alreadyRegistred) {
      return res.status(400).json({ msg: "User already registered." });
    }
    const NewUser = new User({
      username,

      password,
    });
    if (!NewUser) {
      res.status(400).json({ msg: "Error creating user" });
    }
    await NewUser.save();
    const UserId = NewUser._id;
    res.status(200).json({ msg: "User created", Userid: UserId });
  } catch (error) {
    console.log(error);

    res.status(500).json({ msg: "Server Error" });
  }
});

router.post("/user/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const finduser = await User.findOne({ username });
    const IsMatch = finduser.password === password;
    if (!IsMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }
    const Token = jwt.sign({ userId: finduser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({ Token });
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
});

export default router;
