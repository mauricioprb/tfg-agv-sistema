import { MqttClient } from "../mqtt/MqttClient";
import { BateriaService } from "../services/BateriaService";

const mqttClient = new MqttClient();
const bateriaService = new BateriaService();

export class MqttController {
  publishBatteryData(data: any) {
    const dataConvertida = bateriaService.converterDadosBateria(data);
    mqttClient.publish("bateria/topico", dataConvertida);
  }

  subscribeBatteryData(callback: (data: any) => void) {
    mqttClient.subscribe("bateria/topico", (data) => {
      const dataConvertida = bateriaService.converterDadosBateria(data);
      callback(dataConvertida);
    });
  }
}
