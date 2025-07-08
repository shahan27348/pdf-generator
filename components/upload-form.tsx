"use client";
import z from "zod";
import UploadFormInput from "./uploadforminput";

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
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("sbmitted");
    const formData = new FormData(e.currentTarget);
    const file = formData.get("file") as File;

    // validating th files
    const validatedFields = schema.safeParse({ file });
    console.log(validatedFields)
    if (!validatedFields.success) {
      console.log(
        validatedFields.error.flatten().fieldErrors.file?.[0] ?? "Invalid file"
      );
      return
    }
  };
  return (
    <div className="flex flex-col gap-8 w-full ">
      <UploadFormInput onSubmit={handleSubmit} />
    </div>
  );
}
