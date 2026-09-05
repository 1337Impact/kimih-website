import { cn } from "@/lib/utils";

export default function AuroraBackground({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      data-animate="aurora-background"
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className
      )}
    >
      <div className="absolute -top-24 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-themeVilot/30 blur-[90px] animate-aurora motion-reduce:animate-none" />
      <div className="absolute top-10 -left-16 h-[340px] w-[340px] rounded-full bg-themeBlue/25 blur-[80px] animate-aurora motion-reduce:animate-none [animation-delay:-6s]" />
      <div className="absolute top-32 right-0 h-[300px] w-[300px] rounded-full bg-fuchsia-400/25 blur-[80px] animate-pulse-glow motion-reduce:animate-none" />
      <div className="absolute bottom-0 left-1/3 h-40 w-2/3 bg-gradient-to-t from-white to-transparent" />
    </div>
  );
}
