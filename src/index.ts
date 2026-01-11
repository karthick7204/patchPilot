import express from 'express';
import dotenv from 'dotenv';
import ngrok  from 'ngrok';
import bodyParser from 'body-parser';
dotenv.config();
const app = express();
app.use(express.json());
const port = parseInt(process.env.PORT || "3000");

app.post("/linear", (req, res) => {
  console.log("linear webhook received");
  const rawjson = req.body
  
  console.log(rawjson);
  res.status(200).send("OK");
});
app.listen(port,() =>{
    console.log(`Server is running at http://localhost:${port}`)
})

