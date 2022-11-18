<script lang="ts">
import { onMount } from "svelte";
import { getCookie } from "svelte-cookie";
import { link, location } from "svelte-spa-router";
import User from "../assets/User.svelte";

let userId: number;

const updateUserId = () => {
  userId = Number(getCookie("user-id"));
};

location.subscribe(updateUserId);

$: hasIdInCookie = Boolean(userId);

onMount(updateUserId);
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
      <p>Hi!</p>
    {:else}
      <a href="/join" use:link>Join In</a>
    {/if}
  </div>
</nav>
