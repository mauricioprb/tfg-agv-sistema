import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Icons } from "@/components/icons";

interface TransporteStatusCardProps {
  carga?: string;
  destino?: string;
}

export function TransporteStatusCard({
  carga,
  destino,
}: TransporteStatusCardProps) {
  const displayContent =
    carga && destino ? (
      <>
        <h2 className="text-2xl font-bold">{carga}</h2>
        <Icons.arrowRight />
        <h2 className="text-2xl font-bold">{destino}</h2>
      </>
    ) : (
      <h2 className="text-2xl font-bold">Não definido</h2>
    );

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground flex mb-4">
          <Icons.split className="mr-2 h-5 w-5 text-muted-foreground" />
          Transportando
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col md:flex-row gap-4 md:gap-6 flex-wrap justify-center">
        <p className="text-muted-foreground text-sm mb-2">Carga / Destino</p>
        <div className="flex items-center gap-5">{displayContent}</div>
      </CardContent>
    </Card>
  );
}
