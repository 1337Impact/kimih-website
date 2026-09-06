/**
 * Runtime checks against a running Next.js server.
 * Usage: node scripts/verify-landing-animations.browser.mjs [baseUrl]
 */
const baseUrl = process.argv[2] || "http://127.0.0.1:3000";

const html = await fetch(baseUrl, { redirect: "follow" }).then((res) => {
  if (!res.ok) {
    throw new Error(`Landing page returned ${res.status} ${res.statusText}`);
  }
  return res.text();
});

const required = [
  'data-animate="aurora-background"',
  'data-animate="gradient-text"',
  'data-animate="shine-border"',
  'data-animate="shimmer-button"',
  'data-animate="marquee"',
  'data-animate="number-ticker"',
  'id="main"',
  'id="why-kimih"',
  'id="how-it-works"',
  'id="reviews"',
  'id="get-started"',
];

const missing = required.filter((token) => !html.includes(token));
if (missing.length) {
  console.error("Missing landing animation hooks in HTML:\n", missing.join("\n"));
  process.exit(1);
}

if (!html.includes("Book beauty and wellness")) {
  console.error("Hero headline missing from rendered HTML");
  process.exit(1);
}

console.log("Landing page HTML includes all animation hooks and hero copy.");
