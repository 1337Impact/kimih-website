import { createClient } from "@/utils/supabase/server";
import ListAppointments, { Appointment } from "./ListAppointments";

const getUserData = async () => {
  const supabase = createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData || !userData.user) return null;
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userData.user.id)
    .single();
  return data;
};

const getAppointmentsData = async (): Promise<Appointment[]> => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("appointments")
    .select(
      "id, ref, scheduled_date, created_at, payments(amount), services(service_name, price, duration), team_members(first_name, last_name, email, color), business(id, name)"
    )
    .order("created_at", { ascending: false });
  if (error || !data) return [] as Appointment[];
  return data.map((appointment) => {
    return {
      ...appointment,
      service_name: appointment.services?.service_name,
      service_price: appointment.services?.price,
      service_duration: appointment.services?.duration,
      payment_amount: appointment.payments?.amount,
      team_member_name: `${appointment.team_members?.first_name} ${appointment.team_members?.last_name}`,
      team_member_email: appointment.team_members?.email,
      team_member_color: appointment.team_members?.color,
      business_id: appointment.business?.id,
      business_name: appointment.business?.name,
    };
  });
};

export default async function Page() {
  const userData = await getUserData();
  const appointmentsData = await getAppointmentsData();
  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-4 grid grid-cols-7 gap-6">
      <div className="col-span-7">
        <ListAppointments appointments={appointmentsData} />
      </div>
    </div>
  );
}
