import { format, startOfDay, endOfDay, subHours, formatISO } from "date-fns";

export default function formatDate(dateString: string): string {
  const date = new Date(dateString);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  const formatter = new Intl.DateTimeFormat("en-US", options);

  return formatter.format(date);
}

export function addMinutesToDate(time: string, minutes: number): Date {
  const [hours, mins] = time.split(":").map(Number);
  const date = new Date();
  date.setHours(hours);
  date.setMinutes(mins + minutes);
  return date;
}

export function addDaysToDate(dateStr: string, days: number): Date {
  const date = new Date(dateStr);
  date.setHours(date.getHours() + days * 24);
  return date;
}

export function formatTime(date: Date): string {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  const hour12 = hours % 12;
  const displayHours = hour12 ? hour12 : 12;

  // Pad minutes with leading zero if needed
  const displayMinutes = minutes.toString().padStart(2, "0");

  return `${displayHours}:${displayMinutes}${ampm}`;
}

export function generateTimeSlots(
  startTime: string,
  endTime: string
): string[] {
  const timeSlots: string[] = [];
  let start = new Date(`1970-01-01T${startTime}`);
  const end = new Date(`1970-01-01T${endTime}`);

  while (start <= end) {
    const hours = start.getHours().toString().padStart(2, "0");
    const minutes = start.getMinutes().toString().padStart(2, "0");

    const formattedTime = `${hours}:${minutes}`;
    timeSlots.push(formattedTime);

    start = new Date(start.getTime() + 30 * 60000);
  }

  return timeSlots;
}

export function getStartAndEndOfDate(date: Date) {
  const startDate = startOfDay(date);
  const endDate = endOfDay(date);

  const formattedStartDate = format(startDate, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
  const formattedEndDate = format(endDate, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");

  return { startDate: formattedStartDate, endDate: formattedEndDate };
}

export function getPreviousDateAndVoid(inputDate: Date) {
  const currentDate = new Date();
  const maxDaysDifference = 6 * 24 * 60 * 60 * 1000;

  const inputTime = inputDate.getTime();
  const previousDate = new Date(inputTime - 24 * 60 * 60 * 1000);
  const currentNextDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);
  const maxDate = new Date(currentDate.getTime() + maxDaysDifference);

  const resultDate =
    previousDate > maxDate
      ? maxDate
      : previousDate < currentNextDate
      ? currentNextDate
      : previousDate;

  const diff = resultDate.getTime() - currentDate.getTime();
  const hours = Math.floor(diff / 1000 / 60 / 60);

  return {
    previousDate: resultDate.toISOString().split("T")[0],
    voidAfter: hours + 24,
  };
}
