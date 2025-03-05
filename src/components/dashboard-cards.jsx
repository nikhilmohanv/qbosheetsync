import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpRight, ArrowDownRight, DollarSign, CreditCard, Wallet } from "lucide-react"

export function DashboardCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$45,231.89</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-green-500 inline-flex items-center">
              +20.1% <ArrowUpRight className="ml-1 h-3 w-3" />
            </span>{" "}
            from last month
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Expenses</CardTitle>
          <CreditCard className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$12,234.50</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-red-500 inline-flex items-center">
              +4.3% <ArrowUpRight className="ml-1 h-3 w-3" />
            </span>{" "}
            from last month
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Profit</CardTitle>
          <Wallet className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$32,997.39</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-green-500 inline-flex items-center">
              +10.2% <ArrowUpRight className="ml-1 h-3 w-3" />
            </span>{" "}
            from last month
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Outstanding</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$8,320.50</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-red-500 inline-flex items-center">
              -3.2% <ArrowDownRight className="ml-1 h-3 w-3" />
            </span>{" "}
            from last month
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

