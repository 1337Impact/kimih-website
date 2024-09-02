"use client";
import React, { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { generateTimeSlots } from "@/utils/formating-utils/format-date";
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
  worker_id: string,
  date: Date
): Promise<string[]> {
  const supabase = createClient();

  // Step 1: Get appointments for the given worker on the specified date
  const { data: appointments, error: appointmentsError } = await supabase
    .from("appointments")
    .select("from_hour, to_hour")
    .eq("worker_id", worker_id)
    .eq("scheduled_date", date.toISOString().split('T')[0]);

  if (appointmentsError) {
    console.error("Error fetching appointments:", appointmentsError);
    return [];
  }

  // Step 2: Get working hours from the business table
  const { data: business, error: businessError } = await supabase
    .from("business")
    .select("working_hours")
    .eq("id", business_id)
    .single();

  if (businessError) {
    console.error("Error fetching business working hours:", businessError);
    return [];
  }

  // Step 3: Calculate available hours
  const workingHours = business.working_hours;
  const dayName = new Date(date).toLocaleDateString('en-US', { weekday: 'long' });
  const hoursForDay = workingHours[dayName];

  if (!hoursForDay || !hoursForDay.is_open) {
    return []; // Business is closed on this day
  }

  const availableHours: Set<string> = new Set();
  const fromHour = parseInt(hoursForDay.from_hour?.split(':')[0] ?? '0');
  const toHour = parseInt(hoursForDay.to_hour?.split(':')[0] ?? '24');

  // Initialize available hours
  for (let hour = fromHour; hour < toHour; hour++) {
    availableHours.add(hour.toString().padStart(2, '0') + ":00");
  }

  // Remove hours occupied by appointments
  appointments.forEach(appointment => {
    const from = appointment.from_hour.split(':')[0];
    const to = appointment.to_hour.split(':')[0];

    for (let hour = parseInt(from); hour < parseInt(to); hour++) {
      availableHours.delete(hour.toString().padStart(2, '0') + ":00");
    }
  });

  return Array.from(availableHours);
}

const SelectTime = ({
  setCombinedDateTime,
}: {
  setCombinedDateTime: (value: Date | null) => void;
}) => {
  const times = generateTimeSlots("09:00", "18:00");
  const [selectedTime, setSelectedTime] = useState<string | null>(times[0]);
  const [date, setDate] = useState<Date | undefined>(new Date());

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
