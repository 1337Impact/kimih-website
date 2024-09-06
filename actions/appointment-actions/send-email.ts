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
      <div
      style="
        font-family: Arial, sans-serif;
        color: #333;
        max-width: 600px;
        margin: 0 auto;
      "
    >
      <header
        style="
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
          color: #000;
          padding: 5px 0;
          text-align: center;
        "
      >
        <svg
          width="44"
          height="44"
          viewBox="0 0 385 381"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M285.07 74.5345L270.493 55.2235C228.004 -1.0628 142.167 3.13308 105.371 63.295L100.208 71.7359C93.3387 82.9674 84.319 92.7319 73.6666 100.469L56.3975 113.012C-2.77897 155.994 2.99694 245.965 67.1835 281.027C82.0186 289.131 94.5473 300.876 103.59 315.158L106.096 319.115C143.089 377.54 226.797 381.682 269.377 327.194L285.699 306.309C292.388 297.749 300.428 290.336 309.502 284.362L324.67 274.375C385.063 234.613 384.594 145.875 323.785 106.753L310.778 98.3851C300.871 92.0112 292.167 83.9369 285.07 74.5345Z"
            stroke="url(#paint0_linear_63_3)"
            stroke-width="30"
          />
          <defs>
            <linearGradient
              id="paint0_linear_63_3"
              x1="191"
              y1="-62"
              x2="191"
              y2="439"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#DD3FEB" />
              <stop offset="1" stop-color="#3A37EC" />
            </linearGradient>
          </defs>
        </svg>
        <h1>KIMIH</h1>
      </header>
      <h2 style="margin-top: -4px; color: #4caf50; text-align: center">New Appointment Assigned</h2>
      <p style="font-size: 16px">Dear Team Member,</p>
      <p style="font-size: 16px">
        You have been assigned a new appointment. Please find the details below:
      </p>
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0">
        <tr>
          <td style="font-weight: bold; padding: 10px; background-color: #f2f2f2">
            Client Name:
          </td>
          <td style="padding: 10px">${clientName}</td>
        </tr>
        <tr>
          <td style="font-weight: bold; padding: 10px; background-color: #f2f2f2">
            Service:
          </td>
          <td style="padding: 10px">${serviceName}</td>
        </tr>
        <tr>
          <td style="font-weight: bold; padding: 10px; background-color: #f2f2f2">
            Appointment Date:
          </td>
          <td style="padding: 10px">${appointmentDate}</td>
        </tr>
      </table>
      <p style="font-size: 16px">
        Please be prepared to attend to the client at the scheduled time.
      </p>
      <p style="font-size: 16px">Best regards,<br />KIMIH Team</p>
      <footer
        style="text-align: center; margin-top: 30px; font-size: 14px; color: #888"
      >
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
