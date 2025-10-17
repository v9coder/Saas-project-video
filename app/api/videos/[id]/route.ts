// import { NextRequest, NextResponse } from "next/server";
// import { connectToDatabase } from "@/lib/db";
// import Video, { toVideoDTO } from "@/models/Video";

// interface Params {
//   params: { id: string };
// }

// export async function GET(req: NextRequest, { params }: Params) {
//   try {
//     await connectToDatabase();

//     const video = await Video.findById(params.id).lean();

//     if (!video) {
//       return NextResponse.json({ error: "Video not found" }, { status: 404 });
//     }

//     const serialized = toVideoDTO(video);

//     return NextResponse.json(serialized, { status: 200 });
//   } catch (err) {
//     console.error("GET /api/videos/[id] failed", err);
//     return NextResponse.json(
//       { error: "Failed to fetch video" },
//       { status: 500 }
//     );
//   }
// }

// // import { NextRequest, NextResponse } from "next/server";
// // import { connectToDatabase } from "@/lib/db";
// // import Video, { toVideoDTO } from "@/models/Video";

// // export async function GET(req: NextRequest, context: any) {
// //   // Extract id from context.params
// //   const { id } = context.params;

// //   try {
// //     await connectToDatabase();

// //     const video = await Video.findById(id).lean();

// //     if (!video) {
// //       return NextResponse.json({ error: "Video not found" }, { status: 404 });
// //     }

// //     const serialized = toVideoDTO(video);

// //     return NextResponse.json(serialized, { status: 200 });
// //   } catch (err) {
// //     console.error("GET /api/videos/[id] failed", err);
// //     return NextResponse.json({ error: "Failed to fetch video" }, { status: 500 });
// //   }
// // }

import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Video, { toVideoDTO } from "@/models/Video";

// @ts-ignore
export async function GET(req: NextRequest, { params }: any) {
  try {
    await connectToDatabase();

    const video = await Video.findById(params.id).lean();

    if (!video) {
      return NextResponse.json({ error: "Video not found" }, { status: 404 });
    }

    const serialized = toVideoDTO(video);

    return NextResponse.json(serialized, { status: 200 });
  } catch (err) {
    console.error("GET /api/videos/[id] failed", err);
    return NextResponse.json(
      { error: "Failed to fetch video" },
      { status: 500 }
    );
  }
}
