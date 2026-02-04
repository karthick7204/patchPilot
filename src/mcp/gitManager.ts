import { exec } from "child_process";
import { promisify } from "util";

// Convert 'exec' to a promise so we can use 'await'
const execAsync = promisify(exec);

export async function pushToNewBranch(folderPath: string, issueTitle: string): Promise<string> {
    
    // 1. Create a unique branch name
    // Example: "fix-calculation-error-170923"
    const safeTitle = issueTitle.toLowerCase().replace(/[^a-z0-9]/g, '-').slice(0, 30);
    const timestamp = Date.now().toString().slice(-4); 
    const branchName = `ai-fix-${safeTitle}-${timestamp}`;

    console.log(`Creating branch: ${branchName}...`);

    try {
        // Options: run these commands INSIDE the cloned project folder
        const options = { cwd: folderPath };

        // 2. Create and Switch to new branch
        await execAsync(`git checkout -b ${branchName}`, options);

        // 3. Stage the changes (add the fixed file)
        await execAsync(`git add .`, options);

        // 4. Commit the changes
        await execAsync(`git commit -m "AI Fix: ${issueTitle}"`, options);

        // 5. Push the branch to the remote repo (GitHub/GitLab)
        await execAsync(`git push origin ${branchName}`, options);

        console.log(`🚀 Code pushed to origin/${branchName}`);
        return branchName;

    } catch (error) {
        console.error("❌ Git Operation Failed:", error);
        throw error;
    }
}