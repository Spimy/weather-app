<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData, PageData } from './$types.js';
	import SearchBar from '$lib/components/search-bar.svelte';

	export let data: PageData;
	export let form: ActionData;

	// Defaults to Kelvin
	$: temperature = form?.weatherData?.main.temp;
	let unit = 'K';
	const ABSOLUTE_ZERO = 273.15; // 0 degree celsius

	const convertTemperature = (event: Event) => {
		const target = event.target as HTMLInputElement;
		if (!temperature) return;

		switch (target.value) {
			case 'K': {
				temperature =
					unit === '°C'
						? celsiusToKelvin(temperature)
						: celsiusToKelvin(fahrenheitToCelsius(temperature));
				break;
			}
			case '°C': {
				temperature =
					unit === 'K' ? kelvinToCelsius(temperature) : fahrenheitToCelsius(temperature);
				break;
			}
			case '°F': {
				temperature =
					unit === 'K'
						? celsiusToFahrenheit(kelvinToCelsius(temperature))
						: celsiusToFahrenheit(temperature);
				break;
			}
		}

		unit = target.value;
		temperature = +temperature.toFixed(2);
	};

	const fahrenheitToCelsius = (temperature: number) => (temperature - 32) / 1.8;
	const celsiusToFahrenheit = (temperature: number) => temperature * 1.8 + 32;
	const celsiusToKelvin = (temperature: number) => temperature + ABSOLUTE_ZERO;
	const kelvinToCelsius = (temperature: number) => temperature - ABSOLUTE_ZERO;
</script>

<svelte:head>
	<title>Weather - Home</title>
</svelte:head>

<section>
	<form
		method="POST"
		action="?/getWeather"
		use:enhance={() => {
			return async ({ update }) => {
				await update({ reset: false });
			};
		}}
	>
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
					Temperature: {temperature}
					<select
						on:change={(event) => convertTemperature(event)}
						name="units"
						id="units"
						class="unit-selector"
					>
						<option value="K">K</option>
						<option value="&#176C">&#176C</option>
						<option value="&#176F">&#176F</option>
					</select>
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
		max-width: unset;
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

		.unit-selector {
			font-weight: bold;
			border: none;
			border-radius: 0.3em;
			background-color: var(--secondary-clr);
			color: white;
			padding: 0.3em;

			option {
				background-color: var(--primary-clr);
			}
		}
	}
</style>
