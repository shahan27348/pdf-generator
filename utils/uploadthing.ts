import { ourFileRouter } from "@/app/api/uploadthings/core";
import {generateReactHelpers} from '@uploadthing/react'

export const {useUploadThing} = 
generateReactHelpers<ourFileRouter>();