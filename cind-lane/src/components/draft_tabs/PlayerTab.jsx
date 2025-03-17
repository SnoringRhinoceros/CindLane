import MiniStatBoxContainer from "../MiniStatBoxContainer";

const PlayerTab = ({ player }) => {
    if (!player) {
        return <p className="text-gray-500">No player found.</p>;
    }

    const statsToShow = [
        { text: "Best Held-Items", stat: "Muscle Band, Razor Claw, Focus Band", description: "Recommended held-items for current player on this team" },
        { text: "Best Pick", stat: "Absol (60%)", description: "Best pokemon for this player to play" },
        { text: "Expected Kills", stat: "8", description: "Expected number of kills in one game" },
        { text: "Expected Deaths", stat: "5", description: "Expected number of deaths in one game" },
        { text: "Expected Damage", stat: "73,912", description: "Expected damage the player is expected to do" },
        { text: "Expected Healing", stat: "20,305", description: "Expected healing the player is expected to do" },
      ];

    return (
        <div className="flex flex-row w-full h-full">
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
            <MiniStatBoxContainer stats={statsToShow} />
        </div>
    );
};

export default PlayerTab;
