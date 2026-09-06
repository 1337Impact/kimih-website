"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export default function NumberTicker({
  value,
  suffix = "",
  decimals = 0,
  className,
}: {
  value: number;
  suffix?: string;
  decimals?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      setDisplay(value);
      return;
    }

    const duration = 1200;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const next = value * eased;
      setDisplay(
        decimals > 0
          ? Number(next.toFixed(decimals))
          : Math.round(next)
      );
      if (progress < 1) requestAnimationFrame(tick);
    };

    const frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [started, value, decimals]);

  return (
    <span
      ref={ref}
      data-animate="number-ticker"
      data-started={started ? "true" : "false"}
      className={cn("tabular-nums", className)}
    >
      {decimals > 0 ? display.toFixed(decimals) : display}
      {suffix}
    </span>
  );
}
