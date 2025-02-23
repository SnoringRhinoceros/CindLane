import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim() !== "") {
      onSearch(query);
      setQuery(""); // Clear the input field after search
    }
  };
  
  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSearch} className="relative">
        <svg className="absolute left-3 top-2.5 text-secondary" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.415l-3.85-3.85a1.007 1.007 0 0 0-.115-.098zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
        </svg>
        <input
          type="text"
          placeholder="Search Player Name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-text-accent"
        />
      </form>
    </div>
  );
}
