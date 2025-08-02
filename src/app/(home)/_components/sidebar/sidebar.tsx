import Link from "next/link";

// UI Components
import { Card } from "@/components/ui/card";
import { Download, Star, StarHalf } from "lucide-react";

// Custom hooks and utilities

//Components
import { Separator } from "@/components/ui/separator";
import SidebarAds from "@/components/ads/sidebar-ads";

import type { apiResponse } from "@/types/api-response";
import { Button } from "@/components/ui/button";
import { env } from "@/config/env";

export default async function Sidebar() {
  const res = await fetch(
    `${env.NEXT_PUBLIC_SITE_URL}/api/font/most-downloaded-font`,
    {
      cache: "no-store",
    }
  );
  const response = await res.json();
  const { data }: any = response;

  return (
    <>
      <section>
        <h3>Most Downloaded Font</h3>
        <Ui />
      </section>
    </>
  );
}

function Ui() {
  const rating = 2.5; // example rating, can come from props or state
  const totalStars = 5;

  // Genera`te an array to represent stars
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
        <Link href={"#"} className="hover:no-underline">
          <div className="text-lg text-blue-600">Kruti Dev 010 Regular</div>
        </Link>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-gray-600">
            <Download className="h-4 w-4" />
            <span>5153903</span>
          </div>
          <div className="flex items-center gap-0.5">
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
          </div>
          {/* <Button
            className="bg-green-600 text-white hover:bg-green-700 hover:no-underline"
            asChild
          >
            <Link href={"#"}>
              <Download className="mr-2 h-4 w-4" />
              Download
            </Link>
          </Button> */}
        </div>
      </div>
    </Card>
  );
}
