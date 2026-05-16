import { spawn } from "child_process";
import dotenv from "dotenv";

dotenv.config();

/**
 * Helper to run a shell command safely using spawn.
 */
async function runGit(args: string[], cwd: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const process = spawn("git", args, { cwd });
    let stdout = "";
    let stderr = "";

    process.stdout.on("data", (data) => (stdout += data.toString()));
    process.stderr.on("data", (data) => (stderr += data.toString()));

    process.on("close", (code) => {
      if (code === 0) {
        resolve(stdout.trim());
      } else {
        reject(new Error(`Git command failed (code ${code}): ${stderr.trim()}`));
      }
    });
  });
}

export async function pushToNewBranch(folderPath: string, issueTitle: string , GITHUB_REPO: string): Promise<string> {
    
    // 1. Create a unique branch name
    const safeTitle = issueTitle
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")   // replace spaces & symbols
      .replace(/^-+|-+$/g, "")       // remove starting/ending dash
      .slice(0, 40);

    const timestamp = Date.now().toString().slice(-5);
    const branchName = `ai-fix-${safeTitle}-${timestamp}`;
    
    console.log(`Creating branch: ${branchName}...`);

    try {
        const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
        if (!GITHUB_TOKEN) throw new Error("GITHUB_TOKEN is missing in environment variables.");

        // Extract repo path (owner/repo)
        const repoPath = GITHUB_REPO
               .replace("https://github.com/", "")
               .replace(".git", "")
               .replace(/\/$/, "");

        // Instead of setting the URL globally, we can use the URL with the token JUST for the push
        // This is more secure as it doesn't stay in the config file.
        const remoteWithToken = `https://${GITHUB_TOKEN}@github.com/${repoPath}.git`;

        // 2. Create and Switch to new branch
        await runGit(["checkout", "-b", branchName], folderPath);

        // 3. Stage the changes
        await runGit(["add", "."], folderPath);

        // 4. Commit the changes
        await runGit(["commit", "-m", `AI Fix: ${issueTitle}`], folderPath);

        // 5. Push the branch to the remote repo using the authenticated URL
        console.log(`Pushing code to ${branchName}...`);
        await runGit(["push", remoteWithToken, branchName], folderPath);

        console.log(`🚀 Code pushed to origin/${branchName}`);
        return branchName;

    } catch (error) {
        console.error("❌ Git Operation Failed:", error);
        throw error;
    }
}