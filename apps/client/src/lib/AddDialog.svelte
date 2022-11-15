<script lang="ts">
import CloseButton from "../assets/CloseButton.svelte";
import PostButton from "../assets/PostButton.svelte";
import TextAreaPost from "./TextAreaPost.svelte";

export let closeDialog: () => void;
export let open = false;
</script>

<div
  class="modal fade fixed top-0 left-0 w-full h-full outline-none overflow-x-hidden overflow-y-auto text-white pt-20 px-6 bg-gray-800 bg-opacity-70"
  class:hidden="{!open}"
  data-testid="add-dialog">
  <div class="modal-dialog relative w-auto pointer-events-none">
    <div
      class="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-gray-800 bg-clip-padding rounded-md outline-none text-current">
      <div
        class="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
        <h5 class="text-xl font-medium leading-normal text-gray-100">Write a new post</h5>
      </div>
      <div class="modal-body relative p-4">
        <TextAreaPost />
      </div>
      <div
        class="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
        <CloseButton clickAction="{closeDialog}" />
        <PostButton closeAction="{closeDialog}" />
      </div>
    </div>
  </div>
</div>
