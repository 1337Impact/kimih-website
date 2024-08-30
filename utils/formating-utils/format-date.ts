export default function formatDate(dateString: string): string {
  const date = new Date(dateString);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "UTC",
  };

  const formatter = new Intl.DateTimeFormat("en-US", options);

  return formatter.format(date);
}

export function addMinutesToDate(dateStr: string, minutes: number): Date {
  const date = new Date(dateStr);
  date.setMinutes(date.getMinutes() + minutes);
  return date;
}
export function addDaysToDate(dateStr: string, days: number): Date {
  const date = new Date(dateStr);
  date.setHours(date.getHours() + (days * 24));
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
