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
    console.log("env: ", process.env.NEXT_PUBLIC_SMTP_EMAIL, process.env.NEXT_PUBLIC_SMTP_PASS);
    
    const transporter = nodemailer.createTransport({
      // @ts-ignore
      host: process.env.NEXT_PUBLIC_SMTP_HOST || "smtp.hostinger.com",
      port: process.env.NEXT_PUBLIC_SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.NEXT_PUBLIC_SMTP_EMAIL,
        pass: process.env.NEXT_PUBLIC_SMTP_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: `"KIMIH" <${process.env.NEXT_PUBLIC_SMTP_EMAIL}>`,
      to: workerEmail,
      subject: `New Appointment Scheduled: ${serviceName}`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4CAF50; text-align: center;">New Appointment Assigned</h2>
          <p style="font-size: 16px;">Dear Team Member,</p>
          <p style="font-size: 16px;">You have been assigned a new appointment. Please find the details below:</p>
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr>
              <td style="font-weight: bold; padding: 10px; background-color: #f2f2f2;">Client Name:</td>
              <td style="padding: 10px;">${clientName}</td>
            </tr>
            <tr>
              <td style="font-weight: bold; padding: 10px; background-color: #f2f2f2;">Service:</td>
              <td style="padding: 10px;">${serviceName}</td>
            </tr>
            <tr>
              <td style="font-weight: bold; padding: 10px; background-color: #f2f2f2;">Appointment Date:</td>
              <td style="padding: 10px;">${appointmentDate}</td>
            </tr>
          </table>
          <p style="font-size: 16px;">Please be prepared to attend to the client at the scheduled time.</p>
          <p style="font-size: 16px;">Best regards,<br />KIMIH Team</p>
          <footer style="text-align: center; margin-top: 30px; font-size: 14px; color: #888;">
            © 2024 KIMIH, All Rights Reserved.
          </footer>
        </div>
      `,
    });

    console.log("Message sent: %s", info);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}
