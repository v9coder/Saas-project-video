"use client";

import React, { useState } from "react";
import FileUpload from "./FileUpload";
import { toast } from "react-hot-toast";

function VideoUploadForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description || !thumbnailUrl || !videoUrl) {
      toast.error("All fields are required!");
      return;
    }

    const res = await fetch("/api/videos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        thumbnailUrl,
        videoUrl,
        controls: true,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      toast.error(data.error || "Failed to upload video");
    } else {
      toast.success("Video uploaded successfully!");
      setTitle("");
      setDescription("");
      setThumbnailUrl("");
      setVideoUrl("");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 bg-gray-900 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl text-white font-semibold mb-4">Upload New Video</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700"
          rows={4}
        />

        <div>
          <p className="text-gray-300 mb-1">Upload Thumbnail</p>
          <FileUpload
            onSuccess={(res) => setThumbnailUrl(res.url)}
            fileType="image"
          />
          {thumbnailUrl && (
            <img
              src={thumbnailUrl}
              alt="Thumbnail"
              className="mt-2 w-full max-h-52 object-cover rounded"
            />
          )}
        </div>

        <div>
          <p className="text-gray-300 mb-1 mt-4">Upload Video</p>
          <FileUpload
            onSuccess={(res) => setVideoUrl(res.url)}
            fileType="video"
          />
          {videoUrl && (
            <p className="text-green-500 mt-2 text-sm">Video uploaded successfully</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded bg-white text-black font-semibold hover:bg-gray-200 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default VideoUploadForm;
