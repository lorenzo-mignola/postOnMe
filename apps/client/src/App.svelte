<style>
</style>

<script lang="ts">
import Router from "svelte-spa-router";
import Header from "./lib/Header.svelte";
import routes from "./routes";
</script>

<main>
  <Header />

  <div>
    <Router routes="{routes}" />
  </div>
</main>
