// app/login/LoginForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { doCredentialLogin } from "@/app/actions";
import SocialLogins from "./SocialLogins";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import ForgotPasswordForm from "./ForgotPasswordForm";

const LoginForm = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [showForgot, setShowForgot] = useState(false);
  const [show2FA, setShow2FA] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    try {
      const formData = new FormData(event.currentTarget);
      const response = await doCredentialLogin(formData);

      if (response?.error) {
        if (response.error.message === "2FA_REQUIRED") {
          setShow2FA(true);
        } else {
          setError(response.error.message || "Login failed");
        }
      } else {
        router.push("/dashboard");
      }
    } catch (e: any) {
      if (e.message === "2FA_REQUIRED") {
        setShow2FA(true);
      } else {
        setError("Invalid credentials. Please check your email and password.");
      }
    }
  }

  if (showForgot) {
    return <ForgotPasswordForm onBack={() => setShowForgot(false)} />;
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
        <CardDescription>
          Enter your email and password to sign in to your account
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              required
            />
            {!show2FA && (
              <div className="text-right">
                <button
                  type="button"
                  onClick={() => setShowForgot(true)}
                  className="text-sm underline hover:text-primary"
                >
                  Forgot password?
                </button>
              </div>
            )}
          </div>

          {show2FA && (
            <div className="space-y-2 animate-in fade-in slide-in-from-top-1">
              <Label htmlFor="otp">2FA Verification Code</Label>
              <Input
                id="otp"
                name="otp"
                type="text"
                placeholder="6-digit code"
                required
                autoFocus
                className="text-center text-xl tracking-widest font-bold"
              />
              <p className="text-xs text-gray-500 text-center">
                Enter the code from your authenticator app
              </p>
            </div>
          )}

          <Button type="submit" className="w-full">
            Sign In
          </Button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <Separator />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        <SocialLogins />
      </CardContent>

      <CardFooter className="flex flex-col gap-4 text-center text-sm text-muted-foreground">
        <p>
          Don&apos;t have an account?{" "}
          <a href="/register" className="underline hover:text-primary">
            Sign up
          </a>
        </p>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
