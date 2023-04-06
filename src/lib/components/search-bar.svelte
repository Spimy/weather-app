<script lang="ts">
	import type { Datum } from '$lib/types/city-data';
	import type { PageData } from '../../routes/$types';
	import Icon from '@iconify/svelte';

	export let data: PageData;

	let showLoading: boolean = false;
	let cities: Datum[] = [];
	let timer: number;

	const fetchCities = async (event: KeyboardEvent) => {
		clearTimeout(timer);
		showLoading = true;
		timer = setTimeout(async () => {
			const data: Datum[] = await fetch(
				`/api/cities?query=${(event.target as HTMLInputElement).value}`
			).then((response) => response.json());
			cities = data;
			showLoading = false;
		}, 1000);
	};

	const fillInput = async (event: MouseEvent) => {
		data.location = (event.target as HTMLParagraphElement).innerText;
		cities = [];
	};
</script>

<div class="location_input">
	<input
		type="text"
		id="location"
		name="location"
		placeholder="Location"
		value={data.location}
		on:keyup={fetchCities}
	/>
	<button type="submit"><Icon icon="ion:paper-plane" style="vertical-align: middle;" /></button>

	<div class="results">
		{#if cities.length > 0}
			{#each cities as city}
				<p on:click={fillInput}>{city.city}, {city.countryCode}</p>
			{/each}
		{:else if showLoading}
			<p>Loading...</p>
		{/if}
	</div>
</div>

<style lang="scss">
	.location_input {
		display: flex;
		align-items: center;

		border-radius: 0.5em;
		border: 0.1em solid transparent;
		padding: 0 1em;

		background: linear-gradient(var(--primary-clr), var(--primary-clr)) padding-box,
			linear-gradient(to right, #fff, var(--secondary-clr)) border-box;

		position: relative;
		transition: 0.3s ease;

		&:focus-within {
			border-color: #fff;
			border-image: none;
		}

		input {
			padding: 1em 0;
			width: 100%;
			outline: none;
		}

		button {
			padding: 0.2em;
			font-size: 2em;
			cursor: pointer;
		}

		input,
		button {
			color: #fff;
			background-color: transparent;
			border: none;
		}
	}

	.results {
		position: absolute;
		top: 100%;
		left: 0;
		right: 0;
		z-index: 9999;
		border-radius: inherit;
		margin-block: 1em;
		background-color: var(--primary-clr);

		p {
			border-radius: inherit;
			padding: 1em;
			cursor: pointer;

			&:hover {
				background-color: var(--secondary-clr);
			}
		}
	}
</style>
