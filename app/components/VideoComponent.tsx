import { IKVideo } from 'imagekitio-react';
import Link from "next/link";
import { IVideo } from "@/models/Video";

export default function VideoComponent({ video }: { video: IVideo }) {
  return (
    <div className="card bg-gray-900 shadow-lg border border-gray-800 rounded-xl hover:shadow-2xl transition-all duration-300">
      <figure className="relative px-4 pt-4">
        <Link
          href={`/videos/${video._id}`}
          className="relative group w-full block"
        >
          <div
            className="rounded-xl overflow-hidden relative w-full"
            style={{ aspectRatio: "9/16" }}
          >
            <IKVideo
              path={video.videoUrl}
              transformation={[{ height: "1920", width: "1080" }]}
              controls={video.controls}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </Link>
      </figure>

      <div className="card-body p-4">
        <Link
          href={`/videos/${video._id}`}
          className="hover:opacity-80 transition-opacity block"
        >
          <h2 className="card-title text-lg text-white">{video.title}</h2>
        </Link>

        <p className="text-sm text-gray-400 mt-1 line-clamp-2">
          {video.description}
        </p>
      </div>
    </div>
  );
}
