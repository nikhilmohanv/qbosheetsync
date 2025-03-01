"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle, BarChart3, RefreshCw, Clock, Shield, Menu, X } from "lucide-react"
import { useState } from "react"

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <RefreshCw className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">SyncSheet</span>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm font-medium hover:text-primary">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium hover:text-primary">
              How It Works
            </Link>
            <Link href="#pricing" className="text-sm font-medium hover:text-primary">
              Pricing
            </Link>
            <Link href="#testimonials" className="text-sm font-medium hover:text-primary">
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

          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden container py-4 border-t">
            <nav className="flex flex-col gap-4">
              <Link href="#features" className="text-sm font-medium hover:text-primary">
                Features
              </Link>
              <Link href="#how-it-works" className="text-sm font-medium hover:text-primary">
                How It Works
              </Link>
              <Link href="#pricing" className="text-sm font-medium hover:text-primary">
                Pricing
              </Link>
              <Link href="#testimonials" className="text-sm font-medium hover:text-primary">
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
        {/* Hero Section */}
        <section className="py-20 md:py-28">
          <div className="container px-4 md:px-6">
            <div className="grid gap-12 md:grid-cols-2 md:gap-16 items-center">
              <div className="flex flex-col gap-6">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                  Connect QuickBooks to Google Sheets in minutes
                </h1>
                <p className="text-xl text-muted-foreground">
                  Automatically sync your QuickBooks data with Google Sheets for powerful reporting, analysis, and
                  collaboration.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="w-full sm:w-auto">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Watch Demo
                  </Button>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>No credit card required</span>
                </div>
              </div>
              <div className="relative">
                <div className="relative rounded-lg overflow-hidden border shadow-xl">
                  <Image
                    src="/placeholder.svg?height=600&width=800"
                    width={800}
                    height={600}
                    alt="SyncSheet dashboard showing QuickBooks data in Google Sheets"
                    className="w-full"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-primary/10 w-24 h-24 rounded-full blur-xl"></div>
                <div className="absolute -top-6 -right-6 bg-primary/10 w-32 h-32 rounded-full blur-xl"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Logos Section */}
        <section className="py-12 border-y bg-muted/40">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center gap-4">
              <p className="text-sm text-muted-foreground text-center">Trusted by businesses of all sizes</p>
              <div className="flex flex-wrap justify-center gap-8 md:gap-12 grayscale opacity-70">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Image
                    key={i}
                    src={`/placeholder.svg?height=40&width=120&text=LOGO ${i}`}
                    width={120}
                    height={40}
                    alt={`Company logo ${i}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 md:py-28">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center gap-4 text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Powerful Features for Your Business
              </h2>
              <p className="text-xl text-muted-foreground max-w-[800px]">
                Everything you need to connect QuickBooks and Google Sheets for seamless data management.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col gap-4 p-6 bg-card rounded-lg border shadow-sm">
                <RefreshCw className="h-10 w-10 text-primary" />
                <h3 className="text-xl font-bold">Automatic Syncing</h3>
                <p className="text-muted-foreground">
                  Set up automatic syncing between QuickBooks and Google Sheets on your preferred schedule.
                </p>
              </div>

              <div className="flex flex-col gap-4 p-6 bg-card rounded-lg border shadow-sm">
                <BarChart3 className="h-10 w-10 text-primary" />
                <h3 className="text-xl font-bold">Custom Reports</h3>
                <p className="text-muted-foreground">
                  Create custom reports and dashboards using your QuickBooks data in Google Sheets.
                </p>
              </div>

              <div className="flex flex-col gap-4 p-6 bg-card rounded-lg border shadow-sm">
                <Clock className="h-10 w-10 text-primary" />
                <h3 className="text-xl font-bold">Real-time Updates</h3>
                <p className="text-muted-foreground">
                  Get real-time updates when your QuickBooks data changes with instant syncing.
                </p>
              </div>

              <div className="flex flex-col gap-4 p-6 bg-card rounded-lg border shadow-sm">
                <Shield className="h-10 w-10 text-primary" />
                <h3 className="text-xl font-bold">Secure Connection</h3>
                <p className="text-muted-foreground">
                  Bank-level security ensures your financial data is always protected during syncing.
                </p>
              </div>

              <div className="flex flex-col gap-4 p-6 bg-card rounded-lg border shadow-sm">
                <svg
                  className="h-10 w-10 text-primary"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21 7L13 15L9 11L3 17M21 7H15M21 7V13"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <h3 className="text-xl font-bold">Historical Data</h3>
                <p className="text-muted-foreground">
                  Import and analyze historical QuickBooks data to identify trends and make better decisions.
                </p>
              </div>

              <div className="flex flex-col gap-4 p-6 bg-card rounded-lg border shadow-sm">
                <svg
                  className="h-10 w-10 text-primary"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 12H15M9 16H15M9 8H15M5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <h3 className="text-xl font-bold">Template Library</h3>
                <p className="text-muted-foreground">
                  Access our library of pre-built templates for common financial reports and dashboards.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 md:py-28 bg-muted/40">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center gap-4 text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How SyncSheet Works</h2>
              <p className="text-xl text-muted-foreground max-w-[800px]">
                Connect your accounts and start syncing in just a few minutes.
              </p>
            </div>

            <div className="grid gap-12 md:grid-cols-3">
              <div className="flex flex-col items-center gap-4 text-center">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary font-bold text-xl">
                  1
                </div>
                <h3 className="text-xl font-bold">Connect Your Accounts</h3>
                <p className="text-muted-foreground">
                  Securely connect your QuickBooks account and Google Sheets with our easy setup wizard.
                </p>
              </div>

              <div className="flex flex-col items-center gap-4 text-center">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary font-bold text-xl">
                  2
                </div>
                <h3 className="text-xl font-bold">Select Your Data</h3>
                <p className="text-muted-foreground">
                  Choose which QuickBooks data you want to sync to Google Sheets and how often.
                </p>
              </div>

              <div className="flex flex-col items-center gap-4 text-center">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary font-bold text-xl">
                  3
                </div>
                <h3 className="text-xl font-bold">Analyze & Collaborate</h3>
                <p className="text-muted-foreground">
                  Use Google Sheets to analyze your data, create reports, and collaborate with your team.
                </p>
              </div>
            </div>

            <div className="mt-16 flex justify-center">
              <div className="relative rounded-lg overflow-hidden border shadow-xl max-w-3xl">
                <Image
                  src="/placeholder.svg?height=400&width=800&text=How It Works Demo"
                  width={800}
                  height={400}
                  alt="SyncSheet workflow demonstration"
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20 md:py-28">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center gap-4 text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Simple, Transparent Pricing
              </h2>
              <p className="text-xl text-muted-foreground max-w-[800px]">
                Choose the plan that's right for your business.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <div className="flex flex-col p-6 bg-card rounded-lg border shadow-sm">
                <div className="flex flex-col gap-2 mb-8">
                  <h3 className="text-xl font-bold">Starter</h3>
                  <p className="text-muted-foreground">Perfect for small businesses</p>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">$19</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                </div>

                <ul className="flex flex-col gap-3 mb-8">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Daily sync</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Up to 3 QuickBooks entities</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>5 report templates</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Email support</span>
                  </li>
                </ul>

                <Button variant="outline" className="w-full mt-auto">
                  Get Started
                </Button>
              </div>

              <div className="flex flex-col p-6 bg-card rounded-lg border shadow-sm relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </div>

                <div className="flex flex-col gap-2 mb-8">
                  <h3 className="text-xl font-bold">Professional</h3>
                  <p className="text-muted-foreground">For growing businesses</p>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">$49</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                </div>

                <ul className="flex flex-col gap-3 mb-8">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Hourly sync</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Up to 10 QuickBooks entities</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>20 report templates</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Priority email support</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Custom field mapping</span>
                  </li>
                </ul>

                <Button className="w-full mt-auto">Get Started</Button>
              </div>

              <div className="flex flex-col p-6 bg-card rounded-lg border shadow-sm">
                <div className="flex flex-col gap-2 mb-8">
                  <h3 className="text-xl font-bold">Enterprise</h3>
                  <p className="text-muted-foreground">For larger organizations</p>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">$99</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                </div>

                <ul className="flex flex-col gap-3 mb-8">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Real-time sync</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Unlimited QuickBooks entities</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>All report templates</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Phone & email support</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>API access</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Custom integrations</span>
                  </li>
                </ul>

                <Button variant="outline" className="w-full mt-auto">
                  Contact Sales
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 md:py-28 bg-muted/40">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center gap-4 text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">What Our Customers Say</h2>
              <p className="text-xl text-muted-foreground max-w-[800px]">
                Hear from businesses that have transformed their financial reporting with SyncSheet.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  quote:
                    "SyncSheet has saved our accounting team hours every week. We can now generate custom reports in minutes instead of days.",
                  author: "Sarah Johnson",
                  role: "CFO, TechStart Inc.",
                },
                {
                  quote:
                    "The automatic syncing between QuickBooks and Google Sheets has been a game-changer for our financial analysis.",
                  author: "Michael Chen",
                  role: "Financial Analyst, GrowthCo",
                },
                {
                  quote:
                    "As a small business owner, I needed an affordable way to get better insights from my QuickBooks data. SyncSheet delivered exactly what I needed.",
                  author: "Emma Rodriguez",
                  role: "Owner, Bright Ideas Design",
                },
                {
                  quote:
                    "The template library saved us so much time. We were able to create professional financial dashboards on day one.",
                  author: "David Kim",
                  role: "Accounting Manager, Retail Solutions",
                },
                {
                  quote:
                    "Customer support has been exceptional. Any questions we had were answered quickly and thoroughly.",
                  author: "Lisa Thompson",
                  role: "Bookkeeper, Thompson Consulting",
                },
                {
                  quote:
                    "We've been able to give our investors much more detailed financial reports since implementing SyncSheet.",
                  author: "James Wilson",
                  role: "CEO, Wilson Ventures",
                },
              ].map((testimonial, i) => (
                <div key={i} className="flex flex-col gap-4 p-6 bg-card rounded-lg border shadow-sm">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-muted-foreground italic">"{testimonial.quote}"</p>
                  <div className="mt-auto">
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 md:py-28">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center gap-4 text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-muted-foreground max-w-[800px]">
                Find answers to common questions about SyncSheet.
              </p>
            </div>

            <div className="grid gap-6 max-w-3xl mx-auto">
              {[
                {
                  question: "Is SyncSheet secure?",
                  answer:
                    "Yes, SyncSheet uses bank-level encryption and never stores your QuickBooks credentials. We use OAuth for secure authentication and all data transfers are encrypted.",
                },
                {
                  question: "Which versions of QuickBooks are supported?",
                  answer:
                    "SyncSheet supports QuickBooks Online and QuickBooks Desktop (via QuickBooks Online Accountant). We currently don't support QuickBooks Self-Employed.",
                },
                {
                  question: "How often does the data sync?",
                  answer:
                    "Depending on your plan, data can sync in real-time, hourly, or daily. You can also manually trigger a sync anytime.",
                },
                {
                  question: "Can I customize which data gets synced?",
                  answer:
                    "Yes, you can select exactly which QuickBooks data you want to sync to Google Sheets, including invoices, expenses, profit & loss, balance sheets, and more.",
                },
                {
                  question: "Do I need to be a Google Sheets expert?",
                  answer:
                    "Not at all! Our pre-built templates make it easy to get started, even if you're not familiar with Google Sheets. Of course, if you are a Sheets expert, you can create custom reports too.",
                },
                {
                  question: "Is there a free trial?",
                  answer:
                    "Yes, we offer a 14-day free trial on all plans with no credit card required. You can try all features before deciding which plan is right for you.",
                },
              ].map((faq, i) => (
                <div key={i} className="p-6 bg-card rounded-lg border shadow-sm">
                  <h3 className="text-lg font-bold mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-28 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center gap-6 text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to transform your financial reporting?
              </h2>
              <p className="text-xl opacity-90 max-w-[800px]">
                Join thousands of businesses that use SyncSheet to connect QuickBooks and Google Sheets.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto bg-transparent border-primary-foreground hover:bg-primary-foreground/10"
                >
                  Schedule Demo
                </Button>
              </div>
              <p className="text-sm opacity-80">No credit card required. 14-day free trial.</p>
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
                <span className="text-xl font-bold">SyncSheet</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Connecting QuickBooks and Google Sheets for powerful financial reporting and analysis.
              </p>
              <div className="flex gap-4">
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="font-semibold">Product</h3>
              <nav className="flex flex-col gap-2">
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Features
                </Link>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Pricing
                </Link>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Integrations
                </Link>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Changelog
                </Link>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Roadmap
                </Link>
              </nav>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="font-semibold">Resources</h3>
              <nav className="flex flex-col gap-2">
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Documentation
                </Link>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Help Center
                </Link>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Blog
                </Link>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Tutorials
                </Link>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  API Reference
                </Link>
              </nav>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="font-semibold">Company</h3>
              <nav className="flex flex-col gap-2">
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  About
                </Link>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Careers
                </Link>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Contact
                </Link>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Privacy Policy
                </Link>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Terms of Service
                </Link>
              </nav>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <p className="text-sm text-muted-foreground">
                &copy; {new Date().getFullYear()} SyncSheet. All rights reserved.
              </p>
              <div className="flex gap-4">
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Privacy Policy
                </Link>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Terms of Service
                </Link>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Cookie Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

