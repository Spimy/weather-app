import { CITY_API_KEY, CITY_API_HOST } from '$env/static/private';

export const headers = {
	'X-RapidAPI-Key': CITY_API_KEY,
	'X-RapidAPI-Host': CITY_API_HOST
};

export const endpoint = `https://${CITY_API_HOST}/v1/geo/cities`;
