import { initTRPC } from "@trpc/server";

const server = initTRPC.create();

export const { router, procedure } = server;

export default server;
