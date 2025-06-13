<script lang="ts">
    import "../app.css";

    let { children } = $props();
    import { Toaster } from "$lib/components/ui/sonner/index.js";
    import { ModeWatcher } from "mode-watcher";
</script>

<svelte:head>
    <title>WebTOTP</title>
</svelte:head>

<Toaster />

<ModeWatcher disableTransitions={false} />

{@render children()}
