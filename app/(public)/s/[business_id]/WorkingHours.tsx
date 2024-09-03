"use client";
import { useState } from "react";
import { FaRegClock } from "react-icons/fa";

export type WorkingHours = {
  [key: string]: {
    is_open: boolean;
    from_hour: string;
    to_hour: string;
  };
};

const BusinessWorkingHours = ({ hours }: { hours: WorkingHours }) => {
  const [isOpen, setIsOpen] = useState(true);
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });

  const todayHours = hours[today];
  const isBusinessOpenToday = todayHours.is_open;
  const closingTime = todayHours.to_hour;

  return (
    <div className="w-[280px]">
      <div
        className="flex gap-2 items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaRegClock />
        <span className="text-gray-600">
          {isBusinessOpenToday ? (
            <>
              <span className="text-green-600">Opened</span> today until{" "}
              <span className="text-gray-600">{closingTime}</span>
            </>
          ) : (
            <span className="text-red-500">Closed today</span>
          )}
        </span>
        <span className="ml-2 text-gray-600">{isOpen ? "▲" : "▼"}</span>
      </div>

      {isOpen && (
        <ul className="mt-2">
          {days.map((day) => (
            <li
              key={day}
              className="flex text-sm justify-between py-2 border-b border-gray-200"
            >
              <span className="text-gray-600 font-medium">{day}</span>
              {hours[day].is_open ? (
                <span className="text-green-600">
                  {hours[day].from_hour} - {hours[day].to_hour}
                </span>
              ) : (
                <span className="text-red-500">Closed</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BusinessWorkingHours;
