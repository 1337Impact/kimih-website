"use client";
import React, { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import TimeSlots from "./TimeSlot";
import getAvailableHours, { combineDateAndTime } from "./utils";



const SelectTime = ({
  setCombinedDateTime,
  business_id,
  selectedTeamMember,
}: {
  business_id: string;
  selectedTeamMember: string;
  setCombinedDateTime: (value: Date | null) => void;
}) => {
  const [times, setTimes] = useState<string[]>([]);

  const [selectedTime, setSelectedTime] = useState<string | null>(times[0]);
  const [date, setDate] = useState<Date | undefined>(new Date());

  useEffect(() => {
    if (date && selectedTime) {
      const combined = combineDateAndTime(date, selectedTime);
      setCombinedDateTime(combined);
    }
  }, [date, selectedTime, setCombinedDateTime]);

  useEffect(() => {
    if (date) {
      setSelectedTime(null);
    }
  }, [date]);

  useEffect(() => {
    if (date) {
      getAvailableHours(business_id, selectedTeamMember, date).then(setTimes);
    }
  }, [date, business_id, selectedTeamMember]);

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
      {
        times ? (
        <TimeSlots
        times={times}
        selectedTime={selectedTime}
        onSelectTime={setSelectedTime}
        />) : <div>Loading...</div>
      }
    </div>
  );
};

export default SelectTime;
