"use client";
import {
  AlignJustify,
  BookIcon,
  Calendar,
  Clock3,
  MapPin,
  Search,
  SearchIcon,
} from "lucide-react";
import styles from "./styles.module.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AddressInput from "./address-input";

const servicesList = [
  {
    id: 1,
    name: "Spa",
  },
  {
    id: 2,
    name: "Waxing Salon",
  },
  {
    id: 3,
    name: "Nail Salon",
  },
  {
    id: 4,
    name: "Beauty Salons",
  },
  {
    id: 5,
    name: "Barbershop",
  },
  {
    id: 6,
    name: "Eyebrow & Lashes",
  },
  {
    id: 7,
    name: "Massage",
  },
  {
    id: 8,
    name: "Gym & Fitness",
  },
  {
    id: 9,
    name: "Therapy Center",
  },
  {
    id: 10,
    name: "Henna",
  },
  {
    id: 11,
    name: "Tanning",
  },
  {
    id: 12,
    name: "Aesthetics",
  },
  {
    id: 13,
    name: "Weight Loss",
  },
  {
    id: 14,
    name: "Dental",
  },
];

const tempData = [
  {
    image: "https://via.placeholder.com/150",
    title: "Cozy Coffee Shop",
    address: "123 Main Street, Springfield",
    url: "https://cozycoffeeshop.com",
    reviews: 123,
  },
  {
    image: "https://via.placeholder.com/150",
    title: "The Artisanal Bakery",
    address: "456 Baker's Lane, Metropolis",
    url: "https://artisanalbakery.com",
    reviews: 89,
  },
  {
    image: "https://via.placeholder.com/150",
    title: "Urban Yoga Studio",
    address: "789 Yoga Blvd, Gotham",
    url: "https://urbanyoga.com",
    reviews: 200,
  },
  {
    image: "https://via.placeholder.com/150",
    title: "Gourmet Restaurant",
    address: "321 Fine Dining St, Star City",
    url: "https://gourmetrestaurant.com",
    reviews: 45,
  },
  {
    image: "https://via.placeholder.com/150",
    title: "Tech Hub Coworking",
    address: "987 Silicon Avenue, Techville",
    url: "https://techhubcoworking.com",
    reviews: 78,
  },
];

const IconTitle = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) => (
  <div className="flex items-center gap-2 mb-3">
    <div className="p-2 text-white bg-gradient-to-tr from-lightBlue to-lightVilot rounded-lg">
      {children}
    </div>
    <span className="text-gray-700 font-bold">{title}</span>
  </div>
);

interface Coordinates {
  latitude: number;
  longitude: number;
}

export default function BookNowCard() {
  const router = useRouter();
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("coordinates", coordinates);
    if (coordinates){
      router.push(`/map?lat=${coordinates?.latitude}&lng=${coordinates?.longitude}`);
    } else {
      router.push("/map");
    }
  };
  return (
    <div className="w-full mx-auto">
      <div className={`${styles.card} bg-white rounded-lg p-10`}>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="flex-1 min-w-[200px]">
              <div className="">
                <IconTitle title="Any treatment or venue">
                  <SearchIcon />
                </IconTitle>
                <select className="border-[2px] border-violet-400 font-semibold w-full pl-5 pr-3 py-2 text-gray-600 rounded-md focus:outline-none sm:text-sm">
                  <option disabled value="">
                    Please Select
                  </option>
                  {servicesList.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex-1 min-w-[200px]">
              <div className="">
                <IconTitle title="Current Location">
                  <MapPin />
                </IconTitle>
                <AddressInput setCoridinates={setCoordinates}  />
                <div id="suggestionsContainer"></div>
              </div>
            </div>

            <div className="flex-1 min-w-[200px]">
              <div className="">
                <IconTitle title="Any Date">
                  <Calendar />
                </IconTitle>
                <input
                  type="date"
                  className="border-[2px] border-violet-400 font-semibold w-full pl-5 pr-3 py-2 text-gray-600 rounded-md focus:outline-none sm:text-sm"
                  placeholder="December 28, 2021"
                  id="datetimepicker"
                />
              </div>
            </div>

            <div className="flex-1 min-w-[200px]">
              <div className="">
                <IconTitle title="Any Time">
                  <Clock3 />
                </IconTitle>
                <input
                  type="time"
                  className="border-[2px] border-violet-400 font-semibold w-full pl-5 pr-3 py-2 text-gray-600 rounded-md focus:outline-none sm:text-sm"
                  placeholder="Enter Time"
                />
              </div>
            </div>
          </div>
          <div className="mt-6 text-center">
            <button
              type="submit"
              className="font-bold px-12 py-3 bg-gradient-to-r from-purple-500 to-pink-400 text-white rounded-full shadow hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              Search <Search className="ml-1 inline" size={20} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
