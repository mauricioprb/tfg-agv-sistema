import { router, procedure } from "../trpc";
import { prisma } from "@/lib/prisma";

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
});
