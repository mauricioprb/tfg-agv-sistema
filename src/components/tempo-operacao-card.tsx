"use client";

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Icons } from "@/components/icons";

interface TempoOperacaoCardProps {
  tempoOperacao: number;
}

export function TempoOperacaoCard({ tempoOperacao }: TempoOperacaoCardProps) {
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, "0")}h : ${String(minutes).padStart(2, "0")}min : ${String(secs).padStart(2, "0")}s`;
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          Tempo em operação
        </CardTitle>
        <Icons.timer className="text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{formatTime(tempoOperacao)}</div>
      </CardContent>
    </Card>
  );
}
