import { beforeEach, describe, expect, test } from "vitest";
import createContextInner from "../../../__test__/createContextInner";
import createRouter from "../../appRouter";
import prismaClient from "../../prismaClient";

const user = {
  name: "test-user",
};

const post = {
  text: "test text",
};

describe("posts", () => {
  beforeEach(async () => {
    const userCreated = await prismaClient.user.create({ data: user });
    const userId = userCreated.id;
    // eslint-disable-next-line no-plusplus
    for (let i = 1; i < 20; i++) {
      // eslint-disable-next-line no-await-in-loop
      await prismaClient.post.create({ data: { ...post, userId } });
    }
    await prismaClient.post.create({ data: { text: "21 post", userId, createdAt: new Date(1) } });
  });

  test("should get a list with some post post", async () => {
    const ctx = await createContextInner();
    const caller = createRouter.createCaller(ctx);

    const posts = await caller.posts();

    expect(posts).toHaveProperty("length");
    expect(posts).toHaveLength(20);
    expect(posts[0].author.name).toBe(user.name);
  });

  test("should get pagination", async () => {
    const ctx = await createContextInner();
    const caller = createRouter.createCaller(ctx);

    const posts = await caller.posts({ page: 2 });

    expect(posts[0].text).toBe("21 post");
  });
});
