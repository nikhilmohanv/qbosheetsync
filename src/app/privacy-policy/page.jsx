'use client'
import { Button } from "@/components/ui/button";
import { ArrowRight,Menu } from "lucide-react";
import { RefreshCw } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function PrivacyPolicy() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <div className="flex min-h-screen flex-col">
      <header className=" sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <RefreshCw className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">QBOSyncSheet</span>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="#features"
              className="text-sm font-medium hover:text-primary"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm font-medium hover:text-primary"
            >
              How It Works
            </Link>
            <Link
              href="#pricing"
              className="text-sm font-medium hover:text-primary"
            >
              Pricing
            </Link>
            <Link
              href="#testimonials"
              className="text-sm font-medium hover:text-primary"
            >
              Testimonials
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Link href="#" className="text-sm font-medium hover:text-primary">
              Sign In
            </Link>
            <Button>
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden container py-4 border-t">
            <nav className="flex flex-col gap-4">
              <Link
                href="#features"
                className="text-sm font-medium hover:text-primary"
              >
                Features
              </Link>
              <Link
                href="#how-it-works"
                className="text-sm font-medium hover:text-primary"
              >
                How It Works
              </Link>
              <Link
                href="#pricing"
                className="text-sm font-medium hover:text-primary"
              >
                Pricing
              </Link>
              <Link
                href="#testimonials"
                className="text-sm font-medium hover:text-primary"
              >
                Testimonials
              </Link>
              <Link href="#" className="text-sm font-medium hover:text-primary">
                Sign In
              </Link>
              <Button className="w-full">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1">
        <section className="py-20 md:py-28">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center gap-4 text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Privacy Policy
              </h2>
              <p className="text-xl text-muted-foreground max-w-[800px]">
                Effective Date: [01/03/2025]
              </p>
            </div>

            <div className="prose max-w-2xl mx-auto">
              <h3>1. Information We Collect</h3>
              <p>
                <strong>Account Information:</strong> When you sign up, we
                collect your name, email address, and login credentials.
              </p>
              <p>
                <strong>Financial Data:</strong> To sync your QuickBooks data,
                we access relevant accounting information but do not store it on
                our servers.
              </p>
              <p>
                <strong>Google Sheets Access:</strong> We access and modify your
                Google Sheets only as required for the service.
              </p>
              <p>
                <strong>Usage Data:</strong> We collect metadata such as login
                timestamps and feature usage to improve our service.
              </p>

              <h3>2. How We Use Your Information</h3>
              <p>- To provide and improve our syncing services.</p>
              <p>
                - To communicate updates, security alerts, and support messages.
              </p>
              <p>- To comply with legal obligations.</p>

              <h3>3. Data Security</h3>
              <p>
                We implement encryption and industry-standard security practices
                to protect your data. However, no system is 100% secure, and we
                encourage strong password practices.
              </p>

              <h3>4. Third-Party Services</h3>
              <p>
                We integrate with QuickBooks and Google Sheets. Your use of
                these services is subject to their respective privacy policies.
              </p>

              <h3>5. Your Choices</h3>
              <p>
                You can revoke our access to QuickBooks and Google Sheets at any
                time through their respective account settings.
              </p>

              <h3>6. Contact Us</h3>
              <p>
                For any privacy-related concerns, email us at <Link href={"mailto:nikhilmohan9539@gmail.com"}>nikhilmohan9539@gmail.com</Link>.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t bg-muted/40">
        <div className="container px-4 md:px-6 py-12">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <RefreshCw className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">QBOSyncSheet</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Connecting QuickBooks and Google Sheets for powerful financial
                reporting and analysis.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="font-semibold">Company</h3>
              <nav className="flex flex-col gap-2">
                <Link
                  href="mailto:nikhilmohan9539@gmail.com"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Contact
                </Link>
                <Link
                  href="/privacy-policy"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms-of-service"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Terms of Service
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
