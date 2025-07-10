import express from "express";
import connectDB from "./config/DB.js";
import dotenv from "dotenv";
import notesRoute from "./routes/notesRoutes.js";
import AuthRoute from "./routes/authRoutes.js";
import cors from "cors";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({ origin: process.env.FRONTEND_ORIGIN }));
const PORT = process.env.PORT;
connectDB();

app.use("/api/v1", notesRoute);
app.use("/api/v1", AuthRoute);

app.listen(PORT, () => {
  console.log(`App is listening on port : ${PORT}`);
});
