import prismaClient, { createPrisma } from "./prismaClient";
import startServer from "./server";

const start = async () => {
  try {
    createPrisma();
    startServer();
  } catch (error) {
    console.error(error);
    await prismaClient.$disconnect();
    process.exit(1);
  }
};

start();
