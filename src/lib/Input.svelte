<script>
    import { createEventDispatcher } from "svelte";

    export let value;

    const dispatch = createEventDispatcher();
</script>

<input
    bind:value
    on:keyup={(e) => {
        if (e.key === "Enter") dispatch("submit");
    }}
    type="text"
    class="transition-all ease-out duration-300 bg-background-light text-white focus:bg-white focus:bg-opacity-20 w-full h-12 py-2 px-4 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500"
/>
