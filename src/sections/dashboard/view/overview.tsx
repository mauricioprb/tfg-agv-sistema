"use client";

import { useEffect, useState } from "react";
import PageContainer from "@/components/layout/page-container";
import { getFormattedDate } from "@/lib/dateUtils";
import { Header } from "../header";
import { GraficoMovimentacoes } from "@/components/graficos/grafico-movimentacoes";
import { StatusCard } from "@/components/status-card";
import { ErroCard } from "@/components/erro-card";
import { GraficoVelocimetro } from "../grafico-velocimetro";
import { TempoOperacaoCard } from "@/components/tempo-operacao-card";
import { DistanciaCard } from "@/components/distancia-card";
import { TransporteStatusCard } from "@/components/transporte-status-card";
import { MonitorStatusCard } from "@/components/monitor-status-card";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { createMqttClient } from "@/mqtt/mqttClient";

const MQTT_TOPIC = "agv/metricas";

export default function OverviewPage() {
  const currentDate = getFormattedDate();
  const [chegou, setChegou] = useState(false);
  const [rota, setRota] = useState<
    "carga" | "manutencao" | "descarga a" | "descarga b"
  >("carga");

  const [tempoIniciado, setTempoIniciado] = useState(false);

  useEffect(() => {
    const client = createMqttClient();

    client.subscribe(MQTT_TOPIC, { qos: 0 }, (err) => {
      if (err) {
        console.error("Erro ao subscrever ao tópico:", err);
      }
    });

    client.on("message", (topic, message) => {
      if (topic === MQTT_TOPIC) {
        try {
          const data = JSON.parse(message.toString());
          setTempoIniciado(data.status === "Em operação");
        } catch (error) {
          console.error("Erro ao parsear mensagem MQTT:", error);
        }
      }
    });

    return () => {
      client.end();
    };
  }, []);

  useEffect(() => {
    const timer1 = setTimeout(() => setRota("descarga a"), 5000);
    const timer2 = setTimeout(() => setChegou(true), 10000);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <PageContainer scrollable>
      <Header currentDate={currentDate} />
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
          <GraficoMovimentacoes />
          <div className="grid grid-rows-2 gap-5">
            <StatusCard />
            <ErroCard />
          </div>
          <GraficoVelocimetro velocidade={0.5} />
          <div className="grid grid-rows-2 gap-5">
            <TempoOperacaoCard tempoIniciado={tempoIniciado} />
            <DistanciaCard />
            <Link
              href={"/dashboard/registro-atividades"}
              className={cn(buttonVariants({ variant: "default" })) + " w-full"}
            >
              Registro de atividades
              <Icons.arrowRight className="ml-2" />
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <TransporteStatusCard carga="Teste" destino="Teste" />
          <MonitorStatusCard rota={rota} chegou={chegou} />
        </div>
      </div>
    </PageContainer>
  );
}
