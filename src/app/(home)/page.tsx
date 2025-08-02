import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { env } from "@/config/env";
import type { apiResponse } from "@/types/api-response";
import { itemsEqual } from "@dnd-kit/sortable/dist/utilities";
import { Download, Star, StarHalf } from "lucide-react";
import Link from "next/link";
import React from "react";

export default async function page() {
  const url = new URL(`${env.NEXT_PUBLIC_SITE_URL}/api/font`);
  const res = await fetch(url);
  const response: apiResponse = await res.json();
  const { data } = response;
  return (
    <div className="">
      <h1 className="text-center">All Hindi Font</h1>
      <h2>Latest Font</h2>
      {data.recents_fonts.map(
        (item: any, index: number) => (
          console.log(item.files.at(0).id),
          (<Ui key={index} item={item} />)
        )
      )}

      <Button className="mx-auto my-2 block text-center" asChild>
        <Link href={"#"}>View All Fonts</Link>
      </Button>
    </div>
  );
}

function Ui({ item }: { item: any }) {
  const rating = 2.5; // example rating, can come from props or state
  const totalStars = 5;

  // Generate an array to represent stars
  const stars = [];
  for (let i = 1; i <= totalStars; i++) {
    if (i <= Math.floor(rating)) {
      stars.push("full");
    } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
      stars.push("half");
    } else {
      stars.push("empty");
    }
  }

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <Link href={item.slug} className="hover:no-underline">
          <div className="text-center text-2xl font-normal md:text-start md:text-5xl">
            {"रिश्ता दिल से होना चाहिए, शब्दों से"}
          </div>
        </Link>
        <div className="flex flex-wrap items-center justify-center gap-4 md:justify-evenly">
          <div className="text-center text-lg text-blue-600 md:text-start">
            <Link href={item.slug}>{item.title}</Link>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <Download className="size-4" />
            <div className="inline-block leading-none">
              {String(item.files.at(0).download_count)}
            </div>
          </div>

          {/* <div className="flex items-center gap-0.5">
            {stars.map((type, index) => {
              if (type === "full") {
                return (
                  <Star
                    key={index}
                    className="h-4 w-4 fill-red-500 text-red-500"
                  />
                );
              }
              if (type === "half") {
                return (
                  <StarHalf
                    key={index}
                    className="h-4 w-4 fill-red-500 text-red-500"
                  />
                );
              }
              return <Star key={index} className="h-4 w-4 text-gray-300" />;
            })}
          </div> */}
          <Button
            className="bg-green-600 text-white hover:bg-green-700 hover:no-underline"
            asChild
          >
            <Link href={item.slug}>
              <Download className="mr-2 h-4 w-4" />
              Download
            </Link>
          </Button>
        </div>
      </div>
    </Card>
  );
}
