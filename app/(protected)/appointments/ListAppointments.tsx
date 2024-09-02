import AppointmentDetails from "@/components/AppointmentDetails/AppointmentDetails";
import formatDate from "@/utils/formating-utils/format-date";
import Link from "next/link";

export type Appointment = {
  id: string;
  ref: string;
  scheduled_date: string;
  created_at: string;
  service_name: string | null | undefined;
  service_price: number | null | undefined;
  service_duration: number | null | undefined;
  payment_amount: number | null | undefined;
  team_member_name: string | null | undefined;
  team_member_color: string | null | undefined;
  business_id: string | null | undefined;
  business_name: string | null | undefined;
};

const getAppointmentStatus = (appointment: Appointment) => {
  const scheduledDate = new Date(appointment.scheduled_date);
  const currentDate = new Date();

  const endDate = new Date(
    scheduledDate.getTime() + (appointment.service_duration || 0) * 60000
  );

  if (currentDate < scheduledDate) {
    return {
      status: "Upcoming",
      color: "#FFA500", // Orange color for upcoming
    };
  } else if (currentDate >= scheduledDate && currentDate <= endDate) {
    return {
      status: "In Progress",
      color: "#00FF00", // Green color for in progress
    };
  } else if (currentDate > endDate) {
    return {
      status: "Completed",
      color: "#ccc", // Grey color for completed
    };
  }

  return {
    status: "Pending",
    color: "#808080", // Grey color for pending (as a fallback)
  };
};

const AppointmentCard = ({ appointment }: { appointment: Appointment }) => {
  const status = getAppointmentStatus(appointment);

  return (
    <AppointmentDetails appointment_id={appointment.id} key={appointment.id}>
      <div className="border border-gray-200 p-4 bg-white rounded-xl shadow-md flex flex-col space-y-2 hover-scale-2">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">{appointment.service_name}</h3>
          <span className="text-sm text-gray-500">
            {formatDate(appointment.scheduled_date)}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-700">
            Price: ${appointment.service_price}
          </span>
          <span
            className="px-2 py-1 text-xs rounded-md text-white"
            style={{
              backgroundColor: status.color,
            }}
          >
            {status.status}
          </span>
        </div>
        <div className="flex gap-1 justify-start text-sm text-gray-600 ">
          At:
          <Link
            href={`/s/${appointment.business_id}`}
            className="hover:underline"
          >
            {appointment.business_name}
          </Link>
        </div>
      </div>
    </AppointmentDetails>
  );
};

export default function ListAppointments({
  appointments,
}: {
  appointments: Appointment[];
}) {
  return (
    <div>
      <h1 className="text-xl font-semibold ">Appointments:</h1>
      <div className="flex flex-col gap-4 mt-4 ml-2">
        {appointments.length ? (
          appointments.map((appointment) => (
            <AppointmentCard key={appointment.id} appointment={appointment} />
          ))
        ) : (
          <div className="text-gray-600">No appointments found</div>
        )}
      </div>
    </div>
  );
}
