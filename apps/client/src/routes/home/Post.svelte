<script lang="ts">
  import type { Post } from '../../lib/client';

  export let post: Post;
</script>

<article
  class="m-5 p-3 rounded-lg border-2 border-cyan-400 hover:border-cyan-600 bg-gray-800 shadow-sm shadow-gray-400"
>
  <p class="text-sm text-gray-500">@{post.author.name}</p>
  <p class="text-2xl">{post.text}</p>
  <time class="text-md text-gray-600"
    >{new Date(post.createdAt).toLocaleString()}</time
  >
</article>
