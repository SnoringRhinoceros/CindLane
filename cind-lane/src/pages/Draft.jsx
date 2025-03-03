import { useState } from "react";
import SearchBar from "../components/Searchbar";
import data from "../data.json";
import TeamBox from "../components/TeamBox";
import DraftTabPanel from "../components/DraftTabPanel";

function Draft() {
    const [results, setResults] = useState(null);
    const [selectedPick, setSelectedPick] = useState(0);

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

            <div className="flex flex-grow w-full overflow-hidden">
                <div className="w-1/4 bg-background flex items-center justify-center">
                    <TeamBox searchResults={results} selectedPick={selectedPick} setSelectedPick={setSelectedPick} />
                </div>
                
                <div className="flex flex-col h-full w-full" >
                    <div className="flex items-center justify-center p-4">
                        <SearchBar onSearch={onSearch} />
                    </div>
                    <DraftTabPanel results={results} selectedPick={selectedPick}></DraftTabPanel>
                </div>

                {/* <div className="w-1/4 bg-background flex items-center justify-center">
                    <TeamBox />
                </div> */}
            </div>
        </div>
    );
}


export default Draft;
