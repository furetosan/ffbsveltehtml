<script lang="ts">
    import ColunaBotao from "./ColunaBotao.svelte"
    import Linha from "./Linha.svelte"

    export let audioLigado: boolean = true
    export let jogadorDaVez: number = 1
    export let ganhou: (ganhador: number) => void = () => {}
    export let gs: Array<number> = [
        0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0,
    ]
    export let corDoJogadorDavez: string = 'red'
    let verdeSom = new Audio('verde.mp3')
    let vermelhoSom = new Audio('vermelho.mp3')
    let ganhouSom = new Audio('ganhou.mp3')
    let taValendo: boolean = true
    let quemGanhou: number = 0

    function mudaAudio() {
        if (audioLigado)
            audioLigado = false
        else
            audioLigado = true
    }

    function novoJogo() {
        gs = [
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
        ]
        ganhou(0)
        taValendo = true
    }

    function jogarRodada(coluna) {
        // posicao da peca e jogadorDaVez
        if (gs[coluna]==0) {
            gs[coluna] = jogadorDaVez;
        }
        // animate until stop drop, if it could be
        // how do i get this to work visually?
        if (gs[7+coluna]==0) {
            gs[7+coluna] = gs[coluna];
            gs[coluna] = 0;
        }
        if (gs[14+coluna]==0) {
            gs[14+coluna] = gs[7+coluna];
            gs[7+coluna] = 0;
        }
        if (gs[21+coluna]==0) {
            gs[21+coluna] = gs[14+coluna];
            gs[14+coluna] = 0;
        }
        if (gs[28+coluna]==0) { 
            gs[28+coluna] = gs[21+coluna];
            gs[21+coluna] = 0;
        }
        if (gs[35+coluna]==0) {
            gs[35+coluna] = gs[28+coluna];
            gs[28+coluna] = 0;
        }
        // testar diferentes tipos de vitorias
        for(let i=0;i<39;i++) {
            // quatro direto
            if(gs[i]!=0)
                if(gs[i]==gs[i+1])
                    if(gs[i+1]==gs[i+2])
                        if(gs[i+2]==gs[i+3]) {
                            if (audioLigado) {
                                ganhouSom.play()
                            }
                            ganhou(gs[i])
                            quemGanhou = gs[i]
                            taValendo = false
                        }
        }
        for(let i=0;i<21;i++) {
            // empilhados
            if(gs[i]!=0)
                if(gs[i]==gs[i+7])
                    if(gs[i+7]==gs[i+14])
                        if(gs[i+14]==gs[i+21]) {
                            if (audioLigado) {
                                ganhouSom.play()
                            }
                            ganhou(gs[i])
                            quemGanhou = gs[i]
                            taValendo = false
                        }
        }
        for(let i=0;i<18;i++) {
            // diagonal descendo
            if(gs[i]!=0)
                if(gs[i]==gs[i+8])
                    if(gs[i+8]==gs[i+16])
                        if(gs[i+16]==gs[i+24]) {
                            if (audioLigado) {
                                ganhouSom.play()
                            }
                            ganhou(gs[i])
                            quemGanhou = gs[i]
                            taValendo = false
                        }
        }
        for(let i=0;i<24;i++) {
            // diagonal subindo
            if(gs[i]!=0)
                if(gs[i]==gs[i+6])
                    if(gs[i+6]==gs[i+12])
                        if(gs[i+12]==gs[i+18]) {
                            if(audioLigado) {
                                ganhouSom.play()
                            }
                            ganhou(gs[i])
                            quemGanhou = gs[i]
                            taValendo = false
                        }
        }
        if (taValendo) {
            if (jogadorDaVez==1) {
                if (audioLigado) {
                    verdeSom.play()
                }
                jogadorDaVez=2
            }
            else {
                if (audioLigado) {
                    vermelhoSom.play()
                }
                jogadorDaVez=1
            }
            corDoJogadorDavez = jogadorDaVez == 1 ? 'red' : 'green'
        }
    }
</script>

<main>
    <h1>Jogo das Quatro Pe&ccedil;as!</h1>
    <center>
        <span >
            {#if taValendo}
                &Eacute; a vez do jogador {jogadorDaVez}!
            {:else}
                O jogador {quemGanhou} ganhou!
            {/if}
            <div draggable=true>
                <Linha bgColor="{corDoJogadorDavez}" />
            </div>
        </span>
    </center>
    <button on:click={novoJogo}>
        Novo Jogo
    </button>
    <button on:click={mudaAudio}>
        {#if audioLigado}
            Desligar som
        {:else}
            Ligar som
        {/if}
    </button>
    {#if taValendo}
        <h3>Clique em uma das colunas para jogar! &Eacute; a vez do jogador {jogadorDaVez}!</h3>
    {:else}
        <h3>O jogador {quemGanhou} ganhou! Clique em Novo Jogo para come&ccedil;ar de novo.</h3>
    {/if}
    <div class="colunas">
        <ColunaBotao disabled={!taValendo} coluna={0} gs={gs} onClickColuna={() => {jogarRodada(0)}} />
        <ColunaBotao disabled={!taValendo} coluna={1} gs={gs} onClickColuna={() => {jogarRodada(1)}} />
        <ColunaBotao disabled={!taValendo} coluna={2} gs={gs} onClickColuna={() => {jogarRodada(2)}} />
        <ColunaBotao disabled={!taValendo} coluna={3} gs={gs} onClickColuna={() => {jogarRodada(3)}} />
        <ColunaBotao disabled={!taValendo} coluna={4} gs={gs} onClickColuna={() => {jogarRodada(4)}} />
        <ColunaBotao disabled={!taValendo} coluna={5} gs={gs} onClickColuna={() => {jogarRodada(5)}} />
        <ColunaBotao disabled={!taValendo} coluna={6} gs={gs} onClickColuna={() => {jogarRodada(6)}} />
    </div>
</main>

<style>
	h1 {
		text-transform: uppercase;
		font-size: 2em;
		font-weight: 100;
	}
</style>