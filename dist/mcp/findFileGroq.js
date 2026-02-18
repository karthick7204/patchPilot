import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();
const groq = new OpenAI({
    apiKey: process.env.grok_api_key,
    baseURL: "https://api.groq.com/openai/v1",
});
export async function identifyTargetFileGroq(issueTitle, issueDesc, fileList) {
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
    try {
        const response = await groq.chat.completions.create({
            model: "openai/gpt-oss-20b", // Best coding model on Groq for file identification
            messages: [
                { role: "user", content: prompt }
            ],
            temperature: 0.2,
        });
        const text = response.choices?.[0]?.message?.content;
        if (!text)
            throw new Error("Groq returned empty response");
        return text.replace(/```/g, "").trim();
    }
    catch (error) {
        console.error("Groq identifyTargetFile failed:", error);
        throw error;
    }
}
//# sourceMappingURL=findFileGroq.js.map