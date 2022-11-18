<script lang="ts">
import { push } from "svelte-spa-router";
import type { Post } from "../../lib/client";
import CommentCounter from "../../lib/CommentCounter.svelte";
import Like from "../../lib/Like.svelte";
import { fetchPost } from "../../store/posts";
import formatDate from "../../util/formatDate";

export let post: Post;

$: date = formatDate(post.createdAt);

const refresh = async () => {
  await fetchPost();
};

const openPost = () => {
  push(`/post/${post.id}`);
};
</script>

<article
  class="m-5 p-3 rounded-lg border-2 border-cyan-400 hover:border-cyan-600 bg-gray-800 shadow-sm shadow-gray-400 text-white ">
  <button
    on:click|preventDefault="{openPost}"
    class="flex items-center justify-between hover:cursor-pointer w-full"
    data-testid="open-button">
    <div class="text-left">
      <p class="text-sm text-gray-300" data-testid="author">
        @{post.author.name}
      </p>
      <p class="text-2xl" data-testid="text">{post.text}</p>
      <time class="text-md text-gray-500" data-testid="date">{date}</time>
    </div>
    <div>
      <span class="text-lg text-gray-300">
        <Like like="{post.like}" id="{post.id}" refresh="{refresh}" />
        <CommentCounter comment="{post._count.comment}" />
      </span>
    </div>
  </button>
</article>
