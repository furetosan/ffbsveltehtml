import App from './App.svelte';

const leftYellow = '#cb7b68';
const rightGreen = '#257568';

const app = new App({
	target: document.body,
	props: {
		leftYellow: leftYellow,
		// rightGreen: rightGreen,
		// name: 'here we go',
	}
});

export default app;