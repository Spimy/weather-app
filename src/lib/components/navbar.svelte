<script lang="ts">
	import { page } from '$app/stores';
	let path: string;

	$: path = $page.url.pathname;
</script>

<header>
	<h1>Weather</h1>
	<nav>
		<ul>
			<li><a href="/" class:active={path === '/'}>Home</a></li>
			<li><a href="/about" class:active={path === '/about'}>About</a></li>
			<li><a href="/contact" class:active={path === '/contact'}>Contact</a></li>
		</ul>
	</nav>
</header>

<style lang="scss">
	header {
		text-align: center;

		ul {
			display: flex;
			justify-content: space-evenly;
			list-style: none;
			margin-block: 2em;
			gap: 2em;

			a {
				border-radius: 0.5em;
				padding: 0.7em 1em;
				transition: background-color 0.3s ease, color 0.3s ease;

				&.active {
					background-color: var(--primary-clr);
				}

				&:hover:not(.active) {
					background-color: var(--secondary-clr);
				}
			}
		}

		@media screen and (min-width: 50em) {
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
	}
</style>
