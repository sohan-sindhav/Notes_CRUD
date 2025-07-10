import express from "express";
import Note from "../models/notes.models.js";
import verifyToken from "../middlewares/VerifyToken.js";
const router = express.Router();

router.post("/note/create", verifyToken, async (req, res) => {
  try {
    const { title, body } = req.body;
    const note = new Note({
      title,
      body,
      user: req.userId,
    });
    await note.save();
    const noteid = note._id;
    res.status(200).json({ msg: "note created", noteid });
  } catch (error) {
    console.log("Error in note creation : ", error);
    res.status(500).json("Internal Server Error");
  }
});

router.get("/note/all", verifyToken, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.userId });
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error fetching notes : ", error);
    res.status(500).json({ msg: "internal server error " });
  }
});

router.delete("/note/delete/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const deletenote = await Note.findByIdAndDelete(id);

    res.status(200).json({ msg: "Note deleted" });
  } catch (error) {
    res.status(500).json({ msg: "Internal server errro" });
  }
});

router.put("/note/update/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, body } = req.body;

    const IsUpdated = await Note.findByIdAndUpdate(id, { title, body });
    if (!IsUpdated) {
      res.status(400).json({ msg: "Note not found" });
    }
    res.status(200).json({ msg: "Note updated" });
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
});

export default router;
