import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, Star, StarHalf } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <div className="">
      <h1>All Hindi Font Download Here</h1>
      <h2>Most Downloaded Font</h2>
      <Ui />
      <Button className="text-center" asChild>
        <Link href={"#"}>View All Fonts</Link>
      </Button>
    </div>
  );
}

function Ui() {
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
        <Link href={"#"} className="hover:no-underline">
          <div className="text-5xl font-normal">
            {"रिश्ता दिल से होना चाहिए, शब्दों से"}
          </div>
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
          <Button
            className="bg-green-600 text-white hover:bg-green-700 hover:no-underline"
            asChild
          >
            <Link href={"#"}>
              <Download className="mr-2 h-4 w-4" />
              Download
            </Link>
          </Button>
        </div>
      </div>
    </Card>
  );
}
