"use client";
import z from "zod";
import UploadFormInput from "./uploadforminput";
import { useUploadThing } from "@/utils/uploadthing";
import { useToast } from "@/hooks/use-toast";
import { generatePdfSummary } from "@/actions/upload-actions";

const schema = z.object({
  file: z
    .instanceof(File, { message: "Invalid file" })
    .refine((file) => file.size <= 20 * 1024 * 1024, "File size must be less than 20MB")
    .refine((file) => file.type.startsWith("application/pdf"), "File must be a Pdf"),
});

export default function UploadForm() {
  const { toast } = useToast();

  const { startUpload } = useUploadThing("pdfUploader", {
    onClientUploadComplete: () => {
      console.log("uploaded successfully");
    },
    onUploadError: (err) => {
      console.error("error occur while uploading");
      toast({
        title: "Error occurred while uploading",
        description: err.message,
        variant: "destructive",
      });
    },
    onUploadBegin: ({ file }) => {
      console.log("upload has begun for", file);
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const file = formData.get("file") as File;

    // Validate the file
    const validatedFields = schema.safeParse({ file });
    console.log(validatedFields);
    if (!validatedFields.success) {
      toast({
        title: "Something went wrong",
        variant: "destructive",
        description:
          validatedFields.error.flatten().fieldErrors.file?.[0] ?? "Invalid file",
      });
      return;
    }

    toast({
      title: "Uploading PDF",
      description: "We are Uploading pdf",
    });

    // Upload the file
    const resp = await startUpload([file]);
    if (!resp) {
      toast({
        title: "Something went wrong",
        description: "Please use a different file",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Processing PDF",
      description: "Hang tight! Our AI is reading through your document",
    });

    //parse the pdf using Langchain
const summary = await generatePdfSummary(resp);
console.log({summary})


  };
return (
    <div className="flex flex-col gap-8 w-full">
      <UploadFormInput onSubmit={handleSubmit} />
    </div>
  );
}
