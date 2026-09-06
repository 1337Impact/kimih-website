import getCities from "@/utils/getCities";
import Link from "next/link";

const DEFAULT_COUNTRY = "United Arab Emirates";

export default function ListCities() {
  const cities = getCities(DEFAULT_COUNTRY);

  return (
    <div>
      <div className="flex gap-2 flex-wrap mt-6">
        <span className="px-4 py-[6px] bg-gray-900 text-white font-semibold rounded-full">
          {DEFAULT_COUNTRY}
        </span>
      </div>
      <div className="grid grid-cols-3 md:grid-cols-5 gap-2 mt-6 px-3">
        {cities.map((city) => (
          <Link key={city} href={`/map?city=${city}`}>
            <div className="text-[1.rem] hover:underline">{city}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
