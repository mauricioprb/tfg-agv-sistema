import { TransporteService } from "../services/TransporteService";

export class TransporteController {
  private transporteService: TransporteService;

  constructor() {
    this.transporteService = new TransporteService();
  }

  async criarTransporte(data: {
    rotaId: string;
    cargaId: string;
    status: string;
    finalizado: boolean;
  }) {
    try {
      return await this.transporteService.criarTransporte(data);
    } catch (error) {
      console.error("Erro ao criar o transporte:", error);
      throw new Error("Não foi possível criar o transporte.");
    }
  }

  async listarTransportes() {
    try {
      return await this.transporteService.listarTransportes();
    } catch (error) {
      console.error("Erro ao listar transportes:", error);
      throw new Error("Não foi possível listar os transportes.");
    }
  }

  async listarTransportesPorRota() {
    try {
      return await this.transporteService.listarTransportesPorRota();
    } catch (error) {
      console.error("Erro ao listar transportes por rota:", error);
      throw new Error("Não foi possível listar os transportes por rota.");
    }
  }
}
