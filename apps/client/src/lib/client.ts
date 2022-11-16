import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "server/src/appRouter";

const client = createTRPCProxyClient<AppRouter>({
  links: [httpBatchLink({ url: "http://localhost:3030" })],
});

type OutputPost = Awaited<ReturnType<typeof client.getPost.query>>;

export type Post = Omit<OutputPost, "comment"> & Partial<Pick<OutputPost, "comment">>;

export default client;
