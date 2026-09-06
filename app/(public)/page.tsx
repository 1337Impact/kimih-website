import Image from "next/image";
import styles from "./styles.module.css";
import BookNowCard from "@/components/book-now-card";
import SalonCard from "@/components/salon-card";
import ReviewCard from "@/components/review-card";
import ListCities from "@/components/list-cities";
import YoutubeFacade from "@/components/youtube-facade";
import { createPublicClient } from "@/utils/supabase/public";

export const revalidate = 300;

const getNewBusinessData = async () => {
  try {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("business")
    .select("id, name, address, images, reviews(rating)")
    .eq("published", true)
    .order("created_at", { ascending: false })
    .limit(10);
  if (error) {
    console.error(error);
    return [];
  }
  return data.map((business) => ({
    title: business.name,
    address: business.address || "No address provided",
    image: business?.images?.pop()!,
    url: `/s/${business.id}`,
    rating: {
      count: business.reviews.length || 0,
      average: business.reviews.length
        ? business.reviews?.reduce(
            (acc: number, curr: { rating: number }) => acc + curr.rating,
            0
          ) / business.reviews.length
        : 0,
    },
  }));
  } catch (error) {
    console.error(error);
    return [];
  }
};

const getRecommendedBusinessData = async () => {
  try {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("business")
    .select("id, name, address, images, reviews(rating)")
    .eq("published", true)
    .limit(10);
  if (error) {
    console.error(error);
    return [];
  }
  return data.map((business) => ({
    title: business.name,
    address: business.address || "No address provided",
    image: business?.images?.pop()!,
    url: `/s/${business.id}`,
    rating: {
      count: business.reviews.length || 0,
      average: business.reviews.length
        ? business.reviews?.reduce(
            (acc: number, curr: { rating: number }) => acc + curr.rating,
            0
          ) / business.reviews.length
        : 0,
    },
  }));
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

export default async function Home() {
  const [newbusinessData, recommendedBusinessData] = await Promise.all([
    getNewBusinessData(),
    getRecommendedBusinessData(),
  ]);
  return (
    <main className="container overflow-hidden max-w-[1300px] mx-auto px-4 md:px-6 flex min-h-screen flex-col items-center pt-20">
      <div className={styles.background} />
      <section
        id="main"
        className="w-full min-h-[70vh] flex flex-col items-center justify-center"
      >
        <h1 className="text-center text-3xl md:text-4xl lg:text-6xl font-bold text-black mt-10 lg:mt-20">
          Book beauty and wellness services
        </h1>
        <div className="w-full px-3 md:px-10 mt-6 md:mt-14 lg:mt-28">
          <BookNowCard />
        </div>
      </section>
      <section id="recommended-services" className="mt-20 lg:mt-32">
        <h2 className="text-2xl font-bold">Recommended</h2>
        <div className="w-full mt-6 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {recommendedBusinessData.map((salon) => (
            <SalonCard key={salon.title} {...salon} />
          ))}
        </div>
      </section>
      <section id="new-to-kimih-services" className="mt-20">
        <h2 className="text-2xl font-bold">New to Kimih</h2>
        <div className="w-full mt-6 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {newbusinessData.map((salon) => (
            <SalonCard key={salon.title} {...salon} />
          ))}
        </div>
      </section>
      <section id="discover-kimih" className="relative mt-20 xl:mt-32">
        <div
          className={`${styles.discoverKimih} flex max-lg:flex-col max-lg:items-center justify-between`}
        >
          <div className="max-w-[520px] lg:mt-20 lg:pl-10 xl:mt-32 xl:pl-14">
            <h2 className="text-3xl font-bold">
              Discover Kimih: Your Beauty & Wellness Hub
            </h2>
            <p className="text-lg mt-3">
              Kimih is the first platform of its kind in the Middle East,
              offering seamless booking for local beauty and wellness services.
              With an easy-to-use interface, Kimih connects you with top-rated
              professionals in your area, making self-care more accessible than
              ever. Experience the convenience of Kimih today!
            </p>
          </div>
          <Image
            className="max-md:scale-105 md:w-1/2 h-auto"
            src="/assets/images/image-with-many-photos-and-phone.png"
            alt="Kimih app showing beauty and wellness bookings"
            width={800}
            height={450}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </section>
      <section id="how-it-works" className="mt-20 md:w-[95%] xl:mt-40">
        <h2 className="text-3xl text-black text-center font-bold">
          Getting Started
        </h2>
        <div className="relative flex flex-col gap-8 justify-center items-center w-full mt-8 px-6 md:px-10 lg:px-32 py-10 md:py-14 rounded-3xl shadow-lg overflow-hidden">
          <div className="rounded-xl w-full">
            <YoutubeFacade
              videoId="yFKRYzQ1ZRg"
              title="Busy Life? Book Beauty & Wellness in Seconds with Kimih!"
            />
          </div>
          <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-indigo-200/80 via-fuchsia-200/70 to-pink-100/80" />
        </div>
      </section>
      <section id="reviews" className="mt-20 lg:mt-32">
        <h2 className="text-2xl text-black font-semibold">Client Reviews</h2>
        <div className="w-full mt-6 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {clientReviews.map((review) => (
            <ReviewCard key={review.title} {...review} />
          ))}
        </div>
      </section>
      <section id="browse-by-city" className="mt-20 lg:mt-32 w-full">
        <h2 className="text-2xl font-bold">Browse by City</h2>
        <ListCities />
      </section>
    </main>
  );
}
