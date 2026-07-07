"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema, type ForgotPasswordInput } from "@/lib/validations/auth";
import { Loader2, AlertCircle, ArrowLeft, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  async function onSubmit(data: ForgotPasswordInput) {
    const res = await fetch("/api/forgot-password", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) setSent(true);
  }

  if (sent) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-sm text-center space-y-4">
          <CheckCircle2 className="w-10 h-10 text-success mx-auto" />
          <h1 className="text-xl font-semibold tracking-tight">Check your email</h1>
          <p className="text-sm text-text-secondary">
            If an account exists with that email, we&apos;ve sent password reset instructions.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 text-sm text-accent hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center space-y-1.5">
          <h1 className="text-xl font-semibold tracking-tight">Reset password</h1>
          <p className="text-sm text-text-secondary">
            Enter your email and we&apos;ll send you a reset link
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {errors.email && (
            <div className="p-3 rounded-xl bg-error/10 border border-error/30 flex items-start gap-2.5" role="alert">
              <AlertCircle className="w-4 h-4 text-error shrink-0 mt-0.5" />
              <p className="text-xs text-error">{errors.email.message}</p>
            </div>
          )}

          <div className="space-y-1.5">
            <label htmlFor="email" className="text-xs font-medium text-text-secondary">Email</label>
            <input
              id="email"
              type="email"
              placeholder="admin@example.com"
              autoFocus
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-border bg-background placeholder:text-text-tertiary/60 focus:outline-none focus:ring-2 focus:ring-accent/20 transition-colors"
              {...register("email")}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-accent text-accent-foreground text-sm font-medium hover:brightness-110 transition-all disabled:opacity-50"
          >
            {isSubmitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</> : "Send reset link"}
          </button>
        </form>

        <p className="text-center text-xs text-text-tertiary">
          <Link href="/login" className="text-accent hover:underline inline-flex items-center gap-1">
            <ArrowLeft className="w-3 h-3" /> Back to login
          </Link>
        </p>
      </div>
    </div>
  );
}
