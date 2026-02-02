import { useState, FormEvent } from 'react';

interface SearchBarProps {
  onSearch: (city: string) => void;
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query.trim()) return;
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <input
        type="text"
        value={query}
        placeholder="Enter city name"
        onChange={(e) => setQuery(e.target.value)}
        aria-label="City name"
        className="search-bar__input"
      />
      <button type="submit" className="search-bar__button">
        Search
      </button>
    </form>
  );
};