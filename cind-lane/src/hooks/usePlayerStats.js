import battleData from '../data/battles.json';

function getCommonPokemonStats(player, pokemon, heldItemsFilter = null) {
  const allPlayers = battleData.flatMap(b => b.players);
  const playerGames = allPlayers.filter(p => p.player_name === player.player);
  const playerGamesWithPokemon = pokemon
    ? playerGames.filter(p => p.pokemon === pokemon)
    : [];

  const filterHeldItems = (p) => {
    if (!heldItemsFilter || !Array.isArray(p.held_items)) return true;
    const heldSorted = [...p.held_items].sort();
    const filterSorted = [...heldItemsFilter].sort();
    return (
      heldSorted.length === filterSorted.length &&
      heldSorted.every((val, idx) => val === filterSorted[idx])
    );
  };

  // 🌟 Progressive fallback logic
  const MIN_THRESHOLD = 3;
let filteredGames = [];
let fallbackLevel = "player+pokemon+items";
let fallbackReason = null;

if (pokemon) {
  const specific = heldItemsFilter
    ? playerGamesWithPokemon.filter(filterHeldItems)
    : playerGamesWithPokemon;

  if (specific.length >= MIN_THRESHOLD) {
    filteredGames = specific;
    fallbackLevel = "player+pokemon+items";
  } else if (playerGamesWithPokemon.length >= MIN_THRESHOLD) {
    filteredGames = playerGamesWithPokemon;
    fallbackLevel = "player+pokemon";
    fallbackReason = `Not enough games with ${pokemon} and that item set. Using player stats for ${pokemon} instead.`;
  } else {
    const global = allPlayers.filter(p => p.pokemon === pokemon);
    filteredGames = global;
    fallbackLevel = "global+pokemon";
    if (playerGamesWithPokemon.length > 0) {
      fallbackReason = `Not enough games from this player for ${pokemon}. Using stats from all players instead.`;
    }
    // No fallbackReason if there are zero games with the Pokémon
  }
} else {
  filteredGames = playerGames;
  fallbackLevel = "player";
}


  const avg = (arr, key) =>
    arr.reduce((sum, p) => sum + p[key], 0) / (arr.length || 1);

  const expectedStats = (() => {
    const total = filteredGames.reduce(
      (acc, p) => {
        acc.kills += p.kills;
        acc.deaths += p.deaths;
        acc.dealt += p.damage_dealt;
        acc.healed += p.damage_healed;
        return acc;
      },
      { kills: 0, deaths: 0, dealt: 0, healed: 0 }
    );

    const count = filteredGames.length || 1;

    return {
      kills: Math.round(total.kills / count),
      deaths: Math.round(total.deaths / count),
      damage: Math.round(total.dealt / count).toLocaleString(),
      healing: Math.round(total.healed / count).toLocaleString()
    };
  })();

  const winRate = (() => {
    let wins = 0;
    let games = 0;

    for (const b of battleData) {
      for (const p of b.players) {
        const matches =
          (fallbackLevel === "player+pokemon+items" &&
            p.player_name === player.player &&
            p.pokemon === pokemon &&
            filterHeldItems(p)) ||

          (fallbackLevel === "player+pokemon" &&
            p.player_name === player.player &&
            p.pokemon === pokemon) ||

          (fallbackLevel === "global+pokemon" &&
            p.pokemon === pokemon) ||

          (fallbackLevel === "player" &&
            p.player_name === player.player);

        if (matches) {
          games += 1;
          if (b.result.winner === `Team ${p.team}`) {
            wins += 1;
          }
        }
      }
    }

    return games > 0 ? `${Math.round((wins / games) * 100)}%` : 'N/A';
  })();

  const pickRate = (() => {
    if (!pokemon) return null;
    const totalGames = playerGames.length || 1;
    const picked = playerGamesWithPokemon.length;
    return `${Math.round((picked / totalGames) * 100)}%`;
  })();

  const avgScore = (() => {
    if (!pokemon) return null;
    const avgScore = avg(filteredGames, 'score') || 0;
    return Math.round(avgScore).toLocaleString();
  })();

  const heldItems = (() => {
    if (!pokemon) return [];

    const comboStats = {};

    playerGamesWithPokemon.forEach(p => {
      const key = [...p.held_items].sort().join('|');

      if (!comboStats[key]) {
        comboStats[key] = { wins: 0, games: 0, items: p.held_items };
      }
      comboStats[key].games += 1;

      const battle = battleData.find(b =>
        b.players.some(bp =>
          bp.player_name === p.player_name &&
          bp.pokemon === p.pokemon &&
          bp.team === p.team
        )
      );

      if (!battle) return;

      if (battle.result.winner === `Team ${p.team}`) {
        comboStats[key].wins += 1;
      }
    });

    const bestCombo = Object.values(comboStats)
      .filter(c => c.games >= 1)
      .sort((a, b) => (b.wins / b.games) - (a.wins / a.games))[0];

    return bestCombo ? bestCombo.items : [];
  })();

  const gamesWithPokemon = pokemon ? filteredGames.length : null;

  return {
    winRate,
    pickRate,
    avgScore,
    heldItems,
    gamesWithPokemon,
    expectedStats,
    fallbackReason
  };
}



export function usePokemonStats(player, pokemon, heldItems) {
  const stats = getCommonPokemonStats(player, pokemon, heldItems);

  return {
    name: pokemon,
    ...stats
  };
}

export function useRecommendedPokemonStats(player, pokemon = null) {
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
      damage: Math.round(total.dealt / count).toLocaleString(),
      healing: Math.round(total.healed / count).toLocaleString()
    };
  })();
  

  let bestPokemon = 'Unknown';
  let bestPokemonWarning = null;

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

  let stats = {
    winRate: 'N/A',
    pickRate: null,
    avgScore: null,
    heldItems: [],
    gamesWithPokemon: null
  };

  if (sorted.length > 0) {
    const top = sorted[0];
    bestPokemon = `${top.pokemon} (${Math.round(top.winRate * 100)}%)`;

    if (top.games < 5) {
      bestPokemonWarning = `This pick recommendation might not be accurate because of a small sample size of ${top.games} game${top.games === 1 ? '' : 's'}.`;
    }

    // ✅ Call again with the recommended pokemon
    stats = getCommonPokemonStats(player, pokemon || top.pokemon);
  }

  return {
    ...stats,
    bestPokemon,
    bestPokemonWarning,
    expectedStats
  };
}

