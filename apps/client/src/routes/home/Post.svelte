<script lang="ts">
import { format } from "date-fns";
import LikeIcon from "../../assets/LikeIcon.svelte";
import type { Post } from "../../lib/client";
import client from "../../lib/client";
import { fetchPost } from "../../store/posts";

export let post: Post;

const formatDate = (dateRaw: Date | string) => format(new Date(dateRaw), "dd.MM.yyyy HH:mm");

$: date = formatDate(post.createdAt);

const addLike = async () => {
  await client.addLike.mutate(post.id);
  await fetchPost();
};
</script>

<article
  class="m-5 p-3 rounded-lg border-2 border-cyan-400 hover:border-cyan-600 bg-gray-800 shadow-sm shadow-gray-400 text-white flex items-center justify-between">
  <div>
    <p class="text-sm text-gray-300" data-testid="author">
      @{post.author.name}
    </p>
    <p class="text-2xl" data-testid="text">{post.text}</p>
    <time class="text-md text-gray-500" data-testid="date">{date}</time>
  </div>
  <div>
    <span class="text-lg text-gray-300 flex items-center">
      <button data-testid="like-button" on:click="{addLike}">
        <LikeIcon />
      </button>
      <p data-testid="like">{post.like}</p>
    </span>
  </div>
</article>
