import {
  type apiResponse,
  ApiResponseMessage,
  type DynamicRouteSegmentConfig,
} from "@/types/api-response";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const most_downloaded_font = await prisma.file.findMany({
      where: {
        post: {
          status: true,
        },
      },
      orderBy: {
        download_count: "desc",
      },
    });

    return NextResponse.json<apiResponse>({
      success: true,
      data: most_downloaded_font,
      message: null,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json<apiResponse>(
      {
        success: false,
        message: ApiResponseMessage.InternalServerError,
        data: null,
      },
      { status: 500 }
    );
  }
}

export const dynamic: DynamicRouteSegmentConfig = "force-dynamic";
