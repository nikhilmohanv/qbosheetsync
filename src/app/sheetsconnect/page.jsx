"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowRight, Check, Copy, FileSpreadsheet } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function SheetConnectPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [sheetId, setSheetId] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };

    fetchUser();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI}&response_type=code&scope=${process.env.NEXT_PUBLIC_GOOGLE_SCOPES}&access_type=offline&prompt=consent&state=${user.id}`;

  // Template link that user will copy
  const templateLink =
    "https://docs.google.com/spreadsheets/d/1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3/copy";

  const handleConnectGoogle = () => {
    setIsConnecting(true);

    // Simulate Google OAuth flow
    setTimeout(() => {
      setIsConnecting(false);
      setIsConnected(true);
    }, 1500);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(templateLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate and save the sheet ID
    if (sheetId.trim()) {
      router.push("/dashboard");
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-none">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">
            Connect Google Sheets
          </CardTitle>
          <CardDescription>
            Connect your Google Sheets to sync your data
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center space-y-4">
            <Button asChild className="w-full">
              <Link href={googleAuthUrl}>
                {isConnecting ? "Connecting..." : "Connect to Google Sheets"}
              </Link>
            </Button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <Alert className="bg-green-50 border-green-200">
              <Check className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-600">
                Google Sheets connected successfully!
              </AlertDescription>
            </Alert>

            <div className="space-y-2">
              <Label>Template Spreadsheet</Label>
              <div className="flex items-center space-x-2">
                <div className="flex-1 flex items-center border rounded-md px-3 py-2 bg-muted text-sm max-w-2xl">
                  <FileSpreadsheet className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="truncate ">{templateLink}</span>
                </div>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={handleCopyLink}
                >
                  {copied ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Click the link to make a copy of the template to your Google
                Drive
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="sheet-id">Your Sheet ID</Label>
              <Input
                id="sheet-id"
                value={sheetId}
                onChange={(e) => setSheetId(e.target.value)}
                placeholder="Enter the ID of your copied spreadsheet"
                required
              />
              <p className="text-sm text-muted-foreground">
                The Sheet ID is found in the URL after /d/ and before /edit
              </p>
            </div>

            <Button type="submit" className="w-full">
              Continue to Dashboard
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>
          {/* )} */}
        </CardContent>
      </Card>
    </div>
  );
}
