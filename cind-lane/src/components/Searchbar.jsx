import { useState, useEffect, useRef } from "react";
import { pokemonList } from "../data/pokemonList";

export default function SearchBar({ onSearchPokemon, onSearchPlayer, maxSuggestions = 5 }) {
  const [query, setQuery] = useState("");
  const [pokemonSuggestions, setPokemonSuggestions] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const suggestionsRef = useRef(null);

  useEffect(() => {
    if (query.trim() === "") {
      setPokemonSuggestions([]);
      setSelectedIndex(-1);
    } else {
      const filteredPokemon = pokemonList
        .filter((name) => name.toLowerCase().includes(query.toLowerCase()))
        .slice(0, maxSuggestions);

      setPokemonSuggestions(filteredPokemon);
      setSelectedIndex(-1);
    }
  }, [query, maxSuggestions]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (selectedIndex >= 0) {
      const allSuggestions = [...pokemonSuggestions, "player"];
      handleSelectSuggestion(allSuggestions[selectedIndex]);
    } else if (query.trim() !== "") {
      if (pokemonSuggestions.length > 0) {
        onSearchPokemon(query);
      } else {
        onSearchPlayer(query);
      }
      setQuery("");
      setPokemonSuggestions([]);
    }
  };

  const handleSelectSuggestion = (suggestion) => {
    if (suggestion === "player") {
      onSearchPlayer(query);
    } else {
      onSearchPokemon(suggestion);
    }
    setQuery(suggestion === "player" ? query : suggestion);
    setPokemonSuggestions([]);
    setQuery("")
    setSelectedIndex(-1);
  };

  const handleKeyDown = (e) => {
    const totalSuggestions = pokemonSuggestions.length + 1; // +1 for player search option
    if (totalSuggestions === 0) return;

    if (e.key === "ArrowDown") {
      setSelectedIndex((prev) => (prev < totalSuggestions - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : totalSuggestions - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex >= 0) {
        const allSuggestions = [...pokemonSuggestions, "player"];
        handleSelectSuggestion(allSuggestions[selectedIndex]);
      } else {
        handleSearch(e);
      }
    }
  };

  useEffect(() => {
    if (suggestionsRef.current && selectedIndex >= 0) {
      const selectedElement = suggestionsRef.current.children[selectedIndex];
      if (selectedElement) {
        selectedElement.scrollIntoView({ block: "nearest", behavior: "smooth" });
      }
    }
  }, [selectedIndex]);

  return (
    <div className="w-full max-w-md mx-auto relative">
      <form onSubmit={handleSearch} className="relative">
        <svg className="absolute left-3 top-2.5 text-secondary" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.415l-3.85-3.85a1.007 1.007 0 0 0-.115-.098zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
        </svg>
        <input
          type="text"
          placeholder="Search Pokémon or Player"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="pl-10 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-text-accent"
        />
      </form>

      {(pokemonSuggestions.length > 0 || query.length > 0) && (
        <ul ref={suggestionsRef} className="absolute w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
          {/* Pokémon Section */}
          {pokemonSuggestions.length > 0 && (
            <>
              <li className="px-4 py-2 font-semibold bg-gray-100">Pokémon</li>
              {pokemonSuggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className={`flex items-center px-4 py-2 cursor-pointer ${
                    selectedIndex === index ? "bg-blue-200" : "hover:bg-gray-200"
                  }`}
                  onClick={() => handleSelectSuggestion(suggestion)}
                >
                  <img src={`/pokemon_images/roster-${suggestion.toLowerCase().replace(/\s+/g, '-')}.png`} alt={suggestion} className="w-8 h-8 mr-2 rounded-full" />
                  {suggestion}
                </li>
              ))}
            </>
          )}

          {/* Player Search Option */}
          {query.length > 0 && (
            <>
              <li className="px-4 py-2 font-semibold bg-gray-100">Players</li>
              <li
                className={`px-4 py-2 cursor-pointer ${
                  selectedIndex === pokemonSuggestions.length ? "bg-blue-200" : "hover:bg-gray-200"
                }`}
                onClick={() => handleSelectSuggestion("player")}
              >
                Search for player <strong>{query}</strong>
              </li>
            </>
          )}
        </ul>
      )}
    </div>
  );
}
