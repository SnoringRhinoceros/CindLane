import MiniStatBoxContainer from "../MiniStatBoxContainer";
import PokemonStatsComparisonChart from "../PokemonStatsComparisonChart";
import BestPokemonBox from "../BestPokemonBox";
import { useEffect, useState } from "react";
import { useRecommendedPokemonStats, usePokemonStats } from '../../hooks/usePlayerStats';

const PlayerTab = ({ player, pokemon, heldItems }) => {
  if (!player) {
    return <p className="text-gray-500">No player found.</p>;
  }

  const [currentStatFilter, setCurrentStatFilter] = useState("Recommended Pick");

  const handleStatFilterClick = (stat) => {
    setCurrentStatFilter(stat);
  };

  const recommended = useRecommendedPokemonStats(player, currentStatFilter === "Current Pick" ? pokemon : null);
    const currentPokemonStats = usePokemonStats(player, pokemon, heldItems);
  const playerStats = currentPokemonStats?.playerStats;
  console.log(recommended)
  
  const expectedStatsToUse =
    currentStatFilter === "Current Pick"
      ? playerStats.expectedStats
      : recommended.expectedStats;

  const fallbackReason =
    currentStatFilter === "Current Pick"
      ? currentPokemonStats?.fallbackReason
      : recommended.fallbackReason;

  const statsToShow = [
    {
      text: "Expected Kills",
      stat: expectedStatsToUse?.kills?.toString() ?? "N/A",
      description: "Expected number of kills in one game"
    },
    {
      text: "Expected Deaths",
      stat: expectedStatsToUse?.deaths?.toString() ?? "N/A",
      description: "Expected number of deaths in one game"
    },
    {
      text: "Expected Damage",
      stat: expectedStatsToUse?.damage?.toString() ?? "N/A",
      description: "Expected damage the player is expected to do"
    },
    {
      text: "Expected Healing",
      stat: expectedStatsToUse?.healing?.toString() ?? "N/A",
      description: "Expected healing the player with this Pokémon should do"
    }
  ];

  const renderLeftColumn = () => {
    const isRecommended = currentStatFilter === "Recommended Pick";
    const isCurrent = currentStatFilter === "Current Pick";

    if (!isRecommended && !isCurrent) {
      return <div>something went wrong</div>;
    }

    const playerStatsWithName = {
      ...currentPokemonStats?.playerStats,
      name: currentPokemonStats?.name
    };
    

    return (
      <div className="flex-grow min-h-0 w-full overflow-y-auto px-4">
        <div className="flex flex-col min-h-0 w-full">
          {isCurrent && !pokemon ? (
            <div className="relative p-4 bg-white rounded-lg shadow-md hover:bg-gray-100 cursor-pointer h-full w-full max-w-xs mx-auto sm:max-w-sm md:max-w-md">
              <p className="text-center text-gray-500">No Pokémon selected. Please pick a Pokémon to see stats.</p>
              <button
                className={`text-primary border rounded-md transition-colors 
                  bg-white p-2 hover:bg-gray-100 w-48 text-center`}
                onClick={() => handleStatFilterClick("Recommended Pick")}
              >
                Go Back
              </button>
            </div>
          ) : (
            <div>
              <BestPokemonBox
  bestPokemon={recommended.bestPokemon}
  bestPokemonWarning={recommended.bestPokemonWarning}
  recommendedHeldItems={recommended.heldItems}
  currentHeldItems={heldItems}
  currentPokemon={playerStatsWithName}
  activeStatFilter={currentStatFilter}
  handleStatFilterClick={handleStatFilterClick}
  winRate={recommended.winRate}
  pickRate={recommended.pickRate}
  avgScore={recommended.avgScore}
  fallbackReason={recommended.fallbackReason}
/>



              <MiniStatBoxContainer stats={statsToShow} />

              {pokemon && (
  <>
    {isRecommended && (
      <div className="mt-6">
        <h3 className="text-md font-semibold text-gray-700 mb-2">
          Recommended Pick: Player vs Global Averages for {recommended.bestPokemon}
        </h3>
        <PokemonStatsComparisonChart
          playerStats={recommended?.playerStats}
          globalStats={recommended?.globalStats}
        />
      </div>
    )}

    {isCurrent && (
      <div className="mt-6">
        <h3 className="text-md font-semibold text-gray-700 mb-2">
          Current Pick: Player vs Global Averages for {pokemon}
        </h3>
        <PokemonStatsComparisonChart
          playerStats={currentPokemonStats?.playerStats}
          globalStats={currentPokemonStats?.globalStats}
        />
      </div>
    )}
  </>
)}

            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="relative flex flex-row w-full h-full">
      {/* Left Column */}
      {renderLeftColumn()}

      {/* Right Column */}
      {/* <div className="flex flex-col w-full h-full min-h-0">
        <h2 className="text-lg font-semibold text-primary">
          {player.player}'s All Pokémon Stats
        </h2>
        <div className="flex-grow min-h-0 w-full overflow-y-auto px-4">
          <div className="pb-2">
            <ul className="mt-2 space-y-2">
              {player.pokemon.map((poke, index) => (
                <li key={index} className="text-sm">
                  <strong>{poke.name}</strong>: {poke.battles} battles, {poke.win_rate}% win rate
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default PlayerTab;
