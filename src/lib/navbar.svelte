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
		display: flex;
		justify-content: space-between;

		ul {
			list-style: none;

			li {
				display: inline;
				padding: 1em;

				a {
					color: black;
					text-decoration: none;

					&.active,
					&:hover {
						color: red;
						text-decoration: underline;
					}
				}
			}
		}
	}
</style>
