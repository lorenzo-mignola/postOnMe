<script lang="ts">
import { setCookie } from "svelte-cookie";
import { push } from "svelte-spa-router";
import client from "../../lib/client";

let user = "";
let showError = false;

async function join() {
  try {
    const id = await client.joinIn.mutate(user);
    setCookie("user-id", id, 30, false);
    push("/");
    showError = false;
  } catch (e) {
    showError = true;
  }
}
</script>

{#if showError}
  <div class="my-4 mx-16 bg-red-100 rounded-lg py-5 px-6 text-base text-red-700 mb-3" role="alert">
    User name already used!
  </div>
{/if}

<div class="flex justify-center">
  <div class="m-7 w-full md:w-1/2">
    <label for="user" class="block text-md font-medium text-gray-200"> User </label>
    <input
      id="user"
      placeholder="user_name"
      class="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2"
      bind:value="{user}" />
  </div>
</div>

<div class="mx-auto text-center">
  <button
    class=" inline-block rounded border border-cyan-600 bg-cyan-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-cyan-600 focus:outline-none focus:ring active:text-cyan-500 flex-1"
    on:click="{() => join()}">
    Join In
  </button>
</div>
