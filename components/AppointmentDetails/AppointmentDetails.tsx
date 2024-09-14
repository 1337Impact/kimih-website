"use client";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import formatDate from "@/utils/formating-utils/format-date";
import lightenHexColor from "@/utils/formating-utils/lighten-color";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import BusinessMap from "./Map";
import { FaMapMarked, FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import AppointmentReview from "./AppointmentReview";
import Currency from "../Currency";

type Appointment = {
  id: string;
  ref: string;
  scheduled_date: string;
  created_at: string;
  price_paid: number | null;
  payments: {
    amount: number;
    service_discounts: {
      discount_value: number;
    } | null;
  } | null;
  services: {
    service_name: string;
    price: number;
    duration: number | null;
  } | null;
  team_members: {
    first_name: string;
    last_name: string;
    color: string | null;
  } | null;
  business: {
    id: string;
    name: string;
    address: string | null | undefined;
    cordinates: number[] | null | undefined;
    owner_id: string;
    currency: string | null | undefined;
  } | null;
  reviews: {
    id: string;
    rating: number;
    comment: string | null;
    created_at: string;
  }[];
  business_email: string | null | undefined;
  business_phone: string | null | undefined;
};

const getAppointmentsData = async (
  appointment_id: string
): Promise<Appointment | null> => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("appointments")
    .select(
      "id, ref, scheduled_date, price_paid, created_at, payments(amount, service_discounts(discount_value)), services(service_name, price, duration), team_members(first_name, last_name, color), business(id, name, address, cordinates, owner_id, currency), reviews(id, rating, comment, created_at)"
    )
    .eq("id", appointment_id)
    .single();
  if (error || !data) return null;
  const { data: ownerData } = await supabase
    .from("profiles")
    .select("email, phone")
    .eq("id", data?.business?.owner_id!)
    .single();

  return {
    ...data,
    business_email: ownerData?.email,
    business_phone: ownerData?.phone,
  };
};

export default function AppointmentDetails({
  children,
  appointment_id,
  status,
}: {
  appointment_id: string;
  children: React.ReactNode;
  status: string;
}) {
  const [data, setData] = useState<Appointment | null>(null);
  const [size, setSize] = useState(0);
  const onOpenChange = (isOpen: boolean) => {
    if (isOpen) {
      getAppointmentsData(appointment_id).then((data) => {
        console.log("initial data: ", data);
        setData(data);
      });
    }
  };

  useEffect(() => {
    const supabase = createClient();
    supabase
      .channel("review_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "reviews" },
        (event) => {
          if (event.eventType == "INSERT") {
            console.log("new review: ", event.new);
            console.log("appointment_id: ", data?.id);
            if (event.new.appointment_id === data?.id) {
              setData((prev) => ({
                ...prev!,
                reviews: [
                  {
                    id: event.new.id,
                    rating: event.new.rating,
                    comment: event.new.comment,
                    created_at: event.new.created_at,
                  },
                ],
              }));
            }
          } else if (event.eventType == "DELETE") {
            if (event.old.id === data?.reviews[0].id) {
              setData((prev) => ({ ...prev!, reviews: [] }));
            }
          }
        }
      )
      .subscribe();
    return () => {
      supabase.channel("review_changes").unsubscribe();
    };
  }, [setData, data]);

  useEffect(() => {
    console.log("data updated: ", data);
  }, [data]);

  useEffect(() => {
    if (!window) return;
    setSize(window.innerWidth);
    window.addEventListener("resize", () => setSize(window.innerWidth));
    return () =>
      window.removeEventListener("resize", () => setSize(window.innerWidth));
  }, []);

  return (
    <Drawer
      direction={size > 1024 ? "right" : "bottom"}
      onOpenChange={onOpenChange}
    >
      <DrawerTrigger className="w-full outline-none">{children}</DrawerTrigger>
      <DrawerContent dir={size > 1024 ? "right" : "bottom"}>
        <DrawerHeader>
          <DrawerTitle className="text-xl">
            {data?.business?.name || "Appointment Details"}
          </DrawerTitle>
          <DrawerDescription>
            {data?.scheduled_date
              ? `Scheduled on: ${formatDate(data.scheduled_date)}`
              : "No scheduled date available"}
          </DrawerDescription>
        </DrawerHeader>
        <div className="space-y-4 p-4 overflow-y-auto">
          <div
            style={{
              backgroundColor: lightenHexColor(
                data?.team_members?.color || "#fffffff",
                0.7
              ),
            }}
            className="rounded-lg border border-gray-700 p-2"
          >
            <h1 className="text-lg font-semibold">Team:</h1>
            <div className="mt-1 flex flex-col gap-1">
              <h4 className="ml-2 font-semibold text-gray-700">
                {data?.team_members?.first_name} {data?.team_members?.last_name}
              </h4>
            </div>
          </div>
          <div className="mt-6">
            <h1 className="text-lg font-semibold">Services:</h1>
            <div className="ml-1 mt-1 flex flex-col gap-1 border-l-6 border-themeVilot">
              <h4 className="ml-2 font-semibold text-gray-700">
                {data?.services?.service_name}
              </h4>
              <h4 className="ml-2 text-gray-700">
                {data?.services?.price || "N/A"} {data?.business?.currency}
              </h4>
            </div>
          </div>
          <div className="mt-6">
            <h1 className="text-lg font-semibold">Details:</h1>
            <div className="ml-1 mt-1 flex flex-col gap-1 border-l-6 border-themeVilot">
              <h4 className="flex gap-2 items-center ml-2 font-normal text-gray-700">
                <FaMapMarked /> {data?.business?.address || "N/A"}
              </h4>
              <h4 className="flex gap-2 items-center ml-2 font-normal text-gray-700">
                <FaPhone /> +{data?.business_phone || "N/A"}
              </h4>
              <h4 className="flex gap-2 items-center ml-2 font-normal text-gray-700">
                <MdEmail /> {data?.business_email || "N/A"}
              </h4>
            </div>
          </div>
          {data?.business?.cordinates && (
            <BusinessMap cordinates={data?.business?.cordinates} />
          )}
          {status === "Completed" && (
            <div>
              <AppointmentReview
                appointment_id={data?.id!}
                business_id={data?.business?.id!}
                review={data?.reviews[0] || null}
              />
            </div>
          )}
          <div className="border border-stroke rounded-lg p-2">
            <div className="text-gray-800 flex items-center justify-between pt-2 border-b border-stroke">
              <h1>Service price:</h1>
              <h2>
                {data?.services?.price || "N/A"} {data?.business?.currency}
              </h2>
            </div>
            <div className="text-gray-800 flex items-center justify-between pt-2 border-b border-stroke">
              <h1>Discount:</h1>
              <h2 className="text-green-500">
                {data?.payments?.service_discounts
                  ? (data.services?.price! *
                      data?.payments?.service_discounts?.discount_value) /
                    100
                  : 0}
                {data?.business?.currency}
              </h2>
            </div>
            <div className="flex items-center justify-between pt-3">
              <h1>Total payment:</h1>
              <h2>
                {data?.price_paid || "N/A"} {data?.business?.currency}
              </h2>
            </div>
          </div>
        </div>
        <DrawerFooter>
          <DrawerClose>
            <Button className="w-full" variant="outline">
              Close
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
