import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { useEffect, useState } from "react";
import { MqttClient } from "mqtt";
import { createMqttClient } from "@/mqtt/mqttClient";

interface HeaderProps {
  currentDate: string;
}

export function Header({ currentDate }: HeaderProps) {
  const [mqttClient, setMqttClient] = useState<MqttClient | null>(null);

  useEffect(() => {
    const client = createMqttClient();
    setMqttClient(client);

    return () => {
      if (client) client.end();
    };
  }, []);

  const handleStop = () => {
    if (mqttClient) {
      mqttClient.publish("agv/parar", "Parar AGV");
      console.log("Comando de parada publicado no tópico agv/parar");
    }
  };

  return (
    <div className="flex items-center justify-between space-y-2 mb-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-1">Visão geral</h2>
        <h3 className="text-muted-foreground">{currentDate}</h3>
      </div>
      <div className="hidden items-center space-x-2 md:flex">
        <Button
          variant="destructive"
          className="font-bold"
          onClick={handleStop}
        >
          <Icons.parar className="mr-2" />
          PARAR
        </Button>
      </div>
    </div>
  );
}
