import DraftTab from "../components/DraftTab";
import { useEffect, useState } from "react";
import { useDraftTab } from "../hooks/useDraftTab";
import TeamTab from "./draft_tabs/TeamTab";
import PlayerTab from "./draft_tabs/PlayerTab";


function DraftTabPanel({ teamResults, selectedPick }) {

    const { activeTab, handleDraftTabClick } = useDraftTab();
    
    const renderCenterContent = () => {
        switch (activeTab) {
            case "Player":
                return <PlayerTab player={teamResults?.[selectedPick]?.player} />;
            case "Team":
                return <TeamTab teamResults={teamResults} />;
            default:
                return <p>There was an error...</p>;
        }
    }

    return (
        <div className="flex flex-col w-full h-full bg-gray-200">
            <div className="flex flex-row">
                {["Team", "Player"].map((tab) => (
                    <DraftTab
                        key={tab}
                        text={tab}
                        handleClick={handleDraftTabClick}
                        isActive={activeTab === tab}
                    />
                ))}
            </div>
            {/* Center Stats */}
            {/* Make center stats smaller: max-w-4xl min-h-[80vh] */}
            <div className="w-full flex flex-col h-full md:flex-row items-center justify-center p-8 rounded-lg shadow-lg">
                <div className="text-center flex flex-col w-full h-full">
                    {renderCenterContent()}
                </div>
            </div>
        </div>
    );
}

export default DraftTabPanel;