"use server";
import nodemailer from "nodemailer";

interface SendAppointmentEmailParams {
  workerEmail: string;
  appointmentDate: string;
  serviceName: string;
  clientName: string;
}

export async function sendAppointmentEmail({
  workerEmail,
  appointmentDate,
  serviceName,
  clientName,
}: SendAppointmentEmailParams): Promise<void> {
  try {
    console.log("Sending email to:", workerEmail);
    const transporter = nodemailer.createTransport({
      host: "smtp-mail.outlook.com",
      port: parseInt(process.env.NEXT_PUBLIC_SMTP_PORT || "587", 10),
      secure: true,
      // port: 587,
      auth: {
        user: process.env.NEXT_PUBLIC_SMTP_EMAIL,
        pass: process.env.NEXT_PUBLIC_SMTP_PASS,
      },
    });

    const mailOptions = {
      from: process.env.NEXT_PUBLIC_SMTP_EMAIL,
      to: workerEmail,
      subject: `New Appointment Scheduled: ${serviceName}`,
      text: `Hello,

You have a new appointment scheduled.

Service: ${serviceName}
Client: ${clientName}
Date: ${appointmentDate}

Please make sure to be available.

Best regards,
Your Company`,
      html: `<p>Hello,</p>
            <p>You have a new appointment scheduled.</p>
            <p><strong>Service:</strong> ${serviceName}</p>
            <p><strong>Client:</strong> ${clientName}</p>
            <p><strong>Date:</strong> ${appointmentDate}</p>
            <p>Please make sure to be available.</p>
            <p>Best regards,<br>Your Company</p>`,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}
