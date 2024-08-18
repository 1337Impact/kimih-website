import { FaStar } from "react-icons/fa";
import ImageSwiper from "./ImageSwiper";
import SalonCard from "@/components/salon-card";
import { MapPin } from "lucide-react";
import TeamList from "./TeamList";

const beautySalon = {
  title: "Luxura Beauty Studio",
  address: "123 Glamour Avenue, Downtown Dubai, UAE",
  description:
    "Luxura Beauty Studio offers luxury beauty services in the heart of Dubai. From stylish haircuts to rejuvenating facials, our expert team ensures you leave feeling refreshed and radiant.",
};

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

export default function SalonPage() {
  return (
    <main className="container overflow-hidden max-w-[1300px] mx-auto px-4 md:px-6 flex min-h-screen flex-col items-center pt-20">
      <section className="w-full flex  max-lg:flex-col justify-between gap-10 mt-10">
        <h1 className="lg:hidden text-4xl text-gray-800 font-bold">
          {beautySalon.title}
        </h1>
        <div className="lg:w-1/2 md:w-[80%]">
          <ImageSwiper />
        </div>
        <div className="lg:w-1/2 md:w-[80%]">
          <h1 className="max-lg:hidden text-4xl text-gray-800 font-bold">
            {beautySalon.title}
          </h1>
          <h2 className="text-gray-500">{beautySalon.address}</h2>
          <p className="mt-4 text-lg text-gray-600">
            {beautySalon.description}
          </p>
          <div className="mt-4 flex items-center">
            <div className="flex gap-1">
              {Array(5)
                .fill("")
                .map((_, index) => (
                  <FaStar key={index} className="text-xl text-gray-800" />
                ))}
            </div>
            <span className="text-gray-800 ml-2">4.5</span>
            <span className="text-gray-500 ml-2">(123)</span>
          </div>
          <button className="mt-6 text-xl text-white bg-gray-900 py-2 px-10 rounded-lg">
                Book now
          </button>
        </div>
      </section>
      <div>
        <TeamList />
      </div>
      <section id="recommended-services" className="mt-5 lg:mt-10">
        <h1 className="text-2xl font-bold">Recommended</h1>
        <div className="w-full mt-6 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {tempData.map((salon) => (
            <SalonCard key={salon.title} {...salon} />
          ))}
        </div>
      </section>
      <section id="new-to-kimih-services" className="mt-20">
        <h1 className="text-2xl font-bold">New to Kimih</h1>
        <div className="w-full my-6 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {tempData.slice(0, 3).map((salon) => (
            <SalonCard key={salon.title} {...salon} />
          ))}
        </div>
      </section>
    </main>
  );
}
