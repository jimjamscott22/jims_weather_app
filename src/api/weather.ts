export interface WeatherData {
  city: string;
  temp: number;      // Current temperature in selected units
  feelsLike: number; // Feels-like temperature in selected units
  description: string;
  icon: string;      // OpenWeatherMap icon code
  high: number;       // High temperature in selected units
  low: number;       // Low temperature in selected units
}

export type UnitSystem = 'metric' | 'imperial';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

if (!API_KEY) {
  console.warn('Missing Vite env var: VITE_OPENWEATHER_API_KEY');
}

/**
 * Fetch current weather for a city using OpenWeatherMap's Current Weather API.
 *
 * @param city - City name (e.g., "London")
 * @param unitSystem - 'metric' for Celsius, 'imperial' for Fahrenheit
 * @returns WeatherData or throws an Error with a user‑friendly message
 */
export async function fetchCurrentWeather(
  city: string,
  unitSystem: UnitSystem = 'metric'
): Promise<WeatherData> {
  const url = new URL('https://api.openweathermap.org/data/2.5/weather');
  url.searchParams.set('q', city);
  url.searchParams.set('appid', API_KEY ?? '');
  url.searchParams.set('units', unitSystem); // OpenWeatherMap handles conversion

  try {
    const res = await fetch(url.toString());
    if (!res.ok) {
      // Try to parse error message from body
      let msg = `Error ${res.status}`;
      try {
        const errBody = await res.json();
        msg = errBody.message || msg;
      } catch {}
      throw new Error(msg);
    }

    const json = await res.json();

    // Map the API response into our WeatherData shape
    return {
      city: `${json.name}, ${json.sys.country}`,
      temp: json.main.temp,
      feelsLike: json.main.feels_like,
      description: json.weather[0].description,
      icon: json.weather[0].icon,
      high: json.main.temp_max,
      low: json.main.temp_min,
    };
  } catch (err) {
    // Re‑throw to let caller decide how to display
    throw err instanceof Error ? err : new Error('Unexpected error');
  }
}