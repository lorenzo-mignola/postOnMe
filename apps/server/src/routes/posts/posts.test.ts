import { afterAll, beforeAll, expect, test } from "vitest";
import createContextInner from "../../../__test__/createContextInner";
import createRouter from "../../appRouter";
import prismaClient from "../../prismaClient";

const user = {
  name: "test-user",
};

const post = {
  text: "test text",
  createdAt: new Date(),
};

beforeAll(async () => {
  const userCreated = await prismaClient.user.create({ data: user });
  const userId = userCreated.id;
  await prismaClient.post.create({ data: { ...post, userId } });
});

afterAll(async () => {
  await prismaClient.$queryRaw`DROP TABLE post`;
  await prismaClient.$queryRaw`DROP TABLE user`;
});

test("should get a list with 1 post", async () => {
  const ctx = await createContextInner();
  const caller = createRouter.createCaller(ctx);

  const posts = await caller.posts();

  expect(posts).toHaveLength(1);
});
