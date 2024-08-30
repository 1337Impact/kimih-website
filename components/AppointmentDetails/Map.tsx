"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { Skeleton } from "../ui/skeleton";

const Map = dynamic(() => import("@/components/Map"), {
  ssr: false,
  loading: () => <Skeleton className="h-full" />,
});

interface BusinessMapProps {
  cordinates: number[];
}

export default function BusinessMap({cordinates}: BusinessMapProps) {

  return (
    <div className="mt-4 overflow-hidden rounded-xl border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-black dark:text-white">
            Appointment Location:
          </h1>
        </div>
      </div>
      <div className="mt-6 h-[300px]">
        <Map latitude={cordinates[0]} longitude={cordinates[1]} handleChange={() => {}} />
      </div>
    </div>
  );
}
