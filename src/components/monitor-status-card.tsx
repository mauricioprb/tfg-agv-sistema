// components/MonitorStatusCard.tsx
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Icons } from "@/components/icons";
import { MonitorTrack } from "@/components/monitor-track";

interface MonitorStatusCardProps {
  rota: string;
  destino: string;
  chegou: boolean;
}

export function MonitorStatusCard({
  rota,
  destino,
  chegou,
}: MonitorStatusCardProps) {
  return (
    <Card className="w-full h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground flex mb-4">
          <Icons.monitor className="mr-2 h-5 w-5 text-muted-foreground" />
          Monitoramento
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-12">
          <div className="flex justify-center">
            <MonitorTrack rota={rota} chegou={chegou} destino={destino} />
          </div>
        </div>
        <div className="flex gap-6 flex-wrap justify-center">
          <p className="text-muted-foreground text-sm flex items-center">
            <Icons.rfid className="w-6 h-6 mr-2" />
            RFID
          </p>
          <p className="text-muted-foreground text-sm flex items-center">
            <Icons.carga className="w-6 h-6 mr-2" />
            Carga
          </p>
          <p className="text-muted-foreground text-sm flex items-center">
            <Icons.descarga className="w-6 h-6 mr-2" />
            Descarga
          </p>
          <p className="text-muted-foreground text-sm flex items-center">
            <Icons.manutencao className="w-6 h-6 mr-2" />
            Manutenção
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
