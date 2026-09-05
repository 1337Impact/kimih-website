import Link from "next/link";
import { cn } from "@/lib/utils";

export default function ShimmerButton({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      data-animate="shimmer-button"
      className={cn(
        "relative inline-flex items-center justify-center overflow-hidden rounded-full px-6 py-3 font-semibold text-white",
        "bg-gradient-to-r from-themeBlue to-themeVilot shadow-lg shadow-themeVilot/20",
        "transition hover:opacity-95",
        className
      )}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shine motion-reduce:animate-none"
      />
      <span className="relative z-10">{children}</span>
    </Link>
  );
}
