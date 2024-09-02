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

export default TimeSlots;
