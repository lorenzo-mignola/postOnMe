import { beforeAll, describe, expect, test } from "vitest";
import createContextInner from "../../../__test__/createContextInner";
import createRouter from "../../appRouter";
import prismaClient from "../../prismaClient";

const post = {
  text: "old post",
};

let userId: number;
let postId: number;

describe("addLike", () => {
  beforeAll(async () => {
    const user = await prismaClient.user.create({ data: { name: "like" } });
    userId = user.id;
    const postCreated = await prismaClient.post.create({ data: { ...post, userId } });
    postId = postCreated.id;
  });

  test("should add 1 like", async () => {
    const ctx = await createContextInner();
    const caller = createRouter.createCaller(ctx);

    const addLikeResponse = await caller.addLike(postId);
    const postUpdated = await prismaClient.post.findUnique({ where: { id: postId } });

    expect(addLikeResponse.like).toBe(1);
    expect(postUpdated?.like).toBe(1);
  });
});
