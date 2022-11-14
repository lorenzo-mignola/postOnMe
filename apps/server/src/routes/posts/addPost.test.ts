import { beforeAll, describe, expect, test } from "vitest";
import createContextInner from "../../../__test__/createContextInner";
import createRouter from "../../appRouter";
import prismaClient from "../../prismaClient";

const postText = "New post";
let userId: number;

describe("addPost", () => {
  beforeAll(async () => {
    const user = await prismaClient.user.create({ data: { name: "testUser" } });
    userId = user.id;
  });

  test("should add a post", async () => {
    const ctx = await createContextInner();
    const caller = createRouter.createCaller(ctx);

    const postCreated = await caller.addPost({ text: postText, userId });

    expect(postCreated).not.toBeNull();
    expect(postCreated?.userId).toBe(userId);
  });
});
