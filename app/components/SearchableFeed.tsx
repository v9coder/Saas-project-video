"use client";

import { useState, useEffect } from "react";
import Header from "@/app/components/Header";
import VideoFeed from "./VideoFeed";
import { VideoDTO } from "@/models/Video";

export default function SearchableFeed({ videos }: { videos: VideoDTO[] }) {
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState(videos);

  // debounce search — runs 400ms after typing stops
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!query.trim()) {
        setFiltered(videos);
        return;
      }
      const q = query.toLowerCase();
      const results = videos.filter(v => v.title.toLowerCase().includes(q));
      setFiltered(results);
    }, 400);

    return () => clearTimeout(timeout);
  }, [query, videos]);

  return (
    <>
      <Header onSearch={setQuery} />
      <VideoFeed videos={filtered} />
    </>
  );
}
