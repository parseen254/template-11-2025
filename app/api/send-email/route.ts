import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      return NextResponse.json(
        { error: "Expected application/json" },
        { status: 415 }
      );
    }

    const body = (await req.json()) as {
      to?: string;
      subject?: string;
      text?: string;
    };

    if (!body?.to || !body?.subject || !body?.text) {
      return NextResponse.json(
        { error: "Missing required fields: to, subject, text" },
        { status: 400 }
      );
    }

    // Create transporter using environment variables
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "localhost",
      port: parseInt(process.env.SMTP_PORT || "1025"),
      secure: process.env.SMTP_SECURE === "true",
      auth:
        process.env.SMTP_USER && process.env.SMTP_PASSWORD
          ? {
              user: process.env.SMTP_USER,
              pass: process.env.SMTP_PASSWORD,
            }
          : undefined,
    });

    // Send email
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM || "noreply@localhost",
      to: body.to,
      subject: body.subject,
      text: body.text,
    });

    console.log("Email sent:", {
      messageId: info.messageId,
      to: body.to,
      subject: body.subject,
    });

    return NextResponse.json(
      {
        ok: true,
        message: "Email sent successfully",
        messageId: info.messageId,
        to: body.to,
        subject: body.subject,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      {
        error: "Failed to send email",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
