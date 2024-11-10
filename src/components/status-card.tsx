// components/StatusCard.tsx
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Icons } from "@/components/icons";

export function StatusCard() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          Status do AGV
        </CardTitle>
        <Icons.operacao className="text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <Badge variant="success" className="rounded-full px-4">
          <div className="text-xl font-bold">Em operação</div>
        </Badge>
      </CardContent>
    </Card>
  );
}
