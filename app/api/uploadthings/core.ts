import {currentUser} from '@clerk/nextjs/server'
import { UploadThingError } from 'uploadthing/server';
import {createUploadthing ,type FileRouter} from "uploadthing/next"

const f = createUploadthing();

export const ourFileRouter = {
    pdfUploader:f({pdf:{maxFileSize:'32MB'}})
    .middleware(async ({req}) => {
            // get user info
            const user = await currentUser()

            if(!user) throw new UploadThingError ('Unauthorized');

            return{userId: user.id};
        })
        .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata.userId);
      console.log("file url", file.url);
      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { userId: metadata.userId, file: file.url  };
    }),
} satisfies FileRouter;

export type ourFileRouter = typeof ourFileRouter