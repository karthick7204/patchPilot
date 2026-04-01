import { exec } from "child_process";
import { promisify } from "util";
import dotenv from "dotenv";

// Convert 'exec' to a promise so we can use 'await'
const execAsync = promisify(exec);
dotenv.config();

export async function pushToNewBranch(folderPath: string, issueTitle: string , GITHUB_REPO: string): Promise<string> {
    
    // 1. Create a unique branch name
    // Example: "fix-calculation-error-170923"
const safeTitle = issueTitle
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, "-")   // replace spaces & symbols
  .replace(/^-+|-+$/g, "")       // remove starting/ending dash
  .slice(0, 40);    //const timestamp = Date.now().toString().slice(-4); 
    const timestamp = Date.now().toString().slice(-5);
    const branchName = `ai-fix-${safeTitle}-${timestamp}`;
    console.log(`Creating branch: ${branchName}...`);

    try {
      const repoPath = GITHUB_REPO
             .replace("https://github.com/", "")
             .replace(".git", "")
             .replace(/\/$/, "");


        // Options: run these commands INSIDE the cloned project folder
        const options = { cwd: folderPath };
         await execAsync(
           `git remote set-url origin https://${process.env.GITHUB_TOKEN}@github.com/${repoPath}.git`,
            options
             );
        // 2. Create and Switch to new branch
        await execAsync(`git checkout -b "${branchName}"`, options);

        // 3. Stage the changes (add the fixed file)
        await execAsync(`git add .`, options);

        // 4. Commit the changes
        await execAsync(`git commit -m "AI Fix: ${issueTitle}"`, options);

        // 5. Push the branch to the remote repo (GitHub/GitLab)
        await execAsync(`git push origin "${branchName}"`, options);

        console.log(`🚀 Code pushed to origin/${branchName}`);
        return branchName;

    } catch (error) {
        console.error("❌ Git Operation Failed:", error);
        throw error;
    }
}