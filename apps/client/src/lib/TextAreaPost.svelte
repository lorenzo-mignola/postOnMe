<script lang="ts">
  import { postText } from '../store/postText';
</script>

<textarea
  class="
        form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-200
        bg-gray-800 bg-clip-padding
        border border-solid border-gray-600
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-100 focus:bg-gray-700 focus:border-cyan-600 focus:outline-none
      "
  bind:value={$postText}
  rows="3"
  placeholder="Post something"
/>
