import PlayerBox from "./PlayerBox";
import { useEffect, useState } from "react";

const TOTAL_PLAYERS_PER_TEAMBOX = 5

export default function TeamBox({ teamResults, selectedPick, setSelectedPick }) {    
    return (
        <div className="flex flex-col h-full w-full justify-between items-center">
            {Array.from({ length: TOTAL_PLAYERS_PER_TEAMBOX }, (_, index) => (
                <PlayerBox
                isFirst={index === 0}
                playerName={teamResults[index] && teamResults[index].player ? teamResults[index].player.player : null}
                placeHolderText={`Pick ${index + 1}`}
                pokemonName={teamResults[index] && teamResults[index].pokemon ? teamResults[index].pokemon : "Pikachu"}
                isSelected={selectedPick === index}
                onClick={() => setSelectedPick(index)}
                />
            ))}
        </div>

    );
}
