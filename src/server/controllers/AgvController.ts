import { StatusService } from "../services/StatusService";
import { TempoOperacaoService } from "../services/TempoOperacaoService";

export class AgvController {
  private tempoOperacaoService: TempoOperacaoService;
  private statusService: StatusService;

  constructor() {
    this.tempoOperacaoService = new TempoOperacaoService();
    this.statusService = new StatusService();
  }

  async getTempoOperacao() {
    return await this.tempoOperacaoService.getTempoOperacao();
  }

  async updateTempoOperacao(novoTempo: number) {
    return await this.tempoOperacaoService.updateTempoOperacao(novoTempo);
  }

  async salvarStatus(status: string) {
    return await this.statusService.salvarStatus(status);
  }
}
