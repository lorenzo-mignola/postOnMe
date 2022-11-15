import { z } from "zod";
import prismaClient from "../../prismaClient";
import { procedure } from "../../servers/trpcServer";

const addLike = procedure.input(z.number()).mutation(async ({ input: postId }) => {
  const post = await prismaClient.post.findUnique({ where: { id: postId } });
  const newLike = (post?.like || 0) + 1;
  return await prismaClient.post.update({ where: { id: postId }, data: { like: newLike } });
});

export default addLike;
