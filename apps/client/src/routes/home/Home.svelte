<script lang="ts">
  import { onMount } from 'svelte';
  import client, { type Post as PostType } from '../../lib/client';
  import Post from './Post.svelte';

  let posts: PostType[] = [];

  onMount(async () => {
    posts = await client.posts.query();
  });
</script>

{#each posts as post}
  <Post {post} />
{/each}
