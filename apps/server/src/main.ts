import { createPrisma } from "./prisma";
import { createRouter } from "./router";

const start = async () => {
  createRouter();
  createPrisma();
};
