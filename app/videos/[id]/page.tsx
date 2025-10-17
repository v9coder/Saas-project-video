import { VideoDTO } from "@/models/Video";

// @ts-ignore
export default async function VideoPage({ params }: any) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/videos/${params.id}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    return <p className="text-center py-10">Video not found</p>;
  }

  const video: VideoDTO = await res.json();

  return (
    <main className="px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">{video.title}</h1>
      <video
        src={video.videoUrl}
        poster={video.thumbnailUrl}
        controls
        className="w-full rounded-xl"
      />
      <p className="mt-4 text-gray-300">{video.description}</p>
    </main>
  );
}
