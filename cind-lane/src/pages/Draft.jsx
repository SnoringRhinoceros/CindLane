import { useState } from "react";
import SearchBar from "../components/Searchbar";
import data from "../data/data.json";
import TeamBox from "../components/TeamBox";
import DraftTabPanel from "../components/DraftTabPanel";
import { pokemonList } from "../data/pokemonList";

const TOTAL_PLAYERS = 5;

function Draft() {
    const [selectedPick, setSelectedPick] = useState(0);
    const [teamResults, setTeamResults] = useState(Array(TOTAL_PLAYERS).fill(null));

    const onSearchPokemon = (query) => {
        if (!query.trim()) return;

        if (pokemonList.some(pokemon => pokemon.toLowerCase() === query.toLowerCase())) {
            setTeamResults((prevList) => {
                const newList = [...prevList];
                newList[selectedPick] = {
                    ...newList[selectedPick],
                    pokemon: query
                };
                return newList;
            });

            // setSelectedPick((prev) => (prev + 1 < TOTAL_PLAYERS ? prev + 1 : 0));
        }
    };

    const onSearchPlayer = (query) => {
        if (!query.trim()) return;

        const playerData = data.find(player => player.player === query);
        if (playerData) {
            setTeamResults((prevList) => {
                const newList = [...prevList];
                newList[selectedPick] = {
                    ...newList[selectedPick],
                    player: playerData
                };
                return newList;
            });

            // setSelectedPick((prev) => (prev + 1 < TOTAL_PLAYERS ? prev + 1 : 0));
        }
    };

    return (
        <div className="h-full flex-grow flex flex-col bg-gray-100">
            <div className="flex flex-col sm:flex-row flex-grow w-full overflow-hidden">
                
                {/* TeamBox Section */}
                <div className="w-full md:w-1/4 bg-white p-4 shadow-md">
                    <TeamBox
                        teamResults={teamResults}
                        selectedPick={selectedPick}
                        setSelectedPick={setSelectedPick}
                    />
                </div>

                {/* Main Content */}
                <div className="flex flex-col flex-grow w-full">
                    <div className="p-4 bg-white shadow-md z-10">
                        <SearchBar
                            onSearchPokemon={onSearchPokemon}
                            onSearchPlayer={onSearchPlayer}
                        />
                    </div>

                    <div className="flex-grow overflow-auto p-4">
                        <DraftTabPanel
                            teamResults={teamResults}
                            selectedPick={selectedPick}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Draft;
