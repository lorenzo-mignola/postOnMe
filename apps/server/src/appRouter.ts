import addComment from "./routes/comments/addComment";
import joinIn from "./routes/join/joinIn";
import addLike from "./routes/posts/addLike";
import addPost from "./routes/posts/addPost";
import getPost from "./routes/posts/getPost";
import posts from "./routes/posts/posts";
import users from "./routes/users/users";
import { router } from "./servers/trpcServer";

const appRouter = router({
  users,
  posts,
  getPost,
  joinIn,
  addPost,
  addLike,
  addComment,
});

export type AppRouter = typeof appRouter;

export default appRouter;
