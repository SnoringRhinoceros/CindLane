import MiniStatBoxContainer from "../MiniStatBoxContainer";

function TeamTab({ teamResults }) {
    
    const calculateOverallTeamWinRate = () => {
        console.log(teamResults);
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
        console.log(teamWinRates);
        const totalWinRate = teamWinRates.reduce((acc, curr) => acc + curr, 0);
        return totalWinRate / teamWinRates.length;
    }

    const statsToShow = [
        { text: "Counters", stat: "Galarian Rapidash (56%)", description: "Counter pick to your selected pick" },
        { text: "Synergies", stat: "Alolan Ninetales and Mamoswine (70%)", description: "Shows pokemon that work well with each other" },
        { text: "Expected Damage", stat: "493,365", description: "Expected damage the team is expected to do" },
        { text: "Expected Healing", stat: "204,631", description: "Expected healing the team is expected to do" },
      ];
      

    return (
        <div>
            <MiniStatBoxContainer stats={[{ text: "Overall Chance of Winning", stat: calculateOverallTeamWinRate() + "%", description: "Expected win rate of this team considering all variables"}]} />
            <MiniStatBoxContainer stats={statsToShow} />
        </div>
    )
};

export default TeamTab;