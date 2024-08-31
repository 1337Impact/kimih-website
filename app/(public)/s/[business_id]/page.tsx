import { FaStar } from "react-icons/fa";
import ImageSwiper from "./ImageSwiper";
import TeamList from "./TeamList";
import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import ServicesAndMembershipsCard from "./ServicesCard";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
const Map = dynamic(() => import("@/components/Map"), {
  ssr: false,
  loading: () => <Skeleton className="h-full" />,
});

const getBusinessData = async (business_id: string) => {
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
  if (!ownerData) return data;
  return {
    ...data,
    team_members: [{ ...ownerData, job_title: "Owner" }, ...data?.team_members],
  };
};

const getBusinessServices = async (business_id: string) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("services")
    .select("id, service_name, price, duration")
    .eq("business_id", business_id)
    .order("created_at", { ascending: false })
    .limit(3);
  if (error) {
    console.error(error);
    return null;
  }
  return data;
};

const getBusinessMemberships = async (business_id: string) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("memberships_catalog")
    .select("id, membership_name, valid_for_days, price")
    .eq("business_id", business_id)
    .order("created_at", { ascending: false })
    .limit(3);
  if (error) {
    console.error(error);
    return null;
  }
  return data;
};

export default async function SalonPage({
  params,
}: {
  params: { business_id: string };
}) {
  const businessData = await getBusinessData(params.business_id);
  if (!businessData) throw notFound();
  const services = await getBusinessServices(params.business_id);
  const memberships = await getBusinessMemberships(params.business_id);

  return (
    <main className="container overflow-hidden max-w-[1300px] mx-auto px-4 md:px-6 flex min-h-screen flex-col items-center pt-20">
      <section className="w-full flex max-lg:flex-col justify-between gap-2 lg:gap-10 lg:mt-10">
        <div className="lg:hidden">
          <h1 className="text-2xl text-gray-800 font-bold">
            {businessData.name}
          </h1>
          <p className="lg:mt-4 text-lg text-gray-600">{businessData.address}</p>
        </div>
        <div className="lg:w-1/2 md:w-[80%]">
          <ImageSwiper images={businessData.images!} />
        </div>
        <div className="lg:w-1/2 md:w-[80%]">
          <h1 className="max-lg:hidden text-4xl text-gray-800 font-bold">
            {businessData.name}
          </h1>
          <h2 className="max-lg:hidden text-gray-500">
            {businessData.address}
          </h2>
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
      <ServicesAndMembershipsCard
        business_id={params.business_id}
        memberships={memberships || []}
        services={services || []}
      />
      <div>
        {businessData.team_members && (
          <TeamList teamMembers={businessData.team_members} />
        )}
      </div>
      <div className="w-full">
        <h1 className="text-center text-3xl font-bold mt-10">
          Business Location
        </h1>
        {businessData?.cordinates && (
          <div className="mt-6 h-[500px]">
            <Map
              latitude={businessData.cordinates[0]}
              longitude={businessData.cordinates[1]}
            />
          </div>
        )}
      </div>
      {/* <section id="recommended-services" className="mt-5 lg:mt-10">
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
      </section> */}
    </main>
  );
}
