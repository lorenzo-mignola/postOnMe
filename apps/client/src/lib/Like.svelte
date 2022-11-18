<script lang="ts">
import LikeIcon from "../assets/LikeIcon.svelte";
import client from "./client";

export let refresh: () => Promise<void>;
export let like: number;
export let id: number;

const addLike = async () => {
  await client.addLike.mutate(id);
  await refresh();
};
</script>

<div class="flex items-center">
  <button data-testid="like-button" on:click|stopPropagation="{addLike}">
    <LikeIcon />
  </button>
  <p data-testid="like">{like}</p>
</div>
