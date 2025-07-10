import express from "express";
import connectDB from "./config/DB.js";
import dotenv from "dotenv";
import notesRoute from "./routes/notesRoutes.js";
import AuthRoute from "./routes/authRoutes.js";
import cors from "cors";

dotenv.config();

const app = express();

const corsOptions = {
  origin: process.env.FRONTEND_ORIGIN || "https://notes-gilt-pi.vercel.app",
  credentials: true,
};

app.use(cors(corsOptions));

// app.options("/*", cors(corsOptions));

app.use(express.json());

const PORT = process.env.PORT;
connectDB();

app.use("/api/v1", notesRoute);
app.use("/api/v1", AuthRoute);

app.listen(PORT, () => {
  console.log(`App is listening on port : ${PORT}`);
});
