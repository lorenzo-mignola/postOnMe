<script lang="ts">
import { format } from "date-fns";
import { push } from "svelte-spa-router";
import CommentIcon from "../../assets/CommentIcon.svelte";
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
        <div class="flex items-center">
          <button data-testid="like-button" on:click="{addLike}">
            <LikeIcon />
          </button>
          <p data-testid="like">{post.like}</p>
        </div>
        <div class="flex items-center">
          <CommentIcon />
          <p data-testid="comments">{post._count.comment}</p>
        </div>
      </span>
    </div>
  </button>
</article>
