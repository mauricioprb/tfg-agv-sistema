"use client";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { Icons } from "@/components/icons";
import PageContainer from "@/components/layout/page-container";
import { Button, buttonVariants } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import Link from "next/link";
import GestaoTransporteTable from "../gestao-transporte-table";
import { useEffect, useState } from "react";
import { StatusCard } from "@/components/status-card";
import { MonitorStatusCard } from "@/components/monitor-status-card";
import { TransporteDetalhado } from "@/components/transporte-detalhado";
import { createMqttClient } from "@/mqtt/mqttClient";
import { trpc } from "@/server/client";
import { GestaoTransporte } from "@/constants/data";
import { formatarData } from "@/lib/formatarData";

const MQTT_TOPIC = "agv/metricas";
const INACTIVITY_TIMEOUT = 20000;

const breadcrumbItems = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "Gestão Transporte", link: "/dashboard/gestao-transporte" },
];

export default function GestaoTransportePage() {
  const [chegou, setChegou] = useState(false);
  const [rota, setRota] = useState("");
  const [status, setStatus] = useState("Desligado");
  const [carga, setCarga] = useState("Indefinido");
  const [destino, setDestino] = useState("Indefinido");
  const [comprimento, setComprimento] = useState(0);
  const [altura, setAltura] = useState(0);
  const [largura, setLargura] = useState(0);
  const [peso, setPeso] = useState(0);

  const [transportes, setTransportes] = useState<GestaoTransporte[]>([]);
  const client = createMqttClient();

  const salvarStatus = trpc.agv.salvarStatus.useMutation();

  const { data: transportesData, isLoading } =
    trpc.transporte.listarTransportes.useQuery();

  useEffect(() => {
    if (transportesData) {
      const transportesFormatados = transportesData.map((transporte) => ({
        ...transporte,
        data: formatarData(transporte.data),
      }));
      setTransportes(transportesFormatados);
    }
  }, [transportesData]);

  useEffect(() => {
    let inactivityTimer: NodeJS.Timeout;

    const resetInactivityTimer = () => {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
        setStatus("Desligado");
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
          setStatus(data.status || "Desligado");

          if (data.carga !== undefined) setCarga(data.carga);
          if (data.destino !== undefined) setDestino(data.destino);
          if (data.rota !== undefined) setRota(data.rota);
          if (data.chegou !== undefined) setChegou(data.chegou);
          if (data.comprimento !== undefined) setComprimento(data.comprimento);
          if (data.altura !== undefined) setAltura(data.altura);
          if (data.largura !== undefined) setLargura(data.largura);
          if (data.peso !== undefined) setPeso(data.peso);

          resetInactivityTimer();
        } catch (error) {
          console.error("Erro ao parsear mensagem MQTT:", error);
        }
      }
    });

    return () => clearTimeout(inactivityTimer);
  }, [client]);

  const handleManutencao = async () => {
    try {
      const novoStatus = "Em manutenção";
      setStatus(novoStatus);

      client.publish(MQTT_TOPIC, JSON.stringify({ status: novoStatus }), {
        qos: 0,
      });

      await salvarStatus.mutateAsync({ status: novoStatus });
      console.log("Status de manutenção ativado com sucesso!");
    } catch (error) {
      console.error("Erro ao ativar modo manutenção:", error);
      setStatus(status);
    }
  };

  return (
    <PageContainer scrollable>
      <div className="space-y-6">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading
            title={"Gestão de Transporte"}
            description="Acompanhe e gerencie as atividades de transporte."
          />
        </div>
        <Separator />
        <div className="grid lg:grid-cols-2 gap-5 grid-cols-1 mt-4">
          <div className="flex flex-col gap-5">
            <StatusCard status={status} />

            <MonitorStatusCard rota={rota} destino={destino} chegou={chegou} />
          </div>
          <div className="flex flex-col gap-5">
            <div className="flex gap-4 md:flex-nowrap flex-wrap">
              <Button
                variant="secondary"
                className="w-full"
                onClick={handleManutencao}
              >
                <Icons.chave className="w-4 h-4 mr-2" />
                Manutenção
              </Button>
              <Link
                href={"/dashboard/gestao-transporte/novo"}
                className={
                  cn(buttonVariants({ variant: "default" })) + " w-full"
                }
              >
                <Icons.add className="w-4 h-4 mr-2" />
                Cadastrar Carga
              </Link>
            </div>
            <TransporteDetalhado
              carga={carga}
              destino={destino}
              comprimento={comprimento}
              altura={altura}
              largura={largura}
              peso={peso}
            />
          </div>
        </div>
        <Separator />
        <h2 className="text-lg font-medium text-muted-foreground">
          Histórico de Transportes
        </h2>
        {isLoading ? (
          <p>Carregando transportes...</p>
        ) : (
          <GestaoTransporteTable
            data={transportes}
            totalData={transportes.length}
          />
        )}
      </div>
    </PageContainer>
  );
}
