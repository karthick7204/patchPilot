import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { getFiles } from "./getFileTree.js";
//import {identifyTargetFile} from "./FindFile_LLM.js";
import {identifyTargetFileGroq} from "./findFileGroq.js";
//import {generateFix} from "./FixCode_LLM.js";
import { pushToNewBranch } from "./gitManager.js";
import { writeCode } from "./writeCode.js";
import {groqFixCode} from "./groqFix.js";

export async function searchAndReadFile(folderPath: string,description:string, title:string,repourl:string){
    
    const transport = new StdioClientTransport({
        command: "npx", 
        args: [
            "-y",
            "@modelcontextprotocol/server-filesystem",
            folderPath 
        ]
    });

    const client = new Client({ name: "fs-worker", version: "1.0.0" }, { capabilities: {} });
    await client.connect(transport);

    console.log("Scanning project structure...");

    const filestructure = await getFiles(folderPath)
    const targetFile = await identifyTargetFileGroq(title, description, filestructure);

    console.log(`Reading ${targetFile}...`);
   const result = await client.callTool({
        name: "read_file",
        arguments: { 
            path: `${folderPath}/${targetFile}`.replace(/\\/g, '/') 
        }
    });
    // @ts-ignore
    const code = result.content[0].text;
    const codeFix = await groqFixCode(title, description, code);
    await writeCode(folderPath, targetFile, codeFix);
    
    console.log("--------------- GIT AUTOMATION ----------------");

    try {
        
        const branchName = await pushToNewBranch(folderPath, title , repourl);
        
        console.log("-----------------------------------------------");
        console.log("TASK COMPLETE!");
        console.log(`Please review the fix on branch: [ ${branchName} ]`);
        console.log("-----------------------------------------------");
        
        return { branchName, code, codeFix };

    } catch (error) {
        console.log("Fix was saved locally, but Git Push failed.");
        console.log("You may need to log in to Git on this machine.");
    }

    console.log("File Content Retrieved!");
    console.log(`this is the file code from search.ts file: ${code}`); 
    console.log(`this is the fixed code from search.ts file: ${codeFix}`);
    
    return { branchName: null, code, codeFix };
}