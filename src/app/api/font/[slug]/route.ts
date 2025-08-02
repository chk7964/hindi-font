import {
  type apiResponse,
  ApiResponseMessage,
  type DynamicRouteSegmentConfig,
} from "@/types/api-response";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  try {
    const post = await prisma.post.findUnique({
      where: {
        slug: slug,
        status: true,
      },
    });

    const files = await prisma.file.findMany({
      where: {
        post_id: post?.id,
      },
    });
    return NextResponse.json<apiResponse>({
      success: true,
      data: { post, files },
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
