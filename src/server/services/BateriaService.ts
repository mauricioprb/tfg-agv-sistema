import { prisma } from "@/lib/prisma";

export class BateriaService {
  static async salvarDadosAgv(tensao: number) {
    return prisma.agv.update({
      where: { id: "id_do_agv" },
      data: {
        tensaoBateria: tensao,
      },
    });
  }
}
