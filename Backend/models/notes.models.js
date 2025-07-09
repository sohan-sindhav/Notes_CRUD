import mongoose, { mongo } from "mongoose";
import verifyToken from "../middlewares/VerifyToken.js";

const notesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Note = mongoose.model("Note", notesSchema);

export default Note;
