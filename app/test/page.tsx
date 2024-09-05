"use client";

import { sendAppointmentEmail } from "@/actions/appointment-actions/send-email";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <Button
      onClick={async () =>
        await sendAppointmentEmail({
          workerEmail: "mbenkhat@student.1337.ma",
          appointmentDate: new Date().toISOString(),
          serviceName: "Service Name",
          clientName: "Mohammed Benkhattab",
        })
      }
    >
      Click me
    </Button>
  );
}
