import { GoogleGenAI } from "@google/genai";
// Initialize Gemini (Ensure GOOGLE_API_KEY is in your .env)
const genai = new GoogleGenAI({});
export async function identifyTargetFile(issueTitle, issueDesc, fileList) {
    const prompt = `
    You are a senior backend developer.
    
    BUG REPORT:
    Title: "${issueTitle}"
    Description: "${issueDesc}"
    
    REPO FILE STRUCTURE:
    ${fileList.join("\n")}
    
    TASK:
    Return the path of the ONE file that is most likely to contain the logic causing this bug.
    
    RULES:
    1. Return ONLY the file path. No explanations.
    2. Do not invent files. Pick strictly from the list.
    3. If multiple files are relevant, pick the main controller or entry point.
    `;
    const result = await genai.models.generateContent({ model: "gemini-3-flash-preview", contents: [{ role: "user", parts: [{ text: prompt }] }] });
    const response = result.text;
    return response?.replace(/```/g, '').trim() || '';
}
//# sourceMappingURL=FindFile_LLM.js.map