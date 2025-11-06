import { Email } from "@convex-dev/auth/providers/Email";
import { RandomReader, generateRandomString } from "@oslojs/crypto/random";

export const EmailOTP = Email({
    id: "email-otp",
    apiKey: process.env.AUTH_RESEND_KEY,
    maxAge: 60 * 15, // 15 minutes
    async generateVerificationToken() {
        const random: RandomReader = {
            read(bytes) {
                crypto.getRandomValues(bytes);
            },
        };

        const alphabet = "0123456789";
        const length = 8;
        return generateRandomString(random, alphabet, length);
    },
    async sendVerificationRequest({ identifier: email, provider, token }) {
        const baseUrl =
            process.env.SITE_URL ||
            "http://localhost:3000";

        const url = new URL("/api/send-email", baseUrl).toString();

        const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                to: email,
                subject: "Your verification code",
                text: `Your verification code is: ${token}\n\nThis code will expire in 15 minutes.`,
            }),
        });

        if (!res.ok) {
            const text = await res.text().catch(() => "");
            throw new Error(`Failed to send verification email: ${res.status} ${text}`);
        }
    },
});