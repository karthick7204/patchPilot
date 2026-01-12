import express from "express";
import dotenv from "dotenv";
import { getTicket } from "./routes/getTicket.js";
dotenv.config();

const app = express();
const port = Number(process.env.PORT || 3000);



app.use("/", getTicket);



app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
