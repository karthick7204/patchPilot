import express from "express";
import dotenv from "dotenv";
import { verifySignature } from "../services/ticketVerification.js";
import { handleLinearTask } from "../mcp/git_clone.js";
import Issue from "../models/Issue.js";
dotenv.config();
export function linearWebhookHandler() {
    function extractGitHubUrl(description) {
        // Improved regex to find a GitHub URL
        const githubRegex = /https:\/\/github\.com\/([a-zA-Z0-9-._]+)\/([a-zA-Z0-9-._]+)/i;
        const match = description.match(githubRegex);
        return match ? match[0].replace(/\/$/, "") : null;
    }
    function cleanDescription(description) {
        // Remove the GitHub URL and trim spaces
        const githubRegex = /https:\/\/github\.com\/[\w\-\.]+\/[\w\-\.]+/gi;
        return description.replace(githubRegex, "").trim();
    }
    return [
        express.json({
            verify: (req, _res, buf) => {
                req.rawBody = buf;
            },
        }),
        async (req, res) => {
            const signature = req.get("linear-signature");
            // Verify signature using RAW body
            if (!verifySignature(signature, req.rawBody)) {
                console.log(" Invalid Linear signature");
                return res.sendStatus(401);
            }
            // Replay protection (Linear requirement)
            if (Math.abs(Date.now() - req.body.webhookTimestamp) > 60 * 1000) {
                console.log(" Webhook timestamp too old");
                return res.sendStatus(401);
            }
            const { data } = req.body;
            const description = data.description || "";
            const title = data.title;
            const repoUrl = extractGitHubUrl(description);
            if (!repoUrl) {
                console.error(" No GitHub link found in the description.");
                return res.sendStatus(200);
            }
            // Respond immediately to prevent Linear timeout
            res.sendStatus(200);
            // Background processing
            (async () => {
                try {
                    console.log("Processing Linear webhook in background:", data.id);
                    const cleanedDescription = cleanDescription(description);
                    const issue = new Issue({
                        name: title,
                        description: cleanedDescription,
                        githubLink: repoUrl,
                        linearIssueId: data.identifier || data.id,
                        linearUrl: data.url,
                        status: data.state?.name,
                        priority: data.priority,
                        metadata: data,
                    });
                    await issue.save();
                    await handleLinearTask(data.id, repoUrl, cleanedDescription, title);
                    console.log(`Successfully completed task for issue ${data.id}`);
                }
                catch (err) {
                    console.error(" Error in background task processing:", err);
                }
            })();
        }
    ];
}
//# sourceMappingURL=ticketController.js.map