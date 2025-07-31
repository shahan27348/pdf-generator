import { SUMMURY_SYSTEM_PROMPT } from "@/utils/prompts";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: "https://api.deepseek.com/v1",
});

export const generateSummaryFromDeepSeek = async (pdfText: string) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "deepseek-chat",
      messages: [
        {
          role: "system",
          content: SUMMURY_SYSTEM_PROMPT,
        },
        {
          role: "user",
          content:
            "Transform this document into an engaging, easy-to-read summury with contextually relevant emojis and proper markdown formatting:\n\n" + pdfText,
        },
      ],
      temperature: 0.7,
      max_tokens: 1500,
    });
    const summary = completion.choices[0]?.message?.content;
    if (!summary) {
      throw new Error("Empty response from DeepSeek API");
    }
    return summary;
  } catch (error: any) {
    console.error("Error generating summary from DeepSeek:", error);
    throw error;
  }
}; 