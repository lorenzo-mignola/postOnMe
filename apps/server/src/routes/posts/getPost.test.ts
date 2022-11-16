import { beforeAll, describe, expect, test } from "vitest";
import createContextInner from "../../../__test__/createContextInner";
import createRouter from "../../appRouter";
import prismaClient from "../../prismaClient";

let postId: number;
let userId: number;

describe("getPost", () => {
  beforeAll(async () => {
    const userCreated = await prismaClient.user.create({ data: { name: "comments test" } });
    userId = userCreated.id;
    const post = await prismaClient.post.create({ data: { text: "Post with comments", userId } });
    postId = post.id;
  });

  test("should return a post", async () => {
    const ctx = await createContextInner();
    const caller = createRouter.createCaller(ctx);

    const post = await caller.getPost(postId);

    expect(post).not.toBeNull();
    expect(post!.id).toBe(postId);
    expect(post).toHaveProperty("author");
    expect(post).toHaveProperty("comment");
    expect(Array.isArray(post?.comment)).toBe(true);
    expect(post?._count).toHaveProperty("comment");
  });
});
