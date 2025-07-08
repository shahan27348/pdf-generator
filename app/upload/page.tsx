// import BgGradient from '@/components/common/bg-gradient';
import { Badge } from "@/components/ui/badge";
import UploadForm from "@/components/upload-form";
import UploadHeader from "@/components/uploadHeader";
import { Sparkles } from "lucide-react";

export default function Page() {
  return (
    <section className="min-h-screen">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <UploadHeader/>
        <UploadForm/>
      </div>
    </section>
  );
}
