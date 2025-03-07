import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileSpreadsheet, RefreshCw } from "lucide-react";
import Link from "next/link";

export function ConnectionStatus({ name, id }) {
  return (
    <Link href={`/edit-connection/${id}`}>
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle className={"flex gap-3"}>
              {name}
              <div className="flex flex-row items-center justify-between  pb-2">
                <Badge
                  variant="outline"
                  className="bg-green-50 text-green-700 border-green-200"
                >
                  Connected
                </Badge>
              </div>
            </CardTitle>
            <CardDescription>edit connection .</CardDescription>
          </CardHeader>
          <CardContent></CardContent>
        </Card>
      </div>
    </Link>
  );
}
