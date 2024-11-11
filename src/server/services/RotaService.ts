import { prisma } from "@/lib/prisma";

export class RotaService {
  async listarRotas() {
    return await prisma.rota.findMany();
  }
}
