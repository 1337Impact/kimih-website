import { cn } from "@/lib/utils";

export default function AnimatedGradientText({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      data-animate="gradient-text"
      className={cn(
        "bg-[length:200%_auto] bg-clip-text text-transparent",
        "bg-gradient-to-r from-themeBlue via-themeVilot to-themeBlue",
        "animate-gradient-x motion-reduce:animate-none",
        className
      )}
    >
      {children}
    </span>
  );
}
