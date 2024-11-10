"use client";

import { useEffect } from "react";
import { createMqttClient } from "@/mqtt/mqttClient";
import { PieGraph } from "@/sections/dashboard/pie-graph";

export function GraficoMovimentacoes() {
  const chartData = [
    { area: "Descarga A", value: 200, fill: "var(--color-descargaA)" },
    { area: "Descarga B", value: 300, fill: "var(--color-descargaB)" },
    { area: "Manutenção", value: 0, fill: "var(--color-manutencao)" },
  ];

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
        console.time("converterDadosBateria");
        console.log("Dados recebidos:", dados);
        console.timeEnd("converterDadosBateria");
      }
    });

    return () => {
      if (client) {
        client.end();
      }
    };
  }, []);

  return <PieGraph chartData={chartData} />;
}
