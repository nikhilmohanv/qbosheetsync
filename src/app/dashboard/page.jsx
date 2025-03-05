"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardCards } from "@/components/dashboard-cards";
import { ConnectionStatus } from "@/components/connection-status";
import { DashboardHeader } from "@/components/dashboard-header";

// app/dashboard/page.js
export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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
  const quickbooksAuthUrl = `${process.env.NEXT_PUBLIC_QUICKBOOKS_AUTH_URL}?client_id=${process.env.NEXT_PUBLIC_QUICKBOOKS_CLIENT_ID}&response_type=code&scope=${process.env.NEXT_PUBLIC_QUICKBOOKS_SCOPE}&redirect_uri=${process.env.NEXT_PUBLIC_QUICKBOOKS_REDIRECT_URI}&state=${user.id}`;
  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI}&response_type=code&scope=${process.env.NEXT_PUBLIC_GOOGLE_SCOPES}&access_type=offline&prompt=consent`;

  return (
    <div className="flex min-h-screen bg-background">
      {/* <DashboardSidebar /> */}
      <div className="flex-1">
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
          <DashboardHeader user={user} />

          <ConnectionStatus />
          {/* <DashboardCards /> */}
          {/* <RecentActivity /> */}

        
        </div>
      </div>
    </div>
  );
}
