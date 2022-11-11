import { z } from "zod";
import prismaClient from "../../prismaClient";
import { procedure } from "../../servers/trpcServer";

const joinIn = procedure.input(z.string()).query(({ input: userName }) =>
  prismaClient.user.create({
    data: { name: userName },
  })
);

export default joinIn;
