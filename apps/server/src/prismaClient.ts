import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

export const createPrisma = () => prismaClient;

export default prismaClient;
