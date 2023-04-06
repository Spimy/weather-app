import { WEATHER_API_KEY } from '$env/static/private';

export const endpoint = (location: string) =>
	`https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=${WEATHER_API_KEY}`;
