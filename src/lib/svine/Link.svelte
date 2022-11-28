<script>
    import { pushPassage } from './stores/passage.js'

    export let to;

    function onNavigate() {
        pushPassage(to);
    }
</script>

<button on:click={onNavigate} on:keypress={onNavigate}>
    <slot></slot>
</button>
