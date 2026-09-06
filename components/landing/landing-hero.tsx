import BookNowCard from "@/components/book-now-card";
import AnimatedGradientText from "./animated-gradient-text";
import AuroraBackground from "./aurora-background";
import ShineBorder from "./shine-border";
import ShimmerButton from "./shimmer-button";
import NumberTicker from "./number-ticker";

export default function LandingHero() {
  return (
    <section
      id="main"
      className="relative flex min-h-[78vh] w-full flex-col items-center justify-center pb-8 pt-10"
    >
      <AuroraBackground />
      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center">
        <p
          data-animate="fade-up"
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-themeVilot/20 bg-white/70 px-4 py-1.5 text-sm font-semibold text-themeVilot shadow-sm backdrop-blur animate-fade-up motion-reduce:animate-none"
        >
          First beauty & wellness platform in the UAE
        </p>
        <h1 className="text-balance text-4xl font-bold tracking-tight text-black md:text-5xl lg:text-7xl">
          Book beauty and wellness
          <br />
          <AnimatedGradientText>in a few seconds</AnimatedGradientText>
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-slate-600 md:text-xl">
          Discover top-rated salons, spas, and wellness studios near you. Search,
          book, and pay — without the wait.
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <ShimmerButton href="#recommended-services">Explore venues</ShimmerButton>
          <a
            href="#why-kimih"
            className="rounded-full border border-slate-200 bg-white/80 px-6 py-3 font-semibold text-slate-700 backdrop-blur transition hover:border-themeVilot/40"
          >
            See why Kimih
          </a>
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-8 text-left">
          <div>
            <p className="text-3xl font-extrabold text-black">
              <NumberTicker value={4.9} decimals={1} />
            </p>
            <p className="text-sm text-slate-500">Average client rating</p>
          </div>
          <div>
            <p className="text-3xl font-extrabold text-black">
              <NumberTicker value={24} suffix="/7" />
            </p>
            <p className="text-sm text-slate-500">Online booking</p>
          </div>
          <div>
            <p className="text-3xl font-extrabold text-black">UAE</p>
            <p className="text-sm text-slate-500">Built for the region</p>
          </div>
        </div>
      </div>
      <div className="relative z-10 mt-10 w-full px-1 md:mt-14 md:px-6">
        <ShineBorder>
          <BookNowCard />
        </ShineBorder>
      </div>
    </section>
  );
}
