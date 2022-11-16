import { beforeAll, describe, expect, test } from "vitest";
import createContextInner from "../../../__test__/createContextInner";
import createRouter from "../../appRouter";
import prismaClient from "../../prismaClient";

let postId: number;
let userId: number;

describe("addComment", () => {
  beforeAll(async () => {
    const userCreated = await prismaClient.user.create({ data: { name: "comments test" } });
    userId = userCreated.id;
    const post = await prismaClient.post.create({ data: { text: "Post with comments", userId } });
    postId = post.id;
  });

  test("should add a comment", async () => {
    const ctx = await createContextInner();
    const caller = createRouter.createCaller(ctx);

    await caller.addComment({ postId, comment: "new comment", userId });
    const post = await caller.getPost(postId);

    // eslint-disable-next-line no-underscore-dangle
    expect(post?._count.comment).toBe(1);
    expect(post?.comment[0].comment).toBe("new comment");
  });
});
