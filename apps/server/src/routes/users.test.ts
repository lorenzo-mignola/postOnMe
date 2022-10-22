import { expect, test } from "vitest";
import { createRouter } from "../appRouter";

async function createContextInner() {
  return {};
}

test("should get all users", async () => {
  const ctx = await createContextInner();
  const caller = createRouter().createCaller(ctx);

  const users = await caller.users();

  expect(users).toHaveProperty("length");
});
