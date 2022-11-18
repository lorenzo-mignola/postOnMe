<script lang="ts">
import { onMount } from "svelte";
import { getCookie } from "svelte-cookie";
import CommentCounter from "../../lib/CommentCounter.svelte";
import Like from "../../lib/Like.svelte";
import post, { getPost } from "../../store/post";
import formatDate from "../../util/formatDate";
import type { ParamsPost } from "../../util/types/ParamsPost";
import Comment from "./Comment.svelte";
import WriteComment from "./WriteComment.svelte";

export let params: ParamsPost = {};

const userId = Number(getCookie("user-id"));

$: date = formatDate($post?.createdAt || new Date());
$: showWriteComment = Boolean(userId);

const refresh = async () => {
  await getPost(params);
};

onMount(async () => {
  await getPost(params);
});
</script>

{#if $post}
  <article class="m-5 p-6 rounded-lg border-2 border-cyan-400 bg-gray-800 text-white">
    <div class="flex justify-between">
      <div>
        <h3 class="text-xl text-gray-300" data-testid="author">@{$post.author.name}</h3>
        <h2 class="text-3xl">
          <b data-testid="text">{$post.text}</b>
        </h2>

        <div class="flex gap-4 items-center mt-2">
          <Like like="{$post.like}" id="{$post.id}" refresh="{refresh}" />
          <CommentCounter comment="{$post._count.comment}" />
        </div>
      </div>
      <time class="text-gray-300" data-testid="date">{date}</time>
    </div>
  </article>

  <div class="text-white m-5" data-testid="comments-container">
    <h4 class="text-xl mb-2"><b>Comments</b></h4>
    {#each $post.comment as comment}
      <Comment comment="{comment}" />
    {/each}
  </div>

  {#if showWriteComment}
    <WriteComment />
  {/if}
{/if}
