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

// app/dashboard/page.js
export default function Dashboard() {
  const { user, loading } = useUser();
  const router = useRouter();

  const [name, setName] = useState("");
  const [connections, setConnections] = useState([]); //to store all the connections user made

  useEffect(() => {
    async function fetchConnections() {
      if (!user) return;

      const { data, error } = await supabase
        .from("QBO Sheet Connect")
        .select("id, name")
        .eq("user_id", user.id);

      if (error) {
        console.error("Error fetching connections:", error);
        return;
      }

      setConnections(data);
    }

    fetchConnections();
  }, [user]);

  if (loading) return <p>Loading...</p>;

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
      ])
      .select("id");

    if (connectError) {
      console.error("QBO Sheet Connect insert error:", connectError);
    } else {
      console.log("Connection created:", connectData);
      router.push(`/edit-connection/${connectData[0].id}`);
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      {/* <DashboardSidebar /> */}

      <DashboardHeader
        user={user}
        setName={setName}
        createConnection={createConnection}
      />
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {connections.length === 0 ? (
            <p>No connections found</p>
          ) : (
            <ul>
              {connections.map((conn) => (
                <Link href={`/edit-connection/${conn.id}`} key={conn.id}>
                  <ConnectionStatus
                    name={conn.name}
                    id={conn.id}
                   
                  />
                </Link>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
