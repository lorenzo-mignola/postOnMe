import Home from "./routes/home/Home.svelte";
import JoinIn from "./routes/joinIn/JoinIn.svelte";
import PostView from "./routes/post/PostView.svelte";

const routes = {
  "/": Home,
  "/join": JoinIn,
  "/post/:id": PostView,
};

export default routes;
