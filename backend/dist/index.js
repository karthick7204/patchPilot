import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { getTicket } from "./routes/getTicket.js";
import githubTokenRouter from "./routes/githubTokenRoute.js";
import authRouter from "./routes/authRoute.js";
import { startMcp } from "./mcp/server.js";
import mongoose from "mongoose";
dotenv.config();
const app = express();
app.use(cors());
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
    }
    catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};
connectDB();
// Request Logger
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});
// Global JSON parsing with raw body support (needed for signature verification)
app.use(express.json({
    verify: (req, _res, buf) => {
        req.rawBody = buf;
    }
}));
app.use("/api/auth", authRouter);
app.use("/", getTicket);
app.use("/", githubTokenRouter);
startMcp(app);
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
// "dev": "concurrently -k \"npm run watch\" \"nodemon --watch dist dist/index.js\""
//# sourceMappingURL=index.js.map