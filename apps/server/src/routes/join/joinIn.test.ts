import { expect, test } from "vitest";
import createContextInner from "../../../__test__/createContextInner";
import createRouter from "../../appRouter";
import prismaClient from "../../prismaClient";

const userName = "new user";

test("should insert a new user", async () => {
  const ctx = await createContextInner();
  const caller = createRouter.createCaller(ctx);

  await caller.joinIn(userName);

  const user = await prismaClient.user.findUnique({
    where: {
      name: userName,
    },
  });

  expect(user).not.toBeNull();
  // expect(spyPrisma).toBeCalled();
});
