<script lang="ts">
import RightArrowIcon from "../assets/RightArrowIcon.svelte";

export let disabled = false;
export let onSend: () => Promise<void>;
</script>

<button
  class="rounded-lg bg-cyan-600 text-white ml-4 p-3 disabled:bg-cyan-300 disabled:text-gray-600"
  disabled="{disabled}"
  on:click="{onSend}">
  <RightArrowIcon />
</button>
