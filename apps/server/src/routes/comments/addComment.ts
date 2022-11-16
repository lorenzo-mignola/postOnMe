import { z } from "zod";
import prismaClient from "../../prismaClient";
import { procedure } from "../../servers/trpcServer";

const addComment = procedure
  .input(z.object({ userId: z.number(), postId: z.number(), comment: z.string() }))
  .mutation(async ({ input }) => {
    await prismaClient.comment.create({
      data: {
        userId: input.userId,
        postId: input.postId,
        comment: input.comment,
      },
    });
    return "comment added";
  });

export default addComment;
