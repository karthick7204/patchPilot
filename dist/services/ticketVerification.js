import crypto from "node:crypto";
import dotenv from "dotenv";
dotenv.config();
const LINEAR_WEBHOOK_SECRET = process.env.LINEAR_WEBHOOK_SECRET;
if (!LINEAR_WEBHOOK_SECRET) {
    throw new Error("LINEAR_WEBHOOK_SECRET is not set");
}
export function verifySignature(signature, rawBody) {
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
//# sourceMappingURL=ticketVerification.js.map