<script lang="ts">
import { onMount } from "svelte";
import type { Post } from "../../lib/client";
import client from "../../lib/client";
import formatDate from "../../util/formatDate";

export let params: { id?: string } = {};

let post: Required<Post> | null = null;

$: date = formatDate(post?.createdAt || new Date());

onMount(async () => {
  try {
    if (params.id) {
      const postData = await client.getPost.query(Number(params.id));
      post = postData;
    }
  } catch (error) {
    console.error(error);
  }
});
</script>

{#if post}
  <article class="m-5 p-6 rounded-lg border-2 border-cyan-400">
    <div class="flex justify-between">
      <div>
        <h3 class="text-xl text-gray-300">@{post.author.name}</h3>
        <h2 class="text-3xl"><b>{post.text}</b></h2>
      </div>
      <time class="text-gray-300">{date}</time>
    </div>
  </article>
{/if}
