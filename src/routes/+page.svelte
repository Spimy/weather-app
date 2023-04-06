<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms';
	import type { ActionData, PageData } from './$types.js';
	import SearchBar from '$lib/components/search-bar.svelte';

	export let data: PageData;
	export let form: ActionData;

	const clearForm: SubmitFunction = () => {
		return async ({ update }) => {
			await update({ reset: true });
		};
	};
</script>

<section>
	<form method="POST" action="?/getWeather" use:enhance={clearForm}>
		<label for="location">Location</label>
		<SearchBar {data} />
	</form>
</section>

{#if form && form.weatherData && form.weatherData.weather?.length > 0}
	<section class="weather-display">
		<div>
			<img
				src="https://openweathermap.org/img/wn/{form.weatherData.weather[0].icon}@2x.png"
				alt="{form.weatherData.weather[0].description} icon"
			/>
			<div>
				<h2>
					{form.weatherData.weather[0].main}
				</h2>
				<p>
					<span>({form.weatherData.weather[0].description})</span>
					<br />
					Temperature: {form.weatherData.main.temp}K
					<br />
					Humidity: {form.weatherData.main.humidity}%
					<br />
				</p>
				<div>
					<h3>Wind</h3>
					<p>
						Speed: {form.weatherData.wind.speed}ms<sup>-1</sup>
						<br />
						Direction: {form.weatherData.wind.deg}&#176;
					</p>
				</div>
			</div>
		</div>
	</section>
{/if}

<style lang="scss">
	section {
		margin-block: 2em;
	}

	.weather-display {
		display: flex;
		justify-content: center;
		padding: 0 2em 2em;
		border-radius: 0.5em;
		background-color: var(--primary-clr);

		img {
			width: 15em;
			height: auto;
			margin-bottom: -3em;
		}

		h2 {
			font-size: 5em;
		}

		p {
			span {
				font-size: 1rem;
			}
			font-size: 1.5em;
			margin-bottom: 2em;
		}

		@media screen and (min-width: 50em) {
			> div {
				width: 100%;
				display: flex;
				flex-direction: row;
				align-items: center;
				gap: 1em;
				padding-block: 3em;

				div {
					margin: 2em 0;
				}

				p {
					margin: 0;
				}

				img {
					width: 20em;
				}
			}
		}
	}
</style>
