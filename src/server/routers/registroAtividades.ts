import { RegistroAtividadesController } from "../controllers/RegistroAtividadesController";
import { router, procedure } from "../trpc";
import { z } from "zod";

const registroAtividadesController = new RegistroAtividadesController();

export const registroAtvidadesRouter = router({
  salvarRegistro: procedure
    .input(z.object({ descricao: z.string() }))
    .mutation(async ({ input }) => {
      return await registroAtividadesController.salvarRegistro(input.descricao);
    }),
});
