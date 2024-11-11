import { agvRouter } from "./routers/agv";
import { cargaRouter } from "./routers/carga";
import { rotaRouter } from "./routers/rota";
import { transporteRouter } from "./routers/transporte";
import { router } from "./trpc";

export const appRouter = router({
  agv: agvRouter,
  carga: cargaRouter,
  transporte: transporteRouter,
  rota: rotaRouter,
});

export type AppRouter = typeof appRouter;
