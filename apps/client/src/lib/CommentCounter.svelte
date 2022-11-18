<script lang="ts">
import CommentIcon from "../assets/CommentIcon.svelte";

export let comment: number;
</script>

<div class="flex items-center">
  <CommentIcon />
  <p data-testid="comments">{comment}</p>
</div>
