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
import { VideoDTO } from "@/models/Video";
import VideoCard from "@/app/components/VideoCard";

interface VideoPageProps {
  params: { id: string };
}

export default async function VideoPage({ params }: VideoPageProps) {
  const videoRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/videos/${params.id}`,
    { cache: "no-store" }
  );

  if (!videoRes.ok) {
    return <p className="text-center py-10 text-gray-400">Video not found</p>;
  }

  const video: VideoDTO = await videoRes.json();

  // fetch suggestions
  const suggestionsRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/videos?limit=8`, {
    cache: "no-store",
  });
  const suggestions: VideoDTO[] = suggestionsRes.ok ? await suggestionsRes.json() : [];

  return (
    <main className="px-4 py-8">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h1 className="text-xl font-semibold text-white mb-3">{video.title}</h1>
          <div className="w-full bg-black rounded-lg overflow-hidden">
            <video
              src={video.videoUrl}
              poster={video.thumbnailUrl}
              controls
              className="w-full max-h-[70vh] bg-black"
            />
          </div>

          <div className="mt-4 bg-gray-900/40 p-4 rounded border border-gray-800">
            <p className="text-sm text-gray-300">{video.description}</p>
            <div className="mt-3 text-xs text-gray-500">
              <span>{video.views ?? 0} views</span>
              <span className="mx-2">•</span>
              <span>{video.createdAt ? new Date(video.createdAt).toLocaleString() : ""}</span>
            </div>
          </div>
        </div>

        <aside className="space-y-4">
          <h2 className="text-sm text-gray-300 font-semibold">Up next</h2>
          <div className="space-y-3">
            {suggestions.map((s) => (
              <div key={s._id} className="flex gap-3 items-start">
                <div className="w-36 flex-shrink-0">
                  <VideoCard video={s} />
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </main>
  );
}
