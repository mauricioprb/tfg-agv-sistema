import { Prisma } from "@prisma/client";
import { CargaService } from "../services/CargaService";

export class CargaController {
  private cargaService: CargaService;

  constructor() {
    this.cargaService = new CargaService();
  }

  async criarCarga(data: Prisma.CargaCreateInput) {
    try {
      return await this.cargaService.criarCarga(data);
    } catch (error) {
      console.error("Erro ao criar carga:", error);
      throw new Error("Não foi possível criar a carga.");
    }
  }

  async listarCargas() {
    try {
      return await this.cargaService.listarCargas();
    } catch (error) {
      console.error("Erro ao listar cargas:", error);
      throw new Error("Não foi possível listar as cargas.");
    }
  }
}
