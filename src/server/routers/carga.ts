import { z } from "zod";
import { procedure, router } from "../trpc";
import { CargaController } from "../controllers/CargaController";

const cargaController = new CargaController();

export const cargaRouter = router({
  criarCarga: procedure
    .input(
      z.object({
        comprimento: z.number().positive(),
        peso: z.number().positive(),
        altura: z.number().positive(),
        tipo: z.string(),
        largura: z.number().positive(),
        quantidade: z.number().positive(),
      })
    )
    .mutation(async ({ input }) => {
      return await cargaController.criarCarga(input);
    }),

  listarCargas: procedure.query(async () => {
    return await cargaController.listarCargas();
  }),
});
