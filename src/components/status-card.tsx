import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Icons } from "@/components/icons";
import React, { useRef, useEffect } from "react";
import { trpc } from "@/server/client";

interface StatusCardProps {
  status: string;
}

export function StatusCard({ status }: StatusCardProps) {
  const salvarStatus = trpc.agv.salvarStatus.useMutation();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const latestStatus = useRef(status);

  useEffect(() => {
    latestStatus.current = status;
  }, [status]);

  useEffect(() => {
    const handleSaveStatus = async () => {
      try {
        await salvarStatus.mutateAsync({ status: latestStatus.current });
        console.log("Status salvo com sucesso!");
      } catch (error) {
        console.error("Erro ao salvar o status:", error);
      }
    };

    intervalRef.current = setInterval(handleSaveStatus, 30000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [salvarStatus]);

  const getBadgeVariant = () => {
    switch (status) {
      case "Em operação":
        return "success";
      case "Ligado":
        return "default";
      case "Desligado":
        return "destructive";
      case "Em manutenção":
        return "warning";
      default:
        return "default";
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          Status do AGV
        </CardTitle>
        <Icons.operacao className="text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <Badge variant={getBadgeVariant()} className="rounded-full px-4">
          <div className="text-xl font-bold">{status}</div>
        </Badge>
      </CardContent>
    </Card>
  );
}
