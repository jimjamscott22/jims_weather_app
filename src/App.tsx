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
      <header className="app__header">
        <p className="app__eyebrow">Insert City</p>
        <h1 className="app__title">Jim&apos;s Weather Arcade</h1>
        <p className="app__subtitle">High-score forecasts, no quarters required.</p>
      </header>

      <div className="app__controls">
        <UnitToggle unitSystem={unitSystem} onUnitChange={handleUnitChange} />
        <SearchBar onSearch={handleSearch} />
      </div>

      <div className="app__content">
        {loading && <Loader />}

        {error && <p className="error">{error}</p>}

        {weather && <WeatherCard data={weather} unitSystem={unitSystem} />}
      </div>
    </div>
  );
};