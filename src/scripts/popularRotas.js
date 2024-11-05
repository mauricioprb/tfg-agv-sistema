const { PrismaClient } = require("@prisma/client");
const rotas = require("../data/rotas.json");

const prisma = new PrismaClient();

async function main() {
  for (const rota of rotas) {
    const rotaExistente = await prisma.rota.findUnique({
      where: {
        nome: rota.nome,
      },
    });

    if (!rotaExistente) {
      await prisma.rota.create({
        data: {
          nome: rota.nome,
        },
      });
    }
  }

  console.log("Rotas inseridas com sucesso!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    prisma.$disconnect();
  });
