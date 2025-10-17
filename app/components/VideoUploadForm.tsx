// "use client";

// import React, { useState } from "react";
// import FileUpload from "./FileUpload";
// import { toast } from "react-hot-toast";

// function VideoUploadForm() {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [thumbnailUrl, setThumbnailUrl] = useState("");
//   const [videoUrl, setVideoUrl] = useState("");

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!title || !description || !thumbnailUrl || !videoUrl) {
//       toast.error("All fields are required!");
//       return;
//     }

//     const res = await fetch("/api/videos", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         title,
//         description,
//         thumbnailUrl,
//         videoUrl,
//         controls: true,
//       }),
//     });

//     const data = await res.json();

//     if (!res.ok) {
//       toast.error(data.error || "Failed to upload video");
//     } else {
//       toast.success("Video uploaded successfully!");
//       setTitle("");
//       setDescription("");
//       setThumbnailUrl("");
//       setVideoUrl("");
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto mt-8 bg-gray-900 p-6 rounded-lg shadow-lg">
//       <h2 className="text-2xl text-white font-semibold mb-4">Upload New Video</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="text"
//           placeholder="Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700"
//         />
//         <textarea
//           placeholder="Description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700"
//           rows={4}
//         />

//         <div>
//           <p className="text-gray-300 mb-1">Upload Thumbnail</p>
//           <FileUpload
//             onSuccess={(res) => setThumbnailUrl(res.url)}
//             fileType="image"
//           />
//           {thumbnailUrl && (
//             <img
//               src={thumbnailUrl}
//               alt="Thumbnail"
//               className="mt-2 w-full max-h-52 object-cover rounded"
//             />
//           )}
//         </div>

//         <div>
//           <p className="text-gray-300 mb-1 mt-4">Upload Video</p>
//           <FileUpload
//             onSuccess={(res) => setVideoUrl(res.url)}
//             fileType="video"
//           />
//           {videoUrl && (
//             <p className="text-green-500 mt-2 text-sm">Video uploaded successfully</p>
//           )}
//         </div>

//         <button
//           type="submit"
//           className="w-full py-3 rounded bg-white text-black font-semibold hover:bg-gray-200 transition"
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// }

// export default VideoUploadForm;
"use client";

import React, { useState } from "react";
import FileUpload from "./FileUpload";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function VideoUploadForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  const handleVideoSuccess = (res: any) => {
    // res.response is from ImageKit's upload response in your FileUpload component
    setVideoUrl(res.response?.url || res.url || "");
    toast.success("Video uploaded");
  };

  const handleThumbSuccess = (res: any) => {
    setThumbnailUrl(res.response?.url || res.url || "");
    toast.success("Thumbnail uploaded");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !videoUrl) {
      toast.error("Please provide a title and upload a video");
      return;
    }
    setUploading(true);
    try {
      const payload = { title, description, videoUrl, thumbnailUrl };
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/videos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to create video");

      toast.success("Video created");
      router.push("/");
    } catch (err: any) {
      console.error(err);
      toast.error(err?.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm text-gray-300 mb-1">Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a catchy title"
          className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-sm text-white focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-300 mb-1">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Tell viewers what your video is about"
          className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-sm text-white h-28 focus:outline-none"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-300 mb-1">Upload Video</label>
          <FileUpload
            fileType="video"
            onSuccess={handleVideoSuccess}
            onProgress={(p) => {
              /* you can show percent if FileUpload calls this */
            }}
          />
          {videoUrl && (
            <video
              src={videoUrl}
              controls
              className="mt-3 w-full rounded border border-gray-700"
            />
          )}
        </div>

        <div>
          <label className="block text-sm text-gray-300 mb-1">Thumbnail (optional)</label>
          <FileUpload fileType="image" onSuccess={handleThumbSuccess} />
          {thumbnailUrl && (
            <img
              src={thumbnailUrl}
              alt="thumbnail"
              className="mt-3 w-full rounded border border-gray-700 object-cover"
            />
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={uploading}
          className="px-4 py-2 rounded bg-rose-600 hover:bg-rose-500 transition text-white font-medium"
        >
          {uploading ? "Uploading..." : "Publish"}
        </button>
        <button
          type="button"
          onClick={() => {
            setTitle("");
            setDescription("");
            setVideoUrl("");
            setThumbnailUrl("");
          }}
          className="px-3 py-2 rounded border border-gray-700 text-sm text-gray-300 hover:bg-white/5"
        >
          Reset
        </button>
      </div>
    </form>
  );
}
