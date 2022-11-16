import { z } from "zod";
import prismaClient from "../../prismaClient";
import { procedure } from "../../servers/trpcServer";

const addLike = procedure
  .input(z.number())
  .mutation(async ({ input: postId }) =>
    prismaClient.post.update({ where: { id: postId }, data: { like: { increment: 1 } } })
  );

export default addLike;
