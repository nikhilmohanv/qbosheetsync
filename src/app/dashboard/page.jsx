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
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

// app/dashboard/page.js
export default function Dashboard() {
  const { user, loading } = useUser();
  const router = useRouter();

  const [name, setName] = useState("");

  const [connections, setConnections] = useState([]); //to store all the connections user made
  const [fetchingConnection, setFetchingConnetion] = useState(false); //store connection fetching state
  const [createConnectionLoading, setCreateConnectionLoading] = useState(false); //used to store button loading state of create connection button

  useEffect(() => {
    async function fetchConnections() {
      if (!user) return;
      setFetchingConnetion(true);

      const { data, error } = await supabase
        .from("QBO Sheet Connect")
        .select(
          "id, name,qbo_connection_complete,gsheets_connection_complete,spreadsheet_id,created_at"
        )
        .eq("user_id", user.id);

      if (error) {
        console.error("Error fetching connections:", error);
        return;
      }
      const sortedData = data.sort((a, b) => b.id - a.id);

      setConnections(sortedData);
      setFetchingConnetion(false);
    }

    fetchConnections();
  }, [user]);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user, router]);

  if (loading) return <p>Loading...</p>;
  if (!loading && !user) return null; // Don't render anything else while redirecting

  // handle creation of new connection
  async function createConnection(e) {
    e.preventDefault();
    setCreateConnectionLoading(true);
    let qboData, sheetData, connectData;

    try {
      // Validate inputs
      if (!user) {
        throw new Error("User ID or name is missing.");
      }
      if (name === "") {
        throw new Error("Name is empty");
      }

      // Step 1: Insert into qbotokens
      const { data: qboInsertData, error: qboError } = await supabase
        .from("qbotokens")
        .insert([{ user_id: user.id }])
        .select("id");

      if (qboError) {
        throw new Error(`QuickBooks insert error: ${qboError.message}`);
      }
      qboData = qboInsertData[0];

      // Step 2: Insert into sheetstoken
      const { data: sheetInsertData, error: sheetError } = await supabase
        .from("sheetstoken")
        .insert([{ user_id: user.id }])
        .select("id");

      if (sheetError) {
        throw new Error(`Google Sheets insert error: ${sheetError.message}`);
      }
      sheetData = sheetInsertData[0];

      // Step 3: Insert into QBO Sheet Connect
      const { data: connectInsertData, error: connectError } = await supabase
        .from("QBO Sheet Connect")
        .insert([
          {
            user_id: user.id,
            name: name,
            quickbook_token_id: qboData.id,
            sheets_token_id: sheetData.id,
          },
        ])
        .select("id");

      if (connectError) {
        throw new Error(
          `QBO Sheet Connect insert error: ${connectError.message}`
        );
      }
      connectData = connectInsertData[0];

      // Step 4: Update sheettokens with connection_id
      const { error: sheetConnectionError } = await supabase
        .from("sheetstoken")
        .update({ connection_id: connectData.id })
        .eq("id", sheetData.id);

      if (sheetConnectionError) {
        throw new Error(
          `SheetTokens update error: ${sheetConnectionError.message}`
        );
      }

      // Step 5: Update qbotokens with connection_id
      const { error: qboConnectionError } = await supabase
        .from("qbotokens")
        .update({ connection_id: connectData.id })
        .eq("id", qboData.id);

      if (qboConnectionError) {
        throw new Error(
          `QBOTokens update error: ${qboConnectionError.message}`
        );
      }
      toast.success(
        "Connection created successfully! Please complete onboarding now"
      );
      // Success
      console.log("Connection created:", connectData);
      router.push(`/onboarding/${connectData.id}`);
    } catch (error) {
      console.error("Error in createConnection:", error);

      // Rollback: Clean up partially created data. as i made cascade in supabse db, the data at other tables will also deleted.

      if (connectData) {
        await supabase
          .from("QBO Sheet Connect")
          .delete()
          .eq("id", connectData.id);
      }

      // Notify the user
      toast.error("Failed to create connection. Please try again.");
    } finally {
      setCreateConnectionLoading(false);
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">QuickBooks to Google Sheets</h1>
          <p className="text-muted-foreground mt-1">
            Manage your data connections
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4" />
              New Connection
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <form onSubmit={createConnection}>
              <DialogHeader>
                <DialogTitle>New Connection</DialogTitle>
                {/* <DialogDescription>
                Make changes to your profile here. Click save when you're done.
              </DialogDescription> */}
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    className="col-span-3"
                    required
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  className="gap-2"
                  type="submit"
                  // onClick={createConnection}
                  disabled={createConnectionLoading}
                >
                  {createConnectionLoading ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <Plus className="w-4 h-4" />
                  )}
                  New Connection
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Connections Grid */}
      <div className="grid gap-5 md:grid-cols-3 lg:grid-cols-4">
        {fetchingConnection ? (
          <Loader2 className="animate-spin" /> // Show loader while fetching
        ) : connections.length === 0 ? (
          <div className="text-center py-12 col-span-full">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-muted mb-4">
              <Search className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium">No connections found</h3>
          </div>
        ) : (
          connections.map((conn) => (
            <ConnectionStatus data={conn} key={conn.id} /> // Render connections
          ))
        )}
      </div>
    </div>
  );
}
