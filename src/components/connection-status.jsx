import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertCircle,
  ChevronDown,
  Clock,
  Download,
  FileSpreadsheet,
  Filter,
  MoreHorizontal,
  Plus,
  RefreshCw,
  Search,
  Settings,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
const connections = [
  {
    id: "conn-1",
    name: "Monthly Financial Reports",
    status: "active",
    quickbooksAccount: "Acme Inc.",
    googleSheetsAccount: "finance@acme.com",
    lastSync: "2023-06-15T14:30:00",
  },
  {
    id: "conn-2",
    name: "Quarterly Tax Reports",
    status: "active",
    quickbooksAccount: "Acme Inc.",
    googleSheetsAccount: "finance@acme.com",
    lastSync: "2023-06-14T08:45:00",
  },
  {
    id: "conn-3",
    name: "Expense Tracking",
    status: "error",
    quickbooksAccount: "Acme Inc.",
    googleSheetsAccount: "expenses@acme.com",
    lastSync: "2023-06-10T16:20:00",
  },
  {
    id: "conn-4",
    name: "Sales Dashboard",
    status: "pending",
    quickbooksAccount: "Acme Inc.",
    googleSheetsAccount: "sales@acme.com",
    lastSync: null,
  },
  {
    id: "conn-5",
    name: "Inventory Management",
    status: "active",
    quickbooksAccount: "Acme Inc.",
    googleSheetsAccount: "inventory@acme.com",
    lastSync: "2023-06-15T10:15:00",
    syncFrequency: "Daily",
    sheetsUrl: "https://sheets.google.com/spreadsheets/d/mno345",
    createdAt: "2023-05-18T13:20:00",
  },
];
export function ConnectionStatus({ name, id }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Filter connections based on search query and status filter
  // const filteredConnections = connections.filter((connection) => {
  //   const matchesSearch =
  //     connection.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     connection.quickbooksAccount
  //       .toLowerCase()
  //       .includes(searchQuery.toLowerCase()) ||
  //     connection.googleSheetsAccount
  //       .toLowerCase()
  //       .includes(searchQuery.toLowerCase());

  //   const matchesStatus =
  //     statusFilter === "all" || connection.status === statusFilter;

  //   return matchesSearch && matchesStatus;
  // });

  // Format date to readable string
  const formatDate = (dateString) => {
    if (!dateString) return "Never";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

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

  return (
    // // <Tabs defaultValue="all" className="mb-8">
    //   {/* <div className="">
    //     <TabsList>
    //       <TabsTrigger value="all">All Connections</TabsTrigger>
    //       <TabsTrigger value="active">Active</TabsTrigger>
    //       <TabsTrigger value="pending">Pending</TabsTrigger>
    //       <TabsTrigger value="error">Errors</TabsTrigger>
    //     </TabsList>

    //     <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
    //       <div className="relative w-full sm:w-64">
    //         <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
    //         <Input
    //           placeholder="Search connections..."
    //           className="pl-8"
    //           value={searchQuery}
    //           onChange={(e) => setSearchQuery(e.target.value)}
    //         />
    //       </div>

    //       <DropdownMenu>
    //         <DropdownMenuTrigger asChild>
    //           <Button variant="outline" className="gap-2">
    //             <Filter className="w-4 h-4" />
    //             Filter
    //             <ChevronDown className="w-4 h-4" />
    //           </Button>
    //         </DropdownMenuTrigger>
    //         <DropdownMenuContent align="end" className="w-56">
    //           <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
    //           <DropdownMenuSeparator />
    //           <DropdownMenuItem onClick={() => setStatusFilter("all")}>
    //             All
    //           </DropdownMenuItem>
    //           <DropdownMenuItem onClick={() => setStatusFilter("active")}>
    //             Active
    //           </DropdownMenuItem>
    //           <DropdownMenuItem onClick={() => setStatusFilter("pending")}>
    //             Pending
    //           </DropdownMenuItem>
    //           <DropdownMenuItem onClick={() => setStatusFilter("error")}>
    //             Error
    //           </DropdownMenuItem>
    //         </DropdownMenuContent>
    //       </DropdownMenu>
    //     </div>
    //   </div> */}

      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-lg">{name}</h3>
                <p className="text-sm text-muted-foreground">ID: {id}</p>
              </div>
              {getStatusBadge("connection.status")}
            </div>

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
                  <p className="text-xs text-muted-foreground">
                    {/* {connection.lastSync
                      ? formatDate(connection.lastSync) */}
                    {/* : " */}
                    Never synced
                    {/* "} */}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-muted p-4 flex justify-between items-center">
            <div className="text-xs text-muted-foreground">
              Created
              {/* {formatDate(connection.createdAt)} */}
            </div>
            <div className="flex gap-2">
              {/* {connection.status === "active" && ( */}
              <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                <RefreshCw className="h-4 w-4" />
                <span className="sr-only">Sync Now</span>
              </Button>
              {/* )} */}
              {/* <Link href={connection.sheetsUrl} target="_blank">
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <FileSpreadsheet className="h-4 w-4" />
                        <span className="sr-only">View Sheet</span>
                      </Button>
                    </Link> */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">More</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Edit Connection</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Download className="mr-2 h-4 w-4" />
                    <span>Export Data</span>
                  </DropdownMenuItem>
                  {/* {connection.status === "error" && ( */}
                  <DropdownMenuItem>
                    <AlertCircle className="mr-2 h-4 w-4" />
                    <span>View Error Details</span>
                  </DropdownMenuItem>
                  {/* )} */}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600">
                    <Trash2 className="mr-2 h-4 w-4" />
                    <span>Delete Connection</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardContent>
      </Card>
    // </Tabs>
  );
}
