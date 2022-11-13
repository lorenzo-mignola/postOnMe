<script lang="ts">
  import { format } from 'date-fns';
  import type { Post } from '../../lib/client';

  export let post: Post;

  const formatDate = (date: Date | string) =>
    format(new Date(date), 'dd.MM.yyyy HH:mm');

  $: date = formatDate(post.createdAt);
</script>

<article
  class="m-5 p-3 rounded-lg border-2 border-cyan-400 hover:border-cyan-600 bg-gray-800 shadow-sm shadow-gray-400 text-white"
>
  <p class="text-sm text-gray-300" data-testid="author">@{post.author.name}</p>
  <p class="text-2xl" data-testid="text">{post.text}</p>
  <time class="text-md text-gray-500" data-testid="date">{date}</time>
</article>
