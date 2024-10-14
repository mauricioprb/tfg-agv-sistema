import { z } from "zod";
import { procedure, router } from "../trpc";

export const userRouter = router({
  getUsers: procedure.query(() => {
    return [
      { id: 1, name: "Mauricio" },
      { id: 2, name: "Teste" },
    ];
  }),
  addUser: procedure.input(z.object({ name: z.string() })).mutation((opt) => {
    const { input } = opt;
  }),
});
