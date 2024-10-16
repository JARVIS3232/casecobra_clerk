// import { createUploadthing, type FileRouter } from "uploadthing/next";
// import { z } from "zod";
// import sharp from "sharp";
// import { db } from "@/db";

// const f = createUploadthing();

// export const ourFileRouter = {
//   imageUploader: f({ image: { maxFileSize: "4MB" } })
//     .input(z.object({ configId: z.string().optional() }))
//     .middleware(async ({ input }) => {
//       return { input };
//     })
//     .onUploadComplete(async ({ metadata, file }) => {
//       const { configId } = metadata.input;

//       const res = await fetch(file.url);
//       const buffer = await res.arrayBuffer();

//       const imgMetadata = await sharp(buffer).metadata();
//       const { width, height } = imgMetadata;

//       if (!configId) {
//         const configuration = await db.configuration.create({
//           data: {
//             imageUrl: file.url,
//             height: height || 500,
//             width: width || 500,
//             croppedImageUrl: file.url,
//           },
//         });

//         return { configId: configuration.id };
//       } else {
//         const updatedConfiguration = await db.configuration.update({
//           where: {
//             id: configId,
//           },
//           data: {
//             croppedImageUrl: file.url,
//           },
//         });

//         return { configId: updatedConfiguration.id };
//       }
//     }),
// } satisfies FileRouter;

// export type OurFileRouter = typeof ourFileRouter;
// import { createUploadthing, type FileRouter } from "uploadthing/next";
// import { z } from "zod";
// import sharp from "sharp";
// import { db } from "@/db";

// const f = createUploadthing();

// export const ourFileRouter = {
//   imageUploader: f({ image: { maxFileSize: "4MB" } })
//     .input(z.object({ configId: z.string().optional() }))
//     .middleware(async ({ input }) => {
//       return { input };
//     })
//     .onUploadComplete(async ({ metadata, file }) => {
//       const { configId } = metadata.input;

//       const res = await fetch(file.url);
//       const buffer = await res.arrayBuffer();

//       const imgMetadata = await sharp(buffer).metadata();
//       const { width, height } = imgMetadata;

//       if (!configId) {
//         const configuration = await db.configuration.create({
//           data: {
//             imageUrl: file.url,
//             height: height || 500,
//             width: width || 500,
//             croppedImageUrl: file.url,
//           },
//         });

//         return { configId: configuration.id };
//       } else {
//         const updatedConfiguration = await db.configuration.update({
//           where: {
//             id: configId,
//           },
//           data: {
//             croppedImageUrl: file.url,
//           },
//         });

//         return { configId: updatedConfiguration.id };
//       }
//     }),
// } satisfies FileRouter;

// export type OurFileRouter = typeof ourFileRouter;
// import { createUploadthing, type FileRouter } from "uploadthing/next";
// import { z } from "zod";
// import sharp from "sharp";
// import { db } from "@/db";

// const f = createUploadthing();

// export const ourFileRouter = {
//   imageUploader: f({ image: { maxFileSize: "4MB" } })
//     .input(z.object({ configId: z.string().optional() }))
//     .middleware(async ({ input }) => {
//       return { input };
//     })
//     .onUploadComplete(async ({ metadata, file }) => {
//       try {
//         const { configId } = metadata.input;

//         console.log("Fetching the file from URL:", file.url);
//         const res = await fetch(file.url);
//         if (!res.ok) {
//           throw new Error(`Failed to fetch file. Status: ${res.status}`);
//         }
//         const buffer = await res.arrayBuffer();

//         console.log("Processing the image with sharp");
//         const imgMetadata = await sharp(Buffer.from(buffer)).metadata();
//         const { width, height } = imgMetadata;

//         if (!configId) {
//           console.log("Creating new configuration in the database");
//           const configuration = await db.configuration.create({
//             data: {
//               imageUrl: file.url,
//               height: height || 500,
//               width: width || 500,
//               croppedImageUrl: file.url,
//             },
//           });

//           console.log("Configuration created with ID:", configuration.id);
//           return { configId: configuration.id };
//         } else {
//           console.log("Updating existing configuration in the database");
//           const updatedConfiguration = await db.configuration.update({
//             where: {
//               id: configId,
//             },
//             data: {
//               croppedImageUrl: file.url,
//             },
//           });

//           console.log("Configuration updated with ID:", updatedConfiguration.id);
//           return { configId: updatedConfiguration.id };
//         }
//       } catch (error) {
//         console.error("Error during file processing:", error);
//         throw new Error("Internal Server Error");
//       }
//     }),
// } satisfies FileRouter;

// export type OurFileRouter = typeof ourFileRouter;
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { z } from "zod";
import sharp from "sharp";
import { db } from "@/db";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    .input(z.object({ configId: z.string().optional() }))
    .middleware(async ({ input }) => {
      return { input };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      try {
        const { configId } = metadata.input;
        console.log("Fetching the file from URL:", file.url);
        const res = await fetch(file.url);
        if (!res.ok) {
          console.error(`Failed to fetch file. Status: ${res.status}`);
          throw new Error(`Failed to fetch file. Status: ${res.status}`);
        }

        console.log("File fetched successfully, processing with sharp");
        const buffer = await res.arrayBuffer();

        let imgMetadata;
        try {
          imgMetadata = await sharp(Buffer.from(buffer)).metadata();
          console.log("Image metadata:", imgMetadata);
        } catch (sharpError) {
          console.error("Sharp processing failed:", sharpError);
          throw new Error("Failed to process image with sharp");
        }

        const { width, height } = imgMetadata;

        if (!configId) {
          console.log("Creating new configuration in the database");
          const configuration = await db.configuration.create({
            data: {
              imageUrl: file.url,
              height: height || 500,
              width: width || 500,
              croppedImageUrl: file.url,
            },
          });

          console.log("Configuration created with ID:", configuration.id);
          return { configId: configuration.id };
        } else {
          console.log("Updating existing configuration in the database");
          const updatedConfiguration = await db.configuration.update({
            where: {
              id: configId,
            },
            data: {
              croppedImageUrl: file.url,
            },
          });

          console.log(
            "Configuration updated with ID:",
            updatedConfiguration.id
          );
          return { configId: updatedConfiguration.id };
        }
      } catch (error) {
        console.error("Error during file processing:", error);
        throw new Error("Internal Server Error");
      }
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
