import { GestaoTransporte } from "@/constants/data";
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

    const carga = await prisma.carga.findUnique({
      where: { id: data.cargaId },
    });

    console.log("Carga encontrada:", carga);
    if (!carga || carga.quantidade <= 0) {
      throw new Error("Carga não disponível ou quantidade insuficiente");
    }

    await prisma.carga.update({
      where: { id: data.cargaId },
      data: { quantidade: carga.quantidade - 1 },
    });

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

  async listarTransportes(params?: {
    status?: string;
    rotaId?: string;
    finalizado?: boolean;
  }): Promise<GestaoTransporte[]> {
    const { status, rotaId, finalizado } = params || {};

    const transportes = await prisma.transporte.findMany({
      where: {
        ...(status && { status }),
        ...(rotaId && { rotaId }),
        ...(typeof finalizado === "boolean" && { finalizado }),
      },
      include: {
        rota: true,
        agv: {
          include: {
            usuario: true,
          },
        },
        cargas: true,
      },
      orderBy: {
        criadoEm: "desc",
      },
    });

    return transportes.map((transporte) => ({
      id: transporte.id,
      data: transporte.criadoEm.toString(),
      operador: transporte.agv?.usuario?.name || "Desconhecido",
      carga: transporte.cargas.map((carga) => carga.tipo).join(", "),
      destino: transporte.rota?.nome || "Desconhecido",
      status: transporte.status,
    }));
  }
}
