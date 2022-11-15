import { z } from "zod";
import prismaClient from "../../prismaClient";
import { procedure } from "../../servers/trpcServer";

const addPost = procedure.input(z.object({ text: z.string(), userId: z.number() })).mutation(async ({ input }) =>
  prismaClient.post.create({
    data: {
      text: input.text,
      userId: input.userId,
    },
  })
);

export default addPost;
