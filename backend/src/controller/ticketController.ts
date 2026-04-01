 import express from "express";
 import dotenv from "dotenv";
 import { verifySignature } from "../services/ticketVerification.js";
 import { handleLinearTask } from "../mcp/git_clone.js";
 dotenv.config();

 export function linearWebhookHandler (){

  function extractGitHubUrl(description: string): string | null {
    // Regex to find a GitHub URL within brackets or plain text
    const githubRegex = /https:\/\/github\.com\/[\w\-\.]+\/[\w\-\.]+/i;
    
    const match = description.match(githubRegex);
    
    return match ? match[0] : null;
  }
    return[
    
 express.json({
    verify: (req: any, _res, buf: Buffer) => {
      req.rawBody = buf;
    },
  }),

  async (req: any, res:any) => {
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
      console.log(" Processing issue:", req.body.data.id);
      console.log("description: from the", req.body.data.description);

      const description = req.body.data.description; 
      const title = req.body.data.title;
      
      const repoUrl = extractGitHubUrl(description);
      
      if (repoUrl) {
       console.log("Extracted Repo URL:", repoUrl);
       await handleLinearTask(req.body.data.id, repoUrl , description, title);

       console.log(`this is from the ticketcontroller ${req.body.data.description}`);
      } else{
      console.error(" No GitHub link is null.");
      }
      return res.sendStatus(200);
    } catch (err) {
      console.error(" Error processing webhook:", err);
      return res.sendStatus(500);
    }
  }
]
}