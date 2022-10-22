import { createHTTPServer } from "@trpc/server/adapters/standalone";
import appRouter from "../appRouter";
import createContext from "../context";

export const { server, listen } = createHTTPServer({
  router: appRouter,
  createContext: createContext,
});
