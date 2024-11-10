import { router, procedure } from "../trpc";
import { AgvController } from "../controllers/AgvController";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const agvController = new AgvController();

export const agvRouter = router({
  getDados: procedure.query(async () => {
    return await prisma.agv.findMany({
      select: {
        id: true,
        status: true,
        velocidade: true,
        tensaoBateria: true,
        tempoOperacao: true,
        usuarioId: true,
        criadoEm: true,
        atualizadoEm: true,
      },
    });
  }),

  getTempoOperacao: procedure.query(async () => {
    return await agvController.getTempoOperacao();
  }),

  updateTempoOperacao: procedure
    .input(z.object({ novoTempo: z.number() }))
    .mutation(async ({ input }) => {
      return await agvController.updateTempoOperacao(input.novoTempo);
    }),
});
