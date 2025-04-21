import DraftTab from "../components/DraftTab";
import { useDraftTab } from "../hooks/useDraftTab";
import TeamTab from "./draft_tabs/TeamTab";
import PlayerTab from "./draft_tabs/PlayerTab";

function DraftTabPanel({ teamResults, selectedPick }) {
    const { activeTab, handleDraftTabClick } = useDraftTab();

    const renderCenterContent = () => {
        switch (activeTab) {
            case "Player":
                console.log(teamResults?.[selectedPick]?.heldItems);
                return (
                    <PlayerTab
                        player={teamResults?.[selectedPick]?.player}
                        pokemon={teamResults?.[selectedPick]?.pokemon}
                        heldItems={teamResults?.[selectedPick]?.heldItems}
                    />
                );
            case "Team":
                return <TeamTab teamResults={teamResults} />;
            default:
                return <p>There was an error...</p>;
        }
    };

    return (
        <div className="flex flex-col w-full h-full bg-gray-200 min-h-0">
            {/* Tab Switch */}
            <div className="flex ml-4 mt-4 mb-2">
            <div className="inline-flex bg-gray-300 p-1 rounded-full">
                {["Team", "Player"].map((tab, index) => (
                    <DraftTab
                        key={tab}
                        text={tab}
                        handleClick={handleDraftTabClick}
                        isActive={activeTab === tab}
                        isFirst={index === 0}
                        isLast={index === 1}
                    />
                ))}
            </div>
        </div>


            {/* Center Stats Panel */}
            <div className="w-full flex flex-col h-full min-h-0 md:flex-row items-center justify-center p-8 rounded-lg shadow-lg">
                <div className="text-center flex flex-col min-h-0 w-full h-full">
                    {renderCenterContent()}
                </div>
            </div>
        </div>
    );
}

export default DraftTabPanel;
