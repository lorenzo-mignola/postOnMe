<script lang="ts">
export let clickAction: () => void;
</script>

<button
  on:click="{() => clickAction()}"
  type="button"
  class="px-6
      py-2.5
      bg-gray-600
      text-white
      font-medium
      text-xs
      leading-tight
      uppercase
      rounded
      shadow-md
      hover:bg-gray-700 hover:shadow-lg
      focus:bg-gray-700 focus:shadow-lg focus:outline-none focus:ring-0
      active:bg-gray-800 active:shadow-lg
      transition
      duration-150
      ease-in-out
      ml-1">Cancel</button>
