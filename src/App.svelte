<script>
    import Button from './lib/Button.svelte';
    import { redo, restart, undo } from './lib/svine/stores/passage';
    import { load, save } from './lib/svine/stores/save';
    import Story from './lib/svine/Story.svelte';
    import Start from './story/Start.md';
</script>

<main class="min-h-screen min-w-screen text-white flex">
    <div class="p-6 flex flex-col gap-6 border-r-2 border-background-light min-w-[24rem] justify-between">
        <div>
            <h1 class="text-5xl">Test Game!</h1>
            <h2 class="text-2xl">A really cool test game</h2>
        </div>
        <div class="flex gap-3">
            <Button color="transparent" on:click={undo}>Undo</Button>
            <Button color="transparent" on:click={redo}>Redo</Button>
            <Button color="transparent" on:click={() => restart(Start)}>Restart</Button>
            <Button color="transparent" on:click={() => save()}>Save</Button>
            <Button color="transparent" on:click={() => load()}>Load</Button>
        </div>
    </div>
    <div class="col-span-2 p-6 w-full">
        <Story start={Start} />
    </div>
</main>

<style>
    :global(body) {
        background-color: #171717;
    }
</style>