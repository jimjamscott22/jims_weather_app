import { UnitSystem } from '../api/weather';

interface UnitToggleProps {
  unitSystem: UnitSystem;
  onUnitChange: (unit: UnitSystem) => void;
}

export const UnitToggle = ({ unitSystem, onUnitChange }: UnitToggleProps) => {
  return (
    <div className="unit-toggle">
      <button
        className={unitSystem === 'metric' ? 'active' : ''}
        onClick={() => onUnitChange('metric')}
        aria-pressed={unitSystem === 'metric'}
      >
        °C
      </button>
      <button
        className={unitSystem === 'imperial' ? 'active' : ''}
        onClick={() => onUnitChange('imperial')}
        aria-pressed={unitSystem === 'imperial'}
      >
        °F
      </button>
    </div>
  );
};