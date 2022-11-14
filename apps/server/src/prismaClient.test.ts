import { describe, expect, test } from "vitest";
import { createPrisma } from "./prismaClient";

describe("prismaClient", () => {
  test("should create the client", () => {
    const client = createPrisma();

    expect(client).toBeTruthy();
  });
});
