"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema, type ResetPasswordInput } from "@/lib/validations/auth";
import { Loader2, AlertCircle, CheckCircle2, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

export default function ResetPasswordPage() {
  const { token } = useParams<{ token: string }>();
  const router = useRouter();
  const [done, setDone] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { token },
  });

  async function onSubmit(data: ResetPasswordInput) {
    setServerError("");
    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (res.ok) {
      setDone(true);
    } else {
      setServerError(json.message || "Failed to reset password");
    }
  }

  if (done) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-sm text-center space-y-4">
          <CheckCircle2 className="w-10 h-10 text-success mx-auto" />
          <h1 className="text-xl font-semibold tracking-tight">Password updated</h1>
          <p className="text-sm text-text-secondary">You can now sign in with your new password.</p>
          <Link
            href="/login"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-accent text-accent-foreground text-sm font-medium hover:brightness-110 transition-all"
          >
            Sign in
          </Link>
        </div>
      </div>
    );
  }

  const inputClass =
    "w-full px-3.5 py-2.5 text-sm rounded-xl border border-border bg-background placeholder:text-text-tertiary/60 focus:outline-none focus:ring-2 focus:ring-accent/20 transition-colors";

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center space-y-1.5">
          <h1 className="text-xl font-semibold tracking-tight">Set new password</h1>
          <p className="text-sm text-text-secondary">Must be at least 8 characters</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {serverError && (
            <div className="p-3 rounded-xl bg-error/10 border border-error/30 flex items-start gap-2.5" role="alert">
              <AlertCircle className="w-4 h-4 text-error shrink-0 mt-0.5" />
              <p className="text-xs text-error">{serverError}</p>
            </div>
          )}

          <input type="hidden" {...register("token")} />

          <div className="space-y-1.5">
            <label htmlFor="password" className="text-xs font-medium text-text-secondary">New password</label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                autoFocus
                className={`${inputClass} pr-10`}
                {...register("password")}
              />
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-tertiary hover:text-text-secondary transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-[11px] text-error">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-accent text-accent-foreground text-sm font-medium hover:brightness-110 transition-all disabled:opacity-50"
          >
            {isSubmitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Resetting...</> : "Reset password"}
          </button>
        </form>
      </div>
    </div>
  );
}
