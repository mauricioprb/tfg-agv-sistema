import { MqttClient } from "../mqtt/MqttClient";
import { BateriaService } from "../services/BateriaService";

const mqttClient = new MqttClient();
const batteryService = new BateriaService();

export class MqttController {
  publishBatteryData(data: any) {
    const processedData = batteryService.processBatteryData(data);
    mqttClient.publish("bateria/topico", processedData);
  }

  subscribeBatteryData(callback: (data: any) => void) {
    mqttClient.subscribe("bateria/topico", (data) => {
      const processedData = batteryService.processBatteryData(data);
      callback(processedData);
    });
  }
}
