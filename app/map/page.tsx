"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

const Map = dynamic(() => import("@/components/Map"), {
  ssr: false,
  loading: () => <Skeleton className="h-full" />,
});

interface BusinessMapProps {
  cordinates: number[];
}

export default function BusinessMap() {
  const cordinates = [0, 0];
  return (
    <main className="container overflow-hidden max-w-[1300px] mx-auto px-4 md:px-6 pt-28">
      <div className="h-[calc(100vh-140px)] grid grid-cols-3 gap-4">
        <div className="border border-stroke rounded-xl">

        </div>
      <div className="col-span-2">
        {/* <Map
          latitude={cordinates[0]}
          longitude={cordinates[1]}
          handleChange={() => {}}
          /> */}
          <Skeleton className="h-full" />
      </div>
          </div>
    </main>
  );
}
