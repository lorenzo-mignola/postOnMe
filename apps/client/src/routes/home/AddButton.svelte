<script lang="ts">
  import AddIcon from '../../assets/AddIcon.svelte';
  import AddDialog from '../../lib/AddDialog.svelte';

  export let refresh: () => Promise<void>;

  let showDialog = false;

  function openDialog() {
    showDialog = true;
  }

  async function closeDialog() {
    try {
      showDialog = false;
      await refresh();
    } catch (error) {
      console.error(error);
    }
  }
</script>

<div class="flex space-x-2 justify-center">
  <button
    type="button"
    class="inline-block rounded-full bg-cyan-600 text-white leading-normal uppercase shadow-md hover:bg-cyan-700 hover:shadow-lg focus:bg-cyan-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-cyan-800 active:shadow-lg transition duration-150 ease-in-out w-16 h-16 addButton"
    on:click={() => openDialog()}
    data-testid="add-button"
  >
    <AddIcon />
  </button>
</div>
<AddDialog {closeDialog} bind:open={showDialog} />

<style lang="postcss">
  .addButton {
    position: absolute;
    bottom: 5%;
    right: 5%;
  }
</style>
