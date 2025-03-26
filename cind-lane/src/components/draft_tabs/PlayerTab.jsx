import MiniStatBoxContainer from "../MiniStatBoxContainer";
import { usePlayerStats } from '../../hooks/usePlayerStats';

const PlayerTab = ({ player, pokemon }) => {
    if (!player) {
        return <p className="text-gray-500">No player found.</p>;
  }
    const {
        bestItems,
        bestPokemon,
        bestPokemonWarning,
      expectedStats,
        performanceInsights
      } = usePlayerStats(player, pokemon);
    
      const statsToShow = [
        {
          text: "Best Held-Items",
          stat: bestItems,
          description: "Recommended held-items for current player on this team"
        },
        {
          text: "Best Pick",
          stat: bestPokemon,
          description: "Best pokemon for this player to play",
          warning: bestPokemonWarning
        },
        {
          text: "Expected Kills",
          stat: expectedStats.kills.toString(),
          description: "Expected number of kills in one game"
        },
        {
          text: "Expected Deaths",
          stat: expectedStats.deaths.toString(),
          description: "Expected number of deaths in one game"
        },
        {
          text: "Expected Damage",
          stat: expectedStats.damage,
          description: "Expected damage the player is expected to do"
        },
        {
          text: "Expected Healing",
          stat: expectedStats.healing,
          description: "Expected healing the player is expected to do"
        }
      ];

    return (
        <div className="flex flex-row w-full h-full">
            {/* Left Column */}
            <div className="flex flex-col w-full h-full min-h-0">
                <h2 className="text-lg font-semibold text-primary">
                    {player.player}'s Pokémon Stats
                </h2>
                {/* Wrapping the scrollable content in a flex-grow div */}
                <div className="flex-grow min-h-0 w-full overflow-y-auto px-4">
                    <div className="pb-2"> {/* Ensuring no clipping at the bottom */}
                        <ul className="mt-2 space-y-2">
                            {player.pokemon.map((poke, index) => (
                                <li key={index} className="text-sm">
                                    <strong>{poke.name}</strong>: {poke.battles} battles, {poke.win_rate}% win rate
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            {/* Right Column */}
            <div className="flex flex-col min-h-0 w-full">
          <MiniStatBoxContainer stats={statsToShow} />
          {performanceInsights && (
  <div className="mb-4">
    <strong>{pokemon} Performance:</strong>
    <ul className="ml-4 list-disc text-sm text-gray-600">
      <li>Compared to own average: {performanceInsights.personalPerformancePercent}% ({performanceInsights.personalPerformanceDiff >= 0 ? '+' : ''}{performanceInsights.personalPerformanceDiff} dmg)</li>
      <li>Compared to global: {performanceInsights.globalComparisonPercent}% ({performanceInsights.globalComparisonDiff >= 0 ? '+' : ''}{performanceInsights.globalComparisonDiff} dmg)</li>
    </ul>
  </div>
)}
            </div>
        </div>
    );
};

export default PlayerTab;
