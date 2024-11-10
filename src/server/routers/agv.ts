import { router, procedure } from "../trpc";
import { AgvController } from "../controllers/AgvController";
import { z } from "zod";

const agvController = new AgvController();

export const agvRouter = router({
  getTempoOperacao: procedure.query(async () => {
    return await agvController.getTempoOperacao();
  }),

  updateTempoOperacao: procedure
    .input(z.object({ novoTempo: z.number() }))
    .mutation(async ({ input }) => {
      return await agvController.updateTempoOperacao(input.novoTempo);
    }),

  salvarStatus: procedure
    .input(z.object({ status: z.string() }))
    .mutation(async ({ input }) => {
      return await agvController.salvarStatus(input.status);
    }),
});
