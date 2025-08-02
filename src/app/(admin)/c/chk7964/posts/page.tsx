import DataGridDemo from "./_data-grid/stripped";
import React from "react";
import { postsSearchParams } from "@/nuqs/admin/posts-search-params";
import { env } from "@/config/env";
import { type apiResponse } from "@/types/api-response";
import { headers } from "next/headers";

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const headersList = await headers();
  const cookie: string = headersList.get("cookie") ?? "";
  const { orderBy, sortBy, page, q, pageSize } = postsSearchParams(
    await searchParams
  );
  const url = new URL(`${env.NEXT_PUBLIC_SITE_URL}/api/chk7964/posts`);
  url.searchParams.set("page", String(page));
  url.searchParams.set("q", String(q));
  url.searchParams.set("pageSize", String(pageSize));
  url.searchParams.set("sortBy", String(sortBy));
  url.searchParams.set("orderBy", String(orderBy));

  const res = await fetch(url, { headers: new Headers({ cookie: cookie }) });
  const response: apiResponse = await res.json();
  const data = response.data;
  console.log(data.posts);
  return (
    <div>
      <DataGridDemo data={data.posts} />
    </div>
  );
}
