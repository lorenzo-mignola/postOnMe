import { afterAll, afterEach, beforeAll } from "vitest";
import prismaClient from "../src/prismaClient";

beforeAll(() => {});

afterEach(async () => {
  await prismaClient.comment.deleteMany();
  await prismaClient.post.deleteMany();
  await prismaClient.user.deleteMany();
});

afterAll(() => {});
