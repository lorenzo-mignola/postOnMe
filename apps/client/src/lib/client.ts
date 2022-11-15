import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "server/src/appRouter";

const client = createTRPCProxyClient<AppRouter>({
  links: [httpBatchLink({ url: "http://localhost:3030" })],
});

type OutputPosts = typeof client.posts.query;
type ArrayElement<ArrayType> = ArrayType extends readonly (infer ElementType)[]
  ? ElementType
  : never;

type Posts = Awaited<ReturnType<OutputPosts>>;
export type Post = ArrayElement<Posts>;

export default client;
