"use client";
import { useEffect, useState } from "react";
import { ArrowBigUp } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <Button
          variant="default"
          size="icon"
          className={cn(
            "fixed right-4 bottom-32 z-50 flex cursor-pointer items-center justify-center rounded-md p-1 transition-opacity duration-300"
          )}
          title="Scroll Up"
          onClick={scrollToTop}
          asChild
        >
          <ArrowBigUp size={10} />
        </Button>
      )}
    </>
  );
};

export { ScrollToTop };
