// import schema from "@/app/api/config/zod";
// import { Resend } from "resend";
import { ipLimiters, ipRateLimiter } from "@/app/api/config/limiter";
import nodemailer from "nodemailer";

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

export async function POST(request: Request) {
  if ((await ipRateLimiter(ipLimiters, request)) < 1) {
    return new Response("Too many requests", { status: 429 });
  }

  try {
    const data = await request.json();
    console.log("data: ", data);
    // const res = schema.safeParse(body);
    // if (!res.success) {
    //   return new Response("Email parsing failed", { status: 400 });
    // }

    const res = await transporter.sendMail({
      from: `"Kimih Support Request" <${process.env.NEXT_PUBLIC_SMTP_EMAIL}>`,
      to: "support@kimih.com",
      subject: "Support Request",
      html: `<div>\
        <h4>Support Request from ${data.name}!</h4>\
        <h6>Subject ${data.subject}!</h6>\
        <p>${data.message}</p>\
        Content: ${data.email}\
        </div>`,
    });
    console.log("nodemailer res: ", res);

    return Response.json({ message: "success" });
  } catch (e) {
    console.log("Error:", e);
    return new Response("Bad Request", { status: 400 });
  }
}
