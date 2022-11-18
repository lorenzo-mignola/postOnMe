<script lang="ts">
import { getCookie } from "svelte-cookie";
import type { Post } from "../../lib/client";
import formatDate from "../../util/formatDate";
import WriteComment from "./WriteComment.svelte";

export let comment: Post["comment"][number];

const userId = Number(getCookie("user-id"));

$: showWriteComment = Boolean(userId);
</script>

<div class="mt-1" data-testid="comment-element">
  <hr class="border-gray-500" />
  <p class="mt-2" data-testid="comment-comment">
    {comment.comment}
  </p>
  <span class="flex justify-between">
    <p class="text-sm text-gray-400" data-testid="comment-author">
      by @{comment.author.name}
    </p>
    <p class="text-sm text-gray-400" data-testid="comment-date">
      {formatDate(comment.commentedAt)}
    </p>
  </span>
</div>

{#if showWriteComment}
  <WriteComment />
{/if}
