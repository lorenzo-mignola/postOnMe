<script lang="ts">
  import { onMount } from 'svelte';
  import client, { type Post as PostType } from '../../lib/client';
  import Post from './Post.svelte';

  let posts: PostType[] = [];

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
