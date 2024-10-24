export class BateriaService {
  processBatteryData(data: any) {
    const batteryLevel = data.level;
    if (batteryLevel < 20) {
      console.warn("Bateria baixa!");
    }
    return {
      level: batteryLevel,
      status: batteryLevel < 20 ? "Baixa" : "Normal",
    };
  }
}
