// types/video.ts
export interface IVideoClient {
  _id: string; // ✅ plain string (not ObjectId)
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  controls?: boolean;
  transformation?: {
    height: number;
    width: number;
    quality?: number;
  };
  createdAt?: string;
  updatedAt?: string;
}
