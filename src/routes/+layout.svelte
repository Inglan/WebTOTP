<script lang="ts">
    import "../app.css";

    let { children } = $props();
    import { Toaster } from "$lib/components/ui/sonner/index.js";
</script>

<svelte:head>
    <title>WebTOTP</title>
</svelte:head>

<Toaster />
{@render children()}
