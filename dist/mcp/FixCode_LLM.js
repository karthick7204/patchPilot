import { GoogleGenAI } from "@google/genai";
const genai = new GoogleGenAI({});
///const model = genai.getModel({ model: "gemini-1.5-flash-001" });
export async function generateFix(issueTitle, issueDesc, currentCode) {
    const prompt = `
You are an expert software engineer.

BUG REPORT:
Title: "${issueTitle}"
Description: "${issueDesc}"

CURRENT CODE:
${currentCode}

TASK:
Analyze the code and fix the bug described.

OUTPUT RULES:
1. Return the FULL fixed file content.
2. Do NOT output markdown.
3. Do NOT explain unless absolutely necessary.
`;
    try {
        const result = await genai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: prompt,
        });
        const text = result.text();
        if (!text) {
            throw new Error("Gemini returned empty response");
        }
        return text
            .replace(/^```[a-z]*\n?/gi, "")
            .replace(/```$/g, "")
            .trim();
    }
    catch (error) {
        console.error("AI failed to generate a fix:", error);
        throw error;
    }
}
//# sourceMappingURL=FixCode_LLM.js.map