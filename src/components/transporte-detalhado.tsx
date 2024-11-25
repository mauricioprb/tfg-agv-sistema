"use client";
import { useState, useEffect } from "react";
import { Icons } from "./icons";
import { ModalTransporte } from "./modal-transporte";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import type { MqttClient } from "mqtt";
import { createMqttClient } from "@/mqtt/mqttClient";

interface TransporteDetalhadoProps {
  carga?: string;
  destino?: string;
  comprimento?: number;
  altura?: number;
  largura?: number;
  peso?: number;
}

export function TransporteDetalhado({
  carga,
  destino,
  comprimento,
  altura,
  largura,
  peso,
}: TransporteDetalhadoProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mqttClient, setMqttClient] = useState<MqttClient | null>(null);

  useEffect(() => {
    const client = createMqttClient();
    setMqttClient(client);

    return () => {
      if (client) {
        client.end();
      }
    };
  }, []);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleCancel = () => {
    if (mqttClient && mqttClient.connected) {
      mqttClient.publish("agv/parar", "Parar", { qos: 0 });
    } else {
      console.error("Cliente MQTT não está conectado");
    }
  };

  return (
    <>
      <Card className="w-full h-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground flex mb-4">
            <Icons.split className="mr-2 h-5 w-5 text-muted-foreground" />
            Transportando
          </CardTitle>
        </CardHeader>
        <CardContent className="lg:grid lg:grid-cols-[2fr_1fr]">
          <div>
            <p className="text-muted-foreground text-sm mb-2">
              Carga / Destino
            </p>
            <div className="flex items-center gap-5 mb-4 lg:mb-0">
              <h2 className="text-2xl font-bold">
                {carga ? carga : "Indefinido"}
              </h2>
              <Icons.arrowRight />
              <h2 className="text-2xl font-bold">
                {destino ? destino : "Indefinido"}
              </h2>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <Button onClick={handleOpenModal}>
              <Icons.start className="w-4 h-4 mr-2" />
              Iniciar
            </Button>
            <Button variant="destructive" onClick={handleCancel}>
              <Icons.parar className="w-4 h-4 mr-2" />
              Cancelar
            </Button>
          </div>
          <Separator className="my-8 col-span-2" />
          <h3 className="text-muted-foreground font-medium text-sm mb-5 col-span-2 flex items-center">
            <Icons.dados className="w-4 h-4 mr-2" />
            Dados do Transporte
          </h3>
          <div className="col-span-2">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-muted-foreground text-sm mb-2">
                  Comprimento
                </p>
                <h3 className="text-lg font-bold">
                  {comprimento ? comprimento : 0}mm
                </h3>
              </div>
              <div>
                <p className="text-muted-foreground text-sm mb-2">Altura</p>
                <h3 className="text-lg font-bold">{altura ? altura : 0}mm</h3>
              </div>
              <div>
                <p className="text-muted-foreground text-sm mb-2">Largura</p>
                <h3 className="text-lg font-bold">{largura ? largura : 0}mm</h3>
              </div>
              <div>
                <p className="text-muted-foreground text-sm mb-2">Peso</p>
                <h3 className="text-lg font-bold">{peso ? peso : 0}g</h3>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <ModalTransporte isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
}
