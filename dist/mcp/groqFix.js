import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();
const groq = new OpenAI({
    apiKey: process.env.grok_api_key,
    baseURL: "https://api.groq.com/openai/v1",
});
export async function groqFixCode(issueTitle, issueDesc, currentCode) {
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
        const response = await groq.chat.completions.create({
            model: "openai/gpt-oss-20b", // Best coding model on Groq
            messages: [
                { role: "user", content: prompt }
            ],
            temperature: 0.2,
        });
        const text = response.choices?.[0]?.message?.content;
        if (!text) {
            throw new Error("Groq returned empty response");
        }
        return text
            .replace(/^```[a-z]*\n?/gi, "")
            .replace(/```$/g, "")
            .trim();
    }
    catch (error) {
        console.error("Groq AI failed:", error);
        throw error;
    }
}
//# sourceMappingURL=groqFix.js.map