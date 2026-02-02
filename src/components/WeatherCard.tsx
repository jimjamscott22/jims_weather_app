import { WeatherData, UnitSystem } from '../api/weather';

interface WeatherCardProps {
  data: WeatherData;
  unitSystem: UnitSystem;
}

export const WeatherCard = ({ data, unitSystem }: WeatherCardProps) => {
  const unit = unitSystem === 'metric' ? '°C' : '°F';
  
  return (
    <div className="weather-card">
      <div className="weather-card__header">
        <div>
          <h2 className="weather-card__title">{data.city}</h2>
          <p className="weather-card__condition">{data.description}</p>
        </div>
        <div className="weather-card__icon">
          <img
            src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`}
            alt={data.description}
          />
        </div>
      </div>

      <p className="weather-card__temp">
        {Math.round(data.temp)}{unit}
      </p>

      <div className="weather-card__details">
        <div className="weather-card__stat">
          <span>Feels like</span>
          <strong>{Math.round(data.feelsLike)}{unit}</strong>
        </div>
        <div className="weather-card__stat">
          <span>High / Low</span>
          <strong>
            {Math.round(data.high)}{unit} / {Math.round(data.low)}{unit}
          </strong>
        </div>
      </div>
    </div>
  );
};