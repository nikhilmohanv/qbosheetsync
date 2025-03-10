import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { Search, Bell, Menu } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Loader2 } from "lucide-react";

export function DashboardHeader({ user, createConnection, setName, loading }) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
      <div>
        <h1 className="text-3xl font-bold">QuickBooks to Google Sheets</h1>
        <p className="text-muted-foreground mt-1">
          Manage your data connections
        </p>
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            New Connection
          </Button>
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
                className="col-span-3"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={createConnection} disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="animate-spin mr-2" />
                  Creating...
                </>
              ) : (
                "Create Connection"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
