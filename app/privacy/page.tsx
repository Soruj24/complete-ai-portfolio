import { Shield, Lock, Eye, FileText, Bell } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black py-20 px-4">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="h-16 w-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Shield className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-gray-500 dark:text-gray-400 font-medium text-lg max-w-2xl mx-auto leading-relaxed">
            Your privacy is our top priority. This policy explains how we collect, use, and protect your personal information.
          </p>
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-gray-900 rounded-[32px] p-8 md:p-12 shadow-xl shadow-gray-100 dark:shadow-none border border-gray-100 dark:border-gray-800 space-y-10">
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <Lock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              <h2 className="text-2xl font-black text-gray-900 dark:text-white">1. Information We Collect</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
              We collect information that you provide directly to us, such as when you create an account, update your profile, or contact us for support. This may include:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 font-medium ml-4">
              <li>Name and email address</li>
              <li>Profile picture and preferences</li>
              <li>Communication history with our team</li>
            </ul>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <Eye className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              <h2 className="text-2xl font-black text-gray-900 dark:text-white">2. How We Use Your Data</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
              We use your information to provide and improve our services, including:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 font-medium ml-4">
              <li>Authenticating your account access</li>
              <li>Personalizing your user experience</li>
              <li>Sending security alerts and administrative messages</li>
              <li>Responding to your comments and questions</li>
            </ul>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              <h2 className="text-2xl font-black text-gray-900 dark:text-white">3. Data Security</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
              We implement a variety of security measures to maintain the safety of your personal information. Your data is encrypted and stored on secure servers with limited access.
            </p>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <Bell className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              <h2 className="text-2xl font-black text-gray-900 dark:text-white">4. Updates to This Policy</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
            </p>
          </section>
        </div>

        {/* Footer info */}
        <div className="text-center">
          <p className="text-gray-400 dark:text-gray-600 text-sm font-bold uppercase tracking-widest">
            Last Updated: December 25, 2025
          </p>
        </div>
      </div>
    </div>
  );
}
