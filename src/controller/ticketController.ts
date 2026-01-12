 import express from "express";
 import dotenv from "dotenv";
 import { verifySignature } from "../services/ticketVerification.js";
 dotenv.config();

 export function linearWebhookHandler (){
    return[
    
 express.json({
    verify: (req: any, _res, buf: Buffer) => {
      req.rawBody = buf;
    },
  }),

  (req: any, res:any) => {
    const signature = req.get("linear-signature");

    //  Verify signature using RAW body
    if (!verifySignature(signature, req.rawBody)) {
      console.log(" Invalid Linear signature");
      return res.sendStatus(401);
    }

    //  Replay protection (Linear requirement)
    if (Math.abs(Date.now() - req.body.webhookTimestamp) > 60 * 1000) {
      console.log(" Webhook timestamp too old");
      return res.sendStatus(401);
    }

    try {
      console.log("Linear webhook verified");
      console.log(req.body); // parsed JSON (safe to use now)


      return res.sendStatus(200);
    } catch (err) {
      console.error(" Error processing webhook:", err);
      return res.sendStatus(500);
    }
  }
]
}