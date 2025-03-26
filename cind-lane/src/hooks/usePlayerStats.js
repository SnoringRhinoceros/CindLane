import battleData from '../data/battles.json';

export function usePlayerStats(player, pokemon) {
  console.log(player);
  const allPlayers = battleData.flatMap(b => b.players);
  const matchingPlayers = allPlayers.filter(p => p.player_name === player.player);

  const expectedStats = (() => {
    const total = matchingPlayers.reduce(
      (acc, p) => {
        acc.kills += p.kills;
        acc.deaths += p.deaths;
        acc.dealt += p.damage_dealt;
        acc.healed += p.damage_healed;
        return acc;
      },
      { kills: 0, deaths: 0, dealt: 0, healed: 0 }
    );

    const count = matchingPlayers.length || 1;

    return {
      kills: Math.round(total.kills / count),
      deaths: Math.round(total.deaths / count),
      damage: total.dealt ? total.dealt.toLocaleString() : '0',
      healing: total.healed ? total.healed.toLocaleString() : '0'
    };
  })();

  let bestPick = 'Unknown';
  let bestPickWarning = null;

  (() => {
    const winRateByPokemon = {};

    for (const b of battleData) {
      for (const p of b.players) {
        if (p.player_name === player.player) {
          const won = b.result.winner === `Team ${p.team}`;
          const name = p.pokemon;
          winRateByPokemon[name] = winRateByPokemon[name] || { wins: 0, games: 0 };
          winRateByPokemon[name].games += 1;
          if (won) winRateByPokemon[name].wins += 1;
        }
      }
    }

    const sorted = Object.entries(winRateByPokemon)
      .map(([pokemon, data]) => ({
        pokemon,
        winRate: data.wins / data.games,
        games: data.games
      }))
      .sort((a, b) => b.winRate - a.winRate);

    if (sorted.length > 0) {
      const top = sorted[0];
      bestPick = `${top.pokemon} (${Math.round(top.winRate * 100)}%)`;

      if (top.games < 5) {
        bestPickWarning = `This pick recommendation might not be accurate because of a small sample size of ${top.games} game${top.games === 1 ? '' : 's'}.`;
      }
    }
  })();

  const bestItems = (() => {
    const itemCount = {};

    matchingPlayers.forEach(p => {
      p.held_items.forEach(item => {
        itemCount[item] = (itemCount[item] || 0) + 1;
      });
    });

    const sortedItems = Object.entries(itemCount)
      .sort((a, b) => b[1] - a[1])
      .map(entry => entry[0])
      .slice(0, 3);

    return sortedItems.join(', ') || 'None';
  })();

  const performanceInsights = (() => {
    if (!pokemon) return null;

    const playerGames = allPlayers.filter(p => p.player_name === player.player);
    const playerGamesWithPokemon = playerGames.filter(p => p.pokemon === pokemon);
    const globalPokemonGames = allPlayers.filter(p => p.pokemon === pokemon);

    const avg = (arr, key) => arr.reduce((sum, p) => sum + p[key], 0) / (arr.length || 1);

    const playerAvgDamage = avg(playerGames, 'damage_dealt');
    const playerWithPokemonAvg = avg(playerGamesWithPokemon, 'damage_dealt');
    const globalPokemonAvg = avg(globalPokemonGames, 'damage_dealt');

    return {
      playerWithPokemonAvg: Math.round(playerWithPokemonAvg),
      personalPerformanceDiff: Math.round(playerWithPokemonAvg - playerAvgDamage),
      personalPerformancePercent: ((playerWithPokemonAvg - playerAvgDamage) / (playerAvgDamage || 1) * 100).toFixed(1),
      globalComparisonDiff: Math.round(playerWithPokemonAvg - globalPokemonAvg),
      globalComparisonPercent: ((playerWithPokemonAvg - globalPokemonAvg) / (globalPokemonAvg || 1) * 100).toFixed(1)
    };
  })();

  return {
    bestItems,
    bestPokemon: bestPick,
    bestPokemonWarning: bestPickWarning,
    expectedStats,
    performanceInsights
  };
}
