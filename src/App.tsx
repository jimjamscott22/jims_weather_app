import { useState } from 'react';
import { SearchBar } from './components/SearchBar';
import { WeatherCard } from './components/WeatherCard';
import { Loader } from './components/Loader';
import { UnitToggle } from './components/UnitToggle';
import { fetchCurrentWeather, WeatherData, UnitSystem } from './api/weather';

export const App = () => {
  const [city, setCity] = useState<string>('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [unitSystem, setUnitSystem] = useState<UnitSystem>('metric'); // °C by default

  const handleSearch = async (query: string) => {
    setCity(query);
    setLoading(true);
    setError(null);
    setWeather(null);

    try {
      const data = await fetchCurrentWeather(query, unitSystem);
      setWeather(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  // Re-fetch weather when unit system changes if we already have data
  const handleUnitChange = (newUnit: UnitSystem) => {
    setUnitSystem(newUnit);
    if (city && weather) {
      // Refresh with new unit system
      handleSearch(city);
    }
  };

  return (
    <div className="app">
      <h1>Weather App</h1>
      <UnitToggle unitSystem={unitSystem} onUnitChange={handleUnitChange} />
      <SearchBar onSearch={handleSearch} />

      {loading && <Loader />}

      {error && <p className="error">{error}</p>}

      {weather && <WeatherCard data={weather} unitSystem={unitSystem} />}
    </div>
  );
};