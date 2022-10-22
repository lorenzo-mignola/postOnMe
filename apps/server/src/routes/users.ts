import prisma from "../prisma";
import { procedure } from "../server";

interface Hello {
  hello: "world";
}

const hello: Hello = {
  hello: "world",
};

export default procedure.query(async () => prisma.user.findMany());
