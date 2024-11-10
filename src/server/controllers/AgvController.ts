import { TempoOperacaoService } from "../services/TempoOperacaoService";

export class AgvController {
  private tempoOperacaoService: TempoOperacaoService;

  constructor() {
    this.tempoOperacaoService = new TempoOperacaoService();
  }

  async getTempoOperacao() {
    return await this.tempoOperacaoService.getTempoOperacao();
  }

  async updateTempoOperacao(novoTempo: number) {
    return await this.tempoOperacaoService.updateTempoOperacao(novoTempo);
  }
}
