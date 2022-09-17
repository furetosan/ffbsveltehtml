<script lang="ts">
    import { fly } from 'svelte/transition';
    export let bgColor: string="white";
</script>

<div class="linha"
    style="
        background-color: {bgColor};
        border-radius: 50px;
        transition: all 1.5s linear;
        ">
</div>

<style>
    .linha {
        aspect-ratio: 1;
        max-width: 120px;
        max-height: 120px;
        min-width: 10px;
        min-height: 10px;
    }
</style>