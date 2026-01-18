import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import path from 'node:path';
import dotenv from "dotenv";
import { rmSync, existsSync, mkdirSync } from 'node:fs'; // Added rmSync
// ... rest of imports

export async function handleLinearTask(issueId: string, repoUrl: string): Promise<string> {
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN ;
    const rootDir = 'C:/mcp-workspace'; 
    const tempPath = path.resolve(rootDir, issueId);

    // 1. Ensure the base folder exists
    if (!existsSync(rootDir)) {
        mkdirSync(rootDir, { recursive: true });
    }

    // 2. CRITICAL: Remove the folder if it exists from a previous failed run
    // Git needs a clean/non-existent path to perform a clone
    if (existsSync(tempPath)) {
        console.log("🧹 Cleaning up old directory...");
        rmSync(tempPath, { recursive: true, force: true });
    }

    // 3. Setup Transport (Correctly passing ...process.env)
    const transport = new StdioClientTransport({
        command: "npx",
        args: ["-y", "@cyanheads/git-mcp-server"],
        env: {
           ...(process.env as Record<string, string>),
        // We manually force the Git folder into the PATH variable
        // Make sure this matches the result from 'where git'
            PATH: `${process.env.PATH};C:\\Program Files\\Git\\cmd`, path: process.env.PATH as string, // Passes the 'PATH' so it can find git.exe
            GITHUB_TOKEN: GITHUB_TOKEN!
        }
    });

    const client = new Client({ name: "git-worker", version: "1.0.0" }, { capabilities: {} });
    await client.connect(transport);

    // 4. EXECUTE: (Using lowercase 'url' and 'localPath' keys)
    const authenticatedUrl = repoUrl
        .replace("https://", `https://${GITHUB_TOKEN}@`)
        .replace(/\/$/, "") + ".git";
    
    try {
        const result = await client.callTool({
            name: "git_clone",
            arguments: {
                url: authenticatedUrl,
                localPath: tempPath
            }
        });

        console.log("Git clone result:", result);
        return tempPath;
    } catch (error) {
        console.error("Failed to clone repository:", error);
        throw error;
    }
}