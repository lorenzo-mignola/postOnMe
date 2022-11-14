<script lang="ts">
  import { onMount } from 'svelte';
  import { getCookie } from 'svelte-cookie';
  import client, { type Post as PostType } from '../../lib/client';
  import AddButton from './AddButton.svelte';
  import Post from './Post.svelte';

  let posts: PostType[] = [];

  const userId = Number(getCookie('user-id'));

  $: hasIdInCookie = Boolean(userId);

  onMount(async () => {
    try {
      posts = await client.posts.query();
    } catch (e) {
      console.error(e);
    }
  });
</script>

{#each posts as post}
  <Post {post} />
{/each}

{#if hasIdInCookie}
  <AddButton />
{/if}
