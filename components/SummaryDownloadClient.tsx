"use client";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function SummaryDownloadClient({ summaryText, fileName }: { summaryText: string, fileName: string }) {
  function handleDownload() {
    const blob = new Blob([summaryText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName || "summary.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  return (
    <Button variant="destructive" size="sm" className="gap-1" onClick={handleDownload} type="button">
      <Download className="w-4 h-4" /> Download Summary
    </Button>
  );
} 