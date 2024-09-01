"use client";
import { useEffect, useState } from "react";
import CartCard, { MobileCartCard } from "./CartCard";
import SelectTime from "./SelectTime";
import { Selected } from "../ServicesCard/types";
import { Button } from "@/components/ui/button";
import SelectProfessional, { TeamMember } from "./SelectProfessional";
import ServicesAndMembershipsCard from "./ListServices";
import { useToast } from "@/hooks/use-toast";
import PaymentForm from "./PaymentStep";
import Stepper from "@/components/stepper/stepper";
import ACreateAppointment from "@/actions/appointment-actions/create-appointment";

export default function Page({ params }: { params: { business_id: string } }) {
  const steps = ["Services", "Professional", "Time", "Payment"];
  const { toast } = useToast();
  const [selectedServices, setSelectedServices] = useState<Selected[]>([]);
  const [selectedProfessional, setSelectedProfessional] =
    useState<TeamMember | null>();
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const cart = localStorage.getItem(params.business_id);
    if (cart) {
      setSelectedServices(JSON.parse(cart));
    }
  }, []);

  const handleCreateAppointment = async () => {
    console.log("appointment data: ", {
      services: selectedServices,
      professional: selectedProfessional,
      time: selectedTime,
    });
    const res = await ACreateAppointment({
      business_id: params.business_id,
      services_memberships: selectedServices,
      team_member: selectedProfessional!,
      time: selectedTime!,
    });
    if (res.error) {
      toast({
        variant: "destructive",
        title: "Error creating appointment",
        description: res.error,
      });
    } else {
      toast({
        variant: "success",
        title: "Appointment successful",
        description: "Your appointment has been successfully placed",
      });
    }
  };

  const handleNext = () => {
    if (step === 0) {
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
    } else if (step === 1 && !selectedProfessional) {
      toast({
        variant: "destructive",
        title: "Please select a professional to proceed",
        description: "You need to select a professional to proceed",
      });
      return;
    } else if (step == 2 && !selectedTime) {
      toast({
        variant: "destructive",
        title: "Please select a time to proceed",
        description: "You need to select a time to proceed",
      });
      return;
    } else if (step == 3) {
      handleCreateAppointment();
      toast({
        variant: "success",
        title: "Booking successful",
        description: "Your booking has been successfully placed",
      });
      return;
    }
    setStep(step + 1);
  };

  const handlePrevious = () => {
    step > 0 && setStep(step - 1);
  };

  return (
    <main className="container overflow-hidden max-w-[1100px] mx-auto px-4 md:px-6 flex min-h-screen flex-col items-center pt-28">
      <Stepper steps={steps} activeStep={step} />
      <div className="w-full grid grid-cols-5 gap-20">
        <div className="col-span-5 lg:col-span-3">
          {step === 0 ? (
            <ServicesAndMembershipsCard
              selected={selectedServices}
              setSelected={setSelectedServices}
              business_id={params.business_id}
            />
          ) : step === 1 ? (
            <SelectProfessional
              business_id={params.business_id}
              setSelectedProfessional={setSelectedProfessional}
            />
          ) : step == 2 ? (
            <SelectTime setCombinedDateTime={setSelectedTime} />
          ) : (
            <PaymentForm />
          )}
        </div>
        <div className="max-lg:hidden col-span-2 mt-10">
          <CartCard handleNext={handleNext} selected={selectedServices} />
        </div>
      </div>
      <div className="lg:hidden">
        <MobileCartCard handleNext={handleNext} selected={selectedServices} />
      </div>
    </main>
  );
}
