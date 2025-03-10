import { Card, CardContent } from "@/components/ui/card";
import {
  Clock,
  FileSpreadsheet,
  MoreHorizontal,
  RefreshCw,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Toaster } from "sonner";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
const connections = [
  {
    id: "conn-1",
    name: "Monthly Financial Reports",
    status: "active",
    quickbooksAccount: "Acme Inc.",
    googleSheetsAccount: "finance@acme.com",
    lastSync: "2023-06-15T14:30:00",
  },
];
export function ConnectionStatus({ data }) {
  const [connectionDeleting, setConnectionDeleting] = useState(false); //loading state to store connection deletion state
  let onboardingCompleted = false;
  const router = useRouter();
  if (
    data.spreadsheet_id != null &&
    data.gsheets_connection_complete &&
    data.qbo_connection_complete
  ) {
    onboardingCompleted = true;
  }
  // Get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500">Pending</Badge>;
      case "error":
        return <Badge className="bg-red-500">Error</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const deleteConnection = async () => {
    setConnectionDeleting(true);
    try {
      const { data: responseData, error } = await supabase
        .from("QBO Sheet Connect")
        .delete()
        .eq("id", data.id);

      if (error) {
        throw error; // Handle the error
      }

      console.log("Connection deleted successfully:", responseData);
      toast.success("Connection deleted successfully"); // Notify the user
      location.reload();
    } catch (error) {
      console.log("Error deleting connection:", error);
      toast.error("Failed to delete connection"); // Notify the user of the error
    } finally {
      setConnectionDeleting(false);
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-semibold text-lg">{data.name}</h3>
              <p className="text-sm text-muted-foreground">ID: {data.id}</p>
            </div>
            {/* {getStatusBadge("connection.status")} */}
          </div>

          {onboardingCompleted ? (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-blue-600"
                  >
                    <path d="M21 8v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5Z"></path>
                    <path d="m9 15 3-3 3 3"></path>
                    <path d="M12 12v9"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium">QuickBooks</p>
                  <p className="text-xs text-muted-foreground">
                    {"connection.quickbooksAccount"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <FileSpreadsheet className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Google Sheets</p>
                  <p className="text-xs text-muted-foreground">
                    {"connection.googleSheetsAccount"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                  <Clock className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Last Synced</p>
                  <p className="text-xs text-muted-foreground"></p>
                </div>
              </div>
            </div>
          ) : (
            <Button asChild>
              <Link href={`/onboarding/${data.id}`}>Complete Onboarding</Link>
            </Button>
          )}
        </div>

        <div className="bg-muted p-4 flex justify-between items-center">
          <div className="text-xs text-muted-foreground">
            Created at {format(new Date(data.created_at), "MMMM d, yyyy")}
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
              <RefreshCw className="h-4 w-4" />
              <span className="sr-only">Sync Now</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">More</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  className="text-red-600"
                  onClick={deleteConnection}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  <span>Delete Connection</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>
      <Toaster />
    </Card>
  );
}
