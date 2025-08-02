import { s3Client } from "@/lib/s3Client";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { prisma } from "@/lib/prisma";
import { type apiResponse, ApiResponseMessage } from "@/types/api-response";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { key } = await req.json();
  try {
    const command = new GetObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME!,
      Key: key,
    });

    const signedUrl = await getSignedUrl(s3Client, command, {
      expiresIn: 60, // 1 minute validity
    });

    await prisma.file.update({
      where: {
        filename: key,
      },
      data: {
        download_count: {
          increment: 1,
        },
      },
    });
    return NextResponse.json<apiResponse>({
      data: signedUrl,
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
