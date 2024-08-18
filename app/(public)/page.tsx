import Image from "next/image";
import styles from "./styles.module.css";
import BookNowCard from "@/components/book-now-card";
import SalonCard from "@/components/salon-card";
import ReviewCard from "@/components/review-card";
import ListCities from "@/components/list-cities";

const tempData = [
  {
    image:
      "https://ehlgujkybojechhxspiy.supabase.co/storage/v1/object/public/business-images/barber.png?t=2024-08-16T18%3A04%3A16.944Z",
    title: "Cozy Coffee Shop",
    address: "123 Main Street, Springfield",
    url: "#",
    reviews: {
      number: 123,
      stars: 4.5,
    },
  },
  {
    image:
      "https://ehlgujkybojechhxspiy.supabase.co/storage/v1/object/public/business-images/eyebrow.png?t=2024-08-16T18%3A04%3A44.585Z",
    title: "The Artisanal Bakery",
    address: "456 Baker's Lane, Metropolis",
    url: "#",
    reviews: {
      number: 123,
      stars: 4.5,
    },
  },
  {
    image:
      "https://ehlgujkybojechhxspiy.supabase.co/storage/v1/object/public/business-images/fitness.png?t=2024-08-16T18%3A04%3A54.872Z",
    title: "Urban Yoga Studio",
    address: "789 Yoga Blvd, Gotham",
    url: "#",
    reviews: {
      number: 123,
      stars: 4.5,
    },
  },
  {
    image:
      "https://ehlgujkybojechhxspiy.supabase.co/storage/v1/object/public/business-images/hair.png?t=2024-08-16T18%3A05%3A03.528Z",
    title: "Gourmet Restaurant",
    address: "321 Fine Dining St, Star City",
    url: "https://gourmetrestaurant.com",
    reviews: {
      number: 123,
      stars: 4.5,
    },
  },
  {
    image:
      "https://ehlgujkybojechhxspiy.supabase.co/storage/v1/object/public/business-images/makeup.png?t=2024-08-16T18%3A05%3A51.922Z",
    title: "Tech Hub Coworking",
    address: "987 Silicon Avenue, Techville",
    url: "https://techhubcoworking.com",
    reviews: {
      number: 123,
      stars: 4.5,
    },
  },
];

const clientReviews = [
  {
    title: "Great service!",
    description:
      "I had a great experience at the salon. The staff was friendly and professional.",
    client_name: "Cameron Diaz",
    client_address: "Springfield, IL",
    client_image:
      "/assets/images/review-avatar-1.webp",
  },
  {
    title: "The best saolon so far!",
    description:
      "I had a great experience at the salon. The staff was friendly and professional.",
    client_name: "John Doe",
    client_address: "Dubai, UAE",
    client_image:
      "/assets/images/review-avatar-2.webp",
  },
];

export default async function Home() {
  return (
    <main className="container overflow-hidden max-w-[1300px] mx-auto px-4 md:px-6 flex min-h-screen flex-col items-center pt-20">
      <div className={styles.background} />
      <section id="main" className="w-full min-h-[70vh] flex flex-col items-center justify-center">
        <h1 className="text-center text-3xl md:text-4xl lg:text-6xl font-bold text-black mt-10 lg:mt-20">
          Book beauty and wellness services
        </h1>
        <div className="w-full px-3 md:px-10 mt-6 md:mt-14 lg:mt-28">
          <BookNowCard />
        </div>
      </section>
      <section id="recommended-services" className="mt-20 lg:mt-32">
        <h1 className="text-2xl font-bold">Recommended</h1>
        <div className="w-full mt-6 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {tempData.map((salon) => (
            <SalonCard key={salon.title} {...salon} />
          ))}
        </div>
      </section>
      <section id="new-to-kimih-services" className="mt-20">
        <h1 className="text-2xl font-bold">New to Kimih</h1>
        <div className="w-full mt-6 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {tempData.slice(0, 3).map((salon) => (
            <SalonCard key={salon.title} {...salon} />
          ))}
        </div>
      </section>
      <section id="discover-kimih" className="relative mt-20 xl:mt-32">
        <div className={`${styles.discoverKimih} flex max-lg:flex-col max-lg:items-center justify-between`}>
          <div className="max-w-[520px] lg:mt-20 lg:pl-10 xl:mt-32 xl:pl-14">
            <h1 className="text-3xl font-bold">
              Discover Kimih: Your Beauty & Wellness Hub
            </h1>
            <p className="text-lg mt-3">
              Kimih is the first platform of its kind in the Middle East,
              offering seamless booking for local beauty and wellness services.
              With an easy-to-use interface, Kimih connects you with top-rated
              professionals in your area, making self-care more accessible than
              ever. Experience the convenience of Kimih today!
            </p>
          </div>
          <Image
            className="max-md:scale-105 md:w-1/2"
            src="/assets/images/image-with-many-photos-and-phone.png"
            alt="image-with-many-photos-and-phone"
            width={1600}
            height={900}
          />
        </div>
      </section>
      <section id="how-it-works" className="mt-20 md:w-[95%] xl:mt-40">
        <h1 className="text-3xl text-black text-center font-bold">
          Getting Started
        </h1>
        <div className="relative flex flex-col gap-8 justify-center items-center w-full mt-8 px-6 md:px-10 lg:px-32 py-10 md:py-14 rounded-3xl shadow-lg">
          <div className="rounded-xl w-full">
            <iframe
              className="m-auto w-full aspect-video rounded-2xl hover-scale"
              src="https://www.youtube.com/embed/A6XnZepxalE"
              title="Busy Life? Book Beauty &amp; Wellness in Seconds with Kimih!"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            ></iframe>
          </div>
          <div className="absolute w-full -z-10 h-full bg-landing-yoga bg-cover blur-[3px] rounded-3xl" />
        </div>
      </section>
      <section id="reviews" className="mt-20 lg:mt-32">
        <h1 className="text-2xl text-black font-semibold">Client Reviews</h1>
        <div className="w-full mt-6 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {clientReviews.map((review) => (
            <ReviewCard key={review.title} {...review} />
          ))}
        </div>
      </section>
      <section id="browse-by-city" className="mt-20 lg:mt-32">
        <h1 className="text-2xl font-bold">Browse by City</h1>
        <ListCities />
      </section>
    </main>
  );
}
