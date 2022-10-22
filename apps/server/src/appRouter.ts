import users from "./routes/users";
import { router } from "./servers/trpcServer";

const appRouter = router({
  users,
});

export type AppRouter = typeof appRouter;

export default appRouter;
