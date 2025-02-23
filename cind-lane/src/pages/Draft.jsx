import { useState } from "react";
import SearchBar from "../components/Searchbar";
import data from "../data.json";
import TeamBox from "../components/TeamBox";
import DraftTab from "../components/DraftTab";

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

        setResults(playerData);
    };

    return (
        <div className="h-full flex flex-col overflow-hidden">
            <div className="flex items-center justify-center p-4">
                <SearchBar onSearch={onSearch} />
            </div>

            <div className="flex flex-grow w-full overflow-hidden">
                <div className="w-1/4 bg-background flex items-center justify-center">
                    <TeamBox searchResults={results} />
                </div>

                <div className="flex flex-col w-full h-full">
                    <div className="flex flex-row">
                        <DraftTab></DraftTab>
                        <DraftTab></DraftTab>
                    </div>
                    {/* Center Stats */}
                    <div className="w-full max-w-4xl min-h-[80vh] flex flex-col md:flex-row items-center justify-center p-8 rounded-lg shadow-lg bg-gray-200">
                        {results ? (
                            <div className="text-center flex flex-col w-full h-full">
                                <h2 className="text-lg font-semibold text-primary">{results.player}'s Pokémon Stats</h2>

                                <div className="flex-grow w-full overflow-y-auto px-4">
                                    <ul className="mt-2 space-y-2">
                                        {results.pokemon.map((poke, index) => (
                                            <li key={index} className="text-sm">
                                                <strong>{poke.name}</strong>: {poke.battles} battles, {poke.win_rate}% win rate
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ) : (
                            <p className="text-gray-500">No player found.</p>
                        )}
                    </div>
                </div>
            

                {/* <div className="w-1/4 bg-gray-200 flex items-center justify-center">
                    <TeamBox />
                </div> */}
            </div>
        </div>
    );
}


export default Draft;
