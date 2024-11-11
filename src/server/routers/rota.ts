import { RotaController } from "../controllers/RotaController";
import { procedure, router } from "../trpc";

const rotaController = new RotaController();

export const rotaRouter = router({
  listarRotas: procedure.query(async () => {
    return await rotaController.listarRotas();
  }),
});
