<script lang="ts">
import { onMount } from "svelte";
import { getCookie } from "svelte-cookie";
import posts, { fetchPost } from "../../store/posts";
import AddButton from "./AddButton.svelte";
import Post from "./Post.svelte";

const userId = Number(getCookie("user-id"));

$: hasIdInCookie = Boolean(userId);

onMount(() => {
  fetchPost();
});
</script>

{#each $posts as post}
  <Post post="{post}" />
{/each}

{#if hasIdInCookie}
  <AddButton />
{/if}
