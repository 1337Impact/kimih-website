"use client";
import { useEffect, useState } from "react";
import CartCard, { MobileCartCard } from "./CartCard";
import SelectTime from "./SelectTime";
import { Selected } from "../ServicesCard/types";
import SelectProfessional, { TeamMember } from "./SelectProfessional";
import ServicesAndMembershipsCard from "./ListServices";
import { useToast } from "@/hooks/use-toast";
import PaymentForm from "./PaymentStep";
import Stepper from "@/components/stepper/stepper";
import ACreateAppointment from "@/actions/appointment-actions/create-appointment";
import { useRouter } from "next/navigation";

export default function Page({ params }: { params: { business_id: string } }) {
  const steps = ["Services", "Professional", "Time", "Payment"];
  const { toast } = useToast();
  const router = useRouter();

  const [selectedServices, setSelectedServices] = useState<Selected[]>([]);
  const [selectedProfessional, setSelectedProfessional] =
    useState<TeamMember | null>(null);
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const cart = localStorage.getItem(params.business_id);
    if (cart) {
      setSelectedServices(JSON.parse(cart));
    }
  }, []);

  const handleCreateAppointment = async () => {
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
      localStorage.removeItem(params.business_id);
      router.push(`/profile`);
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
        return;
      } else if (
        selectedServices.filter((service) => service.type === "service")
          .length === 0
      ) {
        setStep(3);
        return;
      }
      if (selectedServices.length >= 6) {
        toast({
          variant: "destructive",
          title: "Maximum 6 services can be selected",
          description: "You can select a maximum of 6 services",
        });
        return;
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
      return;
    }
    setStep(step + 1);
  };

  const handlePrevious = () => {
    if (
      selectedServices.filter((service) => service.type === "service")
        .length === 0
    ) {
      setStep(0);
      return;
    }
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
              selectedProfessional={selectedProfessional}
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
          <CartCard
            activeStep={step}
            handlePrevious={handlePrevious}
            handleNext={handleNext}
            selected={selectedServices}
          />
        </div>
      </div>
      <div className="lg:hidden">
        <MobileCartCard
          activeStep={step}
          handlePrevious={handlePrevious}
          handleNext={handleNext}
          selected={selectedServices}
        />
      </div>
    </main>
  );
}
