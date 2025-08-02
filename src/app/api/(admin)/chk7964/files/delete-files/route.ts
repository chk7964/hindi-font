import {
  type apiResponse,
  ApiResponseMessage,
  type DynamicRouteSegmentConfig,
} from "@/types/api-response";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

// Zod schema for validation
const deleteRequestSchema = z.object({
  ids: z.array(z.string(), {
    message: "ids is required and must be an array",
  }),
});

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate request body using Zod
    const parsed = deleteRequestSchema.safeParse(body);
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

    const { ids } = parsed.data;

    const deleteMany = await prisma.file.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    return NextResponse.json<apiResponse>({
      success: true,
      data: null,
      message: "Deleted",
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
