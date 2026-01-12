import crypto from "node:crypto";
import express from "express";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const LINEAR_WEBHOOK_SECRET = process.env.LINEAR_WEBHOOK_SECRET;
if (!LINEAR_WEBHOOK_SECRET) {
    throw new Error("LINEAR_WEBHOOK_SECRET is not set");
}
//  Signature verification (same logic as Linear)
function verifySignature(signature, rawBody) {
    if (typeof signature !== "string")
        return false;
    if (!LINEAR_WEBHOOK_SECRET) {
        throw new Error("LINEAR_WEBHOOK_SECRET is not set");
    }
    const headerSignature = Buffer.from(signature, "hex");
    const computedSignature = crypto
        .createHmac("sha256", LINEAR_WEBHOOK_SECRET)
        .update(rawBody)
        .digest();
    return crypto.timingSafeEqual(computedSignature, headerSignature);
}
export const getTicket = app.post("/linear", 
// Capture RAW body exactly 
express.json({
    verify: (req, _res, buf) => {
        req.rawBody = buf;
    },
}), (req, res) => {
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
    }
    catch (err) {
        console.error(" Error processing webhook:", err);
        return res.sendStatus(500);
    }
});
//# sourceMappingURL=getTicket.js.map