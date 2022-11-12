import { z } from "zod";
import prismaClient from "../../prismaClient";
import { procedure } from "../../servers/trpcServer";

const joinIn = procedure.input(z.string()).mutation(async ({ input: userName }) => {
  const user = await prismaClient.user.create({
    data: { name: userName },
  });
  return user.id;
});

export default joinIn;
