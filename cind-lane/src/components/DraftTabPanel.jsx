import DraftTab from "../components/DraftTab";
import { useEffect, useState } from "react";



function DraftTabPanel({ teamResults, selectedPick }) {

    const [activeTab, setActiveTab] = useState("Team");

    const calculateOverallTeamWinRate = () => {
        const teamWinRates = teamResults.map((player) => {
            if (player && player.player && player.player.pokemon) {
                return player.player.pokemon[0].win_rate;
            }
            return 0;
        });

        const totalWinRate = teamWinRates.reduce((acc, curr) => acc + curr, 0);
        return totalWinRate / teamWinRates.length;
    }
    
    const renderCenterContent = () => {
        if (activeTab === "Player") {
            return (
                <div className="flex flex-col w-full h-full">
                    {teamResults && teamResults[selectedPick] && teamResults[selectedPick].player ? (
                            <div className="flex flex-col w-full h-full">
                                <h2 className="text-lg font-semibold text-primary">{teamResults[selectedPick].player.player}'s Pokémon Stats</h2>
                                <div className="flex-grow w-full overflow-y-auto px-4">
                                    <ul className="mt-2 space-y-2">
                                        {teamResults[selectedPick].player.pokemon.map((poke, index) => (
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
            
            )
        } else if (activeTab === "Team") {
            return (
                <div>
                    <p>Team overall win rate: {calculateOverallTeamWinRate()}</p>
                </div>
            )
        } else {
            return (
                <div>
                    <p>There was an error...</p>
                </div>
            )
        }
    }

    const handleDraftTabClick = (text) => {
        if (text) {
            if (activeTab !== text) {
                setActiveTab(text);
            }
        } else {
            console.error("No text passed to handleDraftTabClick");
        }
    }

    return (
        <div className="flex flex-col w-full h-full">
            <div className="flex flex-row">
                {["Team", "Player"].map((tab) => (
                    <DraftTab
                        text={tab}
                        handleClick={handleDraftTabClick}
                        isActive={activeTab === tab}
                    />
                ))}
            </div>
            {/* Center Stats */}
            {/* Make center stats smaller: max-w-4xl min-h-[80vh] */}
            <div className="w-full flex flex-col h-full md:flex-row items-center justify-center p-8 rounded-lg shadow-lg bg-gray-200">
                <div className="text-center flex flex-col w-full h-full">
                    {renderCenterContent()}
                </div>
            </div>
        </div>
    );
}

export default DraftTabPanel;