import { metadata } from "@/app/layout";
import {createUploadthing ,type FileRouter} from "uploadthing/server"

const f = createUploadthing();

export const ourFileRouter = {
    pdfUploader:f({pdf:{maxFileSize:'32MB'}}),
    middleware(
        async ({req}) => {
            // get user info
            
        }
    ).onuploadComplete(async({metadata,file})=>{
        console.log("upload completed for user id", metadata.useId);
        return{userId: metadata.userId,file}
    })
} satisfies FileRouter;

export type ourFileRouter = typeof ourFileRouter