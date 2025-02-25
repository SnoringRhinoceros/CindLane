import DraftTab from "../components/DraftTab";


export default function DraftTabPanel({ results }) {
    return (
        <div className="flex flex-col w-full h-full">
            <div className="flex flex-row">
                <DraftTab text="Player"></DraftTab>
                <DraftTab text="Pokemon"></DraftTab>
                <DraftTab text="Team"></DraftTab>
            </div>
            {/* Center Stats */}
            {/* Make center stats smaller: max-w-4xl min-h-[80vh] */}
            <div className="w-full flex flex-col md:flex-row items-center justify-center p-8 rounded-lg shadow-lg bg-gray-200">
                {results ? (
                    <div className="text-center flex flex-col w-full h-full">
                        <h2 className="text-lg font-semibold text-primary">{results.player}'s Pokémon Stats</h2>
                        <div className="flex-grow w-full overflow-y-auto px-4">
                            <ul className="mt-2 space-y-2">
                                {results.pokemon.map((poke, index) => (
                                    <li key={index} className="text-sm">
                                        <strong>{poke.name}</strong>: {poke.battles} battles, {poke.win_rate}% win rate
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ) : (
                    <p className="text-gray-500">No player found.</p>
                )}
            </div>
        </div>
    );
}