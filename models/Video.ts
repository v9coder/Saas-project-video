// import mongoose, { Schema, model, models } from "mongoose";

// export const VIDEO_DIMENSIONS = {
//   width: 1080,
//   height: 1920,
// } as const;

// export interface IVideo {
//   _id?: mongoose.Types.ObjectId;
//   title: string;
//   description: string;
//   videoUrl: string;
//   thumbnailUrl: string;
//   controls?: boolean;
//   transformation?: {
//     height: number;
//     width: number;
//     quality?: number;
//   };
// }
// const videoSchema = new Schema<IVideo>(
//   {
//     title: { type: String, required: true },
//     description: { type: String, required: true },
//     videoUrl: { type: String, required: true },
//     thumbnailUrl: { type: String, required: true },
//     controls: { type: Boolean, default: true },
//     transformation: {
//       height: { type: Number, default: VIDEO_DIMENSIONS.height },
//       width: { type: Number, default: VIDEO_DIMENSIONS.width },
//       quality: { type: Number, min: 1, max: 100 },
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// const Video = models?.Video || model<IVideo>("Video", videoSchema);

// export default Video;

import mongoose, { Schema, model, models } from "mongoose";

export const VIDEO_DIMENSIONS = { width: 1080, height: 1920 } as const;

export interface IVideo {
  _id?: mongoose.Types.ObjectId;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  controls?: boolean;
  transformation?: { height: number; width: number; quality?: number };
  createdAt?: Date;
  updatedAt?: Date;
}

export interface VideoDTO {
  // views: number;
  // duration: ReactNode;
  _id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  controls: boolean;
  transformation: { height: number; width: number; quality?: number };
  createdAt: string;
  updatedAt: string;
}

const videoSchema = new Schema<IVideo>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    videoUrl: { type: String, required: true },
    thumbnailUrl: { type: String, required: true },
    controls: { type: Boolean, default: true },
    transformation: {
      height: { type: Number, default: VIDEO_DIMENSIONS.height },
      width: { type: Number, default: VIDEO_DIMENSIONS.width },
      quality: { type: Number, min: 1, max: 100 },
    },
  },
  { timestamps: true }
);

export function toVideoDTO(video: any): VideoDTO {
  const id = typeof video._id === "string" ? video._id : video._id?.toString() ?? "";
  const created =
    video.createdAt instanceof Date
      ? video.createdAt.toISOString()
      : video.createdAt
      ? new Date(video.createdAt).toISOString()
      : "";
  const updated =
    video.updatedAt instanceof Date
      ? video.updatedAt.toISOString()
      : video.updatedAt
      ? new Date(video.updatedAt).toISOString()
      : "";

  return {
    _id: id,
    title: video.title,
    description: video.description,
    videoUrl: video.videoUrl,
    thumbnailUrl: video.thumbnailUrl,
    controls: video.controls ?? true,
    transformation: {
      height: video.transformation?.height ?? VIDEO_DIMENSIONS.height,
      width: video.transformation?.width ?? VIDEO_DIMENSIONS.width,
      quality: video.transformation?.quality,
    },
    createdAt: created,
    updatedAt: updated,
  };
}

const Video = (models.Video as mongoose.Model<IVideo>) || model<IVideo>("Video", videoSchema);
export default Video;
