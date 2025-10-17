// import { VideoDTO } from "@/models/Video";
// import VideoComponent from "./VideoComponent";

// interface VideoFeedProps {
//   videos: VideoDTO[];
// }

// export default function VideoFeed({ videos }: VideoFeedProps) {
//   const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;

//   if (!urlEndpoint) {
//     throw new Error("NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT is missing in .env");
//   }

//   if (!videos || videos.length === 0) {
//     return (
//       <div className="col-span-full text-center py-12">
//         <p className="text-base-content/70">No videos found</p>
//       </div>
//     );
//   }

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//       {videos.map((video) => (
//         <VideoComponent
//           key={video._id}
//           video={video}
//           urlEndpoint={urlEndpoint}
//         />
//       ))}
//     </div>
//   );
// }
import { VideoDTO } from "@/models/Video";
import VideoCard from "@/app/components/VideoCard";

interface VideoFeedProps {
  videos: VideoDTO[];
}

export default function VideoFeed({ videos }: VideoFeedProps) {
  if (!videos || videos.length === 0) {
    return <p className="text-center py-8 text-gray-400">No videos uploaded yet.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {videos.map((v) => (
        <VideoCard key={v._id} video={v} />
      ))}
    </div>
  );
}
