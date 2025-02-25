import PlayerBox from "./PlayerBox";
import { useEffect, useState } from "react";

export default function TeamBox( searchResults ) {
    const [playerList, setPlayerList] = useState([]);
    const [results, setResults] = useState(searchResults);

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
            <PlayerBox isFirst={true} playerName={ playerList.length > 0 ? playerList[0] : ""} placeHolderText={"Pick 1"} />
            <PlayerBox playerName={playerList.length > 1 ? playerList[1] : ""} placeHolderText={"Pick 2"}/>
            <PlayerBox playerName={playerList.length > 2 ? playerList[2] : ""} placeHolderText={"Pick 3"}/>
            <PlayerBox playerName={playerList.length > 3 ? playerList[3] : ""} placeHolderText={"Pick 4"}/>
            <PlayerBox playerName={playerList.length > 4 ? playerList[4] : ""} placeHolderText={"Pick 5"}/>
        </div>
    );
}
