"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
// import SignOut from "./SignOut";
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
} from "@/components/ui/sheet";

// Custom hooks and utilities
import { type Nav_itype } from "@/types/types";

//Components
import Logo from "@/app/(home)/_components/header-nav/logo";

export default function PrivateLeftNavbar({
  items,
  // username,
}: {
  items: Nav_itype[];
  // username: string;
}) {
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
          className="text-foreground cursor-pointer"
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
              variant={pathname === item.url ? "destructive" : "outline"}
              asChild
            >
              <Link href={item.url}>{item.name}</Link>
            </Button>
          ))}

          {/* <SignOut username={username} /> */}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
