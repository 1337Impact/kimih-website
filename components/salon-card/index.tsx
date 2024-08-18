import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function SalonCard({
  image,
  title,
  address,
  url,
  reviews,
}: {
  image: string;
  title: string;
  address: string;
  url: string;
  reviews: {
    number: number;
    stars: number;
  };
}) {
  return (
    <Link href={"/s/salon-x"}>
      <div className="bg-white shadow-md rounded-xl hover-scale">
        <Image
          src={image}
          alt={title}
          width={600}
          height={400}
          className="w-full aspect-[3/2] object-cover rounded-t-lg"
        />
        <div className="p-2">
          <h3 className="font-semibold">{title}</h3>
          <p className="text-sm mt-1 text-gray-500">{address}</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="flex items-center gap-1 text-sm text-yellow-500">
              <Star size={16} />
              {reviews.stars}
            </span>
            <span className="text-sm text-gray-500">({reviews.number})</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
