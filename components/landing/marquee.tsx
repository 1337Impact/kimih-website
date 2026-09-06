import { cn } from "@/lib/utils";

export default function Marquee({
  children,
  className,
  reverse = false,
  pauseOnHover = true,
  vertical = false,
}: {
  children: React.ReactNode;
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  vertical?: boolean;
}) {
  return (
    <div
      data-animate="marquee"
      className={cn(
        "group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] [gap:var(--gap)]",
        vertical ? "flex-col" : "flex-row",
        className
      )}
    >
      {Array.from({ length: 2 }).map((_, index) => (
        <div
          key={index}
          aria-hidden={index === 1}
          className={cn(
            "flex shrink-0 justify-around [gap:var(--gap)]",
            vertical
              ? "animate-marquee-vertical flex-col"
              : "animate-marquee flex-row",
            reverse && "[animation-direction:reverse]",
            pauseOnHover && "group-hover:[animation-play-state:paused]",
            "motion-reduce:animate-none"
          )}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
