import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export class CargaService {
  async criarCarga(data: Prisma.CargaCreateInput) {
    const cargaExistente = await prisma.carga.findFirst({
      where: {
        tipo: data.tipo,
      },
    });

    if (cargaExistente) {
      return await prisma.carga.update({
        where: {
          id: cargaExistente.id,
        },
        data: {
          quantidade: cargaExistente.quantidade + (data.quantidade || 0),
        },
      });
    } else {
      return await prisma.carga.create({
        data,
      });
    }
  }

  async listarCargas() {
    return await prisma.carga.findMany({
      where: {
        quantidade: {
          not: 0,
        },
      },
    });
  }
}
