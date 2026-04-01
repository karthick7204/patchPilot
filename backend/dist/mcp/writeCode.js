import fs from "fs/promises";
export async function writeCode(folderPath, targetFile, codeFix) {
    const filePath = `${folderPath}/${targetFile}`.replace(/\\/g, '/');
    console.log("Writing fixed code to:", filePath);
    // Replace existing file content with fixed code
    await fs.writeFile(filePath, codeFix, "utf8");
    console.log("File updated successfully.");
}
//# sourceMappingURL=writeCode.js.map