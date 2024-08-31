"use client";
import { useEffect, useState } from "react";
import { Selected, Service, Membership } from "../ServicesCard/types";
import ServiceItem from "../ServicesCard/ServiceItem";
import CartCard, { MobileCartCard } from "../ServicesCard/CartCard";
import MembershipItem from "../ServicesCard/MembershipItem";
import { createClient } from "@/utils/supabase/client";

const getBusinessServices = async (business_id: string) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("services")
    .select("id, service_name, price, duration")
    .eq("business_id", business_id)
    .order("created_at", { ascending: false });
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
    .order("created_at", { ascending: false });
  if (error) {
    console.error(error);
    return null;
  }
  return data;
};

export default function ServicesAndMembershipsCard({
  params,
}: {
  params: { business_id: string };
}) {
  const [services, setServices] = useState<Service[]>([]);
  const [memberships, setMemberships] = useState<Membership[]>([]);
  const [selected, setSelected] = useState<Selected[]>([]);

  useEffect(() => {
    const cart = localStorage.getItem(params.business_id);
    if (cart) {
      setSelected(JSON.parse(cart));
    }
    getBusinessMemberships(params.business_id).then((data) =>
      setMemberships(data || [])
    );
    getBusinessServices(params.business_id).then((data) =>
      setServices(data || [])
    );
  }, []);

  return (
    <main className="container overflow-hidden max-w-[1300px] mx-auto px-4 md:px-6 flex min-h-screen flex-col items-center pt-20">
      <div className="w-full mt-10">
        <div className="w-full grid grid-cols-3 gap-6 mt-4">
          <div className="col-span-3 lg:col-span-2 w-full">
            <h1 className="text-2xl font-bold">Services</h1>
            <section id="services" className="">
              <div className="w-full mt-4 flex flex-col gap-4">
                {services.map((service) => (
                  <ServiceItem
                    business_id={params.business_id}
                    key={service.id}
                    service={service}
                    selected={selected}
                    setSelected={setSelected}
                  />
                ))}
              </div>
            </section>
          </div>
          <div className="max-lg:hidden lg:col-span-1 mt-12 w-full">
            <CartCard selected={selected} />
          </div>
          <div className="lg:hidden lg:col-span-1 mt-12 w-full">
            <MobileCartCard selected={selected} />
          </div>
          <div className="col-span-3">
            <h1 className="text-2xl font-bold">Memberships</h1>
            <div className="w-full mt-4 flex flex-col gap-4">
              {memberships?.map((membership) => (
                <MembershipItem
                  business_id={params.business_id}
                  key={membership.id}
                  membership={membership}
                  selected={selected}
                  setSelected={setSelected}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
