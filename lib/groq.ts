import { SUMMURY_SYSTEM_PROMPT } from "@/utils/prompts";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.GROQ_API_KEY || "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",
  baseURL: "https://api.groq.com/openai/v1",
});

export const generateSummaryFromGroq = async (pdfText: string) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "llama3-8b-8192",
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
      throw new Error("Empty response from Groq API");
    }
    return summary;
  } catch (error: any) {
    console.error("Error generating summary from Groq:", error);
    throw error;
  }
}; 