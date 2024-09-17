"use client";
import { useEffect, useState } from "react";
import CartCard, { MobileCartCard } from "./CartCard";
import SelectTime from "./SelectAvailableTimes";
import { Selected } from "../ServicesCard/types";
import SelectProfessional, { TeamMember } from "./SelectProfessional";
import ServicesAndMembershipsCard from "./ListServices";
import { useToast } from "@/hooks/use-toast";
import Stepper from "@/components/stepper/stepper";
import ACreateAppointment from "@/actions/appointment-actions/create-appointment";
import { useDispatch, useSelector } from "react-redux";
import { setBusinessId, setCurrency } from "@/store/checkoutSlice";
import { RootState } from "@/store";
import { getBusinessCurrency } from "./utils";
import PaymentStep from "./PaymentStep";
import Loader from "@/components/loading/loader";

export default function Page({ params }: { params: { business_id: string } }) {
  const steps = ["Services", "Professional", "Time", "Payment"];
  const { toast } = useToast();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [selectedServices, setSelectedServices] = useState<Selected[]>([]);
  const [selectedProfessional, setSelectedProfessional] =
    useState<TeamMember | null>(null);
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);
  const [step, setStep] = useState(0);
  const discount = useSelector(
    (state: RootState) => state.checkoutSlice.checkoutData?.discount
  );
  const isMembershipOnly = useSelector(
    (state: RootState) => state.checkoutSlice.checkoutData?.isMembershipOnly
  );

  useEffect(() => {
    const cart = localStorage.getItem(params.business_id);
    if (cart) {
      setSelectedServices(JSON.parse(cart));
    }
    dispatch(setBusinessId(params.business_id));
  }, [params.business_id, dispatch]);

  useEffect(() => {
    getBusinessCurrency(params.business_id).then((data: string) => {
      dispatch(setCurrency(data));
    });
  }, [params.business_id, dispatch]);

  const handleCreateAppointment = async (data: any) => {
    // console.log("Success: ", data.id);
    setLoading(true);
    if (!selectedProfessional || !selectedTime) return;
    const res = await ACreateAppointment({
      business_id: params.business_id,
      services_memberships: selectedServices,
      team_member: selectedProfessional!,
      time: selectedTime!,
      discount: discount,
      tokenizedId: data.id,
    });
    if (res.error) {
      setLoading(false);
      toast({
        variant: "destructive",
        title: "Could not place order",
        description: "There was an error placing your order, please try again",
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
        return;
      } else if (isMembershipOnly) {
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
      window.CardSDK.tokenize();
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
    <main className="container overflow-hidden max-w-[1100px] mx-auto px-4 md:px-6 min-h-screen  pt-28">
      <div className="relative w-full flex flex-col items-center">
        <div className={loading ? "blur-sm w-full" : "w-full"}>
          <Stepper steps={steps} activeStep={step} />
          <div className="w-full grid grid-cols-5 gap-20">
            {step === 0 ? (
              <div className="col-span-5 lg:col-span-3">
                <ServicesAndMembershipsCard
                  selected={selectedServices}
                  setSelected={setSelectedServices}
                  business_id={params.business_id}
                />
              </div>
            ) : step === 1 ? (
              <div className="col-span-5 lg:col-span-3">
                <SelectProfessional
                  selectedProfessional={selectedProfessional}
                  business_id={params.business_id}
                  setSelectedProfessional={setSelectedProfessional}
                />
              </div>
            ) : step == 2 ? (
              <div className="col-span-5 lg:col-span-3">
                <SelectTime
                  business_id={params.business_id}
                  selectedTeamMember={selectedProfessional?.id!}
                  setCombinedDateTime={setSelectedTime}
                />
              </div>
            ) : (
              <div className="col-span-5 lg:col-span-3 mt-4">
                <PaymentStep onSuccess={handleCreateAppointment} />
              </div>
            )}
            <div className="max-lg:hidden col-span-2 mt-10">
              <CartCard
                activeStep={step}
                handlePrevious={handlePrevious}
                handleNext={handleNext}
                selected={selectedServices}
              />
            </div>
          </div>
          <div className="lg:hidden" style={loading ? { display: "none" } : {}}>
            <MobileCartCard
              activeStep={step}
              handlePrevious={handlePrevious}
              handleNext={handleNext}
              selected={selectedServices}
            />
          </div>
        </div>
        {loading && (
          <div className="absolute flex justify-center w-full h-full">
            <Loader content={"Processing payment..."} />
          </div>
        )}
      </div>
    </main>
  );
}
