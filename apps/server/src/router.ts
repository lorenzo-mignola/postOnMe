import users from "./routes/users";
import { router } from "./server";

export const createRouter = () =>
  router({
    users,
  });

export type AppRouter = ReturnType<typeof createRouter>;
