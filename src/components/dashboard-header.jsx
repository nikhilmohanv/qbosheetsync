import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Bell, Menu } from "lucide-react";

export function DashboardHeader({ user }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! {user.email}</p>
      </div>

      {/* <div className="flex items-center gap-2">
        <div className="relative md:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-full pl-8"
          />
        </div>

        <Button variant="outline" size="icon">
          <Bell className="h-4 w-4" />
          <span className="sr-only">Notifications</span>
        </Button>

        <Button variant="outline" size="icon" className="md:hidden">
          <Menu className="h-4 w-4" />
          <span className="sr-only">Menu</span>
        </Button>
      </div> */}
    </div>
  );
}
