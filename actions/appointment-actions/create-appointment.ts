"use server";
import { TeamMember } from "@/app/(public)/s/[business_id]/checkout/SelectProfessional";
import { Selected } from "@/app/(public)/s/[business_id]/ServicesCard/types";
import { createClient } from "@/utils/supabase/server";
import { format } from "date-fns";
import { sendAppointmentEmail } from "./send-email";
import ACreateCharge from "../payment-actions/create-charge";

const getClientData = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data) {
    console.error(error);
    return null;
  }
  const { data: userData, error: userErr } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", data.user.id)
    .single();
  if (userErr) {
    console.error(userErr);
    return null;
  }
  return userData;
};

async function handlePayment({
  paymentAmount,
  discount,
  business_id,
  clientData,
}: {
  paymentAmount: number;
  discount: {
    id: string;
    value: number;
  };
  business_id: string;
  clientData: any;
}) {
  const supabase = createClient();
  const discountedValue = paymentAmount * (1 - discount.value / 100);

  const res = await ACreateCharge({
    amount: discountedValue,
    currency: "AED",
    description: "Payment for services and memberships",
    reference: {
      transaction: "txn_01",
      order: "ord_01",
    },
    customer: {
      first_name: clientData.first_name || "",
      middle_name: "",
      last_name: clientData.last_name || "",
      email: clientData.email,
      phone: {
        country_code: "",
        number: clientData.phone || "",
      },
    },
    merchant: {
      id: "1234", // TODO: get from business
    },
  });
  if (res.error) {
    console.error("error creating charge", res.error);
    return { data: null, error: res.error.message };
  }

  const payment = await supabase
    .from("payments")
    .insert({
      amount: discountedValue,
      business_id: business_id,
      discount_id: discount.id || null,
      charge_id: res.id,
    })
    .select("id")
    .single();
  if (payment.error) {
    console.error("error inserting payment", payment.error);
    return { data: null, error: payment.error.message };
  }
  return {
    data: {
      payment_id: payment.data.id,
      redirection_url: res.transaction.url,
    },
    error: null,
  };
}

export default async function ACreateAppointment({
  business_id,
  services_memberships,
  team_member,
  time,
  discount,
}: {
  business_id: string;
  services_memberships: Selected[];
  time: Date;
  team_member: TeamMember;
  discount: {
    id: string;
    value: number;
  };
}) {
  const supabase = createClient();
  const clientData = await getClientData();
  if (!clientData) {
    return { data: null, error: "error getting client data" };
  }

  const paymentAmount = services_memberships.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // tmp code
  const { data: payment, error: paymentError } = await handlePayment({
    paymentAmount,
    discount,
    business_id,
    clientData,
  });

  if (paymentError) {
    console.error("error inserting payment", paymentError);
    return { data: null, error: paymentError };
  }

  const services = services_memberships.filter(
    (service) => service.type === "service"
  );
  const memberships = services_memberships.filter(
    (service) => service.type === "membership"
  );

  if (services.length) {
    const { data, error } = await supabase.from("appointments").insert(
      services.map((service) => ({
        services_id: service.id,
        team_member_id: team_member.id,
        scheduled_date: format(time, "yyyy-MM-dd'T'HH:mm:ss.SSS"),
        business_id: business_id,
        payment_id: payment?.payment_id,
        price_paid: discount.value
          ? service.price - (service.price * discount.value) / 100
          : service.price,
      }))
    );
    if (error) {
      console.error("error inserting services", error);
      return { data: null, error: error.message };
    }
    for (const service of services) {
      sendAppointmentEmail({
        workerEmail: team_member.email || "",
        appointmentDate: time.toString(),
        serviceName: service.name,
        clientName: `${clientData.first_name} ${clientData.last_name}`,
      });
    }
  }

  if (memberships.length) {
    const { data, error } = await supabase.from("memberships").insert(
      memberships.map((membership) => ({
        memberships_catalog_id: membership.id,
        business_id: business_id,
        payment_id: payment?.payment_id,
        price_paid: discount.value
          ? membership.price - (membership.price * discount.value) / 100
          : membership.price,
      }))
    );
    if (error) {
      console.error("error inserting memberships", error);
      return { data: null, error: error.message };
    }
  }

  return { data: payment, error: null };
}
