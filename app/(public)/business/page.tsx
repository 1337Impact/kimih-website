import Image from "next/image";
import styles from "../styles.module.css";
import { SwiperBusinessReview } from "@/components/review-card";
import Link from "next/link";
import BusinessFeatureCard from "@/components/business-feature-card";
import { FaCheck } from "react-icons/fa";
import PickBusiness from "@/components/pick-business";
import PricingCard from "@/components/pricing-card";

const partnersReviews = [
  {
    title: "Great service!",
    description:
      "I had a great experience at the salon. The staff was friendly and professional.",
    client_name: "Cameron Diaz",
    client_address: "Springfield, IL",
    client_image:
      "https://www.fresha.com/assets/_next/static/images/lucy@2x-df65c7d8267eabc81b315c3d43f5d78c.webp",
  },
  {
    title: "The best salon so far!",
    description:
      "I had a great experience at the salon. The staff was friendly and professional.",
    client_name: "John Doe",
    client_address: "Dubai, UAE",
    client_image:
      "https://www.fresha.com/assets/_next/static/images/dale@2x-d5a9f0f5c21818e519754ee336da226a.webp",
  },
  {
    title: "Great service!",
    description:
      "I had a great experience at the salon. The staff was friendly and professional.",
    client_name: "Cameron Diaz",
    client_address: "Springfield, IL",
    client_image:
      "https://www.fresha.com/assets/_next/static/images/lucy@2x-df65c7d8267eabc81b315c3d43f5d78c.webp",
  },
  {
    title: "The best salon so far!",
    description:
      "I had a great experience at the salon. The staff was friendly and professional.",
    client_name: "John Doe",
    client_address: "Dubai, UAE",
    client_image:
      "https://www.fresha.com/assets/_next/static/images/dale@2x-d5a9f0f5c21818e519754ee336da226a.webp",
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
    <main className="container overflow-hidden max-w-[1300px] mx-auto px-4 md:px-6 flex min-h-screen flex-col items-center pt-20">
      <div className={styles.background} />
      <section
        id="main"
        className="w-full min-h-[70vh] flex flex-col items-center justify-center"
      >
        <h1 className="text-center text-4xl md:text-4xl lg:text-6xl font-bold text-black mt-10 lg:mt-20">
          #1 booking software with no subscription fees!
        </h1>
        <Link href={"/signup"} className="mt-6">
          <button className="text-lg uppercase text-white px-10 py-2 lg:py-3 bg-black hover:opacity-80 rounded-full">
            Get started for free
          </button>
        </Link>
        <div className="w-full mt-4 max-md:scale-110">
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
          <div className="w-full mt-6 lg:mt-10 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {features.map((feature, index) => (
              <BusinessFeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>
      <section id="discover-kimih" className="w-full relative mt-20 xl:mt-36">
        <div
          className={`${styles.discoverKimih} w-full flex max-md:flex-col max-md:items-center justify-between md:px-6`}
        >
          <div className="max-w-[600px]">
            <h1 className="text-3xl font-bold md:mt-20">
              Streamline Your Business with Easy Online Booking
            </h1>
            <p className="text-lg mt-2">
              Drive sales with seamless online client acquisition. Increase
              visibility and brand presence by creating a standout profile on
              our marketplace. Integrate unlimited &quot;Book Now&ldquo; buttons
              on your social media for instant client bookings.
            </p>
            <ul className="mt-4 flex flex-col gap-1">
              {[
                "Simplify operations with online self-booking.",
                "Build trust with verified ratings and reviews.",
                "Secure client loyalty effortlessly.",
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-2 text-lg">
                  <FaCheck size={20} className="text-green-500" /> {item}
                </li>
              ))}
            </ul>
          </div>
          <Image
            className="w-[90%] md:w-[44%]"
            src="/assets/images/business-phone-view.png"
            alt="image-with-many-photos-and-phone"
            width={1600}
            height={900}
          />
        </div>
      </section>
      <section id="ai-powered-kimih" className="w-full relative mt-20 lg:mt-32">
        <div
          className={`w-full flex max-md:flex-col max-md:items-center justify-around gap-10 md:px-6`}
        >
          <div className="drop-shadow-xl">
          <PricingCard />
          </div>
          <div className="max-w-[500px]">
            <h1 className="text-3xl font-bold mt-10 lg:mt-20">
              Kimih is Free to Use, Only 2.5% Transaction Fee
            </h1>
            <p className="text-gray-600 mt-2">
              Kimih's platform is completely free to use with a simple 2.5% fee
              on transactions made on the platform.
            </p>
            <ul className="mt-4 flex flex-col gap-2">
              {[
                "Experience a streamlined, user-friendly interface designed to meet your business needs.",
                "No hidden costs—only pay when you make a sale.",
                "Always free, always easy, and optimized for your success.",
              ].map((item, index) => (
                <li
                  key={index}
                  className="flex text-gray-700 items-start gap-2"
                >
                  <div>
                    <FaCheck className="w-5 h-5 mt-1 text-green-500" />
                  </div>
                  <p>{item}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      {/* <section id="ai-powered-kimih" className="w-full relative mt-20 lg:mt-32">
        <div
          className={`w-full flex max-md:flex-col max-md:items-center justify-between md:px-6`}
        >
          <Image
            className="w-[80%] md:w-[40%] drop-shadow-xl"
            src="/assets/images/business-bot.png"
            alt="image-with-many-photos-and-phone"
            width={1600}
            height={900}
          />
          <div className="max-w-[600px]">
            <h1 className="text-3xl font-bold md:mt-20">
              AI-Powered Chatbot for Effortless FAQ Management
            </h1>
            <p className="text-lg mt-2">
              AI-powered tool: Enjoy 24/7 setup assistance and instant platform
              support, reducing stress for businesses and ensuring customer
              satisfaction is maximized
            </p>
            <ul className="mt-4 flex flex-col gap-1">
              {[
                "Simplify setup and support with our AI chatbot.",
                "Handle inquiries and provide instant support.",
                "Enhance user experience with intuitive automation.",
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-2 text-lg">
                  <FaCheck size={20} className="text-green-500" /> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section> */}
      <section id="reviews" className="w-full mt-20 lg:mt-32">
        <h1 className="text-3xl text-center text-black font-semibold">
          See what our partners say
        </h1>
        <div className="relative w-full">
          <SwiperBusinessReview reviews={partnersReviews} />
        </div>
      </section>
      <section id="pick-business" className="w-full mt-20 lg:mt-32">
        <h1 className="text-3xl text-center text-black font-semibold">
          Pick a business type to get started for free
        </h1>
        <div className="w-full mt-8">
          <PickBusiness />
        </div>
      </section>
    </main>
  );
}
