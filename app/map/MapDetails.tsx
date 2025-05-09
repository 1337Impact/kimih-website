"use client";
import { RootState } from "@/store";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { useSelector } from "react-redux";
import ImageSwiper from "../(public)/s/[business_id]/ImageSwiper";
import TeamList from "./MapTeamList";
import Link from "next/link";
import { StarRating } from "../(public)/s/[business_id]/BusinessRating";

const fetchDetailsData = async (business_id: string) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("business")
    .select("*, team_members(first_name, last_name, avatar_url, job_title)")
    .eq("id", business_id)
    .eq("published", true)
    .single();
  if (error) {
    console.error(error);
    return null;
  }
  const { data: ownerData } = await supabase
    .from("profiles")
    .select("first_name, last_name, avatar_url")
    .eq("id", data?.owner_id)
    .single();

  const { data: reviewData, count: reviewsCount } = await supabase
    .from("reviews")
    .select("rating", { count: "exact" })
    .eq("business_id", business_id);
  if (!ownerData) return data;
  return {
    ...data,
    team_members: [{ ...ownerData, job_title: "Owner" }, ...data?.team_members],
    rating: {
      count: reviewsCount || 0,
      average: reviewsCount
        ? reviewData?.reduce(
            (acc: number, curr: { rating: number }) => acc + curr.rating,
            0
          ) / reviewsCount
        : 0,
    },
  };
};

export default function MapDetails() {
  const marker = useSelector(
    (state: RootState) => state.selectedMarkerSlice.selectedMarker
  );
  const [businessData, setBusinessData] = useState<any>(null);

  useEffect(() => {
    if (!marker?.id) return;
    fetchDetailsData(marker.id).then((data) => {
      setBusinessData(data);
      console.log(data);
    });
  }, [marker]);

  if (!businessData) {
    return (
      <div className="text-center p-4">No business details available.</div>
    );
  }

  return (
    <div className="w-full">
      <div className="lg:w-full md:w-[80%] mb-4">
        <ImageSwiper images={businessData.images!} />
      </div>

      <div className="lg:w-full md:w-[80%]">
        <h1 className="text-3xl text-gray-800 font-bold">
          {businessData.name}
        </h1>
        <h2 className="text-gray-500">{businessData.address}</h2>
        <div className="my-3 flex items-center">
          <span className="text-xl">
            <StarRating rating={businessData.rating.average} />
          </span>
          <span className="text-gray-500 ml-2">
            ({businessData.rating.count})
          </span>
        </div>
        <Link href={`/s/${businessData.id}`}>
          <button className="mt-6 text-xl text-white bg-gray-900 py-2 px-10 rounded-lg">
            Book now
          </button>
        </Link>
      </div>
      <div>
        {businessData.team_members && (
          <TeamList teamMembers={businessData.team_members} />
        )}
      </div>
    </div>
  );
}
