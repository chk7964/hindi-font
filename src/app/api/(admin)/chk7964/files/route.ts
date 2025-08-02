import { prisma } from "@/lib/prisma";
import {
  type apiResponse,
  ApiResponseMessage,
  type DynamicRouteSegmentConfig,
} from "@/types/api-response";
import { NextRequest, NextResponse } from "next/server";
import { postsSearchParams } from "@/nuqs/admin/posts-search-params";
import { type post, Prisma } from "@/generated/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const { orderBy, sortBy, page, q, pageSize } =
    postsSearchParams(searchParams);

  try {
    const whereClause: Prisma.fileWhereInput = {
      filename: {
        contains: q,
        mode: "insensitive",
      },
    };

    const files = await prisma.file.findMany({
      where: whereClause,
      orderBy: {
        [sortBy]: orderBy,
      },

      take: pageSize,
      skip: (page - 1) * pageSize,
    });

    return NextResponse.json<apiResponse>({
      success: true,
      message: null,
      data: { files },
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
  } finally {
    await prisma.$disconnect();
  }
}

export const dynamic: DynamicRouteSegmentConfig = "force-dynamic";
