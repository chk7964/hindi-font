import React from "react";
import ContentForm from "./add-edit";
import { Card } from "@/components/ui/card";
import { env } from "@/config/env";
import type { apiResponse } from "@/types/api-response";
import { prisma } from "@/lib/prisma";
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
    `${env.NEXT_PUBLIC_SITE_URL}/api/chk7964/posts/add-edit-post`
  );
  url.searchParams.set("id", String(id));

  const res = await fetch(url, {
    method: "GET",
    headers: new Headers({ cookie: cookie }),
  });
  const response: apiResponse = await res.json();

  const { data } = response;
  const category = await prisma.category.findMany({});
  return (
    <Card>
      <ContentForm propsData={data?.post ?? []} category={category ?? []} />
    </Card>
  );
}
