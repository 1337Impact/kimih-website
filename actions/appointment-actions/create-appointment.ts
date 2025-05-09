"use server";
import { TeamMember } from "@/app/(public)/s/[business_id]/checkout/SelectProfessional";
import { Selected } from "@/app/(public)/s/[business_id]/ServicesCard/types";
import { createClient } from "@/utils/supabase/server";
import { sendAppointmentEmail } from "./send-email";
import ACreateAuthorize from "../payment-actions/create-authorize";
import { redirect } from "next/navigation";
import { getPreviousDateAndVoid } from "@/utils/formating-utils/format-date";

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
  tokenizedId,
  appointmentTime,
}: {
  paymentAmount: number;
  discount: {
    id: string;
    value: number;
  };
  business_id: string;
  clientData: any;
  tokenizedId: string;
  appointmentTime: Date;
}) {
  const supabase = createClient();
  const calculateDate = getPreviousDateAndVoid(appointmentTime);
  console.log("calculateDate", calculateDate);

  const res = await ACreateAuthorize({
    amount: paymentAmount,
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
      id:
        process.env.NEXT_PUBLIC_TAP_MERCHANT_KEY ||
        "merchant_WCEQ1724103mCzR9uT80992",
    },
    tokenizedId,
    voidAfter: calculateDate.voidAfter,
  });
  if (res.error) {
    console.error("error creating charge", res.error);
    return {
      data: null,
      error: res.error.description || "Error creating Autorize",
    };
  }

  const payment = await supabase
    .from("payments")
    .insert({
      amount: paymentAmount,
      business_id: business_id,
      discount_id: discount.id || null,
      auth_id: res.data.id,
      charge_date: calculateDate.previousDate,
      client_id: clientData.id,
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
      redirection_url: res.data.transaction.url,
    },
    error: null,
  };
}

export default async function ACreateAppointment({
  business_id,
  services_memberships,
  team_member,
  time,
  formatedDate,
  discount,
  tokenizedId,
}: {
  business_id: string;
  services_memberships: Selected[];
  time: Date;
  formatedDate: string;
  team_member: TeamMember;
  discount: {
    id: string;
    value: number;
  };
  tokenizedId: string;
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
  const discountedValue = discount.value
    ? paymentAmount * (1 - discount.value / 100)
    : paymentAmount;
  const serviceFee = discountedValue * 0.03;

  // tmp code
  const { data: payment, error: paymentError } = await handlePayment({
    paymentAmount: discountedValue + serviceFee,
    discount,
    business_id,
    clientData,
    tokenizedId,
    appointmentTime: time,
  });

  if (paymentError) {
    console.error("error inserting payment", paymentError);
    return { data: null, error: "Payment Failed" };
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
        scheduled_date: formatedDate,
        business_id: business_id,
        payment_id: payment?.payment_id,
        price_paid: discountedValue + serviceFee,
      }))
    );
    if (error) {
      console.error("error inserting services", error);
      return { data: null, error: error.message };
    }
    for (const service of services) {
      sendAppointmentEmail({
        workerEmail: team_member.email || "",
        appointmentDate: formatedDate,
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
        price_paid: discountedValue + serviceFee,
      }))
    );
    if (error) {
      console.error("error inserting memberships", error);
      return { data: null, error: "Failed to create appointment." };
    }
  }
  console.log("Payment response:", payment);
  return { data: payment?.redirection_url as string, error: null };
}
