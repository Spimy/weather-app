<script lang="ts">
	import Navbar from '$lib/components/navbar.svelte';
	import '../app.scss';

	const currentYear = new Date().getFullYear();
</script>

<main>
	<Navbar />

	<slot />

	<footer>
		<p>Copyright &#169; {currentYear} Spimy</p>
	</footer>
</main>

<style lang="scss">
	footer {
		position: fixed;
		bottom: 0;
		width: 100%;
		left: 0;
		text-align: center;
		padding: 1em;
	}
</style>
