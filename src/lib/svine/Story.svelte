<script>
    import { onMount } from "svelte";
    import { fade } from "svelte/transition";
    import { pushPassage, passageHistory, currentPassage } from "./stores/passage.js";

    export let start = null;

    onMount(() => {
        if (!$passageHistory.length) pushPassage(start);
    });
</script>

{#key $currentPassage}
    <div in:fade>
        <svelte:component this={$currentPassage} />
    </div>
{/key}
