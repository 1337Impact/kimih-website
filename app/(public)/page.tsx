import Image from "next/image";
import SalonCard from "@/components/salon-card";
import ListCities from "@/components/list-cities";
import { createClient } from "@/utils/supabase/server";
import LandingHero from "@/components/landing/landing-hero";
import CategoryMarquee from "@/components/landing/category-marquee";
import FeatureBento from "@/components/landing/feature-bento";
import HowItWorks from "@/components/landing/how-it-works";
import ReviewMarquee from "@/components/landing/review-marquee";
import ClosingCta from "@/components/landing/closing-cta";
import BlurFade from "@/components/landing/blur-fade";

type BusinessCard = {
  title: string;
  address: string;
  image: string;
  url: string;
  rating: {
    count: number;
    average: number;
  };
};

const mapBusinesses = (
  data: {
    id: string;
    name: string;
    address: string | null;
    images: string[] | null;
    reviews: { rating: number }[];
  }[]
): BusinessCard[] =>
  data.map((business) => ({
    title: business.name,
    address: business.address || "No address provided",
    image: business.images?.[0] || "/assets/images/yoga.png",
    url: `/s/${business.id}`,
    rating: {
      count: business.reviews.length || 0,
      average: business.reviews.length
        ? business.reviews.reduce(
            (acc: number, curr: { rating: number }) => acc + curr.rating,
            0
          ) / business.reviews.length
        : 0,
    },
  }));

const getNewBusinessData = async () => {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("business")
      .select("id, name, address, images, reviews(rating)")
      .eq("published", true)
      .order("created_at", { ascending: false })
      .limit(10);
    if (error || !data) {
      console.error(error);
      return [];
    }
    return mapBusinesses(data);
  } catch (error) {
    console.error(error);
    return [];
  }
};

const getRecommendedBusinessData = async () => {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("business")
      .select("id, name, address, images, reviews(rating)")
      .eq("published", true)
      .limit(10);
    if (error || !data) {
      console.error(error);
      return [];
    }
    return mapBusinesses(data);
  } catch (error) {
    console.error(error);
    return [];
  }
};

const clientReviews = [
  {
    title: "Best Salon for Men in Town!",
    description: "Great experience and skilled barbers. Will return!",
    client_name: "Cameron Diaz",
    client_address: "Al Nabba, Sharjah, UAE",
    client_image: "/assets/images/review-avatar-1.webp",
  },
  {
    title: "Excellent Service and Skilled Staff!",
    description: "Attentive team and quality service. Highly recommended!",
    client_name: "John Doe",
    client_address: "Muhaisanah Fourth, Dubai, UAE",
    client_image: "/assets/images/review-avatar-2.webp",
  },
  {
    title: "Go-To Salon for Men!",
    description: "Consistently great service and friendly staff.",
    client_name: "David Miller",
    client_address: "Al Karama, Dubai, UAE",
    client_image: "/assets/images/review-avatar-3.png",
  },
];

function BusinessGrid({
  id,
  title,
  businesses,
}: {
  id: string;
  title: string;
  businesses: BusinessCard[];
}) {
  return (
    <section id={id} className="w-full">
      <BlurFade>
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 className="text-3xl font-bold text-black">{title}</h2>
          <a
            href="/map"
            className="text-sm font-semibold text-themeVilot hover:underline"
          >
            View map
          </a>
        </div>
      </BlurFade>
      {businesses.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white/70 px-6 py-12 text-center text-slate-500">
          New venues are joining Kimih every week. Search the map to explore
          nearby salons and spas.
        </div>
      ) : (
        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {businesses.map((salon, index) => (
            <BlurFade key={`${salon.title}-${index}`} delay={index * 60}>
              <SalonCard {...salon} />
            </BlurFade>
          ))}
        </div>
      )}
    </section>
  );
}

export default async function Home() {
  const [newbusinessData, recommendedBusinessData] = await Promise.all([
    getNewBusinessData(),
    getRecommendedBusinessData(),
  ]);

  return (
    <main className="relative mx-auto flex min-h-screen w-full max-w-[1300px] flex-col items-center overflow-hidden px-4 pb-16 pt-20 md:px-6">
      <LandingHero />

      <CategoryMarquee />

      <div className="mt-16 w-full lg:mt-24">
        <FeatureBento />
      </div>

      <div className="mt-16 w-full lg:mt-24">
        <BusinessGrid
          id="recommended-services"
          title="Recommended"
          businesses={recommendedBusinessData}
        />
      </div>

      <div className="mt-16 w-full">
        <BusinessGrid
          id="new-to-kimih-services"
          title="New to Kimih"
          businesses={newbusinessData}
        />
      </div>

      <section id="discover-kimih" className="relative mt-16 w-full xl:mt-24">
        <BlurFade>
          <div className="flex items-center justify-between overflow-hidden rounded-[32px] border border-slate-200 bg-white/70 shadow-sm max-lg:flex-col max-lg:items-center">
            <div className="max-w-[520px] p-8 lg:pl-12 xl:p-14">
              <h2 className="text-3xl font-bold text-black md:text-4xl">
                Discover Kimih: your beauty & wellness hub
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                Kimih is the first platform of its kind in the Middle East,
                offering seamless booking for local beauty and wellness services.
                Connect with top-rated professionals in your area and make
                self-care easier than ever.
              </p>
            </div>
            <Image
              className="max-md:scale-105 md:w-1/2"
              src="/assets/images/image-with-many-photos-and-phone.png"
              alt="Kimih app collage with salon photos and a phone"
              width={1600}
              height={900}
            />
          </div>
        </BlurFade>
      </section>

      <div className="mt-16 w-full md:w-[95%] xl:mt-24">
        <HowItWorks />
      </div>

      <div className="mt-16 w-full lg:mt-24">
        <ReviewMarquee reviews={clientReviews} />
      </div>

      <section id="browse-by-city" className="mt-16 w-full lg:mt-24">
        <BlurFade>
          <h2 className="text-3xl font-bold text-black">Browse by city</h2>
        </BlurFade>
        <ListCities />
      </section>

      <div className="mt-16 w-full lg:mt-24">
        <ClosingCta />
      </div>
    </main>
  );
}
