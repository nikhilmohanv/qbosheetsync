import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileSpreadsheet, RefreshCw } from "lucide-react"

export function ConnectionStatus() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle>QuickBooks Connection</CardTitle>
            <CardDescription>Status of your QuickBooks integration</CardDescription>
          </div>
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Connected
          </Badge>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-sm">
              <div className="flex justify-between py-1">
                <span className="text-muted-foreground">Last synced</span>
                <span>Today, 2:30 PM</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-muted-foreground">Company</span>
                <span>Acme Inc.</span>
              </div>
            </div>
            <Button variant="outline" size="sm" className="w-full">
              <RefreshCw className="mr-2 h-4 w-4" />
              Sync Now
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle>Google Sheets Connection</CardTitle>
            <CardDescription>Status of your Google Sheets integration</CardDescription>
          </div>
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Connected
          </Badge>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-sm">
              <div className="flex justify-between py-1">
                <span className="text-muted-foreground">Sheet name</span>
                <span>Financial Dashboard</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-muted-foreground">Last updated</span>
                <span>Today, 2:35 PM</span>
              </div>
            </div>
            <Button variant="outline" size="sm" className="w-full">
              <FileSpreadsheet className="mr-2 h-4 w-4" />
              View Sheet
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

