"use client"; // Add this if it's a Client Component (required for form actions in Next.js App Router)

import { doSocialLogin } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Github, Chrome } from "lucide-react"; // Chrome icon works well as Google logo

const SocialLogins = () => {
    return (
        <form action={doSocialLogin} className="flex flex-col gap-4">
            <Button
                type="submit"
                name="action"
                value="google"
                variant="outline"
                className="w-full flex items-center justify-center gap-3 text-lg"
            >
                <Chrome className="h-5 w-5" />
                Sign In With Google
            </Button>

            <Button
                type="submit"
                name="action"
                value="github"
                variant="outline"
                className="w-full flex items-center justify-center gap-3 text-lg"
            >
                <Github className="h-5 w-5" />
                Sign In With GitHub
            </Button>
        </form>
    );
};

export default SocialLogins;