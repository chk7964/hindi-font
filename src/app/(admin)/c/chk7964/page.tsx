import { Card } from "@/components/ui/card";
import { env } from "@/config/env";
import { type apiResponse } from "@/types/api-response";
import React from "react";
import { headers } from "next/headers";

export default async function page() {
  const headersList = await headers();
  const cookie: string = headersList.get("cookie") ?? "";

  const url = new URL(`${env.NEXT_PUBLIC_SITE_URL}/api/chk7964`);
  const res = await fetch(url, {
    headers: new Headers({ cookie }),
  });
  const response: apiResponse = await res.json();
  const { files, posts, category } = response.data;
  return (
    <div className="flex w-full flex-col flex-wrap items-center justify-center gap-2 sm:flex-row">
      <Card className="w-60 p-4 shadow-md">
        <h2 className="mb-2 text-lg font-semibold">Files</h2>
        {files}
        <p className="text-sm text-gray-600">
          Upload and manage your documents.
        </p>
      </Card>

      <Card className="w-60 p-4 shadow-md">
        <h2 className="mb-2 text-lg font-semibold">Posts</h2>
        {posts}
        <p className="text-sm text-gray-600">
          View and create blog posts or updates.
        </p>
      </Card>

      <Card className="w-60 p-4 shadow-md">
        <h2 className="mb-2 text-lg font-semibold">Category</h2>
        {category}
        <p className="text-sm text-gray-600">Organize content by categories.</p>
      </Card>
    </div>
  );
}
