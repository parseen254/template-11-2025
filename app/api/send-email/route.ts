import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { render } from "@react-email/render";
import OTPVerificationEmail from "@/emails/OTPVerification";
import React from "react";

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
      verificationCode?: string;
      expiryMinutes?: number;
    };

    if (!body?.to || !body?.subject || !body?.verificationCode) {
      return NextResponse.json(
        { error: "Missing required fields: to, subject, verificationCode" },
        { status: 400 }
      );
    }

    // Render the React Email template to HTML
    const emailHtml = await render(
      React.createElement(OTPVerificationEmail, {
        verificationCode: body.verificationCode,
        expiryMinutes: body.expiryMinutes || 15,
      })
    );

    // Render plain text version (fallback)
    const emailText = `Your Verification Code: ${body.verificationCode}\n\nThis code will expire in ${body.expiryMinutes || 15} minutes.\n\nIf you didn't request this code, you can safely ignore this email.`;

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

    // Send email with both HTML and text versions
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM || "noreply@localhost",
      to: body.to,
      subject: body.subject,
      text: emailText,
      html: emailHtml,
    });

    console.log("Email sent:", {
      messageId: info.messageId,
      to: body.to,
      subject: body.subject,
      verificationCode: body.verificationCode,
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
