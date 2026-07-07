import { Cookie, Info, Settings, ShieldCheck, XCircle } from "lucide-react";

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-background py-20 px-4">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="h-16 w-16 bg-warning/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Cookie className="h-8 w-8 text-warning" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-text-primary tracking-tight">
            Cookie Policy
          </h1>
          <p className="text-text-secondary font-medium text-lg max-w-2xl mx-auto leading-relaxed">
            We use cookies to enhance your experience and analyze our traffic.
          </p>
        </div>

        {/* Content */}
        <div className="bg-surface rounded-[32px] p-8 md:p-12 shadow-lg border border-border-subtle space-y-10">
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <Info className="h-6 w-6 text-warning" />
              <h2 className="text-2xl font-black text-text-primary">1. What Are Cookies?</h2>
            </div>
            <p className="text-text-secondary leading-relaxed font-medium">
              Cookies are small text files that are placed on your computer by websites that you visit. They are widely used in order to make websites work, or work more efficiently, as well as to provide information to the owners of the site.
            </p>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-6 w-6 text-warning" />
              <h2 className="text-2xl font-black text-text-primary">2. Essential Cookies</h2>
            </div>
            <p className="text-text-secondary leading-relaxed font-medium">
              These cookies are necessary for the website to function and cannot be switched off in our systems. They are usually only set in response to actions made by you which amount to a request for services, such as setting your privacy preferences, logging in or filling in forms.
            </p>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <Settings className="h-6 w-6 text-warning" />
              <h2 className="text-2xl font-black text-text-primary">3. Performance Cookies</h2>
            </div>
            <p className="text-text-secondary leading-relaxed font-medium">
              These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us to know which pages are the most and least popular and see how visitors move around the site.
            </p>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <XCircle className="h-6 w-6 text-warning" />
              <h2 className="text-2xl font-black text-text-primary">4. Managing Cookies</h2>
            </div>
            <p className="text-text-secondary leading-relaxed font-medium">
              Most web browsers allow some control of most cookies through the browser settings. To find out more about cookies, including how to see what cookies have been set, visit <a href="https://www.aboutcookies.org" className="text-accent hover:underline">aboutcookies.org</a>.
            </p>
          </section>
        </div>

        {/* Footer info */}
        <div className="text-center">
          <p className="text-text-tertiary text-sm font-bold uppercase tracking-widest">
            Last Updated: December 25, 2025
          </p>
        </div>
      </div>
    </div>
  );
}
