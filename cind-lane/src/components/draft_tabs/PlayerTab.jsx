import MiniStatBoxContainer from "../MiniStatBoxContainer";
import { usePlayerStats } from '../../hooks/usePlayerStats';
import BestPokemonBox from "../BestPokemonBox";
import { useState } from "react";

const PlayerTab = ({ player, pokemon }) => {
    if (!player) {
        return <p className="text-gray-500">No player found.</p>;
  }    
  
  const [currentStatFilter, setCurrentStatFilter] = useState("Recommended Pick");
  
    const handleStatFilterClick = (stat) => {
      setCurrentStatFilter(stat);
    };

    const {
        bestItems,
        bestPokemon,
        bestPokemonWarning,
      expectedStats,
        performanceInsights
      } = usePlayerStats(player, pokemon);
    
      const statsToShow = [
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
  
      const renderLeftColumn = () => {
        if (currentStatFilter == "Recommended Pick") {
          return (
            <div className="flex-grow min-h-0 w-full overflow-y-auto px-4">
              <div className="flex flex-col min-h-0 w-full">
                <BestPokemonBox
                  bestPokemon={bestPokemon}
                  heldItems={bestItems.split(", ")}
                  bestPokemonWarning={bestPokemonWarning}
                  activeStatFilter={currentStatFilter}
                  handleStatFilterClick={handleStatFilterClick}
                />
                <MiniStatBoxContainer stats={statsToShow} />
                {performanceInsights && (
                  <div className="mb-4">
                    <strong>{pokemon} Performance:</strong>
                    <ul className="ml-4 list-disc text-sm text-gray-600">
                      <li>
                        Compared to own average: {performanceInsights.personalPerformancePercent}% ({performanceInsights.personalPerformanceDiff >= 0 ? '+' : ''}{performanceInsights.personalPerformanceDiff} dmg)
                      </li>
                      <li>
                        Compared to global: {performanceInsights.globalComparisonPercent}% ({performanceInsights.globalComparisonDiff >= 0 ? '+' : ''}{performanceInsights.globalComparisonDiff} dmg)
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )
        } else if (currentStatFilter == "Current Pick") {
          return (<div className="flex-grow min-h-0 w-full overflow-y-auto px-4">
            <div className="flex flex-col min-h-0 w-full">
              <BestPokemonBox
                bestPokemon={bestPokemon}
                heldItems={bestItems.split(", ")}
                bestPokemonWarning={bestPokemonWarning}
                activeStatFilter={currentStatFilter}
                handleStatFilterClick={handleStatFilterClick}
              />
              <MiniStatBoxContainer stats={statsToShow} />
              {performanceInsights && (
                <div className="mb-4">
                  <strong>{pokemon} Performance:</strong>
                  <ul className="ml-4 list-disc text-sm text-gray-600">
                    <li>
                      Compared to own average: {performanceInsights.personalPerformancePercent}% ({performanceInsights.personalPerformanceDiff >= 0 ? '+' : ''}{performanceInsights.personalPerformanceDiff} dmg)
                    </li>
                    <li>
                      Compared to global: {performanceInsights.globalComparisonPercent}% ({performanceInsights.globalComparisonDiff >= 0 ? '+' : ''}{performanceInsights.globalComparisonDiff} dmg)
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        )
        } else {
          return (<div>something went wrong</div>)
        }
      }
  
      return (
        <div className="relative flex flex-row w-full h-full">
      
          {/* Left Column */}
          {renderLeftColumn()}
          
          {/* Right Column */}
          <div className="flex flex-col w-full h-full min-h-0">
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
          </div>
          
        </div>
      );
      
};

export default PlayerTab;
