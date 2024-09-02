"use client";
import { setSelectedMarker } from "@/store/selectedMarkerSlice";
import { createClient } from "@/utils/supabase/client";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function MapPopup({ business_id }: { business_id: string }) {
  const [data, setData] = useState<any>(null);
  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("business")
        .select("*")
        .eq("id", business_id)
        .single();
      if (!data) {
        return;
      }
      setData({
        title: data.name,
        address: data.address || "No address provided",
        image: data?.images?.pop()!,
        url: `/s/${data.id}`,
        reviews: {
          number: 22,
          stars: 4.5,
        },
      });
    };
    fetchData();
  }, [business_id]);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full">
      <Link href={data.url}>
        <div className="bg-white shadow-md rounded-xl">
          <Image
            src={data.image}
            alt={data.title}
            width={600}
            height={400}
            className="w-full aspect-[3/2] object-cover rounded-t-xl hover-scale"
          />
          <div className="p-2">
            <h3 className="text-gray-800 text-[1.02rem] font-semibold mb-1">
              {data.title}
            </h3>
            <p className="text-sm text-gray-500 !m-0">{data.address}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="flex items-center gap-1 text-sm text-yellow-500">
                <Star size={16} />
                {data.reviews.stars}
              </span>
              <span className="text-sm text-gray-500">
                ({data.reviews.number})
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
