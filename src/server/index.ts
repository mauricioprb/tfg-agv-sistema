import { agvRouter } from "./routers/agv";
import { cargaRouter } from "./routers/carga";
import { router } from "./trpc";

export const appRouter = router({
  agv: agvRouter,
  carga: cargaRouter,
});

export type AppRouter = typeof appRouter;
