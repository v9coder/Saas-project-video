import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import Video, { IVideo, toVideoDTO, VideoDTO } from "@/models/Video";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

// export async function GET() {
//   try {
//     await connectToDatabase();

//     const videos = await Video.find({}).sort({ createdAt: -1 }).lean();
//     const serialized: VideoDTO[] = videos.map((video: any) => toVideoDTO(video));

//     return NextResponse.json(serialized, { status: 200 });
//   } catch (error) {
//     console.error("GET /api/videos failed", error);
//     return NextResponse.json({ error: "Failed to load/fetch videos" }, { status: 500 });
//   }
// }
export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();

    // Extract search query (?q=...)
    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q")?.trim() || "";

    let videos;

    if (q) {
      // 🔍 Perform case-insensitive search on title & description
      videos = await Video.find({
        $or: [
          { title: { $regex: q, $options: "i" } },
          { description: { $regex: q, $options: "i" } },
        ],
      })
        .sort({ createdAt: -1 })
        .lean();
    } else {
      // 🧾 No query: fetch all videos
      videos = await Video.find({})
        .sort({ createdAt: -1 })
        .lean();
    }

    const serialized: VideoDTO[] = videos.map((video: any) => toVideoDTO(video));
    return NextResponse.json(serialized, { status: 200 });
  } catch (error) {
    console.error("GET /api/videos failed", error);
    return NextResponse.json(
      { error: "Failed to load/fetch videos" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json(
      { error: "Unauthorized" }, 
      { status: 401 }
    );

    await connectToDatabase();

    const body: IVideo = await request.json();
    if (!body.title || !body.description || !body.videoUrl || !body.thumbnailUrl) {
      return NextResponse.json(
        { error: "Missing required fields" }, 
        { status: 400 });
    }

    const videoData = {
      ...body,
      controls: body?.controls ?? true,
      transformation: {
        height: 1920,
        width: 1080,
        quality: body.transformation?.quality ?? 100,
      },
    };

    const newVideo = await Video.create(videoData);
    const safeVideo: VideoDTO = toVideoDTO(newVideo.toObject());
    return NextResponse.json(safeVideo, { status: 201 });

  } catch (error) {
    console.error("POST /api/videos failed", error);
    return NextResponse.json(
      { error: "Failed to create video" }, 
      { status: 500 });
  }
}
