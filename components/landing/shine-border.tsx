import { cn } from "@/lib/utils";

export default function ShineBorder({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      data-animate="shine-border"
      className={cn(
        "relative overflow-hidden rounded-3xl p-[1.5px]",
        className
      )}
    >
      <div
        aria-hidden
        className="absolute inset-[-40%] animate-border-spin bg-[conic-gradient(from_90deg,transparent_20%,#3A37EC_45%,#DD3FEB_65%,transparent_80%)] opacity-80 motion-reduce:animate-none"
      />
      <div className="relative z-10 rounded-[22px] bg-white">{children}</div>
    </div>
  );
}
