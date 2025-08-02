import { Button } from "@/components/ui/button";
import { Headset, Home, ShieldX } from "lucide-react";
import Link from "next/link";

export default function AccessDeniedPage() {
  return (
    <div className="bg-background text-foreground flex flex-col items-center justify-center">
      <div className="max-w-md space-y-6 p-8 text-center">
        <ShieldX className="text-destructive mx-auto h-24 w-24" />
        <h1 className="text-4xl font-bold tracking-tight">Access Denied</h1>
        <p className="text-muted-foreground text-xl">
          Sorry, you don&apos;t have permission to access this page.
        </p>
        <div className="flex justify-center space-x-4">
          <Button asChild className="flex items-center justify-center">
            <Link href="/">
              <Home />
              Go Home
            </Link>
          </Button>
          <Button
            variant="outline"
            asChild
            className="flex items-center justify-center"
          >
            <Link href="/contact-us">
              <Headset />
              Contact Support
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
