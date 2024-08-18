import Image from "next/image";
import styles from "./styles.module.css";
import { SwiperBusinessReview } from "@/components/review-card";

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

export default async function Home() {
  return (
    <main className="container overflow-hidden max-w-[1300px] mx-auto px-4 md:px-6 flex min-h-screen flex-col items-center pt-20">
      <div className={`${styles.aboutBg} flex items-end`}>
        <h1 className={`text-6xl text-white font-bold text-center`}>
          About us
        </h1>
      </div>
      <section
        id="about-us"
        className="flex max-md:flex-col justify-between gap-6 mt-20 lg:mt-28 px-4"
      >
        <Image
          className="object-cover rounded-lg h-[600px] md:w-[45%]"
          width={600}
          height={600}
          src={"/assets/images/about-us-team.jpg"}
          alt="About us team"
        />
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold">What is Kimih?</h2>
          <p className="text-lg text-gray-600 mt-4 md:w-[80%]">
            Kimih is an innovative platform dedicated to transforming the beauty
            and wellness industry. Founded in 2024 and headquartered in the
            vibrant city of Dubai, Kimih provides cutting-edge software
            solutions that empower beauty and wellness businesses to scale,
            thrive, and succeed in a competitive market. Our Mission: At Kimih,
            our mission is to revolutionize the beauty and wellness industry by
            offering intuitive, scalable tools that cater to the unique needs of
            businesses. We are committed to helping our clients streamline their
            operations, connect with customers, and grow without the burden of
            subscription fees.
          </p>
        </div>
      </section>
      <section
        id="about-us"
        className="flex max-md:flex-col gap-6 mt-20 lg:mt-32 md:px-8"
      >
        <div className="md:w-1/2 md:mt-10">
          <h2 className="text-3xl font-bold">How Can We Help You?</h2>
          <p className="text-lg text-gray-700 mt-4 md:w-[80%]">
            At Kimih, we provide tailored solutions designed to meet the unique
            needs of beauty and wellness businesses. Our subscription-free
            software empowers businesses by simplifying operations, enhancing
            customer connections, and driving growth without the financial
            burden of ongoing fees.
          </p>
          <p className="text-lg text-gray-700 mt-4 md:w-[80%]">
            For clients, we ensure a premium experience by offering easy access
            to top-quality salons and services. With Kimih, finding and booking
            the perfect beauty or wellness service is effortless, allowing you
            to enjoy a seamless and satisfying journey to looking and feeling
            your best.
          </p>
        </div>
        <Image
          className="md:w-[40%] drop-shadow-xl"
          width={600}
          height={600}
          src={"/assets/images/female-hair-stylist.svg"}
          alt="About us team"
        />
      </section>
      <section id="reviews" className="w-full mt-20 lg:mt-32">
        <h1 className="text-3xl text-center text-black font-semibold">
          See what our partners say
        </h1>
        <div className="relative w-full">
          <SwiperBusinessReview reviews={partnersReviews} />
        </div>
      </section>
    </main>
  );
}
