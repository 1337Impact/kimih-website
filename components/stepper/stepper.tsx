export default function Stepper({
  steps,
  activeStep,
}: {
  steps: string[];
  activeStep: number;
}) {
  return (
    <ol className="flex justify-between items-center text-sm w-full md:text-lg font-medium text-slate-800">
      {steps.map((step, index) => (
        <li
          key={index}
          className={
            index == steps.length - 1
              ? `flex items-center ${activeStep === index && "text-themeVilot"}`
              : `flex md:w-full justify-center items-center ${
                  activeStep === index
                    ? "text-themeVilot"
                    : activeStep > index
                    ? "text-violet-400"
                    : ""
                } after:content-[''] after:w-full after:h-1 after:border-b after:border-slate-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10`
          }
        >
          <span className="flex sm:text-nowrap text-[.8rem] sm:text-[.9rem] md:text-[1rem] lg:text-lg items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-slate-200">
            {activeStep >= index ? (
              <svg
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 me-1 sm:me-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
              </svg>
            ) : (
              <span className="me-2">{index + 1}</span>
            )}
            {step}
          </span>
        </li>
      ))}
    </ol>
  );
}
