const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const usuarioId = process.argv[2];

if (!usuarioId) {
  console.error("Uso: npm run add:agv -- <usuarioId>");
  process.exit(1);
}

async function addAgv() {
  try {
    await prisma.agv.create({
      data: {
        status: "Desligado",
        velocidade: 0,
        tensaoBateria: 0,
        tempoOperacao: 0,
        usuarioId,
      },
    });
    console.log("AGV inserido com sucesso!");
  } catch (error) {
    console.error("Erro ao adicionar AGV:", error);
  } finally {
    await prisma.$disconnect();
  }
}

addAgv()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
