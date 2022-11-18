<script lang="ts">
import { getCookie } from "svelte-cookie";
import client from "../../lib/client";
import SendCommentButton from "../../lib/SendCommentButton.svelte";
import { getPost } from "../../store/post";
import type { ParamsPost } from "../../util/types/ParamsPost";

export let params: ParamsPost = {};

let newComment = "";
const userId = Number(getCookie("user-id"));

$: buttonDisabled = newComment.length === 0;
$: postId = Number(params.id);

const onSend = async () => {
  await client.addComment.mutate({ comment: newComment, userId, postId });
  newComment = "";
  await getPost(params);
};
</script>

<div class="mt-8 p-3 border-2 rounded-lg border-gray-800 bg-gray-900 flex">
  <input
    class="w-full rounded bg-gray-800 p-2 focus:bg-gray-700 focus:outline-none"
    placeholder="Write a comment..."
    bind:value="{newComment}" />
  <SendCommentButton disabled="{buttonDisabled}" onSend="{onSend}" />
</div>
