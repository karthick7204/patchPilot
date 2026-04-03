import express from "express";
import dotenv from "dotenv";
import { getTicket } from "./routes/getTicket.js";
import { startMcp } from "./mcp/server.js";
import mongoose from "mongoose";
dotenv.config();

const app = express();
const port = Number(process.env.PORT || 3001);

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      console.warn("MONGODB_URI is not defined in environment variables. Database connection skipped.");
      return;
    }
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

connectDB();

app.use("/", getTicket);
startMcp(app);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
 // "dev": "concurrently -k \"npm run watch\" \"nodemon --watch dist dist/index.js\""
 