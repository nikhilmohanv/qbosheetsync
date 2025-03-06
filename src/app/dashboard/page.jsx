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
import { Input } from "@/components/ui/input";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Search } from "lucide-react";
import { Plus } from "lucide-react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Label } from "@/components/ui/label";

// app/dashboard/page.js
export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  // fetch user
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

  useEffect(() => {
    if (user) {
      const { connections, connectionsError } = supabase
        .from("QBO Sheet Connect")
        .select(id, name)
        .eq(user_id, user.id);
    }
    
  }, [user]);
  // show loading screen
  if (loading) {
    return <p>Loading...</p>;
  }

  // handle creation of new connection
  async function createConnection() {
    const { data: qboData, error: qboError } = await supabase
      .from("qbotokens")
      .insert([{ user_id: user.id }])
      .select();

    if (qboError) {
      console.error("QuickBooks insert error:", qboError);
      return;
    }

    const { data: sheetData, error: sheetError } = await supabase
      .from("sheetstoken")
      .insert([{ user_id: user.id }])
      .select();

    if (sheetError) {
      console.error("Google Sheets insert error:", sheetError);
      return;
    }

    // Now, insert into "QBO Sheet Connect" using the inserted IDs
    const { data: connectData, error: connectError } = await supabase
      .from("QBO Sheet Connect")
      .insert([
        {
          user_id: user.id,
          name: name,
          quickbook_token_id: qboData[0].id, // Get inserted ID from first insert
          sheets_token_id: sheetData[0].id,
        },
      ]);

    if (connectError) {
      console.error("QBO Sheet Connect insert error:", connectError);
    } else {
      console.log("Connection created:", connectData);
    }
  }

  const quickbooksAuthUrl = `${process.env.NEXT_PUBLIC_QUICKBOOKS_AUTH_URL}?client_id=${process.env.NEXT_PUBLIC_QUICKBOOKS_CLIENT_ID}&response_type=code&scope=${process.env.NEXT_PUBLIC_QUICKBOOKS_SCOPE}&redirect_uri=${process.env.NEXT_PUBLIC_QUICKBOOKS_REDIRECT_URI}&state=${user.id}`;
  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI}&response_type=code&scope=${process.env.NEXT_PUBLIC_GOOGLE_SCOPES}&access_type=offline&prompt=consent`;

  return (
    <div className="flex min-h-screen bg-background">
      {/* <DashboardSidebar /> */}
      <div className="flex-1">
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
          <DashboardHeader user={user} />
          <div className="flex items-center gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Add new Connection</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add Connection</DialogTitle>
                  <DialogDescription>Add a name here</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="name"
                      defaultValue="Pedro Duarte"
                      className="col-span-3"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={createConnection}>Save changes</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* <ConnectionStatus /> */}
        </div>
      </div>
    </div>
  );
}
