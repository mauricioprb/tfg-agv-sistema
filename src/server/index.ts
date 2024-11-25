import { agvRouter } from "./routers/agv";
import { cargaRouter } from "./routers/carga";
import { registroAtvidadesRouter } from "./routers/registroAtividades";
import { rotaRouter } from "./routers/rota";
import { transporteRouter } from "./routers/transporte";
import { router } from "./trpc";

export const appRouter = router({
  agv: agvRouter,
  carga: cargaRouter,
  transporte: transporteRouter,
  rota: rotaRouter,
  registroAtvidades: registroAtvidadesRouter,
});

export type AppRouter = typeof appRouter;
