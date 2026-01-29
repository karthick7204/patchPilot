import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { getFiles } from "./getFileTree.js";
import { identifyTargetFile } from "./FindFile_LLM.js";
export async function searchAndReadFile(folderPath, description, title) {
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
    const filestructure = await getFiles(folderPath);
    const targetFile = await identifyTargetFile(title, description, filestructure);
    console.log(`Reading ${targetFile}...`);
    const fileContent = await client.callTool({
        name: "read_file",
        arguments: {
            path: `${folderPath}/${targetFile}`
        }
    });
    console.log("File Content Retrieved!");
    console.log(`this is the file content from search.ts file: ${fileContent}`);
    return fileContent;
}
//# sourceMappingURL=search.js.map