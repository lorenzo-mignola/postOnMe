import joinIn from "./routes/join/joinIn";
import addPost from "./routes/posts/addPost";
import posts from "./routes/posts/posts";
import users from "./routes/users/users";
import { router } from "./servers/trpcServer";

const appRouter = router({
  users,
  posts,
  joinIn,
  addPost,
});

export type AppRouter = typeof appRouter;

export default appRouter;
