import VideoFeed from "./components/VideoFeed";
import Video, { IVideo } from "@/models/Video";
import { connectToDatabase } from "@/lib/db";

export default async function HomePage() {
  // Ensure DB connection
  await connectToDatabase();

  // Fetch videos and convert to plain JS objects with `.lean()`
  const videos = (await Video.find().lean()) as unknown as IVideo[];

  return (
    <main className="px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Explore Videos</h1>
      <VideoFeed videos={videos} />
    </main>
  );
}
