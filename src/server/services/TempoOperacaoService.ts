import { prisma } from "@/lib/prisma";

export class TempoOperacaoService {
  async getTempoOperacao(): Promise<number> {
    const agv = await prisma.agv.findFirst({
      select: { tempoOperacao: true },
    });
    return agv?.tempoOperacao || 0;
  }

  async updateTempoOperacao(novoTempo: number): Promise<number> {
    const agv = await prisma.agv.findFirst({
      select: { id: true },
    });

    if (agv) {
      await prisma.agv.update({
        where: { id: agv.id },
        data: { tempoOperacao: novoTempo },
      });
    }
    return novoTempo;
  }
}
