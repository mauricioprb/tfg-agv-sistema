"use client";

import { useEffect, useState } from "react";
import { createMqttClient } from "@/mqtt/mqttClient";
import { RadialGraph } from "@/sections/dashboard/radial-graph";
import { converterDadosBateria } from "@/lib/converterBateria";
import { Skeleton } from "@/components/ui/skeleton";

export default function GraficoBateria() {
  const [bateriaAtual, setBateriaAtual] = useState<number | null>(null);

  useEffect(() => {
    const client = createMqttClient();

    client.subscribe("esp32/bateria", (err) => {
      if (!err) {
        console.log("Inscrito no tópico bateria");
      } else {
        console.error("Erro ao se inscrever no tópico:", err);
      }
    });

    client.on("message", (topic, message) => {
      if (topic === "esp32/bateria") {
        const dados = JSON.parse(message.toString());
        console.log("Dados recebidos:", dados);
        const dadosConvertidos = converterDadosBateria(dados);
        setBateriaAtual(Number(dadosConvertidos.tensao));
      }
    });

    return () => {
      if (client) {
        client.end();
      }
    };
  }, []);

  return (
    <div>
      {bateriaAtual === null ? (
        <Skeleton className="w-full h-full rounded-lg bg-border" />
      ) : (
        <RadialGraph tensao={bateriaAtual} />
      )}
    </div>
  );
}
