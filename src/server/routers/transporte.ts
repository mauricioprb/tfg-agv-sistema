import { z } from "zod";
import { procedure, router } from "../trpc";
import { TransporteController } from "../controllers/TransporteController";

const transporteController = new TransporteController();

export const transporteRouter = router({
  criarTransporte: procedure
    .input(
      z.object({
        rotaId: z.string(),
        cargaId: z.string(),
        status: z.string(),
        finalizado: z.boolean(),
      })
    )
    .mutation(async ({ input }) => {
      return await transporteController.criarTransporte(input);
    }),

  listarTransportes: procedure.query(async () => {
    return await transporteController.listarTransportes();
  }),

  listarTransportesPorRota: procedure.query(async () => {
    return await transporteController.listarTransportesPorRota();
  }),
});
