import { s3Client } from "@/lib/s3Client";
import { type apiResponse, ApiResponseMessage } from "@/types/api-response";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { filename, type } = await req.json();

  try {
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME!,
      Key: filename,
      ContentType: type,
    });

    const url = await getSignedUrl(s3Client, command, { expiresIn: 60 });

    return NextResponse.json<apiResponse>({
      data: url,
      message: null,
      success: true,
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
