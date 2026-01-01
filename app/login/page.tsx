import LoginForm from "@/components/auth/LoginForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const page = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 p-4">
      <Link 
        href="/" 
        className="mb-8 flex items-center gap-2 text-sm font-black uppercase tracking-widest text-gray-400 hover:text-blue-600 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Portfolio
      </Link>
      <LoginForm />
    </div>
  );
};

export default page;
