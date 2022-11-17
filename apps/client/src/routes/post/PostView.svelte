<script lang="ts">
import { onMount } from "svelte";
import CommentIcon from "../../assets/CommentIcon.svelte";
import LikeIcon from "../../assets/LikeIcon.svelte";
import type { Post } from "../../lib/client";
import client from "../../lib/client";
import formatDate from "../../util/formatDate";

export let params: { id?: string } = {};

let post: Required<Post> | null = null;

$: date = formatDate(post?.createdAt || new Date());

const getPost = async () => {
  try {
    if (params.id) {
      const postData = await client.getPost.query(Number(params.id));
      post = postData;
    }
  } catch (error) {
    console.error(error);
  }
};

const addLike = async () => {
  await client.addLike.mutate(post.id);
  await getPost();
};

onMount(async () => {
  await getPost();
});
</script>

{#if post}
  <article class="m-5 p-6 rounded-lg border-2 border-cyan-400 bg-gray-800 text-white">
    <div class="flex justify-between">
      <div>
        <h3 class="text-xl text-gray-300" data-testid="author">@{post.author.name}</h3>
        <h2 class="text-3xl">
          <b data-testid="text">{post.text}</b>
        </h2>

        <div class="flex gap-4 items-center mt-2">
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
        </div>
      </div>
      <time class="text-gray-300" data-testid="date">{date}</time>
    </div>
  </article>
{/if}
