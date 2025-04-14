import MiniStatBoxContainer from "../MiniStatBoxContainer";
import { useTeamStats } from "../../hooks/useTeamStats";

function TeamTab({ teamResults }) {
  const {
    synergyPairs,
    counterPicks,
    teamWinRates,
  } = useTeamStats(teamResults);

  const calculateOverallTeamWinRate = () => {
    const teamWinRates = teamResults.map((playerBox) => {
      if (playerBox && playerBox.player) {
        if (playerBox.pokemon && Array.isArray(playerBox.player.pokemon)) {
          for (const possiblePokemon of playerBox.player.pokemon) {
            if (possiblePokemon.name === playerBox.pokemon) {
              return possiblePokemon.win_rate;
            }
          }
        }
        return playerBox.player.win_rate;
      }
      return 0;
    });

    const totalWinRate = teamWinRates.reduce((acc, curr) => acc + curr, 0);
    return Math.round(totalWinRate / teamWinRates.length);
  };

  const formatImageSrc = (name) =>
    `pokemon_images/roster-${name.toLowerCase().replace(/\s+/g, "-")}.png`;

  const renderSynergyList = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {synergyPairs.map(({ pair, synergy }, idx) => {
        const [poke1, poke2] = pair.split(" + ");
        return (
          <div key={idx} className="flex items-center gap-3 bg-white p-3 rounded shadow">
            <img src={formatImageSrc(poke1)} alt={poke1} className="w-10 h-10 object-contain" />
            <img src={formatImageSrc(poke2)} alt={poke2} className="w-10 h-10 object-contain" />
            <div className="text-sm font-medium">
              {pair}: {synergy}
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderCounterList = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {counterPicks.map(({ pokemon, winRate }, idx) => (
        <div key={idx} className="flex items-center gap-3 bg-white p-3 rounded shadow">
          <img src={formatImageSrc(pokemon)} alt={pokemon} className="w-10 h-10 object-contain" />
          <div className="text-sm font-medium">
            {pokemon}: {winRate}%
          </div>
        </div>
      ))}
    </div>
  );

return (
  <div className="flex flex-col w-full h-full space-y-6 px-4 py-4">
    <MiniStatBoxContainer
      stats={[
        {
          text: "Overall Chance of Winning",
          stat: calculateOverallTeamWinRate() + "%",
          description: "Expected win rate of this team considering all variables",
        },
      ]}
    />

    <div className="flex flex-col md:flex-row gap-6 w-full">
      {/* Team Synergies - always one column */}
      <div className="w-full md:w-1/2">
        <h2 className="text-lg font-semibold text-primary mb-2">Team Synergies</h2>
        {synergyPairs.length > 0 ? (
          <div className="flex flex-col gap-3 w-full">
            {synergyPairs.map(({ pair, synergy }, idx) => {
              const [poke1, poke2] = pair.split(" + ");
              return (
                <div
                  key={idx}
                  className="flex flex-wrap items-center gap-3 bg-white p-3 rounded shadow min-w-0"
                >
                  <img
                    src={`pokemon_images/roster-${poke1.toLowerCase().replace(/\s+/g, "-")}.png`}
                    alt={poke1}
                    className="w-10 h-10 object-contain"
                  />
                  <img
                    src={`pokemon_images/roster-${poke2.toLowerCase().replace(/\s+/g, "-")}.png`}
                    alt={poke2}
                    className="w-10 h-10 object-contain"
                  />
                  <div className="text-sm font-medium break-words truncate text-wrap">
                    {pair}: {synergy}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-sm text-gray-500">No synergies found.</p>
        )}
      </div>

      {/* Counter Picks - two-column responsive */}
      <div className="w-full md:w-1/2">
        <h2 className="text-lg font-semibold text-primary mb-2">Counter Picks</h2>
        {counterPicks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
            {counterPicks.map(({ pokemon, winRate }, idx) => (
              <div
                key={idx}
                className="flex flex-wrap items-center gap-3 bg-white p-3 rounded shadow min-w-0"
              >
                <img
                  src={`pokemon_images/roster-${pokemon.toLowerCase().replace(/\s+/g, "-")}.png`}
                  alt={pokemon}
                  className="w-10 h-10 object-contain"
                />
                <div className="text-sm font-medium break-words truncate text-wrap">
                  {pokemon}: {winRate}%
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">No counters detected.</p>
        )}
      </div>
    </div>
  </div>
);

  
  
}

export default TeamTab;
