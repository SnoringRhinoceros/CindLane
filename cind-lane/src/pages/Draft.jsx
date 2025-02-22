import { useState, useEffect } from "react";
import SearchBar from "../components/Searchbar";
import data from "../data.json"; // Adjust path if needed

function Draft() {
    const [results, setResults] = useState(null);

    const onSearch = (query) => {
        if (!query.trim()) {
            setResults(null);
            return;
        }

        const playerData = data.find(player =>
            player.player.toLowerCase() === query.toLowerCase()
        );

        setResults(playerData || null);
    };

    return (
        <div>
            <SearchBar onSearch={onSearch} />
            <div>
                {results ? (
                    <div>
                        <h2>{results.player}'s Pokémon Stats</h2>
                        <ul>
                            {results.pokemon.map((poke, index) => (
                                <li key={index}>
                                    <strong>{poke.name}</strong>: {poke.battles} battles, {poke.win_rate}% win rate
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <p>No player found.</p>
                )}
            </div>
        </div>
    );
}

export default Draft;
