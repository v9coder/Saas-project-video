// "use client";

// import VideoUploadForm from "../components/VideoUploadForm";

// export default function VideoUploadPage() {
//   return (
//     <div className="min-h-screen bg-black text-white px-4 py-10">
//       <div className="max-w-3xl mx-auto">
//         <h1 className="text-4xl font-bold mb-8 text-center">Upload New Reel</h1>
//         <VideoUploadForm />
//       </div>
//     </div>
//   );
// }
"use client";

import VideoUploadForm from "../components/VideoUploadForm";

export default function VideoUploadPage() {
  return (
    <div className="min-h-screen bg-black/60 text-white px-4 py-10">
      <div className="max-w-3xl mx-auto bg-gray-900/60 border border-gray-800 rounded-xl p-6">
        <h1 className="text-3xl font-bold mb-4 text-white text-center">Upload New Video</h1>
        <p className="text-sm text-gray-400 mb-6 text-center">
          Upload a video and share it with the community. Thumbnails are generated from the video or you can upload one.
        </p>
        <VideoUploadForm />
      </div>
    </div>
  );
}
