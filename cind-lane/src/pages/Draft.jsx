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
        if (!query.trim()) {
            setResults(null);
            return;
        }

        if (pokemonList.some(pokemon => pokemon.toLowerCase() == (query.toLowerCase()))) {
            setTeamResults((prevList) => {
                const newList = [...prevList];
                newList[selectedPick] = {
                    ...newList[selectedPick],
                    pokemon: query
                };
                return newList;
            });
            setSelectedPick((prevSelected) => prevSelected + 1 < TOTAL_PLAYERS ? prevSelected + 1 : 0);
        }
    }

    const onSearchPlayer = (query) => {
        if (!query.trim()) {
            setResults(null);
            return;
        }

        const playerData = data.find(player =>
            player.player === query
        );

        if (playerData) {
            setTeamResults((prevList) => {
                const newList = [...prevList];
                newList[selectedPick] = { 
                    ...newList[selectedPick],
                    player: playerData
                };
                return newList;
            });
            
    
            setSelectedPick((prevSelected) => prevSelected + 1 < TOTAL_PLAYERS ? prevSelected + 1 : 0);
        }
    }

    return (
        <div className="h-full flex flex-col overflow-hidden">

            <div className="flex flex-grow w-full overflow-hidden">
                <div className="w-1/4 bg-background flex items-center justify-center">
                    <TeamBox teamResults={teamResults} selectedPick={selectedPick} setSelectedPick={setSelectedPick} />
                </div>
                
                <div className="flex flex-col h-full w-full" >
                    <div className="flex items-center justify-center p-4">
                        <SearchBar onSearchPokemon={onSearchPokemon} onSearchPlayer={onSearchPlayer} />
                    </div>
                    <DraftTabPanel teamResults={teamResults} selectedPick={selectedPick}></DraftTabPanel>
                </div>

                {/* <div className="w-1/4 bg-background flex items-center justify-center">
                    <TeamBox />
                </div> */}
            </div>
        </div>
    );
}


export default Draft;
