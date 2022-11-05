import { expect, test } from "vitest";
import createContextInner from "../../../__test__/createContextInner";
import createRouter from "../../appRouter";

test("should get all users", async () => {
  const ctx = await createContextInner();
  const caller = createRouter.createCaller(ctx);

  const users = await caller.users();

  expect(users).toHaveProperty("length");
});
