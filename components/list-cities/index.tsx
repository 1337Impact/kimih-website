"use client";

import { useEffect, useState } from "react";
import getCities from "@/utils/getCities";
import Link from "next/link";

const countriesList = [
  "United Arab Emirates",
  // "Algeria",
  // "Bahrain",
  // "Comoros",
  // "Djibouti",
  // "Egypt",
  // "Iraq",
  // "Jordan",
  // "Kuwait",
  // "Lebanon",
  // "Libya",
  // "Mauritania",
  // "Morocco",
  // "Oman",
  // "Palestine",
  // "Qatar",
  // "Saudi Arabia",
  // "Somalia",
  // "Sudan",
  // "Syria",
  // "Tunisia",
  // "Yemen",
];

export default function ListCities() {
  const [selectedCountry, setSelectedCountry] = useState(
    "United Arab Emirates"
  );
  const [cities, setCities] = useState<string[]>([]);

  useEffect(() => {
    setCities(getCities(selectedCountry));
  }, [selectedCountry]);

  return (
    <div>
      <div className="flex gap-2 flex-wrap mt-6">
        {countriesList.map((country, index) => (
          <button
            key={index}
            onClick={() => setSelectedCountry(country)}
            className={`px-4 py-[6px] ${
              selectedCountry === country
                ? "bg-gray-900 hover:bg-gray-800 text-white"
                : "text-gray-800 hover:bg-gray-100"
            } font-semibold rounded-full`}
          >
            {country}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-3 md:grid-cols-5 gap-2 mt-6 px-3">
        {cities.map((city, index) => (
          <Link key={index} href={`/map?city=${city}`}>
            <div className="text-[1.rem] hover:underline">
              {city}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
