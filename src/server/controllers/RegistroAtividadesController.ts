import { RegistroAtividadesService } from "../services/RegistroAtvidadesService";

export class RegistroAtividadesController {
  private registroAtividadesService: RegistroAtividadesService;

  constructor() {
    this.registroAtividadesService = new RegistroAtividadesService();
  }

  async salvarRegistro(descricao: string) {
    return await this.registroAtividadesService.salvarRegistro(descricao);
  }
}
