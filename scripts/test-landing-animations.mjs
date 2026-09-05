import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

const root = process.cwd();

const requiredKeyframes = [
  "marquee",
  "aurora",
  "shimmer",
  "gradient-x",
  "shine",
  "border-spin",
  "fade-up",
  "pulse-glow",
];

const requiredAnimateAttrs = [
  "aurora-background",
  "gradient-text",
  "blur-fade",
  "marquee",
  "number-ticker",
  "shine-border",
  "shimmer-button",
];

function walkTsx(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return walkTsx(path);
    return entry.name.endsWith(".tsx") || entry.name.endsWith(".ts")
      ? [path]
      : [];
  });
}

test("landing animations are registered in Tailwind", () => {
  const config = readFileSync(join(root, "tailwind.config.ts"), "utf8");
  for (const name of requiredKeyframes) {
    const key = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    assert.match(
      config,
      new RegExp(`["']?${key}["']?:`),
      `missing keyframe ${name}`
    );
    assert.match(
      config,
      new RegExp(`["']?${key}["']?:\\s*["'].*${key}`),
      `missing animation utility for ${name}`
    );
  }
});

test("landing components expose animation hooks", () => {
  const files = walkTsx(join(root, "components/landing"));
  const source = files.map((file) => readFileSync(file, "utf8")).join("\n");
  for (const name of requiredAnimateAttrs) {
    assert.match(
      source,
      new RegExp(`data-animate="${name}"`),
      `missing data-animate="${name}"`
    );
  }
  assert.match(source, /motion-reduce:animate-none/);
  assert.match(source, /prefers-reduced-motion/);
});

test("homepage composes the animated landing sections", () => {
  const page = readFileSync(join(root, "app/(public)/page.tsx"), "utf8");
  const hero = readFileSync(
    join(root, "components/landing/landing-hero.tsx"),
    "utf8"
  );
  for (const symbol of [
    "LandingHero",
    "CategoryMarquee",
    "FeatureBento",
    "HowItWorks",
    "ReviewMarquee",
    "ClosingCta",
  ]) {
    assert.match(page, new RegExp(symbol), `homepage missing ${symbol}`);
  }
  assert.match(hero, /BookNowCard/, "hero missing booking card");
  assert.match(hero, /data-animate="fade-up"/);
});
