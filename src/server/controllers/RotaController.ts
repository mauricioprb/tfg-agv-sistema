import { RotaService } from "../services/RotaService";

export class RotaController {
  private rotaService: RotaService;

  constructor() {
    this.rotaService = new RotaService();
  }

  async listarRotas() {
    try {
      return await this.rotaService.listarRotas();
    } catch (error) {
      console.error("Erro ao listar rotas:", error);
      throw new Error("Não foi possível listar as rotas.");
    }
  }
}
