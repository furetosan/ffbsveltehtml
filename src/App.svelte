<script lang="ts">
	import GameFLDQ from "./GameFLDQ.svelte";
	// export let name: string;
	// export let leftYellow: string;
	export let jogadorGanhador: number = 0;
	// export let rightGreen: string;
	function ganhou (ganhador: number) {
		console.log("ta chamando")
		jogadorGanhador = ganhador;
	}
</script>

<main>
	<GameFLDQ ganhou={ganhou} />
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		/* max-width: 240px; */
		margin: 0 auto;
	}
	/*
	.yellow {
		background-color: #cb7b68;
		width: 20px;
		height: 20px;
		float: left;
	}
	*//* -- bizuiandu!
	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
	*/
</style>