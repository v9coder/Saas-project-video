// // "use client";

// // import { IKContext, IKVideo } from "imagekitio-react";
// // import Link from "next/link";
// // import { VideoDTO } from "@/models/Video";

// // export default function VideoComponent({
// //   video,
// //   urlEndpoint,
// // }: {
// //   video: VideoDTO;
// //   urlEndpoint: string;
// // }) {
// //   return (
// //     <div className="card bg-gray-900 shadow-lg border border-gray-800 rounded-xl hover:shadow-2xl transition-all duration-300">
// //       <figure className="relative px-4 pt-4">
// //         <Link href={`/videos/${video._id}`} className="relative group w-full block">
// //           <div
// //             className="rounded-xl overflow-hidden relative w-full"
// //             style={{ aspectRatio: "9/16" }}
// //           >
// //             {/* Show thumbnail first */}
// //             <img
// //               src={video.thumbnailUrl}
// //               alt={video.title}
// //               className="absolute inset-0 w-full h-full object-cover"
// //             />

// //             {/* Load playable video */}
// //             <IKContext urlEndpoint={urlEndpoint}>
// //               <IKVideo
// //                 path={video.videoUrl}
// //                 transformation={[{ height: "1920", width: "1080" }]}
// //                 controls={video.controls}
// //                 className="relative z-10"
// //               />
// //             </IKContext>
// //           </div>
// //         </Link>
// //       </figure>

// //       <div className="card-body p-4">
// //         <Link href={`/videos/${video._id}`} className="hover:opacity-80 transition-opacity block">
// //           <h2 className="card-title text-lg text-white">{video.title}</h2>
// //         </Link>

// //         <p className="text-sm text-gray-400 mt-1 line-clamp-2">
// //           {video.description}
// //         </p>
// //       </div>
// //     </div>
// //   );
// // }

// "use client";

// import { IKContext, IKVideo } from "imagekitio-react";
// import Link from "next/link";
// import { VideoDTO } from "@/models/Video";

// export default function VideoComponent({
//   video,
//   urlEndpoint,
// }: {
//   video: VideoDTO;
//   urlEndpoint: string;
// }) {
//   return (
//     <div className="card bg-gray-900/80 backdrop-blur-md shadow-lg border border-gray-800 rounded-2xl hover:shadow-2xl hover:border-gray-700 transition-all duration-300 overflow-hidden">
//       <figure className="relative">
//         <Link href={`/videos/${video._id}`} className="group w-full block">
//           <div
//             className="relative w-full overflow-hidden"
//             style={{ aspectRatio: "9/16" }}
//           >
//             {/* Thumbnail */}
//             <img
//               src={video.thumbnailUrl}
//               alt={video.title}
//               className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 group-hover:brightness-90"
//             />

//             {/* Dark gradient overlay for readability */}
//             <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 opacity-70 group-hover:opacity-80 transition-opacity"></div>

//             {/* Play button overlay */}
//             <div className="absolute inset-0 flex items-center justify-center">
//               <div className="w-14 h-14 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white transition-all duration-300 group-hover:scale-110">
//                 ▶
//               </div>
//             </div>

//             {/* Hidden video (kept as per your logic) */}
//             <IKContext urlEndpoint={urlEndpoint}>
//               <IKVideo
//                 path={video.videoUrl}
//                 transformation={[{ height: "1920", width: "1080" }]}
//                 controls={video.controls}
//                 className="relative z-10 hidden"
//               />
//             </IKContext>
//           </div>
//         </Link>
//       </figure>

//       <div className="card-body p-4">
//         <Link
//           href={`/videos/${video._id}`}
//           className="hover:opacity-90 transition-opacity block"
//         >
//           <h2 className="card-title text-lg font-semibold text-white line-clamp-1">
//             {video.title}
//           </h2>
//         </Link>

//         <p className="text-sm text-gray-400 mt-1 line-clamp-2">
//           {video.description}
//         </p>
//       </div>
//     </div>
//   );
// }
"use client";

import Link from "next/link";
import Image from "next/image";
import { Play } from "lucide-react";
import { VideoDTO } from "@/models/Video";

export default function VideoCard({ video }: { video: VideoDTO }) {
  // video.thumbnailUrl and video.videoUrl are expected absolute URLs
  return (
    <article className="bg-transparent group">
      <div className="relative w-full rounded-lg overflow-hidden bg-gray-800">
        <Link href={`/videos/${video._id}`} className="block">
          <Image
            src={video.thumbnailUrl || "/placeholder.png"}
            width={640}
            height={360}
            alt={video.title}
            className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
            priority={false}
          />
          {/* duration badge (if present) */}
          {video.duration && (
            <span className="absolute right-2 bottom-2 bg-black/70 text-xs text-white px-2 py-0.5 rounded">
              {video.duration}
            </span>
          )}
          {/* hover play icon */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="bg-black/50 p-3 rounded-full">
              <Play size={28} className="text-white" />
            </div>
          </div>
        </Link>
      </div>

      <div className="mt-3">
        <Link href={`/videos/${video._id}`} className="block">
          <h3 className="text-sm font-semibold text-gray-100 line-clamp-2">
            {video.title}
          </h3>
        </Link>
        <p className="text-xs text-gray-400 mt-1 line-clamp-2">
          {video.description || "No description"}
        </p>
        <div className="text-xs text-gray-500 mt-2 flex items-center gap-2">
          <span>{video.views ?? 0} views</span>
          <span>•</span>
          <span>{video.createdAt ? new Date(video.createdAt).toLocaleDateString() : ""}</span>
        </div>
      </div>
    </article>
  );
}
