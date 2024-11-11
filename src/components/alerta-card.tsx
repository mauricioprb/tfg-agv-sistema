import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

export function AlertaCard() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          Alertas
        </CardTitle>
        <Icons.alerta className="text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">0</div>
        <Button variant="link" className="p-0 text-foreground">
          Ver detalhes
          <Icons.arrowRight className="ml-2" />
        </Button>
      </CardContent>
    </Card>
  );
}
