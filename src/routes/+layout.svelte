<script lang="ts">
	import Navbar from '$lib/navbar.svelte';
	import '../app.scss';
</script>

<main>
	<Navbar />
	<slot />
</main>
