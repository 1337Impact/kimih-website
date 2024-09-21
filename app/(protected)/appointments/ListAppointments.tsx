import AppointmentDetails from "@/components/AppointmentDetails/AppointmentDetails";
import formatDate from "@/utils/formating-utils/format-date";
import Link from "next/link";
import AppointmentCard, { Appointment } from "../components/AppointmentCard";

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
