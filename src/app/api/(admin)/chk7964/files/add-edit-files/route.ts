import { prisma } from "@/lib/prisma";
import {
  type apiResponse,
  ApiResponseMessage,
  type DynamicRouteSegmentConfig,
} from "@/types/api-response";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const postSchema = z.object({
  id: z.string().optional(),
  category_id: z.number(),
  filename: z.string().min(1),
  mimetype: z.string().min(1),
  size: z.number(),
  post_id: z.number(),
});

export async function POST(req: NextRequest) {
  const body = await req.json();

  const parsed = postSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json<apiResponse>(
      {
        success: false,
        message: "Validation Failed",
        data: null,
      },
      { status: 400 }
    );
  }

  const { id, category_id, filename, post_id, mimetype, size } = parsed.data;
  let message;
  try {
    if (id) {
      const update = await prisma.file.update({
        where: { id },
        data: {
          category_id,
          filename,
          mimetype,
          post_id,
          size,
        },
      });
      message = "Updated";
    } else {
      const create = await prisma.file.create({
        data: {
          category_id,
          filename,
          mimetype,
          post_id,
          size,
        },
      });
      message = "Created";
    }

    return NextResponse.json<apiResponse>({
      success: true,
      message,
      data: null,
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

// Zod schema for query validation
const querySchema = z.object({
  id: z.string(),
});

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  try {
    const parseResult = querySchema.safeParse({
      id: searchParams.get("id"),
    });

    if (!parseResult.success) {
      return NextResponse.json<apiResponse>(
        {
          success: false,
          message: "Invalid query",
          data: null,
        },
        { status: 400 }
      );
    }

    const id = parseResult.data.id;

    const file = await prisma.file.findUnique({
      where: { id },
    });

    if (!file) {
      return NextResponse.json<apiResponse>(
        {
          success: false,
          message: "Post not found",
          data: null,
        },
        { status: 404 }
      );
    }

    return NextResponse.json<apiResponse>({
      success: true,
      message: null,
      data: { file },
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
