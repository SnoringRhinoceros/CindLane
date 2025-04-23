import { useMemo } from "react";
import battleData from "../data/battles.json";

export function useTeamStats(teamResults) {
  const teamStats = useMemo(() => {
    const synergyPairs = [];
    const validPlayers = teamResults.filter(Boolean);
    const playerWinRatesByPokemon = {};

  // SYNERGY CALCULATION
  for (let i = 0; i < validPlayers.length; i++) {
    const p1 = validPlayers[i];
    const name1 = p1.pokemon;
    if (!name1) continue; // Skip if p1 has no Pokémon
  
    const record1 = p1.player?.pokemon?.find(p => p.name === name1);
    const win1 = record1?.win_rate ?? p1.player?.win_rate ?? 50;
    playerWinRatesByPokemon[name1] = win1;
  
    for (let j = i + 1; j < validPlayers.length; j++) {
      const p2 = validPlayers[j];
      const name2 = p2.pokemon;
      if (!name2) continue; // Skip if p2 has no Pokémon
  
      const record2 = p2.player?.pokemon?.find(p => p.name === name2);
      const win2 = record2?.win_rate ?? p2.player?.win_rate ?? 50;
  
      const synergyScore = (win1 + win2) / 2;
      const pairKey = [name1, name2].sort().join(" + ");
  
      if (synergyScore >= 55) {
        synergyPairs.push({
          pair: pairKey,
          synergy: synergyScore.toFixed(1) + "%",
          rawSynergy: synergyScore,
        });
      }
    }
  }
  

  // Sort synergyPairs by raw synergy descending
  synergyPairs.sort((a, b) => b.rawSynergy - a.rawSynergy);


    // COUNTER CALCULATION: based on actual battles
    const teamPokemon = validPlayers.map(p => p?.pokemon).filter(Boolean);
    const counterMap = {};

    for (const battle of battleData) {
      if (!battle.players || !battle.result?.winner) continue;

      const team1 = battle.players.filter(p => p.team === 1);
      const team2 = battle.players.filter(p => p.team === 2);
      const team1Won = battle.result.winner === "Team 1";
      const team2Won = battle.result.winner === "Team 2";

      const opposingCombos = [
        [team1, team2, team2Won],
        [team2, team1, team1Won],
      ];

      for (const [allies, enemies, didWin] of opposingCombos) {
        for (const ally of allies) {
          if (!teamPokemon.includes(ally.pokemon)) continue;

          for (const enemy of enemies) {
            if (!enemy.pokemon) continue;
            const key = enemy.pokemon;

            if (!counterMap[key]) counterMap[key] = { wins: 0, games: 0 };

            counterMap[key].games += 1;
            if (didWin) counterMap[key].wins += 1;
          }
        }
      }
    }

    const counterPicks = Object.entries(counterMap)
      .filter(([_, stats]) => stats.games >= 3)
      .map(([pokemon, stats]) => ({
        pokemon,
        winRate: ((stats.wins / stats.games) * 100).toFixed(1),
      }))
      .filter(c => parseFloat(c.winRate) >= 55)
      .sort((a, b) => parseFloat(b.winRate) - parseFloat(a.winRate));

      return {
        synergyPairs: synergyPairs.map(({ pair, synergy }) => ({ pair, synergy })),
        counterPicks,
        teamWinRates: playerWinRatesByPokemon,
      };
      
  }, [teamResults]);

  return teamStats;
}
