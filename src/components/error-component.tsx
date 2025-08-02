"use client";
import { Home, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ErrorComponent({ reset }: { reset: () => void }) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col">
        <div className="text-foreground/80 block text-2xl font-bold sm:text-7xl">
          Something Went Wrong !!
        </div>
        <div className="mt-5 flex flex-col items-center justify-center gap-2 sm:flex-row">
          <Button
            aria-label="reset"
            onClick={() => reset()}
            className="cursor-pointer"
            variant={"default"}
          >
            <RefreshCcw size={20} className="mr-2" />
            Try again
          </Button>
          <Button asChild className="cursor-pointer">
            <Link href="/">
              <Home size={20} /> Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
