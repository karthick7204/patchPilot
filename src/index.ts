import express from 'express';
import dotenv from 'dotenv';
import ngrok  from 'ngrok';
import bodyParser from 'body-parser';
dotenv.config();
const app = express();
app.use(express.json());
const port = parseInt(process.env.PORT || "3000");

app.post("/jira", (req, res) => {
  console.log("Jira webhook received");
  const rawjson = req.body
  
  const payload = JSON.parse(rawjson.description);
  console.log(payload.issue)

  res.status(200).send("OK");
});
app.listen(port,() =>{
    console.log(`Server is running at http://localhost:${port}`)
})