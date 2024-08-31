"use client";
import { useEffect, useState } from "react";
import CartCard from "./CartCard";
import SelectTime from "./SelectTime";
import { Selected } from "../ServicesCard/types";
import { Button } from "@/components/ui/button";
import SelectProfessional, { TeamMember } from "./SelectProfessional";
import { MobileCartCard } from "../ServicesCard/CartCard";
import ServicesAndMembershipsCard from "./ListServices";
import { useToast } from "@/hooks/use-toast";

export default function Page({ params }: { params: { business_id: string } }) {
  const { toast } = useToast();
  const [selectedServices, setSelectedServices] = useState<Selected[]>([]);
  const [selectedProfessional, setSelectedProfessional] =
    useState<TeamMember | null>();
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);
  const [step, setStep] = useState(1);

  useEffect(() => {
    const cart = localStorage.getItem(params.business_id);
    if (cart) {
      setSelectedServices(JSON.parse(cart));
    }
  }, []);

  const handleNext = () => {
    if (step === 1) {
      if (!selectedServices.length) {
        toast({
          variant: "destructive",
          title: "Please select a service to proceed",
          description: "You need to select a service to proceed",
        });
      } else if (selectedServices.length >= 6) {
        toast({
          variant: "destructive",
          title: "Maximum 6 services can be selected",
          description: "You can select a maximum of 6 services",
        });
      } else {
        setStep(step + 1);
      }
    } else if (step === 2 && !selectedProfessional) {
      toast({
        variant: "destructive",
        title: "Please select a professional to proceed",
        description: "You need to select a professional to proceed",
      });
      return;
    } else if (step == 3 && !selectedTime) {
      toast({
        variant: "destructive",
        title: "Please select a time to proceed",
        description: "You need to select a time to proceed",
      });
      return;
    }
    setStep(step + 1);
  };

  return (
    <main className="container overflow-hidden max-w-[1100px] mx-auto px-4 md:px-6 flex min-h-screen flex-col items-center pt-32">
      <div className="w-full grid grid-cols-5 gap-20">
        <div className="col-span-5 lg:col-span-3">
          <div className="flex gap-4 mb-4">
            <Button
              variant={step == 1 ? "default" : "outline"}
              className={`${
                step > 1 && "bg-gray-200 !border-gray-300"
              } border-black rounded-full lg:text-lg px-4 py-2`}
              onClick={() => setStep(1)}
            >
              <span className="max-lg:hidden mr-1">Select</span> Service
            </Button>
            <Button
              variant={step == 2 ? "default" : "outline"}
              className={`${
                step > 2 && "bg-gray-200 !border-gray-300"
              } border-black rounded-full lg:text-lg px-4 py-2`}
              onClick={() => setStep(2)}
            >
              <span className="max-lg:hidden mr-1">Select</span> Professional
            </Button>
            <Button
              variant={step == 3 ? "default" : "outline"}
              className={`${
                step > 3 && "bg-gray-200 !border-gray-300"
              } border-black rounded-full lg:text-lg px-4 py-2`}
              onClick={() => setStep(3)}
            >
              <span className="max-lg:hidden mr-1">Select</span> Time
            </Button>
          </div>
          {step === 2 ? (
            <SelectProfessional
              business_id={params.business_id}
              setSelectedProfessional={setSelectedProfessional}
            />
          ) : step == 3 ? (
            <SelectTime />
          ) : (
            <ServicesAndMembershipsCard business_id={params.business_id} />
          )}
        </div>
        <div className="max-lg:hidden col-span-2">
          <CartCard handleNext={handleNext} selected={selectedServices} />
        </div>
      </div>
      <div className="lg:hidden lg:col-span-1 mt-12 w-full">
        <MobileCartCard selected={selectedServices} />
      </div>
    </main>
  );
}
