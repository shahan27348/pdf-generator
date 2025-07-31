"use server";

import { getDbConnection } from "@/lib/db";
import { generateSummuryFromGemini } from "@/lib/gemini";
import { generateSummaryFromDeepSeek } from "@/lib/deepseek";
import { generateSummaryFromGroq } from "@/lib/groq";
import { fetchAndExtractPdfText } from "@/lib/langchain";
import { formatFileNameAsTitle } from "@/utils/format-utils";
import { auth } from "@clerk/nextjs/server";
import { error } from "console";
import { title } from "process";

interface PdfSummaryType {
  userId: string;
  fileUrl: string;
  summary: string;
  title: string;
  fileName: string;
}

export async function generatePdfSummary(
  uploadResponse: [
    {
      serverData: {
        userId: string;
        file: {
          url: string;
          name: string;
        };
      };
    }
  ]
) {
  if (!uploadResponse) {
    return {
      success: false,
      message: "File upload failed",
      data: null,
    };
  }

  const {
    serverData: {
      userId,
      file: { url: pdfUrl, name: fileName },
    },
  } = uploadResponse[0];

  if (!pdfUrl) {
    return {
      success: false,
      message: "Invalid file data",
      data: null,
    };
  }

  try {
    const pdfText = await fetchAndExtractPdfText(pdfUrl);
    console.log({ pdfText });

    if (!pdfText) {
      return {
        success: false,
        message: "Failed to extract PDF text",
        data: null,
      };
    }

    let summary;
    try {
      summary = await generateSummuryFromGemini(pdfText);
      console.log({ summary });
    } catch (error) {
      console.log("Gemini failed, trying DeepSeek", error);
      try {
        summary = await generateSummaryFromDeepSeek(pdfText);
        console.log({ summary });
      } catch (deepSeekError) {
        console.log("DeepSeek failed, trying Groq", deepSeekError);
        try {
          summary = await generateSummaryFromGroq(pdfText);
          console.log({ summary });
        } catch (groqError) {
          console.error("Groq api failed", groqError);
          return {
            success: false,
            message: "All LLM APIs failed (Gemini, DeepSeek, Groq)",
            data: null,
          };
        }
      }
    }
    if (!summary) {
      return {
        success: false,
        message: "Failed to generate summary",
        data: null,
      };
    }
    const formattedFilName = formatFileNameAsTitle(fileName);

    // Save summary to DB immediately
    try {
      const sql = await getDbConnection();
      const [savedSummary] = await sql`INSERT INTO pdf_summaries (
        user_id,
        orignal_file_url,
        summary_text,
        title,
        file_name
      ) VALUES (
        ${userId},
        ${pdfUrl},
        ${summary},
        ${formattedFilName},
        ${fileName}
      ) RETURNING id, summary_text`;
      return savedSummary;
    } catch (dbError) {
      console.error("Error saving summary to DB", dbError);
      return {
        success: false,
        message: "Summary generated but failed to save to DB",
        data: null,
      };
    }

    return {
      success: true,
      message: "Summary generated and saved successfully",
      data: {
        title: formattedFilName,
        summary,
      },
    };
  } catch (err) {
    return {
      success: false,
      message: "File upload failed",
      data: null,
    };
  }
}

export async function savePdfSummary({
  userId,
  fileUrl,
  summary,
  title,
  fileName,
}: {
  userId: string;
  fileUrl: string;
  summary: string;
  title: string;
  fileName: string;
}) {
  // sql inserting pdf summary
  try {
    const sql = await getDbConnection();
    await sql`INSERT INTO pdf_summaries (
    user_id, 
    orignal_file_url, // TODO: typo, should be original_file_url
    summary_text,
    title, 
    file_name 
    ) 
    VALUES(
    ${userId},
    ${fileUrl},
    ${summary},
    ${title}, 
    ${fileName}
    ); `;
    return true; // <-- Added return value for success
  } catch (error) {
    console.error("error saving pdf", error);
    throw error;
  }
}
export async function storePdfSummaryAction({
  fileUrl,
  summary,
  title,
  fileName,
}: PdfSummaryType) {
  // user is logged in and has userid
  // save pdf summary
  //save pdf summary function
  let savedSummary: any;
  try {
    const { userId } = await auth();
    if (!userId) {
      return {
        success: false,
        message: "User not authenticated",
      };
    }
    savedSummary = await savePdfSummary({
      userId,
      fileUrl,
      summary,
      title,
      fileName,
    });
    if (!savedSummary) {
      return {
        success: false,
        message: "Failed to save PDF summary",
      };
    }
    return {
      success: true,
      message: "PDF summary saved successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "saving pdf summary ",
    };
  }
}
