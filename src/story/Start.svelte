<script>
    import Input from "../lib/Input.svelte";
    import Link from "../lib/Link.svelte";
    import { pushPassage } from "../lib/svine/stores/passage";
    import { playerName } from "./state/test";
</script>

<div class="flex flex-col gap-3 w-full">
    <h1>First Page</h1>
    <!-- <Input bind:value={$playerName} on:submit={() => pushPassage(Second)} />
    <Link to={Second}>
        Second
    </Link> -->
</div>
