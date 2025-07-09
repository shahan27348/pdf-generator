"use client";
import z from "zod";
import UploadFormInput from "./uploadforminput";
import { useUploadThing } from "@/utils/uploadthing";
import { Description } from "@radix-ui/react-dialog";
import { title } from "process";

const schema = z.object({
  file: z
    .instanceof(File, { message: "Invalid file" })
    .refine(
      (file) => file.size <= 20 * 1024 * 1024,
      "File size must be less than 20MB"
    )
    .refine(
      (file) => file.type.startsWith("application/pdf"),
      "File must be a Pdf"
    ),
});

export default function UploadForm() {
  const { toast } = useToast();

  const { startUpload, routeConfig } = useUploadThing("pdfUploader", {
    onClientUploadComplete: () => {
      console.log("uploaded successfully");
    },
    onUploadError: (err) => {
      console.error("error occur while uploading");
      toast({
        title: "Error ocur while uploading",
        Description: err.message,
      });
    },
    onUploadBegin: ({ file }) => {
      console.log("upload has begun for", file);
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("sbmitted");
    const formData = new FormData(e.currentTarget);
    const file = formData.get("file") as File;

    // validating th files
    const validatedFields = schema.safeParse({ file });
    console.log(validatedFields);
    if (!validatedFields.success) {
      
      toast({
        title: "Something went wrong",
        variant: "destruction",
        description:
          validatedFields.error.flatten().fieldErrors.file?.[0] ??
          "Invalid file",
      });
      return;
    }

    toast({
      title: 'Poccessing PDF',
      Description:'Hang tight! Our AI is reading through your document'
    })

    // upload the filw to uploading
    const resp = await startUpload([file]);
    if (!resp) {
      toast({
        title: 'Something went wrong',
        Description:'Please use a different file',
        variant: 'destructive',
      })
      return;
    }
  };
  return (
    <div className="flex flex-col gap-8 w-full ">
      <UploadFormInput onSubmit={handleSubmit} />
    </div>
  );
}
