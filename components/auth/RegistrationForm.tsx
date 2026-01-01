 "use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import SocialLogins from "./SocialLogins";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CldUploadWidget } from "next-cloudinary";
import { Camera, User as UserIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const RegistrationForm = () => {
    const router = useRouter();
    const [isRegistrationAllowed, setIsRegistrationAllowed] = useState<boolean | null>(null);

    const [error, setError] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    useEffect(() => {
        const checkSettings = async () => {
            try {
                const res = await fetch("/api/settings");
                const data = await res.json();
                if (data.success) {
                    setIsRegistrationAllowed(data.settings.allowRegistration);
                }
            } catch (error) {
                console.error("Error checking settings:", error);
            }
        };
        checkSettings();
    }, []);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError("");

        try {
            const formData = new FormData(event.currentTarget);

            const name = formData.get("name");
            const email = formData.get("email");
            const password = formData.get("password");

            const response = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                    image: imageUrl,
                }),
            });

            // Check if response is JSON
            const contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                setError("Invalid server response. Please try again.");
                return;
            }

            const data = await response.json();

            if (response.ok) {
                router.push("/login?registered=true");
            } else {
                setError(data.error || "Registration failed");
            }
        } catch (e) {
            setError("Something went wrong");
            console.error(e instanceof Error ? e.message : String(e));
        }
    }

    if (isRegistrationAllowed === false) {
        return (
            <Card className="w-full max-w-md mx-auto">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold">Registration Disabled</CardTitle>
                    <CardDescription>
                        We are not accepting new registrations at this time.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Notice</AlertTitle>
                        <AlertDescription>
                            Please contact the administrator if you believe this is an error.
                        </AlertDescription>
                    </Alert>
                </CardContent>
                <CardFooter>
                    <Button onClick={() => router.push("/")} className="w-full">
                        Back to Home
                    </Button>
                </CardFooter>
            </Card>
        );
    }

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
                <CardDescription>
                    Enter your details below to create your account
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    <div className="flex flex-col items-center justify-center space-y-4">
                        <div className="relative group">
                            <Avatar className="h-24 w-24 border-2 border-primary/10 shadow-lg">
                                <AvatarImage src={imageUrl} />
                                <AvatarFallback className="bg-primary/5">
                                    <UserIcon className="h-10 w-10 text-muted-foreground" />
                                </AvatarFallback>
                            </Avatar>
                            <CldUploadWidget 
                                uploadPreset="ml_default"
                                onSuccess={(result: any) => {
                                    if (result.info && typeof result.info !== 'string') {
                                        setImageUrl(result.info.secure_url);
                                    }
                                }}
                            >
                                {({ open }) => (
                                    <button 
                                        type="button"
                                        onClick={() => open()}
                                        className="absolute bottom-0 right-0 bg-primary text-primary-foreground p-2 rounded-full shadow-lg hover:scale-110 transition-transform"
                                    >
                                        <Camera className="h-4 w-4" />
                                    </button>
                                )}
                            </CldUploadWidget>
                        </div>
                        <p className="text-xs text-muted-foreground">Upload Profile Picture (Optional)</p>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="John Doe"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="john@example.com"
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
                        </div>
                    </div>

                    <Button type="submit" className="w-full">
                        Register
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
                    Already have an account?{" "}
                    <a href="/login" className="underline hover:text-primary">
                        Sign in
                    </a>
                </p>
            </CardFooter>
        </Card>
    );
};

export default RegistrationForm;