import { prisma } from "@/lib/prisma";
import {
  type apiResponse,
  ApiResponseMessage,
  type DynamicRouteSegmentConfig,
} from "@/types/api-response";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const postSchema = z.object({
  id: z.number().optional(),
  slug: z.string().min(1),
  name: z.string().min(1),
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

  const { id, slug, name } = parsed.data;
  let message;
  try {
    if (id) {
      const update = await prisma.category.update({
        where: { id },
        data: {
          slug,
          name,
        },
      });
      message = "Updated";
    } else {
      const create = await prisma.category.create({
        data: {
          slug,
          name,
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
  id: z
    .string()
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val) && val > 0, {
      message: "Invalid Post Id",
    }),
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

    const category = await prisma.category.findUnique({
      where: { id },
    });

    if (!category) {
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
      data: { category },
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
