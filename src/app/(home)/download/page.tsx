import React from "react";
import TimerDownload from "./timmer";
import { env } from "@/config/env";

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { key } = await searchParams;
  const res = await fetch(`${env.NEXT_PUBLIC_SITE_URL}/api/font/download`, {
    method: "POST",
    body: JSON.stringify({ key: key }),
    headers: { "Content-Type": "application/json" },
  });
  const { url } = await res.json();
  return (
    <div>
      {key}

      <TimerDownload url={url} />
    </div>
  );
}
