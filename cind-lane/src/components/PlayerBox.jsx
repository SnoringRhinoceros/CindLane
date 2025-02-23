import { useEffect, useState } from "react";

export default function PlayerBox({ isFirst, playerName, placeHolderText }) {
    const [player, setPlayer] = useState(playerName);

    useEffect(() => {
        setPlayer(playerName);
    }, [playerName]);

    return (
        <div className={`flex-1 w-full p-4 text-primary text-center flex items-center justify-center border-2 ${!isFirst ? "border-t-0" : ""}`}>
            { player ? (player) : (placeHolderText)}
        </div>
    );
}
