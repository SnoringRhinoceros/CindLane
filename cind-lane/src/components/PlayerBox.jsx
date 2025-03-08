import { useEffect, useState } from "react";

export default function PlayerBox({ isFirst, playerName, placeHolderText, pokemonName, isSelected, onClick }) {
    const [player, setPlayer] = useState(playerName);
    const [pokemon, setPokemon] = useState(pokemonName);

    useEffect(() => {
        setPlayer(playerName);
    }, [playerName]);

    useEffect(() => {
        setPokemon(pokemonName.toLowerCase().replace(/\s+/g, '-'));
    }, [pokemonName]);

    return (
        <div className={`flex-1 w-full h-full text-primary text-center flex items-center justify-center border-2 overflow-hidden ${!isFirst ? "border-t-0" : ""} ${isSelected ? "bg-blue-500 text-white border-blue-700" : "bg-gray-200 border-gray-400"}`} onClick={onClick}>
            {player ? (player) : (placeHolderText)}
            <img src={`pokemon_images/roster-${pokemon}.png`} className="max-w-full max-h-full" />
        </div>
    );
}
