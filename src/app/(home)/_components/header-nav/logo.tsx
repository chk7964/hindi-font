import { cn } from "@/lib/utils";

export default function Logo({ className }: { className?: string }) {
  return (
    <div className="flex flex-col p-0!">
      <div className={cn("text-foreground text-xl", "font-bold", className)}>
        NickFinder.mobi
      </div>
    </div>
  );
}
