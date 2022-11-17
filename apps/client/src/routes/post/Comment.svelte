<script lang="ts">
import type { Post } from "../../lib/client";
import formatDate from "../../util/formatDate";

export let comment: Post["comment"][number];
</script>

<div class="mt=1">
  <hr class="border-gray-500" />
  <p class="mt-2">
    {comment.comment}
  </p>
  <span class="flex justify-between">
    <p class="text-sm text-gray-400">
      by @{comment.author.name}
    </p>
    <p class="text-sm text-gray-400">
      {formatDate(comment.commentedAt)}
    </p>
  </span>
</div>
