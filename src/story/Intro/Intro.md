<script>
    import Input from "../../lib/Input.svelte";
    import Link from "../../lib/Link.svelte";
    import { pushPassage } from "../../lib/svine/stores/passage";
    import { playerName } from "../state/player";
    import Intro2 from "./Intro2.md";
</script>

The morning sun greeted her like a furious torch. Golden beams of light glittered across innumerable cloudtops as Rainbow Dash glided towards the fiery horizon. She felt a cold gust of air rippling across her tail, and she knew the final throes of night were over.

Rainbow Dash took a deep breath. A pair of shaded goggles reflected a green world as she tilted her gaze earthward. Pulling her wings to her sides, Rainbow effortlessly dove down through the cloudcover until she was skimming a series of rolling emerald hilltops. Sporadic ponds and rippling blue streams interrupted what was otherwise an immaculate landscape of high grass and bushy knolls. Several lakes loomed in the distance ahead, sparkling platinum reflections of the rising sun.

Rainbow's nostrils flared. As she darted mere inches over pond fronds and cattails, she was greeted with every scent and flavor of spring. On a whim, she spun upside down—gliding—and allowed her wings to break the top of several emerald blades. As a result, she was christened with a liberal spray of fresh dew. The sensation was cold, tickling the skin beneath her blue coat.

It was the first thing that made her smile in hours.

<Input bind:value={$playerName} on:submit={() => pushPassage(Intro2)} />

<Link to={Intro2}>
    Continue
</Link>