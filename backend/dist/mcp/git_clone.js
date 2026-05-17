import { mkdirSync, existsSync, rmSync } from 'node:fs';
import path from 'node:path';
import * as simpleGitPkg from 'simple-git';
import { searchAndReadFile } from './search.js';
import { identifyTargetFile } from './FindFile_LLM.js';
import { pushToNewBranch } from './gitManager.js';
const simpleGit = simpleGitPkg.simpleGit; // Extract the function explicitly
export async function handleLinearTask(issueId, repoUrl, description, title) {
    const rootDir = process.env.MCP_WORKSPACE_PATH || 'C:/mcp-workspace';
    const tempPath = path.resolve(rootDir, issueId);
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
    // 1. Prepare Directory 
    if (!existsSync(rootDir))
        mkdirSync(rootDir, { recursive: true });
    if (existsSync(tempPath)) {
        console.log(" Cleaning up old directory...");
        rmSync(tempPath, { recursive: true, force: true });
    }
    // 2. Authenticate the URL
    // We inject the token exactly like before
    const authenticatedUrl = repoUrl
        .replace("https://", `https://${GITHUB_TOKEN}@`)
        .replace(/\/$/, "") + ".git";
    console.log(` Cloning repo to ${tempPath}...`);
    // 3. EXECUTE: Direct Clone (Bypassing MCP Server)
    // This runs in YOUR process, so it inherits YOUR path automatically.
    try {
        const git = simpleGit();
        const result = await git.clone(authenticatedUrl, tempPath);
        console.log("Clone result:", result);
        console.log(" Clone Successful!");
        const repourl = repoUrl;
        const searchResult = await searchAndReadFile(tempPath, description, title, repourl);
        return { tempPath, ...searchResult };
    }
    catch (error) {
        console.error(" Clone failed:", error);
        throw error;
    }
}
//# sourceMappingURL=git_clone.js.map