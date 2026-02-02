export interface WeatherData {
  city: string;
  temp: number;      // Current temperature in selected units
  feelsLike: number; // Feels-like temperature in selected units
  description: string;
  icon: string;      // Weather code as string
  high: number;       // High temperature in selected units
  low: number;       // Low temperature in selected units
}

export type UnitSystem = 'metric' | 'imperial';

// Weather code to description mapping for Open-Meteo
const WEATHER_CODES: Record<number, string> = {
  0: 'Clear sky',
  1: 'Mainly clear',
  2: 'Partly cloudy',
  3: 'Overcast',
  45: 'Foggy',
  48: 'Foggy',
  51: 'Light drizzle',
  53: 'Moderate drizzle',
  55: 'Dense drizzle',
  61: 'Slight rain',
  63: 'Moderate rain',
  65: 'Heavy rain',
  71: 'Slight snow',
  73: 'Moderate snow',
  75: 'Heavy snow',
  77: 'Snow grains',
  80: 'Slight rain showers',
  81: 'Moderate rain showers',
  82: 'Violent rain showers',
  85: 'Slight snow showers',
  86: 'Heavy snow showers',
  95: 'Thunderstorm',
  96: 'Thunderstorm with slight hail',
  99: 'Thunderstorm with heavy hail',
};

/**
 * Geocode a city name to get latitude and longitude using Open-Meteo Geocoding API.
 * @param city - City name (e.g., "London")
 * @returns Object with latitude, longitude, name, and country
 */
async function geocodeCity(city: string) {
  const geoUrl = new URL('https://geocoding-api.open-meteo.com/v1/search');
  geoUrl.searchParams.set('name', city);
  geoUrl.searchParams.set('count', '1');
  geoUrl.searchParams.set('language', 'en');
  geoUrl.searchParams.set('format', 'json');

  try {
    const res = await fetch(geoUrl.toString());
    if (!res.ok) {
      throw new Error(`Geocoding error: ${res.status}`);
    }

    const data = await res.json();
    if (!data.results || data.results.length === 0) {
      throw new Error('City not found');
    }

    const result = data.results[0];
    return {
      latitude: result.latitude,
      longitude: result.longitude,
      name: result.name,
      country: result.country,
    };
  } catch (err) {
    throw err instanceof Error ? err : new Error('Geocoding failed');
  }
}

/**
 * Fetch current weather for a city using Open-Meteo Weather API.
 * No API key required!
 *
 * @param city - City name (e.g., "London")
 * @param unitSystem - 'metric' for Celsius, 'imperial' for Fahrenheit
 * @returns WeatherData or throws an Error with a user‑friendly message
 */
export async function fetchCurrentWeather(
  city: string,
  unitSystem: UnitSystem = 'metric'
): Promise<WeatherData> {
  try {
    // First, geocode the city name to get coordinates
    const geoData = await geocodeCity(city);

    // Then fetch weather data for those coordinates
    const weatherUrl = new URL('https://api.open-meteo.com/v1/forecast');
    weatherUrl.searchParams.set('latitude', geoData.latitude.toString());
    weatherUrl.searchParams.set('longitude', geoData.longitude.toString());
    weatherUrl.searchParams.set('current', 'temperature_2m,weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature');
    weatherUrl.searchParams.set('temperature_unit', unitSystem === 'metric' ? 'celsius' : 'fahrenheit');

    const weatherRes = await fetch(weatherUrl.toString());
    if (!weatherRes.ok) {
      throw new Error(`Weather API error: ${weatherRes.status}`);
    }

    const weatherData = await weatherRes.json();
    const current = weatherData.current;

    // Map the API response into our WeatherData shape
    return {
      city: `${geoData.name}, ${geoData.country}`,
      temp: current.temperature_2m,
      feelsLike: current.apparent_temperature,
      description: WEATHER_CODES[current.weather_code] || 'Unknown',
      icon: current.weather_code.toString(),
      high: current.temperature_2m_max,
      low: current.temperature_2m_min,
    };
  } catch (err) {
    // Re‑throw to let caller decide how to display
    throw err instanceof Error ? err : new Error('Unexpected error');
  }
}