"use client";
import PickBusiness from "@/components/pick-business";
import Stepper from "@/components/stepper/stepper";
import createBusinessFinalStepSchema, {
  createBusinessStep1Schema,
  createBusinessStep2Schema,
} from "@/utils/zod/create-business-schema";
import { useState } from "react";
import SelectServices from "./SelectServices";

const StepWrapper = ({
  children,
  stepTitle,
}: {
  children: React.ReactNode;
  stepTitle: string;
}) => {
  return (
    <div className="w-full flex flex-col items-center">
      <h1 className="text-3xl font-bold my-10">{stepTitle}</h1>
      {children}
    </div>
  );
};

export default function StepperForm() {
  const steps = ["Business Info", "Select Services", "Confirmation"];
  const [activeStep, setActiveStep] = useState(1);
  const [services, setServices] = useState<string[]>([]);
  const [data, setData] = useState({
    business_name: "",
    website: "",
    address: "",
  });
  const [error, setError] = useState({
    business_name: "",
    website: "",
    address: "",
    services: "",
  });

  const handleNextStep = () => {
    setError({
      business_name: "",
      website: "",
      address: "",
      services: "",
    });
    if (activeStep === 0) {
      const result = createBusinessStep1Schema.safeParse(data);
      if (!result.success) {
        result.error.errors.forEach((err) => {
          setError((prev) => ({ ...prev, [err.path[0]]: err.message }));
        });
        return;
      }
    } else if (activeStep === 1) {
      const result = createBusinessStep2Schema.safeParse({ services });
      if (!result.success) {
        result.error.errors.forEach((err) => {
          setError((prev) => ({ ...prev, [err.path[0]]: err.message }));
        });
        return;
      }
    }
    setActiveStep((prev) => prev + 1);
  };

  const handleChange = (e: any) => {
    setData({ ...data, [e.target.id]: e.target.value });
  };

  const handleSubmit = () => {
    const result = createBusinessFinalStepSchema.safeParse({
      ...data,
      services,
    });
    if (!result.success) {
      result.error.errors.forEach((err) => {
        setError((prev) => ({ ...prev, [err.path[0]]: err.message }));
      });
      return;
    }
    alert("Form submitted!");
  };

  return (
    <div className="w-full">
      <Stepper steps={steps} activeStep={activeStep} />
      {activeStep === 0 ? (
        <StepWrapper stepTitle={steps[activeStep]} aria-label={"step-one"}>
          <div className="mt-2 mb-3 w-[350px]">
            <label
              className="block text-gray-700 font-normal mb-1"
              htmlFor="business_name"
            >
              Buisness Name
            </label>
            <input
              className="border-2 rounded w-full py-1.5 px-2 text-gray-600 border-gray-500 placeholder-gray-300 placeholder:text-sm"
              id="business_name"
              type="text"
              placeholder="Ex: Studio 12 On Main"
              value={data.business_name}
              onChange={handleChange}
            />
            {error.business_name && (
              <p className="text-red-400 font-medium text-xs -mb-[8px]">
                {error.business_name}
              </p>
            )}
            <label
              className="mt-4 block text-gray-700 font-normal mb-1"
              htmlFor="business_name"
            >
              Website
            </label>
            <input
              className="border-2 rounded w-full py-1.5 px-2 text-gray-600 border-gray-500 placeholder-gray-300 placeholder:text-sm"
              id="website"
              type="text"
              name="website"
              placeholder="Ex: example.com"
              value={data.website}
              onChange={handleChange}
            />
            {error.website && (
              <p className="text-red-400 font-medium text-xs -mb-[8px]">
                {error.website}
              </p>
            )}
            <label
              className="mt-4 block text-gray-700 font-normal mb-1"
              htmlFor="address"
            >
              Address
            </label>
            <input
              className="border-2 rounded w-full py-1.5 px-2 text-gray-600 border-gray-500 placeholder-gray-300 placeholder:text-sm"
              id="address"
              type="text"
              name="address"
              placeholder="Ex: 1234 Main St"
              value={data.address}
              onChange={handleChange}
            />
            {error.address && (
              <p className="text-red-400 font-medium text-xs -mb-[8px]">
                {error.address}
              </p>
            )}
          </div>
        </StepWrapper>
      ) : activeStep === 1 ? (
        <StepWrapper stepTitle={steps[activeStep]} aria-label={"step-two"}>
          <p className="text-sm text-gray-600">Click on item to select<span className="ml-1 text-red-500">*</span></p>
          {error.services && (
            <p className="text-red-400 font-medium text-lg">
              {error.services}
            </p>
          )}
          <div className="mt-4">
            <SelectServices services={services} setServices={setServices} />
          </div>
        </StepWrapper>
      ) : (
        <StepWrapper stepTitle={steps[activeStep]} aria-label={"step-three"}>
          <div className="mt-2 mb-3 w-[350px]">
            <label
              className="block text-gray-700 font-normal mb-1"
              htmlFor="business_name"
            >
              Buisness Name
            </label>
            <input
              className="border-2 rounded w-full py-1.5 px-2 text-gray-600 border-gray-500 placeholder-gray-300 placeholder:text-sm"
              id="business_name"
              type="text"
              placeholder="Ex: Studio 12 On Main"
              value={data.business_name}
              onChange={handleChange}
            />
            {error.business_name && (
              <p className="text-red-400 font-medium text-xs -mb-[8px]">
                {error.business_name}
              </p>
            )}
            <label
              className="mt-4 block text-gray-700 font-normal mb-1"
              htmlFor="business_name"
            >
              Website
            </label>
            <input
              className="border-2 rounded w-full py-1.5 px-2 text-gray-600 border-gray-500 placeholder-gray-300 placeholder:text-sm"
              id="website"
              type="text"
              name="website"
              placeholder="Ex: example.com"
              value={data.website}
              onChange={handleChange}
            />
            {error.website && (
              <p className="text-red-400 font-medium text-xs -mb-[8px]">
                {error.website}
              </p>
            )}
            <label
              className="mt-4 block text-gray-700 font-normal mb-1"
              htmlFor="address"
            >
              Address
            </label>
            <input
              className="border-2 rounded w-full py-1.5 px-2 text-gray-600 border-gray-500 placeholder-gray-300 placeholder:text-sm"
              id="address"
              type="text"
              name="address"
              placeholder="Ex: 1234 Main St"
              value={data.address}
              onChange={handleChange}
            />
            {error.address && (
              <p className="text-red-400 font-medium text-xs -mb-[8px]">
                {error.address}
              </p>
            )}
          </div>
          <div className="mt-6">
            <h4 className="text-lg font-semibold text-center">Selected Services:</h4>
            <p className="text-sm text-center text-gray-600">click on item to unselect or click Prev to add more.</p>
            {error.services && (
              <p className="text-red-400 text-center font-medium text-lg">
                {error.services}
              </p>
            )}
            <div className="mt-4">
              <SelectServices
                isConfimation
                services={services}
                setServices={setServices}
              />
            </div>
          </div>
        </StepWrapper>
      )}
      <div className="mt-10 w-full flex justify-between">
        {activeStep > 0 ? (
          <button
            className="px-6 py-2 border-2 font-medium border-black rounded-md hover:bg-gray-200"
            onClick={() => setActiveStep((prev) => prev - 1)}
          >
            Prev
          </button>
        ) : (
          <div />
        )}
        {activeStep < steps.length - 1 && (
          <button
            className="px-6 py-2 border-2 font-medium border-black bg-black text-white rounded-md hover:bg-gray-800"
            onClick={handleNextStep}
          >
            Continue
          </button>
        )}
        {activeStep == steps.length - 1 && (
          <button
            className="px-6 py-2 border-2 font-medium border-black bg-black text-white rounded-md hover:bg-gray-800"
            onClick={handleSubmit}
          >
            Create Business
          </button>
        )}
      </div>
    </div>
  );
}
