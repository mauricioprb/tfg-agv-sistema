import { prisma } from "@/lib/prisma";

export class TransporteService {
  async getFirstAgvId(): Promise<string | null> {
    const firstAgv = await prisma.agv.findFirst({
      select: { id: true },
    });
    return firstAgv ? firstAgv.id : null;
  }

  async criarTransporte(data: {
    rotaId: string;
    cargaId: string;
    agvId?: string;
    status: string;
    finalizado: boolean;
  }) {
    const agvId = data.agvId || (await this.getFirstAgvId());
    if (!agvId) {
      throw new Error("AGV não encontrado");
    }

    console.log("ID da carga:", data.cargaId); // Log do cargaId recebido

    // Verifica a carga e reduz a quantidade
    const carga = await prisma.carga.findUnique({
      where: { id: data.cargaId },
    });

    console.log("Carga encontrada:", carga); // Log da carga encontrada

    if (!carga || carga.quantidade <= 0) {
      throw new Error("Carga não disponível ou quantidade insuficiente");
    }

    // Atualiza a quantidade da carga
    await prisma.carga.update({
      where: { id: data.cargaId },
      data: { quantidade: carga.quantidade - 1 },
    });

    // Cria o transporte com o relacionamento correto para `cargas`
    return await prisma.transporte.create({
      data: {
        status: data.status,
        finalizado: data.finalizado,
        rota: { connect: { id: data.rotaId } },
        agv: { connect: { id: agvId } },
        cargas: { connect: { id: data.cargaId } },
      },
    });
  }
}
