import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { getMyLocation } from "@/utils";
import MapPopup from "./MapPopup";
import MapDetails from "./MapDetails";
import styles from "./styles.module.css";

const Map = dynamic(() => import("@/components/Map"), {
  ssr: false,
  loading: () => <Skeleton className="h-full" />,
});

interface BusinessMapProps {
  cordinates: number[];
}

const getBusinessCordinates = async () => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("business")
    .select("id, cordinates")
    .eq("published", true);
  if (error) {
    return [];
  }
  return data?.map((business) => ({
    id: business.id,
    position: business.cordinates as number[],
    popup: <MapPopup business_id={business.id} />,
  }));
};

export default async function BusinessMap() {
  const makersData = await getBusinessCordinates();
  const headerList = headers();
  const [latitude, longitude] = await getMyLocation(
    headerList.get("X-Forwarded-For")
  );

  return (
    <main className="container overflow-hidden max-w-[1300px] mx-auto px-4 md:px-6 pt-28">
      <div className="h-[calc(100vh-140px)] grid grid-cols-3 gap-4">
        <div className={`${styles.details} max-lg:hidden w-full p-4 border border-stroke rounded-xl overflow-y-auto`}>
          <MapDetails />
        </div>
        <div className="col-span-3 lg:col-span-2">
          <Map markers={makersData} latitude={latitude} longitude={longitude} />
          <Skeleton className="h-full" />
        </div>
      </div>
    </main>
  );
}
