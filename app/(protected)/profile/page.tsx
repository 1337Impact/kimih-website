import { createClient } from "@/utils/supabase/server";
import ProfileCard from "./ProfileCard";
import ListAppointments from "./ListAppointments";
import ListMemberships from "./ListMemberships";
import OrderStatus from "./OrderStatus";
import { Appointment } from "../components/AppointmentCard";
import { Membership } from "../components/MembershipCard";

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
      "id, ref, scheduled_date, created_at, status, payments(amount), services(service_name, price, duration), team_members(first_name, last_name, email, color), business(id, name, currency)"
    )
    .order("created_at", { ascending: false })
    .limit(5);
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
      currency: appointment.business?.currency || "",
    };
  });
};

const getMembershipsData = async (): Promise<Membership[]> => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("memberships")
    .select(
      "id, ref, created_at, status, memberships_catalog(membership_name, price, valid_for_days), payments(amount), business(id, name, currency)"
    )
    .order("created_at", { ascending: false })
    .limit(5);
  if (error || !data) return [] as Membership[];
  return data.map((appointment) => {
    return {
      id: appointment.id,
      ref: appointment.ref,
      created_at: appointment.created_at,
      membership_name: appointment.memberships_catalog?.membership_name,
      membership_price: appointment.memberships_catalog?.price,
      membership_validity: appointment.memberships_catalog?.valid_for_days,
      payment_amount: appointment.payments?.amount,
      business_id: appointment.business?.id,
      business_name: appointment.business?.name,
      currency: appointment.business?.currency || "",
      status: appointment.status,
    };
  });
};

export default async function Page() {
  const userData = await getUserData();
  const appointmentsData = await getAppointmentsData();
  const membershipsData = await getMembershipsData();
  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <OrderStatus />
      <div className="grid grid-cols-7 gap-6">
        <div className="col-span-7 lg:col-span-3">
          <ProfileCard userData={userData} />
        </div>
        <div className="col-span-7 lg:col-span-4">
          <ListAppointments appointments={appointmentsData} />
        </div>
        <div className="col-span-7">
          <ListMemberships memberships={membershipsData} />
        </div>
      </div>
    </div>
  );
}
