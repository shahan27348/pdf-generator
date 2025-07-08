// import BgGradient from '@/components/common/bg-gradient';
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

export default function UploadHeader() {
  return (
    <section className="">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="flex flex-col items-center justify-center gap-6 text-center">
          <Badge
            variant={"secondary"}
            className="relative px-6 py-2 text-base font-medium bg-white rounded-full border-red-500 group-hover:bg-gray-50 text-red-600 transition-colors"
          >
            <Sparkles />
            <span>AI-Powered Content Creation</span>
          </Badge>
          <h1 className="text-black text-3xl font-bold">
            Start Uploading Your PDF's
          </h1>
          <p className="text-black">
            Upload your PDF and let our AI do the magic! ✨
          </p>
        </div>
      </div>
    </section>
  );
}
