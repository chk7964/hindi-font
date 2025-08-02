import React from "react";
import CategoryForm from "./add-edit";
import { env } from "@/config/env";
import type { apiResponse } from "@/types/api-response";
import { headers } from "next/headers";

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const headersList = await headers();
  const cookie: string = headersList.get("cookie") ?? "";
  const { id } = await searchParams;
  const url = new URL(
    `${env.NEXT_PUBLIC_SITE_URL}/api/chk7964/category/add-edit-category`
  );
  url.searchParams.set("id", String(id));

  const res = await fetch(url, {
    method: "GET",
    headers: new Headers({ cookie: cookie }),
  });
  const response: apiResponse = await res.json();

  const { data } = response;
  return (
    <div>
      <CategoryForm propsData={data?.category ?? []} />
    </div>
  );
}
