<script lang="ts">
import { getCookie } from "svelte-cookie";
import client from "../lib/client";
import postText from "../store/postText";

export let closeAction: () => void;

$: disabled = $postText.length === 0;

const userId = Number(getCookie("user-id"));

const post = async () => {
  await client.addPost.mutate({ text: $postText, userId });
  closeAction();
};
</script>

<button
  type="button"
  disabled="{disabled}"
  class="px-6
      py-2.5
      bg-cyan-600
      text-white
      font-medium
      text-xs
      leading-tight
      uppercase
      rounded
      shadow-md
      hover:bg-cyan-700 hover:shadow-lg
      focus:bg-cyan-700 focus:shadow-lg focus:outline-none focus:ring-0
      active:bg-cyan-800 active:shadow-lg
      transition
      duration-150
      ease-in-out
      ml-1
      disabled:bg-gray-900
      disabled:text-slate-300
      "
  on:click="{post}">Post</button>
