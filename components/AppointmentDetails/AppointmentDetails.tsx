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

type Appointment = {
  id: string;
  ref: string;
  scheduled_date: string;
  created_at: string;
  payments: {
    amount: number;
  } | null;
  services: {
    service_name: string;
    price: number | null;
    duration: number | null;
  } | null;
  profiles: {
    first_name: string | null;
    last_name: string | null;
    email: string | null;
    phone: string | null;
  } | null;
  team_members: {
    first_name: string;
    last_name: string;
    email: string | null;
    phone: number | null;
    color: string | null;
  } | null;
  business: {
    id: string;
    name: string;
    cordinates: number[] | null | undefined;
  } | null;
};

const getAppointmentsData = async (
  appointment_id: string
): Promise<Appointment | null> => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("appointments")
    .select(
      "id, ref, scheduled_date, created_at, payments(amount), services(service_name, price, duration), profiles(first_name, last_name, email, phone), team_members(first_name, last_name, email, phone, color), business(id, name, cordinates)"
    )
    .eq("id", appointment_id)
    .single();
  if (error) return null;
  return data;
};

export default function AppointmentDetails({
  children,
  appointment_id,
}: {
  appointment_id: string;
  children: React.ReactNode;
}) {
  const [data, setData] = useState<Appointment | null>(null);
  const [size, setSize] = useState(0);
  const onOpenChange = (isOpen: boolean) => {
    if (isOpen && !data) {
      getAppointmentsData(appointment_id).then((data) => {
        setData(data);
      });
    }
  };

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
              <h4 className="ml-2 text-sm text-gray-600">
                {data?.team_members?.email || "N/A"}
              </h4>
              <h4 className="ml-2 text-sm text-gray-600">
                {data?.team_members?.phone || "N/A"}
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
                {data?.services?.price || "N/A"}AED
              </h4>
            </div>
          </div>
          {data?.business?.cordinates && (
            <BusinessMap cordinates={data?.business?.cordinates} />
          )}
          <div className="border border-stroke rounded-lg p-2">
            <div className="text-gray-800 flex items-center justify-between pt-2 border-b border-stroke">
              <h1>Service price:</h1>
              <h2>{data?.services?.price || "N/A"}AED</h2>
            </div>
            <div className="text-gray-800 flex items-center justify-between pt-2 border-b border-stroke">
              <h1>Discount:</h1>
              <h2>{0}AED</h2>
            </div>
            <div className="flex items-center justify-between pt-3">
              <h1>Total payment:</h1>
              <h2>{data?.payments?.amount || "N/A"}AED</h2>
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
