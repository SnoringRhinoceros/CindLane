import { useState, useEffect, useRef } from "react";
import { pokemonList } from "../data/pokemonList";
import { held_items } from "../data/heldItems";

export default function SearchBar({ onSearchPokemon, onSearchPlayer, onSearchHeldItem, maxSuggestions = 3 }) {
  const [query, setQuery] = useState("");
  const [pokemonSuggestions, setPokemonSuggestions] = useState([]);
  const [heldItemSuggestions, setHeldItemSuggestions] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const suggestionsRef = useRef(null);
  const suggestionRefs = useRef([]);
  suggestionRefs.current = [];

  useEffect(() => {
    if (query.trim() === "") {
      setPokemonSuggestions([]);
      setHeldItemSuggestions([]);
      setSelectedIndex(-1);
    } else {
      const filteredPokemon = pokemonList
        .filter((name) => name.toLowerCase().includes(query.toLowerCase()))
        .slice(0, maxSuggestions);

      const filteredItems = held_items
        .filter((item) => item.toLowerCase().includes(query.toLowerCase()))
        .slice(0, maxSuggestions);

      setPokemonSuggestions(filteredPokemon);
      setHeldItemSuggestions(filteredItems);
      setSelectedIndex(-1);
    }
  }, [query, maxSuggestions]);

  const handleSearch = (e) => {
    e.preventDefault();
    const allSuggestions = [...pokemonSuggestions, ...heldItemSuggestions, "player"];
    if (selectedIndex >= 0) {
      handleSelectSuggestion(allSuggestions[selectedIndex]);
    } else if (query.trim() !== "") {
      if (pokemonSuggestions.length > 0) {
        onSearchPokemon(query);
      } else if (heldItemSuggestions.length > 0) {
        onSearchHeldItem(query);
      } else {
        onSearchPlayer(query);
      }
      setQuery("");
      setPokemonSuggestions([]);
      setHeldItemSuggestions([]);
    }
  };

  const handleSelectSuggestion = (suggestion) => {
    if (suggestion === "player") {
      onSearchPlayer(query);
    } else if (held_items.includes(suggestion)) {
      onSearchHeldItem(suggestion);
    } else {
      onSearchPokemon(suggestion);
    }
    setQuery("");
    setPokemonSuggestions([]);
    setHeldItemSuggestions([]);
    setSelectedIndex(-1);
  };

  const handleKeyDown = (e) => {
    const totalSuggestions = pokemonSuggestions.length + heldItemSuggestions.length + 1;
    if (totalSuggestions === 0) return;

    if (e.key === "ArrowDown") {
      setSelectedIndex((prev) => (prev < totalSuggestions - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : totalSuggestions - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const allSuggestions = [...pokemonSuggestions, ...heldItemSuggestions, "player"];
      if (selectedIndex >= 0) {
        handleSelectSuggestion(allSuggestions[selectedIndex]);
      } else {
        handleSearch(e);
      }
    }
  };

  useEffect(() => {
    if (selectedIndex >= 0 && suggestionRefs.current[selectedIndex]) {
      suggestionRefs.current[selectedIndex].scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  }, [selectedIndex]);

  const formatImageName = (name) =>
    name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');

  return (
    <div className="w-full max-w-md mx-auto relative">
      <form onSubmit={handleSearch} className="relative">
        <svg className="absolute left-3 top-2.5 text-secondary" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.415l-3.85-3.85a1.007 1.007 0 0 0-.115-.098zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
        </svg>
        <input
          type="text"
          placeholder="Search Pokémon, Held Item, or Player"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="pl-10 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-text-accent"
        />
      </form>

      {(pokemonSuggestions.length > 0 || heldItemSuggestions.length > 0 || query.length > 0) && (
        <ul ref={suggestionsRef} className="absolute w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-100 overflow-y-auto scroll-p-2">
          {/* Pokémon Section */}
          {pokemonSuggestions.length > 0 && (
            <>
              <li className="px-4 py-2 font-semibold bg-gray-100">Pokémon</li>
              {pokemonSuggestions.map((suggestion, index) => (
                <li
                  key={`pokemon-${index}`}
                  ref={(el) => suggestionRefs.current[index] = el}
                  className={`flex items-center px-4 py-2 cursor-pointer ${
                    selectedIndex === index ? "bg-blue-200" : "hover:bg-gray-200"
                  }`}
                  onClick={() => handleSelectSuggestion(suggestion)}
                >
                  <img
                    src={`/pokemon_images/roster-${formatImageName(suggestion)}.png`}
                    alt={suggestion}
                    className="w-8 h-8 mr-2 rounded-full"
                  />
                  {suggestion}
                </li>
              ))}
            </>
          )}

          {/* Held Items Section */}
          {heldItemSuggestions.length > 0 && (
            <>
              <li className="px-4 py-2 font-semibold bg-gray-100">Held Items</li>
              {heldItemSuggestions.map((suggestion, index) => {
                const actualIndex = pokemonSuggestions.length + index;
                return (
                  <li
                    key={`held-${index}`}
                    ref={(el) => suggestionRefs.current[actualIndex] = el}
                    className={`flex items-center px-4 py-2 cursor-pointer ${
                      selectedIndex === actualIndex ? "bg-blue-200" : "hover:bg-gray-200"
                    }`}
                    onClick={() => handleSelectSuggestion(suggestion)}
                  >
                    <img
                      src={`/held_item_images/${suggestion.replace(" ", "-")}.png`}
                      alt={suggestion}
                      className="w-8 h-8 mr-2 rounded-full"
                    />
                    {suggestion}
                  </li>
                );
              })}
            </>
          )}

          {/* Player Search Option */}
          {query.length > 0 && (
            <>
              <li className="px-4 py-2 font-semibold bg-gray-100">Players</li>
              <li
                ref={(el) => suggestionRefs.current[pokemonSuggestions.length + heldItemSuggestions.length] = el}
                className={`px-4 py-2 cursor-pointer ${
                  selectedIndex === pokemonSuggestions.length + heldItemSuggestions.length ? "bg-blue-200" : "hover:bg-gray-200"
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
