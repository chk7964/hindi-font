import {
  type apiResponse,
  ApiResponseMessage,
  type DynamicRouteSegmentConfig,
} from "@/types/api-response";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ team: string }> }
) {
  try {
    return NextResponse.json<apiResponse>({
      success: true,
      data: null,
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
