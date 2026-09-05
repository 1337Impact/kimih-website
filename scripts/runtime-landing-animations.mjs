import puppeteer from "puppeteer-core";

const baseUrl = process.argv[2] || "http://127.0.0.1:3000";
const chrome =
  process.env.CHROME_PATH ||
  "/usr/bin/google-chrome-stable";

const browser = await puppeteer.launch({
  executablePath: chrome,
  headless: "new",
  args: ["--no-sandbox", "--disable-gpu", "--disable-dev-shm-usage"],
});

const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
page.setDefaultTimeout(30000);

const failures = [];
const notes = [];

try {
  await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
  await page.waitForSelector('[data-animate="aurora-background"]');
  await new Promise((resolve) => setTimeout(resolve, 400));

  const initial = await page.evaluate(() => {
    const pick = (selector) => document.querySelector(selector);
    const styleOf = (el) => (el ? getComputedStyle(el) : null);
    const aurora = pick('[data-animate="aurora-background"] > div');
    const gradient = pick('[data-animate="gradient-text"]');
    const shine = pick('[data-animate="shine-border"] > div');
    const shimmer = pick('[data-animate="shimmer-button"] span[aria-hidden]');
    const fade = pick('[data-animate="fade-up"]');
    const marquee = document.querySelector(
      '[data-animate="marquee"] > div'
    );
    return {
      aurora: aurora && {
        animationName: styleOf(aurora).animationName,
        transform: styleOf(aurora).transform,
      },
      gradient: gradient && {
        animationName: styleOf(gradient).animationName,
        backgroundPosition: styleOf(gradient).backgroundPosition,
      },
      shine: shine && { animationName: styleOf(shine).animationName },
      shimmer: shimmer && { animationName: styleOf(shimmer).animationName },
      fade: fade && { animationName: styleOf(fade).animationName },
      marquee: marquee && {
        animationName: styleOf(marquee).animationName,
        transform: styleOf(marquee).transform,
      },
      tickerStarted: [
        ...document.querySelectorAll('[data-animate="number-ticker"]'),
      ].map((el) => el.getAttribute("data-started")),
      tickerText: [
        ...document.querySelectorAll('[data-animate="number-ticker"]'),
      ].map((el) => el.textContent),
    };
  });

  notes.push(`initial animations: ${JSON.stringify(initial, null, 2)}`);

  const expectName = (label, actual, expected) => {
    if (!actual || actual.animationName !== expected) {
      failures.push(
        `${label} expected animation-name "${expected}", got ${JSON.stringify(actual)}`
      );
    }
  };

  expectName("aurora", initial.aurora, "aurora");
  expectName("gradient text", initial.gradient, "gradient-x");
  expectName("shine border", initial.shine, "border-spin");
  expectName("shimmer button", initial.shimmer, "shine");
  expectName("hero badge", initial.fade, "fade-up");
  expectName("marquee", initial.marquee, "marquee");

  await new Promise((resolve) => setTimeout(resolve, 800));

  const after = await page.evaluate(() => {
    const styleOf = (el) => getComputedStyle(el);
    const aurora = document.querySelector(
      '[data-animate="aurora-background"] > div'
    );
    const marquee = document.querySelector('[data-animate="marquee"] > div');
    const gradient = document.querySelector('[data-animate="gradient-text"]');
    return {
      auroraTransform: aurora && styleOf(aurora).transform,
      marqueeTransform: marquee && styleOf(marquee).transform,
      gradientPosition: gradient && styleOf(gradient).backgroundPosition,
      tickerStarted: [
        ...document.querySelectorAll('[data-animate="number-ticker"]'),
      ].map((el) => el.getAttribute("data-started")),
      tickerText: [
        ...document.querySelectorAll('[data-animate="number-ticker"]'),
      ].map((el) => el.textContent),
    };
  });

  if (after.auroraTransform === initial.aurora.transform) {
    failures.push(
      `aurora transform did not change (${after.auroraTransform})`
    );
  }
  if (after.marqueeTransform === initial.marquee.transform) {
    failures.push(
      `marquee transform did not change (${after.marqueeTransform})`
    );
  }
  if (after.gradientPosition === initial.gradient.backgroundPosition) {
    failures.push(
      `gradient text background-position did not change (${after.gradientPosition})`
    );
  }
  if (!after.tickerStarted.includes("true")) {
    failures.push(`number ticker never started: ${after.tickerStarted}`);
  }

  await page.evaluate(() => {
    document.querySelector("#why-kimih")?.scrollIntoView({ block: "center" });
  });
  await new Promise((resolve) => setTimeout(resolve, 900));

  const bentoTickers = await page.evaluate(() =>
    [...document.querySelectorAll("#why-kimih [data-animate='number-ticker']")].map(
      (el) => ({
        started: el.getAttribute("data-started"),
        text: el.textContent,
      })
    )
  );
  if (
    !bentoTickers.length ||
    bentoTickers.some((ticker) => ticker.started !== "true" || ticker.text === "0+" || ticker.text === "0k+")
  ) {
    failures.push(`bento number tickers did not animate: ${JSON.stringify(bentoTickers)}`);
  } else {
    notes.push(`bento tickers: ${JSON.stringify(bentoTickers)}`);
  }

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await new Promise((resolve) => setTimeout(resolve, 700));

  const faded = await page.evaluate(() =>
    [...document.querySelectorAll('[data-animate="blur-fade"]')].map((el) =>
      el.getAttribute("data-visible")
    )
  );
  if (!faded.some((value) => value === "true")) {
    failures.push(`blur-fade never became visible: ${faded.join(",")}`);
  } else {
    notes.push(`blur-fade visible count=${faded.filter((v) => v === "true").length}/${faded.length}`);
  }

  notes.push(`after motion: ${JSON.stringify(after)}`);
} finally {
  await browser.close();
}

if (failures.length) {
  console.error("Landing animation runtime checks failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  for (const note of notes) console.error(note);
  process.exit(1);
}

console.log("All landing animation runtime checks passed.");
for (const note of notes) console.log(note);
