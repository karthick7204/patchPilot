import { readdir, stat } from "fs/promises";
import path from "path";

export async function getFiles(dir: string, baseDir = dir): Promise<string[]> {
  let results: string[] = [];
  const files = await readdir(dir);

  for (const file of files) {
    if (file === "node_modules" || file.startsWith(".")) continue;

    const filePath = path.join(dir, file);
    const fileStat = await stat(filePath);

    if (fileStat.isDirectory()) {
      const subFiles = await getFiles(filePath, baseDir);
      results.push(...subFiles);   // simpler than concat
    } else {
      results.push(path.relative(baseDir, filePath));
    }
  }
  
  return results;
}
