import PlayerBox from "./PlayerBox";
import { useEffect, useState } from "react";

export default function TeamBox( searchResults ) {
    const [playerList, setPlayerList] = useState([]);
    const [results, setResults] = useState(searchResults);
    const [selectedIndex, setSelectedIndex] = useState(0);

    useEffect(() => {
        setResults(searchResults);
    }, [searchResults]);

    useEffect(() => {
        if (results.searchResults) {
            if (playerList.length < 5) {
                setPlayerList([...playerList, results.searchResults.player]);
            }
        }
    }, [results]);

    return (
        <div className="flex flex-col h-full w-full justify-between items-center">
            {Array.from({ length: 5 }, (_, index) => (
                <PlayerBox
                isFirst={index === 0}
                playerName={playerList.length > index ? playerList[index] : ""}
                    placeHolderText={`Pick ${index + 1}`}
                    pokemonName={"Pikachu"}
                isSelected={selectedIndex === index}
                onClick={() => setSelectedIndex(index)}
                />
            ))}
        </div>

    );
}
