import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu } from "lucide-react";

// UI Components
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";

// Custom hooks and utilities
import { type Nav_itype } from "@/types/types";
import { cn } from "@/lib/utils";

//Components
import Logo from "./logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { env } from "@/config/env";

export default function PublicLeftNavbar({ items }: { items: Nav_itype[] }) {
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const handleLinkClick = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setOpen(false);
  };
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          aria-label="menu"
          variant="outline"
          title="Menu"
          className="active:bg-destructive active:text-background cursor-pointer"
          size={"icon"}
        >
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"} className={"p-2"}>
        <SheetHeader className="mt-4 p-0 pt-4">
          <SheetTitle className="text-background text-center">
            <Link href={"/"}>
              <Logo className="text-foreground" />
            </Link>
          </SheetTitle>
        </SheetHeader>
        <Separator />
        <nav className="flex flex-col gap-2">
          {items.map((item: Nav_itype, index: number) => (
            <Button
              onClick={handleLinkClick}
              key={index}
              variant={pathname === item.url ? "default" : "outline"}
              asChild
              className={cn(
                "p-2",
                "border-l-4",
                "border-primary",
                "cursor-pointer",
                pathname === item.url
                  ? "hover:text-background"
                  : "hover:text-foreground"
              )}
            >
              <Link
                prefetch={false}
                href={`${env.NEXT_PUBLIC_SITE_URL}${item.url}`}
              >
                {item.name}
              </Link>
            </Button>
          ))}
        </nav>
        <SheetFooter>
          <div className="text-right">
            <ThemeToggle />
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
