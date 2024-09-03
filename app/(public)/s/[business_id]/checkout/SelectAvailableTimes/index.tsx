"use client";
import React, { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  addMinutesToDate,
  generateTimeSlots,
  getStartAndEndOfDate,
} from "@/utils/formating-utils/format-date";
import TimeSlots from "./TimeSlot";
import { createClient } from "@/utils/supabase/client";

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

async function getAvailableHours(
  business_id: string,
  team_member_id: string,
  date: Date
): Promise<string[]> {
  const supabase = createClient();

  const { startDate, endDate } = getStartAndEndOfDate(date);

  const { data: appointments, error: appointmentsError } = await supabase
    .from("appointments")
    .select("scheduled_date, services(duration)")
    .eq("team_member_id", team_member_id)
    .gt("scheduled_date", startDate)
    .lte("scheduled_date", endDate);

  if (appointmentsError) {
    console.error("Error fetching appointments:", appointmentsError);
    return [];
  }

  const { data: business, error: businessError } = await supabase
    .from("business")
    .select("working_hours")
    .eq("id", business_id)
    .single();

  if (businessError) {
    console.error("Error fetching business working hours:", businessError);
    return [];
  }

  const workingHours = business.working_hours;
  const dayName = new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
  });
  //@ts-ignore
  const hoursForDay = workingHours[dayName];

  if (!hoursForDay || !hoursForDay.is_open) {
    return []; // Business is closed on this day
  }

  const availableHours: Set<string> = new Set();
  const fromHour = parseInt(hoursForDay.from_hour?.split(":")[0] ?? "0");
  const toHour = parseInt(hoursForDay.to_hour?.split(":")[0] ?? "24");

  for (let hour = fromHour; hour < toHour; hour++) {
    availableHours.add(hour.toString().padStart(2, "0") + ":00");
  }

  appointments.forEach((appointment) => {
    const appointmentTime = appointment.scheduled_date
      .split("T")[1]
      .slice(0, 5);
    const from = parseInt(appointmentTime.split(":")[0]);
    const endTime = addMinutesToDate(
      appointmentTime,
      appointment.services?.duration || 0
    );
    const to = endTime.getHours();

    for (let hour = from; hour < to; hour++) {
      availableHours.delete(hour.toString().padStart(2, "0") + ":00");
    }
  });

  return Array.from(availableHours);
}

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
      <TimeSlots
        times={times}
        selectedTime={selectedTime}
        onSelectTime={setSelectedTime}
      />
    </div>
  );
};

export default SelectTime;
