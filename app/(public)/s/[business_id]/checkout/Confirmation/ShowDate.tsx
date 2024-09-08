import { FaRegCalendarAlt, FaRegClock } from "react-icons/fa";

export default function ShowDate({
  totalDuration,
  selectedTime,
}: {
  totalDuration: number;
  selectedTime: Date | null;
}) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
    }).format(date);
  };
  const addMinutes = (date: Date, minutes: number) => {
    const newDate = new Date(date);
    newDate.setMinutes(newDate.getMinutes() + minutes);
    return newDate;
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  if (!selectedTime) {
    return <div>No selected time</div>;
  }

  const endTime = addMinutes(selectedTime, totalDuration);

  return (
    <div className="w-full mt-6">
      <div className="mt-4">
        <div className="flex items-center space-x-2 text-gray-600">
          <FaRegCalendarAlt className="w-5 h-5" />
          <p className="text-sm">{formatDate(selectedTime)}</p>
        </div>

        {totalDuration > 0 && (
          <div className="flex items-center space-x-2 text-gray-600 mt-2">
            <FaRegClock className="w-5 h-5" />
            <p className="text-sm">
              {formatTime(selectedTime)} - {formatTime(endTime)} (
              {Math.floor(totalDuration / 60)} hrs {totalDuration % 60} mins)
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
