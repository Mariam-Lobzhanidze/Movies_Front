import { useState } from "react";

interface SearchBarProps {
  onSearchQueryChange: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearchQueryChange }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentValue = e.target.value;
    setQuery(currentValue);
    onSearchQueryChange(currentValue);
  };

  return (
    <form role="search">
      <input
        type="search"
        className="form-control form-control-sm bg-transparent"
        placeholder="Search movies..."
        aria-label="Search"
        value={query}
        onChange={handleSearch}
      />
    </form>
  );
};

export default SearchBar;
