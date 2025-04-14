import PlayerBox from "./PlayerBox";
import { useEffect, useState } from "react";

const TOTAL_PLAYERS_PER_TEAMBOX = 5

export default function TeamBox({ teamResults, selectedPick, setSelectedPick }) {
    return (
        <div className="flex flex-col h-full w-full justify-between items-center">
            {Array.from({ length: TOTAL_PLAYERS_PER_TEAMBOX }, (_, index) => (
                <PlayerBox
                key={index}
                isFirst={index === 0}
                playerName={teamResults[index] && teamResults[index].player ? teamResults[index].player.player : null}
                placeHolderText={`Pick ${index + 1}`}
                pokemonName={teamResults[index] && teamResults[index].pokemon ? teamResults[index].pokemon : "1 No Pokemon"}
                isSelected={selectedPick === index}
                onClick={() => setSelectedPick(index)}
                warning={teamResults[index] && teamResults[index].player && teamResults[index].pokemon && teamResults[index].player.pokemon && !teamResults[index].player.pokemon.some(poke => poke.name === teamResults[index].pokemon) ? "This player does not have this pokemon in their roster, using average win rate instead" : null}
                heldItems={teamResults[index] && teamResults[index].heldItems ? teamResults[index].heldItems : []} 
                />
            ))}
        </div>

    );
}
