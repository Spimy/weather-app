import { error, type RequestHandler } from '@sveltejs/kit';
import * as CityAPI from '$lib/api/city.api';
import type { CityData } from '$lib/types/city-data';

export const GET: RequestHandler = async ({ fetch, url }) => {
	const query = url.searchParams.get('query');
	if (!query) throw error(400, 'No params provided.');

	const searchParams = new URLSearchParams({
		namePrefix: query,
		minPopulation: '1'
	});

	const cityData: CityData = await fetch(`${CityAPI.endpoint}?${searchParams.toString()}`, {
		headers: CityAPI.headers
	}).then((response) => response.json());

	console.log(cityData);

	return new Response(JSON.stringify(cityData.data));
};
