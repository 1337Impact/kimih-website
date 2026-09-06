import Link from "next/link";
import BlurFade from "./blur-fade";
import ShimmerButton from "./shimmer-button";

export default function ClosingCta() {
  return (
    <section id="get-started" className="w-full scroll-mt-28">
      <BlurFade>
        <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-themeBlue via-[#7a3cf0] to-themeVilot px-6 py-14 text-white shadow-2xl md:px-12">
          <div
            aria-hidden
            className="absolute -right-10 -top-16 h-56 w-56 rounded-full bg-white/20 blur-3xl animate-pulse-glow motion-reduce:animate-none"
          />
          <div
            aria-hidden
            className="absolute -bottom-20 left-10 h-48 w-48 rounded-full bg-fuchsia-200/30 blur-3xl animate-aurora motion-reduce:animate-none"
          />
          <div className="relative z-10 mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold md:text-5xl">
              Your next appointment is one tap away
            </h2>
            <p className="mt-4 text-lg text-white/85">
              Join thousands of clients booking salons, spas, and wellness
              studios across the UAE — and businesses growing without
              subscription fees.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <ShimmerButton href="/map" className="bg-white from-white to-white text-themeBlue">
                Book a service
              </ShimmerButton>
              <Link
                href="/business"
                className="rounded-full border border-white/40 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                List your business
              </Link>
            </div>
          </div>
        </div>
      </BlurFade>
    </section>
  );
}
