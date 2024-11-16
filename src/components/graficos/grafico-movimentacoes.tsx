"use client";

import { PieGraph } from "@/sections/dashboard/pie-graph";
import { trpc } from "@/server/client";

export function GraficoMovimentacoes() {
  const { data: transportesPorRota = [] } =
    trpc.transporte.listarTransportesPorRota.useQuery(undefined, {
      refetchInterval: 10000,
    });

  const chartData = transportesPorRota.map((item) => ({
    area: item.rota,
    value: item.count,
    fill: getColorForRota(item.rota),
  }));

  function getColorForRota(rota: string) {
    switch (rota) {
      case "Descarga A":
        return "var(--color-descargaA)";
      case "Descarga B":
        return "var(--color-descargaB)";
      case "Manutenção":
        return "var(--color-manutencao)";
      default:
        return "var(--color-default)";
    }
  }

  return <PieGraph chartData={chartData} />;
}
