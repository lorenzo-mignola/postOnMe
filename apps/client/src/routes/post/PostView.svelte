<script lang="ts">
import { onMount } from "svelte";
import type { Post } from "../../lib/client";
import client from "../../lib/client";
import CommentCounter from "../../lib/CommentCounter.svelte";
import Like from "../../lib/Like.svelte";
import formatDate from "../../util/formatDate";
import Comment from "./Comment.svelte";

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

const refresh = async () => {
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
          <Like like="{post.like}" id="{post.id}" refresh="{refresh}" />
          <CommentCounter comment="{post._count.comment}" />
        </div>
      </div>
      <time class="text-gray-300" data-testid="date">{date}</time>
    </div>
  </article>

  <div class="text-white m-5" data-testid="comments-container">
    <h4 class="text-xl mb-2"><b>Comments</b></h4>
    {#each post.comment as comment}
      <Comment comment="{comment}" />
    {/each}
  </div>
{/if}
