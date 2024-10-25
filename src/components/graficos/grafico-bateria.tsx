"use client";

import { useEffect, useState } from "react";
import { createMqttClient } from "@/mqtt/mqttClient";
import { RadialGraph } from "@/sections/dashboard/radial-graph";
import { converterDadosBateria } from "@/lib/converterBateria";

export default function GraficoBateria() {
  const [bateriaAtual, setBateriaAtual] = useState(0);

  useEffect(() => {
    const client = createMqttClient();

    client.subscribe("raspberry/bateria", (err) => {
      if (!err) {
        console.log("Inscrito no tópico bateria");
      } else {
        console.error("Erro ao se inscrever no tópico:", err);
      }
    });

    client.on("message", (topic, message) => {
      if (topic === "raspberry/bateria") {
        const dados = JSON.parse(message.toString());
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
      <RadialGraph tensao={bateriaAtual} />
    </div>
  );
}
