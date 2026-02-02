import { WeatherData, UnitSystem } from '../api/weather';

interface WeatherCardProps {
  data: WeatherData;
  unitSystem: UnitSystem;
}

export const WeatherCard = ({ data, unitSystem }: WeatherCardProps) => {
  const unit = unitSystem === 'metric' ? '°C' : '°F';
  
  return (
    <div className="weather-card">
      <h2>{data.city}</h2>
      <p className="temp">
        {Math.round(data.temp)}{unit}
      </p>

      <img
        src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`}
        alt={data.description}
      />

      <p>{data.description}</p>
      <p>Feels like {Math.round(data.feelsLike)}{unit}</p>
      <p>
        High / Low: {Math.round(data.high)}{unit} / {Math.round(data.low)}{unit}
      </p>
    </div>
  );
};