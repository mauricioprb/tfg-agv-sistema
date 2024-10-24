import mqtt, { MqttClient as MqttLibClient } from "mqtt";

export class MqttClient {
  private client: MqttLibClient;

  constructor() {
    const brokerUrl = process.env.MQTT_BROKER_URL!;
    const username = process.env.MQTT_USERNAME!;
    const password = process.env.MQTT_PASSWORD!;

    this.client = mqtt.connect(brokerUrl, {
      username,
      password,
    });

    this.client.on("connect", () => {
      console.log("Conectado ao broker MQTT");
    });

    this.client.on("error", (err) => {
      console.error("Erro na conexão com MQTT:", err);
    });
  }

  public publish(topic: string, data: any) {
    this.client.publish(topic, JSON.stringify(data), (err) => {
      if (err) {
        console.error("Erro ao publicar no MQTT:", err);
      } else {
        console.log(`Dados publicados com sucesso no tópico: ${topic}`);
      }
    });
  }

  public subscribe(topic: string, callback: (data: any) => void) {
    this.client.subscribe(topic, (err) => {
      if (!err) {
        console.log(`Inscrito no tópico: ${topic}`);
      } else {
        console.error("Erro ao se inscrever no MQTT:", err);
      }
    });

    this.client.on("message", (receivedTopic, message) => {
      if (receivedTopic === topic) {
        const parsedMessage = JSON.parse(message.toString());
        callback(parsedMessage);
      }
    });
  }
}
