import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { getFiles } from "./getFileTree.js";
import {identifyTargetFile} from "./FindFile_LLM.js";

export async function searchAndReadFile(folderPath: string) {
    
    const transport = new StdioClientTransport({
        command: "npx.cmd", 
        args: [
            "-y",
            "@modelcontextprotocol/server-filesystem",
            folderPath 
        ]
    });

    const client = new Client({ name: "fs-worker", version: "1.0.0" }, { capabilities: {} });
    await client.connect(transport);

    console.log("Scanning project structure...");
    const fileList = await client.callTool({
        name: "list_directory",
        arguments: { path: folderPath }
    });
    
    // 3. (Mocking the AI Decision) 
    // In a real agent, you would send 'fileList' to an LLM here.
    // For now, let's pretend the AI decided 'package.json' is important.
    const filestructure = await getFiles(folderPath)
    const targetFile = await identifyTargetFile("Issue Title", "Issue Description", filestructure);
    

    
    console.log(`Reading ${targetFile}...`);
    const fileContent = await client.callTool({
        name: "read_file",
        arguments: { 
            path: `${folderPath}/${targetFile}` 
        }
    });

    console.log("File Content Retrieved!");
    // console.log(fileContent); 
    
    return fileContent;
}