"use client";

import { useState, useEffect } from "react";
import PageContainer from "@/components/layout/page-container";
import { getFormattedDate } from "@/lib/dateUtils";
import { Header } from "../header";
import { GraficoMovimentacoes } from "@/components/graficos/grafico-movimentacoes";
import { StatusCard } from "@/components/status-card";
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
import { AlertaCard } from "@/components/alerta-card";

const MQTT_TOPIC = "agv/metricas";
const INACTIVITY_TIMEOUT = 20000;

export default function OverviewPage() {
  const currentDate = getFormattedDate();
  const [chegou, setChegou] = useState(false);
  const [rota, setRota] = useState("");
  const [tempoIniciado, setTempoIniciado] = useState(false);
  const [status, setStatus] = useState("Desligado");
  const [velocidade, setVelocidade] = useState(0);
  const [distancia, setDistancia] = useState(0);
  const [carga, setCarga] = useState("Indefinido");
  const [destino, setDestino] = useState("Indefinido");
  const client = createMqttClient();

  useEffect(() => {
    let inactivityTimer: string | number | NodeJS.Timeout | undefined;

    const resetInactivityTimer = () => {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
        setStatus("Desligado");
        setTempoIniciado(false);
      }, INACTIVITY_TIMEOUT);
    };

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
          setStatus(data.status || "Desligado");

          if (data.velocidade !== undefined) {
            setVelocidade(data.velocidade);
          }
          if (data.distancia !== undefined) {
            setDistancia(data.distancia);
          }
          if (data.carga !== undefined) {
            setCarga(data.carga);
          }
          if (data.destino !== undefined) {
            setDestino(data.destino);
          }
          if (data.rota !== undefined) {
            setRota(data.rota);
          }
          if (data.chegou !== undefined) {
            setChegou(data.chegou);
          }

          resetInactivityTimer();
        } catch (error) {
          console.error("Erro ao parsear mensagem MQTT:", error);
        }
      }
    });

    return () => clearTimeout(inactivityTimer);
  }, [client]);

  return (
    <PageContainer scrollable>
      <Header currentDate={currentDate} />
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
          <GraficoMovimentacoes />
          <div className="grid grid-rows-2 gap-5">
            <StatusCard status={status} />
            <AlertaCard />
          </div>
          <GraficoVelocimetro velocidade={velocidade} />
          <div className="grid grid-rows-2 gap-5">
            <TempoOperacaoCard tempoIniciado={tempoIniciado} />
            <DistanciaCard distancia={distancia} />
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
          <TransporteStatusCard carga={carga} destino={destino} />
          <MonitorStatusCard rota={rota} chegou={chegou} destino={destino} />
        </div>
      </div>
    </PageContainer>
  );
}
