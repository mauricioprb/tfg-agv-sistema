"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Icons } from "@/components/icons";
import { trpc } from "@/server/client";

interface TempoOperacaoCardProps {
  tempoIniciado: boolean;
}

export function TempoOperacaoCard({ tempoIniciado }: TempoOperacaoCardProps) {
  const [tempo, setTempo] = useState(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  trpc.agv.getTempoOperacao.useQuery(undefined, {
    onSuccess: (data: number) => {
      setTempo(data);
    },
  });

  const updateTempo = trpc.agv.updateTempoOperacao.useMutation();

  useEffect(() => {
    if (tempoIniciado && !intervalId) {
      const id = setInterval(() => {
        setTempo((prevTempo) => {
          const newTempo = prevTempo + 1;
          updateTempo.mutate({ novoTempo: newTempo });
          return newTempo;
        });
      }, 1000);
      setIntervalId(id);
    } else if (!tempoIniciado && intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
        setIntervalId(null);
      }
    };
  }, [tempoIniciado, intervalId, updateTempo]);

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
        <div className="text-2xl font-bold">{formatTime(tempo)}</div>
      </CardContent>
    </Card>
  );
}
