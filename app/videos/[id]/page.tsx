// import { VideoDTO } from "@/models/Video";

// interface VideoPageProps {
//   params: { id: string };
// }

// export default async function VideoPage({ params }: VideoPageProps) {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_BASE_URL}/api/videos/${params.id}`,
//     { cache: "no-store" }
//   );

//   if (!res.ok) {
//     return <p className="text-center py-10">Video not found</p>;
//   }

//   const video: VideoDTO = await res.json();

//   return (
//     <main className="px-4 py-8">
//       <h1 className="text-2xl font-bold mb-4">{video.title}</h1>
//       <video
//         src={video.videoUrl}
//         poster={video.thumbnailUrl}
//         controls
//         className="w-full rounded-xl"
//       />
//       <p className="mt-4 text-gray-300">{video.description}</p>
//     </main>
//   );
// }
// import { VideoDTO } from "@/models/Video";
// import VideoCard from "@/app/components/VideoCard";

// interface VideoPageProps {
//   params: { id: string };
// }

// export default async function VideoPage({ params }: VideoPageProps) {
//   const videoRes = await fetch(
//     `${process.env.NEXT_PUBLIC_BASE_URL}/api/videos/${params.id}`,
//     { cache: "no-store" }
//   );

//   if (!videoRes.ok) {
//     return <p className="text-center py-10 text-gray-400">Video not found</p>;
//   }

//   const video: VideoDTO = await videoRes.json();

//   // fetch suggestions
//   const suggestionsRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/videos?limit=8`, {
//     cache: "no-store",
//   });
//   const suggestions: VideoDTO[] = suggestionsRes.ok ? await suggestionsRes.json() : [];

//   return (
//     <main className="px-4 py-8">
//       <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
//         <div className="lg:col-span-2">
//           <h1 className="text-xl font-semibold text-white mb-3">{video.title}</h1>
//           <div className="w-full bg-black rounded-lg overflow-hidden">
//             <video
//               src={video.videoUrl}
//               poster={video.thumbnailUrl}
//               controls
//               className="w-full max-h-[70vh] bg-black"
//             />
//           </div>

//           <div className="mt-4 bg-gray-900/40 p-4 rounded border border-gray-800">
//             <p className="text-sm text-gray-300">{video.description}</p>
//             <div className="mt-3 text-xs text-gray-500">
//               <span>{video.views ?? 0} views</span>
//               <span className="mx-2">•</span>
//               <span>{video.createdAt ? new Date(video.createdAt).toLocaleString() : ""}</span>
//             </div>
//           </div>
//         </div>

//         <aside className="space-y-4">
//           <h2 className="text-sm text-gray-300 font-semibold">Up next</h2>
//           <div className="space-y-3">
//             {suggestions.map((s) => (
//               <div key={s._id} className="flex gap-3 items-start">
//                 <div className="w-36 flex-shrink-0">
//                   <VideoCard video={s} />
//                 </div>
//               </div>
//             ))}
//           </div>
//         </aside>
//       </div>
//     </main>
//   );
// }

import { VideoDTO } from "@/models/Video";
import VideoCard from "@/app/components/VideoCard";

interface VideoPageProps {
  params: Promise<{ id: string }>; 
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function VideoPage(props: VideoPageProps) {
  
  const { id } = await props.params;
  
  // Initiate both API calls concurrently using Promise.all
  const [videoRes, suggestionsRes] = await Promise.all([
    fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/videos/${id}`,
      { cache: "no-store" }
    ),
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/videos?limit=8`, {
      cache: "no-store",
    }),
  ]);

  if (!videoRes.ok) {
    return <p className="text-center py-10 text-gray-400">Video not found</p>;
  }

  const video: VideoDTO = await videoRes.json();
  const suggestions: VideoDTO[] = suggestionsRes.ok ? await suggestionsRes.json() : [];

  return (
    <main className="px-4 py-8 bg-gray-900 min-h-screen">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-2">
          <h1 className="text-2xl font-bold text-white mb-3 tracking-tight">{video.title}</h1>
          
          <div className="w-full bg-black rounded-xl shadow-2xl overflow-hidden border-4 border-gray-700">
            <video
              src={video.videoUrl}
              poster={video.thumbnailUrl}
              controls
              className="w-full max-h-[70vh] bg-black"
              autoPlay
            />
          </div>

          <div className="mt-6 bg-gray-800/60 p-5 rounded-xl shadow-inner border border-gray-700">
            <h2 className="text-base font-semibold text-gray-300 mb-2">Description</h2>
            <p className="text-sm text-gray-400 whitespace-pre-line leading-relaxed">{video.description}</p>
            <div className="mt-4 pt-4 border-t border-gray-700 text-xs text-gray-500 flex justify-between items-center">
              <div>
                <span>{video.views ?? 0} views</span>
                <span className="mx-3">•</span>
                <span>{video.createdAt ? new Date(video.createdAt).toLocaleDateString() : "Unknown date"}</span>
              </div>
              <span className="text-indigo-400 font-medium">Video ID: {id}</span>
            </div>
          </div>
        </div>

        
        <aside className="space-y-4">
          <h2 className="text-lg text-white font-bold border-b border-gray-700 pb-2">Up Next</h2>
          <div className="space-y-3">
            {suggestions.map((s) => (
              <a 
                key={s._id} 
                href={`/videos/${s._id}`} 
                className="block hover:bg-gray-800 transition-colors duration-200 p-2 rounded-lg"
              >
                <div className="flex gap-3 items-start">
                  
                  <div className="w-36 flex-shrink-0"> 
                    
                    <VideoCard video={s} />
                  </div>
                  <div className="flex flex-col flex-grow">
                    <p className="text-sm font-semibold text-white line-clamp-2">{s.title}</p>
                    <p className="text-xs text-gray-400 mt-1">{s.uploader || 'Unknown Uploader'}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </aside>
      </div>
    </main>
  );
}

