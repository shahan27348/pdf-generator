import { SUMMURY_SYSTEM_PROMPT } from "@/utils/prompts";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
export const generateSummuryFromGemini = async (pdfText: string) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-pro",
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1500,
      },
    });

    const prompt = {
      contents: [
        {
          role: "user",
          parts: [
            { text: SUMMURY_SYSTEM_PROMPT },
            {
              text: "Transform this document into an engaging, easy-to-read summury with contextually relevant emojis and proper markdown formatting:\n\n${pdfText}",
            },
          ],
        },
      ],
    };

    const result = await model.generateContent(prompt);
    const response = await result.response;
    if (!response.text()) {
      throw new Error("Empty response from Gemini API");
    }

    return response.text();
  } catch (error: any) {
    console.error("Error generating summary from Gemini:", error);
    throw error;
  }
};
