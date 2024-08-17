import Image from "next/image";
import styles from "../styles.module.css";
import ReviewCard from "@/components/review-card";
import ListCities from "@/components/list-cities";
import Link from "next/link";
import BusinessFeatureCard from "@/components/business-feature-card";

const clientReviews = [
  {
    title: "Great service!",
    description:
      "I had a great experience at the salon. The staff was friendly and professional.",
    client_name: "Cameron Diaz",
    client_adress: "Springfield, IL",
    client_image:
      "	https://www.fresha.com/assets/_next/static/images/lucy@2x-df65c7d8267eabc81b315c3d43f5d78c.webp",
  },
  {
    title: "The best saolon so far!",
    description:
      "I had a great experience at the salon. The staff was friendly and professional.",
    client_name: "John Doe",
    client_adress: "Dubai, UAE",
    client_image:
      "	https://www.fresha.com/assets/_next/static/images/dale@2x-d5a9f0f5c21818e519754ee336da226a.webp",
  },
];

const features = [
  {
    title: "Appointment scheduling",
    description:
      "Check out our sleek, user-friendly salon software. It works on all devices and makes scheduling and managing appointments easy.",
    image: "/assets/images/feature-1.svg",
  },
  {
    title: "Payment processing",
    description:
      "Make secure online payments with our Stripe integration for a smooth and easy checkout experience.",
    image: "/assets/images/feature-2.svg",
  },
  {
    title: "Reporting and analytics",
    description:
      "Gain key insights into your salon’s finances, client trends, and business growth with Kimih's advanced analytics and reporting tools.",
    image: "/assets/images/feature-3.svg",
  },
  {
    title: "E-Wallet system",
    description:
      "Our wallet system integrates smoothly, making it easy to pay for marketing services, bookings, and more.",
    image: "/assets/images/feature-4.svg",
  },
];

export default async function Home() {
  return (
    <main className="container overflow-y-hidden max-w-[1300px] mx-auto px-4 md:px-6 flex min-h-screen flex-col items-center pt-20">
      <div className={styles.background} />
      <section
        id="main"
        className="w-full min-h-[70vh] flex flex-col items-center justify-center"
      >
        <h1 className="text-center text-3xl md:text-4xl lg:text-6xl font-bold text-black mt-10 lg:mt-20">
          #1 booking software with no subscription fees!
        </h1>
        <Link href={"/signup"} className="mt-6">
          <button className="text-xl border-[2.4px] border-themeVilot text-themeVilot rounded-full font-bold py-2 px-6">
            Join for free
          </button>
        </Link>
        <div className="w-full">
          <Image
            src="/assets/images/business-landing-hero.png"
            alt="landing-page-hero"
            width={1600}
            height={900}
          />
        </div>
      </section>
      <section id="business-stats" className="w-full mt-20 lg:mt-28">
        <div className="w-full flex max-md:flex-col justify-between gap-10 px-8">
          <div className="max-w-[600px]">
            <h1 className="text-3xl font-bold mb-3">
              Effortlessly manage your Beauty & Wellness business
            </h1>
            <p className="text-gray-600">
              Streamline your business with our platform, designed to save you
              time and money. Our solutions make managing your business easier
              and more efficient
            </p>
          </div>
          <div className="flex md:flex-col gap-10">
            <div>
              <h1 className="text-3xl font-bold">30+</h1>
              <p className="text-gray-600">features included</p>
            </div>
            <div>
              <h1 className="text-3xl font-bold">80+ Countries</h1>
              <p className="text-gray-600">Countries covered</p>
            </div>
          </div>
        </div>
      </section>
      <section id="business-features" className="mt-20 lg:mt-40">
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-semibold text-center">
            One-stop solution to manage and grow your business
          </h1>
          <p className="text-lg text-gray-500 mt-2 text-center max-w-[700px]">
            Full suite of tools to supercharge sales, simplify scheduling, and
            elevate client relationships—so you can concentrate on what you
            love.
          </p>
          <div className="w-full mt-10 lg:mt-16 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {features.map((feature, index) => (
              <BusinessFeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>
      <section id="discover-kimih" className="relative mt-20 xl:mt-32">
        <div
          className={`${styles.discoverKimih} flex max-md:flex-col max-md:items-center justify-between`}
        >
          <div className="max-w-[500px]">
            <h1 className="text-3xl font-bold md:mt-20">
              Discover Kimih: Your Beauty & Wellness Hub
            </h1>
            <p className="text-lg mt-2">
              Kimih is the first platform of its kind in the Middle East,
              offering seamless booking for local beauty and wellness services.
              With an easy-to-use interface, Kimih connects you with top-rated
              professionals in your area, making self-care more accessible than
              ever. Experience the convenience of Kimih today!
            </p>
          </div>
          <Image
            className="md:w-1/2"
            src="/assets/images/image-with-many-photos-and-phone.png"
            alt="image-with-many-photos-and-phone"
            width={1600}
            height={900}
          />
        </div>
      </section>
      <section id="how-it-works" className="mt-20 w-[95%] xl:mt-40">
        <h1 className="text-3xl text-black text-center font-bold">
          Getting Started
        </h1>
        <div className="relative flex flex-col gap-8 justify-center items-center w-full mt-8 px-10 lg:px-32 py-16 rounded-3xl shadow-lg">
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
