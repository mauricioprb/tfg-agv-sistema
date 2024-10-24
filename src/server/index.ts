import { router } from "./trpc";
import { mqttRouter } from "./routers/mqtt";

export const appRouter = router({
  mqtt: mqttRouter,
});

export type AppRouter = typeof appRouter;
