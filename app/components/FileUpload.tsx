"use client";

import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
} from "@imagekit/next";
import { useState } from "react";
import { toast } from "react-hot-toast";

interface FileUploadProps {
  onSuccess: (res: any) => void;
  onProgress?: (progress: number) => void;
  fileType?: "image" | "video";
}

const FileUpload = ({ onSuccess, onProgress, fileType }: FileUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateFile = (file: File) => {
    if (fileType === "video" && !file.type.startsWith("video/")) {
      setError("Please upload a valid video file");
      toast.error("Invalid video file");
      return false;
    }

    if (file.size > 100 * 1024 * 1024) { 
      setError("File size must be less than 100 MB");
      toast.error("File too large (max 100MB)");
      return false;
    }

    return true;
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file || !validateFile(file)) return;

    setUploading(true);
    setError(null);

    try {
      const authRes = await fetch("/api/auth/imagekit-auth");
      const auth = await authRes.json();

      const res = await upload({
        file,
        fileName: file.name,
        publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
        signature: auth.signature,
        expire: auth.expire,
        token: auth.token,
        onProgress: (event: ProgressEvent<EventTarget>) => {
          if (event.lengthComputable && onProgress) {
            const percent = (event.loaded / event.total) * 100;
            onProgress(Math.round(percent));
          }
        },
      });

      toast.success("Upload successful!");
      onSuccess(res);
    } catch (error) {
      console.error("Upload failed", error);
      toast.error("Upload failed");
      setError("Something went wrong during upload");
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <input
        type="file"
        accept={fileType === "video" ? "video/*" : "image/*"}
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4
        file:rounded-md file:border-0 file:font-semibold
        file:bg-gray-700 file:text-white hover:file:bg-gray-600"
      />
      {uploading && <span className="text-sm text-gray-400">Uploading...</span>}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </>
  );
};

export default FileUpload;
