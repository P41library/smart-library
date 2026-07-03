import { Link } from "@tanstack/react-router";
import { BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

export function Logo({ className, withText = true }: { className?: string; withText?: boolean }) {
  return (
    <Link to="/" className={cn("group flex items-center gap-2.5", className)} data-cursor="hover">
      <span className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-primary text-primary-foreground shadow-soft ring-1 ring-border transition-transform duration-300 group-hover:scale-105">
        <BookOpen className="h-5 w-5" />
      </span>
      {withText && (
        <span className="flex flex-col leading-none">
          <span className="font-display text-lg font-extrabold tracking-tight">
            Lib<span className="text-primary">zy</span>
          </span>
          <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Smart Library
          </span>
        </span>
      )}
    </Link>
  );
}
