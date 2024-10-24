import { procedure, router } from "../trpc";
import { MqttController } from "../controllers/MqttController";

const mqttController = new MqttController();

export const mqttRouter = router({
  publishBatteryData: procedure.mutation(async ({ input }) => {
    mqttController.publishBatteryData(input);
    return { success: true };
  }),

  subscribeBatteryData: procedure.query(() => {
    return new Promise((resolve) => {
      mqttController.subscribeBatteryData((data) => {
        resolve(data);
      });
    });
  }),
});
