import { createHTTPHandler } from "@trpc/server/adapters/standalone";
import http from "http";
import appRouter from "../appRouter";
import createContext from "../context";

const trpcHandler = createHTTPHandler({
  router: appRouter,
  createContext,
});

// eslint-disable-next-line consistent-return
const server = http.createServer((req, res) => {
  // enable CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Request-Method", "*");
  res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET");
  res.setHeader("Access-Control-Allow-Headers", "*");

  // accepts OPTIONS
  if (req.method === "OPTIONS") {
    res.writeHead(200);
    return res.end();
  }

  // then we can pass the req/res to the tRPC handler
  trpcHandler(req, res);
});

export default server;
