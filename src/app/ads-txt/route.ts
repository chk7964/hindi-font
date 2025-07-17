import {
  ApiResponseMessage,
  type DynamicRouteSegmentConfig,
  type apiResponse,
} from "@/types/api-response";
import { NextResponse } from "next/server";

export const revalidate = 3600; //1 day
export const dynamic: DynamicRouteSegmentConfig = "force-dynamic";

export async function GET() {
  try {
    const txt = "";

    return new NextResponse(txt, {
      headers: new Headers({
        "Content-Type": "text/plain",
      }),
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
  }
}
