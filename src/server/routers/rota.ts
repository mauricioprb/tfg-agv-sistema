import { RotaController } from "../controllers/RotaController";
import { procedure, router } from "../trpc";

const rotaController = new RotaController();

export const rotaRouter = router({
  listarRotas: procedure.query(async () => {
    const rotas = await rotaController.listarRotas();
    return rotas.filter(
      (rota) => rota.nome !== "Manutenção" && rota.nome !== "Carga"
    );
  }),
});
