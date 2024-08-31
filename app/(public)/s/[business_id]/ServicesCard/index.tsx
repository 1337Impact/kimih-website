"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Selected, Service, Membership } from "./types";
import { useRouter } from "next/navigation";
import ServiceItem from "./ServiceItem";
import CartCard from "./CartCard";
import MembershipItem from "./MembershipItem";

export default function ServicesAndMembershipsCard({
  business_id,
  services,
  memberships,
}: {
  business_id: string;
  services: Service[];
  memberships: Membership[];
}) {
  const router = useRouter();
  const [selected, setSelected] = useState<Selected[]>([]);

  useEffect(() => {
    const cart = localStorage.getItem("cart");
    if (cart) {
      setSelected(JSON.parse(cart));
    }
  }, []);

  return (
    <div className="w-full mt-10">
      <div className="lg:hidden w-full">
        <CartCard selected={selected} />
      </div>
      <div className="w-full grid grid-cols-3 gap-6 mt-4">
        <div className="col-span-3 lg:col-span-2 w-full">
          <h1 className="text-2xl font-bold">Services</h1>
          <section id="services" className="">
            <div className="w-full mt-4 flex flex-col gap-4">
              {services.map((service) => (
                <ServiceItem
                  key={service.id}
                  service={service}
                  selected={selected}
                  setSelected={setSelected}
                />
              ))}
              <Button
                className="border border-stroke"
                variant={"outline"}
                onClick={() => router.push(`/s/${business_id}/all-offers`)}
              >
                See all
              </Button>
            </div>
          </section>
        </div>
        <div className="max-lg:hidden lg:col-span-1 mt-12 w-full">
          <CartCard selected={selected} />
        </div>
        <div className="col-span-3">
          <h1 className="text-2xl font-bold">Memberships</h1>
          <div className="w-full mt-4 flex flex-col gap-4">
            {memberships?.map((membership) => (
              <MembershipItem
                key={membership.id}
                membership={membership}
                selected={selected}
                setSelected={setSelected}
              />
            ))}
            <Button
              className="border border-stroke"
              variant={"outline"}
              onClick={() => router.push(`/s/${business_id}/all-offers`)}
            >
              See all
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
