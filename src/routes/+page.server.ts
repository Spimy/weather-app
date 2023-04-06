import type { PageServerLoad } from './$types';
import { fail, type Actions } from '@sveltejs/kit';
import {
	isRateLimited,
	type LocationData,
	type LocationRateLimited
} from '$lib/types/location-data';
import type { WeatherData } from '$lib/types/weather-data';
import * as WeatherAPI from '$lib/api/weather.api';

interface Data {}

export const load: PageServerLoad<Data> = async ({ getClientAddress, fetch }) => {
	const clientIp = getClientAddress();
	if (!clientIp) return;

	const location: LocationData | LocationRateLimited = await fetch(
		`https://ipapi.co/${clientIp}/json`
	).then((response) => response.json());

	if (isRateLimited(location)) return { location: '' };

	return { location: `${location.city}, ${location.country_code}` };
};

export const actions: Actions = {
	getWeather: async ({ request, fetch }) => {
		const data = await request.formData();
		const location = data.get('location');

		if (!location) {
			return fail(400, { message: 'A location was not provided.', weatherData: undefined });
		}

		const weatherData: WeatherData = await fetch(WeatherAPI.endpoint(location.toString())).then(
			(response) => response.json()
		);

		return { message: 'Weather data fetched.', weatherData };
	}
};
