// import VideoFeed from "./components/VideoFeed";
// import { VideoDTO } from "@/models/Video";

// export default async function HomePage() {
//   // Fetch videos from API instead of DB directly
//   const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/videos`, {
//     cache: "no-store", // ✅ always fresh
//   });

//   if (!res.ok) {
//     throw new Error("Failed to fetch videos");
//   }

//   const videos: VideoDTO[] = await res.json();

//   return (
//     <main className="px-4 py-8">
//       <h1 className="text-2xl font-bold mb-6">Explore Videos</h1>
//       <VideoFeed videos={videos} />
//     </main>
//   );
// }
import VideoFeed from "./components/VideoFeed";
import { VideoDTO } from "@/models/Video";

export default async function HomePage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/videos`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return <p className="text-center py-12">Unable to load videos.</p>;
  }

  const videos: VideoDTO[] = await res.json();

  return (
    <main className="px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Recommended for you</h1>
        <p className="text-sm text-gray-400">Browse the latest uploads</p>
      </div>

      <VideoFeed videos={videos} />
    </main>
  );
}
