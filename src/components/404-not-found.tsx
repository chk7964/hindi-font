import Link from "next/link";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFoundComponent() {
  return (
    <div className="h-screen">
      <div className="text-foreground/80 text-7xl font-bold sm:text-9xl">
        404
      </div>
      <p
        className=""
        dangerouslySetInnerHTML={{
          __html: "Sorry, we couldn't find your page.",
        }}
      />
      <Button
        asChild
        className="text-foreground! mt-5 flex w-full cursor-pointer flex-row items-center justify-center gap-2"
      >
        <Link href="/">
          <Home size={20} /> Home
        </Link>
      </Button>
    </div>
  );
}
