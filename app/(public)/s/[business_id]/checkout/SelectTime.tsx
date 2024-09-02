"use client";
import React, { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { generateTimeSlots } from "@/utils/formating-utils/format-date";

const TimeSlots = ({
  times,
  selectedTime,
  onSelectTime,
}: {
  times: string[];
  selectedTime: string | null;
  onSelectTime: (time: string) => void;
}) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {times.map((time) => (
        <button
          key={time}
          onClick={() => onSelectTime(time)}
          className={`py-2 px-5 xl:px-8 border rounded-lg ${
            selectedTime === time
              ? "border-purple-500 bg-purple-100 text-purple-700"
              : "border-gray-300"
          }`}
        >
          {time}
        </button>
      ))}
    </div>
  );
};

const SelectTime = ({
  setCombinedDateTime,
}: {
  setCombinedDateTime: (value: Date | null) => void;
}) => {
  const times = generateTimeSlots("09:00", "18:00");
  const [selectedTime, setSelectedTime] = useState<string | null>(times[0]);
  const [date, setDate] = useState<Date | undefined>(new Date());

  const combineDateAndTime = (date: Date | undefined, time: string) => {
    if (!date) return null;

    const [timePart, period] = time.split(" ");
    let [hours, minutes] = timePart.split(":").map(Number);

    if (period === "PM" && hours !== 12) {
      hours += 12;
    } else if (period === "AM" && hours === 12) {
      hours = 0;
    }

    const combined = new Date(date.getTime());
    combined.setHours(hours);
    combined.setMinutes(minutes);
    combined.setSeconds(0);
    combined.setMilliseconds(0);

    return combined;
  };

  useEffect(() => {
    if (date && selectedTime) {
      const combined = combineDateAndTime(date, selectedTime);
      setCombinedDateTime(combined);
    }
  }, [date, selectedTime, setCombinedDateTime]);

  return (
    <div className="grid gap-4 sm:grid-cols-2 mt-8">
      <div className="mx-auto">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-lg border border-stroke p-5"
        />
      </div>
      <TimeSlots
        times={times}
        selectedTime={selectedTime}
        onSelectTime={setSelectedTime}
      />
    </div>
  );
};

export default SelectTime;
