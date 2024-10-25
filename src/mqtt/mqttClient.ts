import mqtt from "mqtt";

export function createMqttClient() {
  const MQTT_WEBSOCKET_URL = process.env.NEXT_PUBLIC_MQTT_WEBSOCKET_URL;
  const MQTT_USERNAME = process.env.NEXT_PUBLIC_MQTT_USERNAME;
  const MQTT_PASSWORD = process.env.NEXT_PUBLIC_MQTT_PASSWORD;

  if (!MQTT_WEBSOCKET_URL || !MQTT_USERNAME || !MQTT_PASSWORD) {
    throw new Error("Missing MQTT environment variables");
  }

  const client = mqtt.connect(MQTT_WEBSOCKET_URL, {
    username: MQTT_USERNAME,
    password: MQTT_PASSWORD,
    connectTimeout: 4000,
    reconnectPeriod: 1000,
  });

  client.on("connect", () => {
    console.log("Conectado ao MQTT Broker");
  });

  client.on("error", (error) => {
    console.error("Erro de conexão MQTT:", error);
  });

  return client;
}
