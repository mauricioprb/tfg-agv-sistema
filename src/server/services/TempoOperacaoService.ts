import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class TempoOperacaoService {
  async getTempoOperacao(): Promise<number> {
    const agv = await prisma.agv.findFirst({
      select: { tempoOperacao: true },
    });
    return agv?.tempoOperacao || 0;
  }

  async updateTempoOperacao(novoTempo: number): Promise<number> {
    await prisma.agv.updateMany({
      data: { tempoOperacao: novoTempo },
    });
    return novoTempo;
  }
}
