"use client";

import { SignInMethodDivider } from "@/components/SignInMethodDivider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthActions } from "@convex-dev/auth/react";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { toast, Toaster } from "sonner";
import { useState } from "react";

export default function SignInPage() {
  const [step, setStep] = useState<"signIn" | { email: string }>("signIn");
  const { signIn } = useAuthActions();


  return (
    <div className="flex min-h-screen w-full container my-auto mx-auto">
      <div className="max-w-[384px] mx-auto flex flex-col my-auto gap-4 pb-8">
        {step === "signIn" ? (
          <>
            <h2 className="font-semibold text-2xl tracking-tight">
              Sign in or create an account
            </h2>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                const formData = new FormData(event.currentTarget);
                void signIn("email-otp", formData).then(() =>
                  setStep({ email: formData.get("email") as string })
                );
              }}
            >
              <input name="email" placeholder="Email" type="text" />
              <button type="submit">Send code</button>
            </form>
          </>
        ) : (
          <>
            <h2 className="font-semibold text-2xl tracking-tight">
              Check your email
            </h2>
            <p>A sign-in code has been sent to your email address.</p>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                const formData = new FormData(event.currentTarget);
                void signIn("email-otp", formData);
              }}
            >
              <input name="code" placeholder="Code" type="text" />
              <input name="email" value={step.email} type="hidden" />
              <button type="submit">Continue</button>
              <button type="button" onClick={() => setStep("signIn")}>
                Cancel
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}