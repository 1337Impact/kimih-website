"use client";
import Stepper from "@/components/stepper";
import { useState } from "react";

const StepWrapper = ({
  children,
  stepTitle,
}: {
  children: React.ReactNode;
  stepTitle: string;
}) => {
  return (
    <div className="w-full mt-10 flex flex-col items-center">
      <h1 className="text-3xl font-bold py-4">{stepTitle}</h1>
      {children}
    </div>
  );
};

export default function StepperForm() {
  const steps = ["Business Info", "Select Services", "Confirmation"];
  const [activeStep, setActiveStep] = useState(0);

  const handleSubmit = () => {
    alert("Form submitted!");
  };

  return (
    <div className="w-full">
      <Stepper steps={steps} activeStep={activeStep} />
      {activeStep === 0 ? (
        <StepWrapper stepTitle={steps[activeStep]} aria-label={"step-one"}>
          <p>Business Info Form</p>
        </StepWrapper>
      ) : activeStep === 1 ? (
        <StepWrapper stepTitle={steps[activeStep]} aria-label={"step-two"}>
          <p>Select Services Form</p>
        </StepWrapper>
      ) : (
        <StepWrapper stepTitle={steps[activeStep]} aria-label={"step-three"}>
          <p>Confirmation Form</p>
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
            onClick={() => setActiveStep((prev) => prev + 1)}
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
