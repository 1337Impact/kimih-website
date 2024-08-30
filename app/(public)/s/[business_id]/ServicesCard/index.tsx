"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

interface Service {
  service_name: string;
  price: number | null;
  duration: number | null;
}

interface Membership {
  membership_name: string;
  price: number | null;
  duration: number | null;
}

export default function ServicesAndMembershipsCard({
  services,
  memberships,
}: {
  services: Service[];
  memberships?: Membership[];
}) {
  const [selectedServices, setSelectedServices] = useState([]);

  const handleSelected = (service: Service) => {};

  return (
    <div className="w-full grid grid-cols-3 gap-6 mt-10">
      <div className="col-span-2 w-full">
        <section id="services" className="mt-10">
          <h1 className="text-2xl font-bold">Services</h1>
          <div className="w-full mt-4 flex flex-col gap-4">
            {services.map((service, index) => (
              <div key={index} className="w-full p-4 px-5 border border-stroke rounded-xl flex justify-between items-center">
                <div className="">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {service.service_name}
                  </h2>
                  <p className="text-gray-500">{service.duration} min</p>
                  <p className="text-gray-800">${service.price}</p>
                </div>
                <Button
                  onClick={() => {
                    handleSelected(service);
                  }}
                  className="mt-2"
                >
                  Book
                </Button>
              </div>
            ))}
          </div>
        </section>
      </div>
      <div className="col-span-1 border border-stroke rounded-lg p-4">
        <h1 className="text-2xl font-semibold text-gray-800">Card</h1>
      </div>
    </div>
  );
}
