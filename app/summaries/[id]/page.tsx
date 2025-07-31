

import { notFound } from "next/navigation";
import getSummaryById from "@/lib/summaries";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Download, ExternalLink } from "lucide-react";
import { useCallback } from "react";
import SummaryDownloadClient from "@/components/SummaryDownloadClient";

export default async function SummaryPage({ params }: { params: { id: string } }) {
  const id = params.id;
  const summary = await getSummaryById(id);
  if (!summary) notFound();

  const { title, summary_text, file_name, created_at, orignal_file_url } = summary;
  // Placeholder values for date, read time, and word count
  const date = created_at ? new Date(created_at).toLocaleDateString() : "-";
  const readTime = "1 min read";
  const wordCount = summary_text ? summary_text.split(/\s+/).length : 0;

  // Download handler (client-side)
  function handleDownload() {
    const blob = new Blob([summary_text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = (title || file_name || "summary") + ".txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  return (
    <div className="relative isolate min-h-screen bg-gradient-to-b from-rose-50/40 to-white">
      <div className="container mx-auto flex flex-col gap-4 ">
        <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-12 lg:py-24">
          <div className="flex flex-col gap-2 mb-4">
            <div className="flex items-center gap-2 text-xs text-rose-500 font-medium">
              <span>AI Summary</span>
              <span className="mx-2">•</span>
              <span>{date}</span>
              <span className="mx-2">•</span>
              <span>{readTime}</span>
            </div>
            <div className="flex items-center justify-between mt-2">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-rose-600 mb-2">{title}</h1>
              <Link href="/dashboard">
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <ArrowLeft className="w-4 h-4" /> Back to Dashboard
                </Button>
              </Link>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
              <span className="flex items-center gap-1">
                <ExternalLink className="w-4 h-4 text-rose-400" />
                Source: {file_name}
              </span>
            </div>
            <div className="flex gap-2 mt-4">
              {orignal_file_url && (
                <a href={orignal_file_url} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm" className="gap-1">
                    <ExternalLink className="w-4 h-4" /> View Original
                  </Button>
                </a>
              )}
              <SummaryDownloadClient summaryText={summary_text} fileName={(title || file_name || "summary") + ".txt"} />
            </div>
          </div>
          <Card className="mt-6 relative bg-white/90 shadow-lg border-0 rounded-xl p-4 max-w-xl w-full mx-auto">
            <div className="absolute top-3 right-4 text-xs text-gray-400">{wordCount} words</div>
            <CardContent className="flex flex-col gap-4 max-h-[70vh] overflow-y-auto">
              <div className="text-lg text-gray-800 whitespace-pre-line">
                {summary_text}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}