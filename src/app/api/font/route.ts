import {
  type apiResponse,
  ApiResponseMessage,
  type DynamicRouteSegmentConfig,
} from "@/types/api-response";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { loadSearchParams } from "./search-params";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const { page, pageSize } = loadSearchParams(searchParams);
  try {
    const recents_fonts = await prisma.post.findMany({
      where: {
        status: true,
      },
      orderBy: {
        created_at: "desc",
      },
      include: {
        files: true,
      },
    });
    return NextResponse.json<apiResponse>({
      success: true,
      data: { recents_fonts },
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
