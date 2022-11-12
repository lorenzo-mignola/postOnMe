import { inferAsyncReturnType } from "@trpc/server";

export async function createContext() {
  return {};
}

type Context = inferAsyncReturnType<typeof createContext>;
export default createContext;
