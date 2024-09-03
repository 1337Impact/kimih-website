import { useState, useEffect } from "react";

const TimeSlots = ({
  times,
  selectedTime,
  onSelectTime,
}: {
  times: string[];
  selectedTime: string | null;
  onSelectTime: (time: string) => void;
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger animation on times change
    setIsLoaded(false);
    const timeoutId = setTimeout(() => {
      setIsLoaded(true);
    }, 400);
    console.log(times);
    return () => clearTimeout(timeoutId);
  }, [times]);

  if (!times.length) {
    return (
      <div className="text-center text-gray-500">No available times found.</div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="flex flex-col gap-4">
        {times.slice(0, times.length / 2).map((time, index) => (
          <button
            key={time}
            onClick={() => onSelectTime(time)}
            className={`py-2 px-5 xl:px-8 border rounded-lg transition-transform duration-500 ease-out ${
              isLoaded
                ? "transform translate-y-0 opacity-100"
                : "transform -translate-y-10 opacity-0"
            } ${
              selectedTime === time
                ? "border-purple-500 bg-purple-100 text-purple-700"
                : "border-gray-300"
            }`}
            style={{ transitionDelay: `${index * 50}ms` }}
          >
            {time}
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-4">
        {times.slice(times.length / 2, times.length).map((time, index) => (
          <button
            key={time}
            onClick={() => onSelectTime(time)}
            className={`py-2 px-5 xl:px-8 border rounded-lg transition-transform duration-500 ease-out ${
              isLoaded
                ? "transform translate-y-0 opacity-100"
                : "transform -translate-y-10 opacity-0"
            } ${
              selectedTime === time
                ? "border-purple-500 bg-purple-100 text-purple-700"
                : "border-gray-300"
            }`}
            style={{ transitionDelay: `${index * 50}ms` }}
          >
            {time}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TimeSlots;
