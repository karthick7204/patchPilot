import express from "express";
import dotenv from "dotenv";
import { verifySignature } from "../services/ticketVerification.js";
import { handleLinearTask } from "../mcp/git_clone.js";
import Issue from "../models/Issue.js";
dotenv.config();
export function linearWebhookHandler() {
    function extractGitHubUrl(description) {
        const githubRegex = /https:\/\/github\.com\/([a-zA-Z0-9-._]+)\/([a-zA-Z0-9-._]+)/i;
        const match = description.match(githubRegex);
        return match ? match[0].replace(/\/$/, "") : null;
    }
    function cleanDescription(description) {
        const githubRegex = /https:\/\/github\.com\/[\w\-\.]+\/[\w\-\.]+/gi;
        return description.replace(githubRegex, "").trim();
    }
    return [
        async (req, res) => {
            const signature = req.get("linear-signature");
            const { userId } = req.params;
            // Verify signature using RAW body (stored in req.rawBody by index.ts middleware)
            if (!verifySignature(signature, req.rawBody)) {
                console.log("Invalid Linear signature");
                return res.sendStatus(401);
            }
            // Replay protection
            if (Math.abs(Date.now() - req.body.webhookTimestamp) > 60 * 1000) {
                console.log("Webhook timestamp too old");
                return res.sendStatus(401);
            }
            const { data } = req.body;
            const description = data.description || "";
            const title = data.title;
            const repoUrl = extractGitHubUrl(description);
            if (!repoUrl) {
                console.error("No GitHub link found in the description.");
                return res.sendStatus(200);
            }
            // Respond immediately to prevent Linear timeout
            res.sendStatus(200);
            // Background processing
            (async () => {
                try {
                    console.log(`Processing Linear webhook for user ${userId}:`, data.id);
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
                        userId: userId // Associate the issue with the unique user
                    });
                    await issue.save();
                    const taskResult = await handleLinearTask(data.id, repoUrl, cleanedDescription, title);
                    if (taskResult && taskResult.code) {
                        issue.extractedCode = taskResult.code;
                        issue.fixedCode = taskResult.codeFix;
                        await issue.save();
                    }
                    console.log(`Successfully completed task for issue ${data.id}`);
                }
                catch (err) {
                    console.error("Error in background task processing:", err);
                }
            })();
        }
    ];
}
//# sourceMappingURL=ticketController.js.map