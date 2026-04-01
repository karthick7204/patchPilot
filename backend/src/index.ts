import express from "express";
import dotenv from "dotenv";
import { getTicket } from "./routes/getTicket.js";
import {startMcp} from "./mcp/server.js";
dotenv.config();

const app = express();
const port = Number(process.env.PORT || 3000);

app.use("/", getTicket);
startMcp(app);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
 // "dev": "concurrently -k \"npm run watch\" \"nodemon --watch dist dist/index.js\""
