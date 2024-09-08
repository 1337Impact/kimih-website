"use client";
import { use, useEffect, useState } from "react";
import { Selected, Service, Membership } from "../ServicesCard/types";
import ServiceItem from "../ServicesCard/ServiceItem";
import CartCard, { MobileCartCard } from "../ServicesCard/CartCard";
import MembershipItem from "../ServicesCard/MembershipItem";
import { createClient } from "@/utils/supabase/client";
import { useDispatch } from "react-redux";
import { setIsMembershipOnly } from "@/store/checkoutSlice";

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
  selected,
  setSelected,
  business_id,
}: {
  business_id: string;
  selected: Selected[];
  setSelected: (selected: Selected[]) => void;
}) {
  const [services, setServices] = useState<Service[]>([]);
  const [memberships, setMemberships] = useState<Membership[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const cart = localStorage.getItem(business_id);
    if (cart) {
      setSelected(JSON.parse(cart));
    }
    getBusinessMemberships(business_id).then((data) =>
      setMemberships(data || [])
    );
    getBusinessServices(business_id).then((data) => setServices(data || []));
  }, [business_id, setSelected, setMemberships, setServices]);

  useEffect(() => {
    if (selected.filter((service) => service.type === "service").length === 0) {
      dispatch(setIsMembershipOnly(true));
    } else {
      dispatch(setIsMembershipOnly(false));
    }
  }, [selected, dispatch]);

  return (
    <div className="w-full mt-6">
      <div className="w-full gap-6 mt-4">
        <div className="w-full">
          <h1 className="text-xl font-bold">Services</h1>
          <section id="services" className="">
            <div className="w-full mt-3 flex flex-col gap-4">
              {services.map((service) => (
                <ServiceItem
                  business_id={business_id}
                  key={service.id}
                  service={service}
                  selected={selected}
                  setSelected={setSelected}
                />
              ))}
            </div>
          </section>
          <h1 className="text-xl font-bold mt-4">Memberships</h1>
          <div className="w-full mt-4 flex flex-col gap-3">
            {memberships?.map((membership) => (
              <MembershipItem
                business_id={business_id}
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
  );
}
