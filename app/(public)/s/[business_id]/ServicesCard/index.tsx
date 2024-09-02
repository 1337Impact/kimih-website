"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Selected, Service, Membership } from "./types";
import { useRouter } from "next/navigation";
import ServiceItem from "./ServiceItem";
import CartCard, { MobileCartCard } from "./CartCard";
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
    const cart = localStorage.getItem(business_id);
    if (cart) {
      setSelected(JSON.parse(cart));
    }
  }, [business_id]);

  return (
    <div className="w-full mt-10">
      <div className="w-full grid grid-cols-3 gap-6 mt-4">
        <div className="col-span-3 lg:col-span-2 w-full">
          <h1 className="text-2xl font-bold">Services</h1>
          <section id="services" className="">
            {services.length === 0 ? (
              <p className="text-gray-500">No services available</p>
            ) : (
              <div className="w-full mt-4 flex flex-col gap-4">
                {services.map((service) => (
                  <ServiceItem
                    business_id={business_id}
                    key={service.id}
                    service={service}
                    selected={selected}
                    setSelected={setSelected}
                  />
                ))}
                <Button
                  className="border border-stroke"
                  variant={"outline"}
                  onClick={() => router.push(`/s/${business_id}/checkout`)}
                >
                  See all
                </Button>
              </div>
            )}
          </section>
        </div>
        <div className="max-lg:hidden lg:col-span-1 mt-12 w-full">
          <CartCard business_id={business_id} selected={selected} />
        </div>
        <div className="lg:hidden lg:col-span-1 mt-12 w-full">
          <MobileCartCard business_id={business_id} selected={selected} />
        </div>
        <div className="col-span-3">
          <h1 className="text-2xl font-bold">Memberships</h1>
          <div className="w-full mt-4 flex flex-col gap-4">
            {memberships.length ? (
              <>
                {memberships?.map((membership) => (
                  <MembershipItem
                    business_id={business_id}
                    key={membership.id}
                    membership={membership}
                    selected={selected}
                    setSelected={setSelected}
                  />
                ))}
                <Button
                  className="border border-stroke"
                  variant={"outline"}
                  onClick={() => router.push(`/s/${business_id}/checkout`)}
                >
                  See all
                </Button>
              </>
            ) : (
              <p className="text-gray-500">No memberships available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
