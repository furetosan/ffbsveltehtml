<script lang="ts">
    import Linha from "./Linha.svelte";
    export let coluna: number = 0;
    export let gs: number[];
    export let onClickColuna: (coluna: string) => void = () => {};
    export let disabled: boolean = false
    
    function clicou(coluna) {
        onClickColuna(coluna);
    }

</script>

<button class="botao" on:click={() => clicou({coluna})} disabled={disabled}>
    <div class="divInternaBotao">
        <Linha bgColor={gs[coluna] == 1 ? "red" : gs[coluna] == 2? "green": "white"} />
        <Linha bgColor={gs[7+coluna] == 1 ? "red" : gs[7+coluna] == 2? "green": "white"} />
        <Linha bgColor={gs[14+coluna] == 1 ? "red" : gs[14+coluna] == 2? "green": "white"} />
        <Linha bgColor={gs[21+coluna] == 1 ? "red" : gs[21+coluna] == 2? "green": "white"} />
        <Linha bgColor={gs[28+coluna] == 1 ? "red" : gs[28+coluna] == 2? "green": "white"} />
        <Linha bgColor={gs[35+coluna] == 1 ? "red" : gs[35+coluna] == 2? "green": "white"} />
    </div>
</button>

<style>
    .botao {
        border-radius: 20px;
        width: 13%;
        max-width: 120px;
    }
    .divInternaBotao {
        display: flex;
        flex-direction: column;
    }
</style>