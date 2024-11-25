import { prisma } from "@/lib/prisma";

export class RegistroAtividadesService {
  async salvarRegistro(descricao: string): Promise<string> {
    await prisma.alerta.updateMany({
      data: { descricao: descricao },
    });
    return descricao;
  }
}
