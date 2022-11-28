<script>
    import Link from "./svine/Link.svelte";

    export let to;
</script>

<div class="text-blue-500 cursor-pointer transition-all hover:text-blue-700">
    <Link {to}>
        <slot />
    </Link>
</div>
