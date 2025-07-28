import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

export async function fetchAndExtractPdfText(fileUrl: string) {
  const response = await fetch(fileUrl);
  const blob = await response.blob();

  const arrayBuffer = await blob.arrayBuffer();

  const loader = new PDFLoader(new Blob([arrayBuffer]));
  const docs = await loader.load();

  if (!docs || docs.length === 0) {
    console.log("No documents found in the PDF.");
    return null;
  }

  return docs.map((doc) => doc.pageContent).join("\n");
}
