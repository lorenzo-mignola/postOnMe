import prisma, { createPrisma } from "./prisma";
import startServer from "./server";

const start = async () => {
  try {
    createPrisma();
    startServer();
  } catch (error) {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  }
};

start();
