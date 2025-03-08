const PlayerTab = ({ player }) => {
    if (!player) {
        return <p className="text-gray-500">No player found.</p>;
    }

    return (
        <div className="flex flex-col w-full h-full">
            <h2 className="text-lg font-semibold text-primary">
                {player.player}'s Pokémon Stats
            </h2>
            <div className="flex-grow w-full overflow-y-auto px-4">
                <ul className="mt-2 space-y-2">
                    {player.pokemon.map((poke, index) => (
                        <li key={index} className="text-sm">
                            <strong>{poke.name}</strong>: {poke.battles} battles, {poke.win_rate}% win rate
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default PlayerTab;
