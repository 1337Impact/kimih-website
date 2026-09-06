import ReviewCard from "@/components/review-card";
import Marquee from "./marquee";
import BlurFade from "./blur-fade";

export type ClientReview = {
  title: string;
  description: string;
  client_name: string;
  client_address: string;
  client_image: string;
};

export default function ReviewMarquee({ reviews }: { reviews: ClientReview[] }) {
  return (
    <section id="reviews" className="w-full scroll-mt-28 overflow-hidden">
      <BlurFade>
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-themeVilot">
            Social proof
          </p>
          <h2 className="mt-2 text-3xl font-bold text-black">Loved by clients</h2>
        </div>
      </BlurFade>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-white to-transparent md:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-white to-transparent md:w-24" />
        <Marquee pauseOnHover className="[--duration:45s]">
          {reviews.map((review) => (
            <div key={review.title} className="w-[340px]">
              <ReviewCard {...review} />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
