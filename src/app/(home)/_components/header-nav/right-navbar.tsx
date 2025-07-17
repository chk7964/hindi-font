import { Search } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

// UI Components
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

// Custom hooks and utilities

//Components
import Logo from "./logo";
import SearchBar from "./search";

export default function PublicRightNavbar() {
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
          className="active:bg-destructive active:text-background animate-buttonheartbeat cursor-pointer"
          size={"icon"}
        >
          <Search size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent side={"right"} className={"p-2"}>
        <SheetHeader className="mt-4 p-0 pt-4">
          <SheetTitle className="text-background text-center">
            <Link href={"/"}>
              <Logo className="text-foreground" />
            </Link>
          </SheetTitle>
        </SheetHeader>
        <Separator />
        <SearchBar handleLinkClick={handleLinkClick} />
      </SheetContent>
    </Sheet>
  );
}
