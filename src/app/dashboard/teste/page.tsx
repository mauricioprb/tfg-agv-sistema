"use client";

import { trpc } from "@/server/client";

export default function Home() {
  const { data } = trpc.mqtt.subscribeBatteryData.useQuery();
  return (
    <>
      <div>
        <div>
          <h2>Dados da Bateria:</h2>
          {data ? (
            <pre>{JSON.stringify(data, null, 2)}</pre>
          ) : (
            "Aguardando dados..."
          )}
        </div>
      </div>
    </>
  );
}
