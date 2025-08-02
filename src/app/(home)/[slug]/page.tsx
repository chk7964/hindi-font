import BreadcrumbsItem from "@/components/breadcrumb-item";
import { Card } from "@/components/ui/card";
import React from "react";
import Preview from "./preview";
import { type Metadata } from "next";
import { env } from "@/config/env";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import Link from "next/link";
import type { apiResponse } from "@/types/api-response";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { formatBytes } from "@/utils/formatBytes";

export default async function page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const url = new URL(`${env.NEXT_PUBLIC_SITE_URL}/api/font/${slug}`);
  // url.pathname = slug;
  const res = await fetch(url);
  const response: apiResponse = await res.json();
  const { data } = response;
  console.log(data);
  return (
    <>
      <section className="">
        <BreadcrumbsItem data={[{ name: `${slug}` }]} />
      </section>
      <Card className="my-2 p-2">
        <h1 className="mt-0 text-center">{slug}</h1>
        <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-start sm:justify-center">
          <p
            className="mt-0! sm:w-1/2"
            dangerouslySetInnerHTML={{
              __html: `Nicknames, cool fonts, symbols and stylish names for <b>${slug}</b> in different letters. ${slug}'s different fonts look good and work on all platforms.`,
            }}
          />
        </div>
        <Preview />
        {data.files.map((file: any) => (
          <Button asChild className="cursor-pointer" key={file.id}>
            <Link
              href={{ pathname: "download", query: { key: file.filename } }}
            >
              <div className="flex items-center gap-1">
                <span>{file.download_count}</span>
                <Download className="h-4 w-4" /> Download Font
              </div>
            </Link>
          </Button>
        ))}

        <Label>Font Information</Label>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Property</TableHead>
              <TableHead>Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.files.map((file: any) => (
              <React.Fragment key={file.id}>
                <TableRow>
                  <TableCell>Filename</TableCell>
                  <TableCell>{file.filename}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>MIME Type</TableCell>
                  <TableCell>{file.mimetype}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Download Count</TableCell>
                  <TableCell>{file.download_count}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Size</TableCell>
                  <TableCell className="">{formatBytes(file.size)}</TableCell>
                </TableRow>
                {/* <TableRow>
                  <TableCell colSpan={2}>
                    <hr />
                  </TableCell>
                </TableRow> */}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </Card>
    </>
  );
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const params = await props.params;

  return {
    title: ``,
    description: ``,
    alternates: {
      canonical: `${env.NEXT_PUBLIC_SITE_URL}/${params.slug}`,
    },
  };
}
