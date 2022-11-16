import { z } from "zod";
import prismaClient from "../../prismaClient";
import { procedure } from "../../servers/trpcServer";
import includePost from "./utils/includePost";

const posts = procedure
  .input(
    z
      .object({
        page: z.number().default(1),
      })
      .optional()
  )
  .query(async ({ input }) => {
    const page = (input?.page || 1) - 1;
    const skip = Math.max(page * 20 - 1, 0);

    return prismaClient.post.findMany({
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
      include: includePost,
      take: 20,
      skip,
    });
  });

export default posts;
