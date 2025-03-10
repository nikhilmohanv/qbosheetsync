"use client";

import { useEffect, useState } from "react";
import {
  Check,
  ChevronRight,
  Copy,
  FileSpreadsheet,
  RefreshCw,
} from "lucide-react";
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
import { useUser } from "@/context/UserContext";
import { redirect, useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Clipboard } from "lucide-react";
import { toast } from "sonner";
import { DashboardHeader } from "@/components/dashboard-header";
import Link from "next/link";

export default function ConnectPage() {
  const { user, loading } = useUser();
  const router = useRouter();
  const { id } = useParams();

  const [currentStep, setCurrentStep] = useState(1);
  const [copied, setCopied] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState({
    isQboConnected: false,
    isGSheetsConnected: false,
    isLoading: true,
    error: null,
  });
  const [templateId, setTemplateId] = useState("");
  const [templateLink, setTemplateLink] = useState(
    "https://connect.example.com/qb-sheets/12345"
  );

  // Define auth URLs
  const quickbooksAuthUrl = `${process.env.NEXT_PUBLIC_QUICKBOOKS_AUTH_URL}?client_id=${process.env.NEXT_PUBLIC_QUICKBOOKS_CLIENT_ID}&response_type=code&scope=${process.env.NEXT_PUBLIC_QUICKBOOKS_SCOPE}&redirect_uri=${process.env.NEXT_PUBLIC_QUICKBOOKS_REDIRECT_URI}&state=${id}`;
  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI}&response_type=code&scope=${process.env.NEXT_PUBLIC_GOOGLE_SCOPES}&access_type=offline&prompt=consent&state=${id}`;

  useEffect(() => {
    const fetchConnectionStatus = async () => {
      if (!id) return;

      try {
        const { data, error } = await supabase
          .from("QBO Sheet Connect")
          .select(
            "id, qbo_connection_complete, gsheets_connection_complete, sheets_token_id,spreadsheet_id"
          )
          .eq("id", id)
          .single();

        if (error) {
          console.error("Error fetching connection status:", error);
          setConnectionStatus((prev) => ({
            ...prev,
            isLoading: false,
            error: error.message,
          }));
          return;
        }
        if (data.spreadsheet_id != null) {
          setTemplateId(data.spreadsheet_id);
        }
        // Check if sheets connection is complete and has a token ID
        // if (data.gsheets_connection_complete && data.sheets_token_id) {
        //   const { data: sheetData, error: sheetError } = await supabase
        //     .from("sheetstoken")
        //     .select("spreadsheet_id")
        //     .eq("id", data.sheets_token_id)
        //     .single();

        //   if (!sheetError && sheetData && sheetData.spreadsheet_id) {
        //     setTemplateLink(sheetData.spreadsheet_id);
        //   }
        // }

        // Update connection status state
        setConnectionStatus({
          isQboConnected: data.qbo_connection_complete || false,
          isGSheetsConnected: data.gsheets_connection_complete || false,
          isLoading: false,
          error: null,
        });

        // Determine current step based on connection status
        let step = 1;
        if (data.qbo_connection_complete && data.gsheets_connection_complete) {
          step = 3; // Both connected
        } else if (data.qbo_connection_complete) {
          step = 2; // QBO connected, Sheets not connected
        } else if (data.gsheets_connection_complete) {
          step = 2; // Sheets connected, QBO not connected
        }

        setCurrentStep(step);
      } catch (error) {
        console.error("Failed to fetch connection status:", error);
        setConnectionStatus((prev) => ({
          ...prev,
          isLoading: false,
          error: error.message,
        }));
      }
    };

    fetchConnectionStatus();
  }, [id]);

  const handleQuickbooksConnect = () => {
    router.push(quickbooksAuthUrl);
  };

  const handleGoogleSheetsConnect = () => {
    router.push(googleAuthUrl); // Use actual Google auth URL
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(templateLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const saveTemplateId = async () => {
    try {
      const { data, error } = await supabase.from("QBO Sheet Connect").update({
        spreadsheet_id: templateId,
      }).eq("id",id)

      if (error) {
        throw error; // Handle the error
      }
      toast("Template ID saved successfully");
      console.log("Template ID saved successfully:", data);
      // Optionally, you can update the UI or show a success message here
    } catch (error) {
      console.error("Error saving Template ID:", error);
      toast("Error");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container max-w-3xl py-10 px-4 mx-auto">
      <Link href="/dashboard" className="hover:underline text-center">
        Go to dashboard
      </Link>
      <h1 className="text-3xl font-bold text-center mt-9 mb-8">
        Connect QuickBooks to Google Sheets
      </h1>

      {/* Progress Steps */}
      <div className="flex justify-between mb-8 relative">
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 z-0"></div>

        {[1, 2, 3].map((step) => (
          <div key={step} className="relative z-10 flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                step < currentStep
                  ? "bg-green-600 border-green-600 text-white"
                  : step === currentStep
                  ? "bg-primary border-primary text-white"
                  : "bg-white border-gray-300 text-gray-400"
              }`}
            >
              {step < currentStep ? <Check className="w-5 h-5" /> : step}
            </div>
            <span className="mt-2 text-sm font-medium">
              {step === 1
                ? "QuickBooks"
                : step === 2
                ? "Google Sheets"
                : "Get Link"}
            </span>
          </div>
        ))}
      </div>

      {/* Step Content */}
      <Card className="w-full">
        {currentStep === 1 && (
          <>
            <CardHeader>
              <CardTitle>Step 1: Connect with QuickBooks</CardTitle>
              <CardDescription>
                Link your QuickBooks account to enable data synchronization
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-center p-6 border-2 border-dashed rounded-lg">
                <div className="text-center">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary"
                    >
                      <path d="M21 8v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5Z"></path>
                      <path d="m9 15 3-3 3 3"></path>
                      <path d="M12 12v9"></path>
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium mb-2">
                    Connect your QuickBooks account
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    We'll securely access your QuickBooks data for syncing
                  </p>
                  <Button
                    onClick={handleQuickbooksConnect}
                    disabled={connectionStatus.isQboConnected}
                    className="gap-2"
                  >
                    {connectionStatus.isQboConnected ? (
                      <>
                        <Check className="w-4 h-4" />
                        Connected
                      </>
                    ) : (
                      <>Connect QuickBooks</>
                    )}
                  </Button>
                </div>
              </div>
              {connectionStatus.isQboConnected && (
                <div className="p-3 bg-green-50 text-green-700 rounded-md text-sm flex items-center">
                  <Check className="w-4 h-4 mr-2" />
                  Successfully connected to QuickBooks
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <div></div>
              <Button
                onClick={nextStep}
                disabled={!connectionStatus.isQboConnected}
                className="gap-2"
              >
                Next Step <ChevronRight className="w-4 h-4" />
              </Button>
            </CardFooter>
          </>
        )}

        {currentStep === 2 && (
          <>
            <CardHeader>
              <CardTitle>Step 2: Connect with Google Sheets</CardTitle>
              <CardDescription>
                Link your Google Sheets account to enable data export
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-center p-6 border-2 border-dashed rounded-lg">
                <div className="text-center">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                    <FileSpreadsheet className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">
                    Connect your Google Sheets
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    We'll create and manage spreadsheets for your QuickBooks
                    data
                  </p>
                  <Button
                    onClick={handleGoogleSheetsConnect}
                    disabled={connectionStatus.isGSheetsConnected}
                    className="gap-2"
                  >
                    {connectionStatus.isGSheetsConnected ? (
                      <>
                        <Check className="w-4 h-4" />
                        Connected
                      </>
                    ) : (
                      <>Connect Google Sheets</>
                    )}
                  </Button>
                </div>
              </div>
              {connectionStatus.isGSheetsConnected && (
                <div className="p-3 bg-green-50 text-green-700 rounded-md text-sm flex items-center">
                  <Check className="w-4 h-4 mr-2" />
                  Successfully connected to Google Sheets
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={prevStep}>
                Back
              </Button>
              <Button
                onClick={nextStep}
                disabled={!connectionStatus.isGSheetsConnected}
                className="gap-2"
              >
                Next Step <ChevronRight className="w-4 h-4" />
              </Button>
            </CardFooter>
          </>
        )}

        {currentStep === 3 && (
          <>
            <CardHeader>
              <CardTitle>Step 3: Get Your template Link</CardTitle>
              {/* <CardDescription>
                Copy the below link to duplicate given template and duplicate
                this template. Them paste the duplicated sheets id below.
              </CardDescription> */}
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-6 border-2 border-dashed rounded-lg">
                <div className="text-center mb-6">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-green-100 mb-4">
                    <Check className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Setup Complete!</h3>
                  <p className="text-sm text-muted-foreground">
                    Your QuickBooks and Google Sheets are connected
                  </p>
                </div>

                <div className="relative">
                  <Input value={templateLink} readOnly className="pr-12" />
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute right-1 top-1 h-8"
                    onClick={copyToClipboard}
                  >
                    {copied ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
                {/* <p className="text-sm text-muted-foreground mt-2">
                  Use this link to access your integration dashboard
                </p> */}

                <div className="p-4 mt-4 bg-blue-50 text-blue-700 rounded-md text-sm">
                  <h4 className="font-medium mb-1">What's next?</h4>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Copy the above link</li>
                    <li>Duplicate the template</li>
                    <li>Paste the duplicated google sheets id below</li>
                  </ul>
                </div>
              </div>

              {/* New Section for Template ID Input */}
              <div className="p-6 border-2 border-dashed rounded-lg">
                <div className="text-center mb-6">
                  <h3 className="text-lg font-medium mb-2">
                    Paste Your Template ID
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    After making a copy of the template, paste the Template ID
                    here
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Input
                    value={templateId}
                    onChange={(e) => setTemplateId(e.target.value)}
                    placeholder="Enter Template ID"
                    className="flex-1"
                  />

                  <Button size="sm" onClick={saveTemplateId}>
                    Save
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Paste the Template ID from your copied Google Sheet
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={prevStep}>
                Back
              </Button>
              {/* <Button
    variant="default"
    className="gap-2"
    onClick={() => window.location.reload()}
  >
    <RefreshCw className="w-4 h-4" />
    Start Over
  </Button> */}
            </CardFooter>
          </>
        )}
      </Card>
    </div>
  );
}
