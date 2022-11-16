import { z } from "zod";
import prismaClient from "../../prismaClient";
import { procedure } from "../../servers/trpcServer";
import includePost from "./utils/includePost";

const getPost = procedure.input(z.number()).query(async ({ input }) =>
  prismaClient.post.findUnique({
    where: {
      id: input,
    },
    include: {
      ...includePost,
      comment: {
        include: {
          author: true,
        },
      },
    },
  })
);

export default getPost;
