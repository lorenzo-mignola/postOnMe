<script lang="ts">
import RightArrowIcon from "../assets/RightArrowIcon.svelte";

export let disabled = false;
export let onSend: () => Promise<void>;
</script>

<button
  class="rounded bg-cyan-600 text-white ml-4 p-3 disabled:bg-cyan-100 disabled:text-gray-400"
  disabled="{disabled}"
  on:click="{onSend}">
  <RightArrowIcon />
</button>
