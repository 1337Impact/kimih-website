"use client";

import { sendAppointmentEmail } from "@/actions/appointment-actions/send-email";
import { Button } from "@/components/ui/button";

export default function Page() {
    return (
        <Button onClick={() => sendAppointmentEmail({
            workerEmail: "mobenkhattab@gmail.com",
            appointmentDate: new Date().toISOString(),
            serviceName: "Service Name",
            clientName: "Client Name",
        })}>Click me</Button>
    )
}