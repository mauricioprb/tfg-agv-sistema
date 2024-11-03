import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export class CargaService {
  async criarCarga(data: Prisma.CargaCreateInput) {
    return await prisma.carga.create({
      data,
    });
  }

  async listarCargas() {
    return await prisma.carga.findMany();
  }
}
