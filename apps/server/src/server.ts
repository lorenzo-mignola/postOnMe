import { applyWSSHandler } from "@trpc/server/adapters/ws";
import { createContext } from "vm";
import appRouter, { AppRouter } from "./appRouter";
import server from "./servers/httpServer";
import wss from "./servers/wsServer";

applyWSSHandler<AppRouter>({
  wss,
  router: appRouter,
  createContext,
});

const port = Number(process.env.PORT) || 5000;

const startServer = () => {
  server.listen(port);
  console.log(`Server started on: http://localhost:${port}`);
};

export default startServer;
