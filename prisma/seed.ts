import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const rooms = [
    { name: "Sala Azul", capacity: 6 },
    { name: "Sala Verde", capacity: 8 },
    { name: "Sala Executiva", capacity: 12 },
    { name: "Auditório", capacity: 30 },
  ];

  for (const room of rooms) {
    await prisma.room.upsert({
      where: {
        name: room.name,
      },
      update: {},
      create: room,
    });
  }

  console.log("✅ Salas criadas com sucesso.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });