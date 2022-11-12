<script>
  import { onMount } from 'svelte';
  import { getCookie } from 'svelte-cookie';
  import { link } from 'svelte-spa-router';
  import User from '../assets/User.svelte';

  let hasIdInCookie = false;

  onMount(() => {
    hasIdInCookie = Boolean(getCookie('user-id'));
  });
</script>

<nav class="flex p-4 bg-gray-700 justify-between text-gray-50">
  <h1 class="text-3xl font-bold">
    <a href="/" use:link>
      Post<span class="text-cyan-400">On</span>Me
    </a>
  </h1>
  <div class="flex items-center gap-1">
    <User />
    {#if hasIdInCookie}
      <a href="/join" use:link>Join In</a>
    {:else}
      <p>Hi!</p>
    {/if}
  </div>
</nav>
