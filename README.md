# Weather App

A modern, responsive weather application built with React and Vite that allows users to search for cities and view current weather conditions with support for both Celsius and Fahrenheit units.

## Features

- 🔍 **City Search**: Search for any city worldwide by name
- 🌡️ **Temperature Display**: Current temperature, feels-like temperature, and high/low temperatures
- 🌤️ **Weather Conditions**: Visual weather icons and descriptive text
- 🔄 **Unit Toggle**: Switch between Celsius (°C) and Fahrenheit (°F)
- ⚡ **Fast & Responsive**: Built with Vite for optimal performance
- 🎨 **Clean UI**: Simple, intuitive interface with error handling
- ♿ **Accessible**: ARIA labels and keyboard navigation support

## Tech Stack

- **React 18** - UI library with functional components and hooks
- **TypeScript** - Type safety and better developer experience
- **Vite** - Fast build tool and development server
- **Open-Meteo API** - Free weather data source (no API key required!)

## Prerequisites

- Node.js 16+ and npm/yarn/pnpm
- No API key needed! This app uses the free Open-Meteo API

## Setup Instructions

### 1. Clone or Download the Project

```bash
cd Jims_Weather_App
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

That's it! No API key setup needed.

## Usage

1. **Search for a city**: Type a city name (e.g., "London", "Tokyo", "New York") and click Search
2. **Toggle units**: Click °C or °F buttons to switch temperature units
3. **View weather**: See current conditions, temperatures, and weather description

## Project Structure

```
Jims_Weather_App/
├── public/
│   └── index.html              # HTML template
├── src/
│   ├── api/
│   │   └── weather.ts          # Weather API service and types
│   ├── components/
│   │   ├── Loader.tsx           # Loading indicator
│   │   ├── SearchBar.tsx        # City search input
│   │   ├── UnitToggle.tsx       # °C/°F toggle button
│   │   └── WeatherCard.tsx      # Weather display component
│   ├── App.tsx                  # Root component
│   ├── index.css                # Global styles
│   └── main.tsx                 # Application entry point
├── .env.example                 # Environment variable template
├── .gitignore                   # Git ignore rules
├── package.json                 # Dependencies and scripts
├── tsconfig.json                # TypeScript configuration
└── vite.config.ts               # Vite configuration
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint to check code quality |

## API Details

This app uses the free Open-Meteo Weather API:

- **Geocoding API**: `https://geocoding-api.open-meteo.com/v1/search` - converts city names to coordinates
- **Forecast API**: `https://api.open-meteo.com/v1/forecast` - fetches current weather data
- **No API Key Required**: Completely free for non-commercial use
- **Rate Limit**: Generous limits for non-commercial applications
- **Coverage**: Global weather data from national weather services

Learn more at [https://open-meteo.com/](https://open-meteo.com/)

## Architecture Decisions

### Component Separation
- **Service Layer** (`api/weather.ts`): Isolates API logic from UI, making it easy to swap providers or add caching
- **Presentational Components**: Small, reusable components with clear responsibilities
- **State Management**: Minimal app state in `App.tsx` - no need for complex state management for this scope

### Why This Structure?
- **Maintainability**: Clear separation of concerns makes the codebase easy to understand and modify
- **Testability**: Isolated components and service functions are easier to unit test
- **Performance**: Vite provides fast hot module replacement and optimized builds
- **Accessibility**: ARIA attributes and semantic HTML ensure the app works with screen readers

## Error Handling

The app handles several error scenarios:

- **Invalid city**: Shows user-friendly error message from API
- **Network issues**: Displays error when API is unreachable
- **Missing API key**: Warns in console if environment variable is not set
- **Loading states**: Shows loading indicator during API calls

## Future Improvements

Here are potential enhancements for future versions:

### High Priority
- [ ] **Persist Preferences**: Save unit preference and last searched city in localStorage
- [ ] **Geolocation**: Auto-detect user's location on first load
- [ ] **Caching**: Implement simple in-memory cache to reduce API calls
- [ ] **Unit Tests**: Add tests for API service and components

### Medium Priority
- [ ] **Dark Mode**: Add dark theme toggle with system preference detection
- [ ] **Responsive Design**: Optimize for mobile devices and tablets
- [ ] **Internationalization**: Support multiple languages
- [ ] **Accessibility**: More comprehensive ARIA labels and keyboard navigation

### Low Priority
- [ ] **Offline Support**: Service worker for offline functionality
- [ ] **Weather Forecasts**: 5-day forecast display
- [ ] **Weather Maps**: Interactive weather visualization
- [ ] **Favorites List**: Save frequently searched cities

## Troubleshooting

### Common Issues
- **City not found**: Make sure you're entering a valid city name
- **Module not found**: Run `npm install` to ensure all dependencies are installed
- **Port already in use**: Vite will automatically find an available port
- **Build errors**: Ensure TypeScript and ESLint are installed correctly

## Contributing

This is a personal learning project. Feel free to fork, modify, and use as a starting point for your own projects.

## License

This project is open source and available under the MIT License.

## Acknowledgments

- Weather data provided by [OpenWeatherMap](https://openweathermap.org/)
- Built with [React](https://react.dev/) and [Vite](https://vitejs.dev/)

---

**Built with ❤️ using React and Vite**