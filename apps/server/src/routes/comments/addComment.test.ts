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

    expect(post?._count.comment).toBe(1);
    const comment = post?.comment[0];
    expect(comment).toBeTruthy();
    expect(comment!.comment).toBe("new comment");
    expect(comment!.author.id).toBe(userId);
  });
});
