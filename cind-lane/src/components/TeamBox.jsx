import PlayerBox from "./PlayerBox";
import { useEffect, useState } from "react";

const TOTAL_PLAYERS = 5

export default function TeamBox({ searchResults, selectedPick, setSelectedPick }) {    
    const [playerList, setPlayerList] = useState(Array(TOTAL_PLAYERS).fill(""));
    console.log(playerList)

    useEffect(() => {
        if (searchResults) {
            setPlayerList((prevList) =>
            {
                const newList = [...prevList]
                newList[selectedPick] = searchResults.player
                return newList
             });
            setSelectedPick((prevSelected) => prevSelected + 1 < TOTAL_PLAYERS ? prevSelected + 1 : 0);
        }
    }, [searchResults]);

    return (
        <div className="flex flex-col h-full w-full justify-between items-center">
            {Array.from({ length: TOTAL_PLAYERS }, (_, index) => (
                <PlayerBox
                isFirst={index === 0}
                playerName={playerList[index]}
                placeHolderText={`Pick ${index + 1}`}
                pokemonName={"Pikachu"}
                isSelected={selectedPick === index}
                onClick={() => setSelectedPick(index)}
                />
            ))}
        </div>

    );
}
