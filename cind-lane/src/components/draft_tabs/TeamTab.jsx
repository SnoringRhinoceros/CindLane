import MiniStatBoxContainer from "../MiniStatBoxContainer";

function TeamTab({ teamResults }) {
    
    const calculateOverallTeamWinRate = () => {
        console.log(teamResults);
        const teamWinRates = teamResults.map((team) => {
            if (team && team.pokemon && team.player && Array.isArray(team.player.pokemon)) {
                for (const possiblePokemon of team.player.pokemon) {
                    if (possiblePokemon.name === team.pokemon) {
                        return possiblePokemon.win_rate;
                    }
                }
                return 0;
            }
            return 0;
            
        });
        console.log(teamWinRates);
        const totalWinRate = teamWinRates.reduce((acc, curr) => acc + curr, 0);
        return totalWinRate / teamWinRates.length;
    }

    const statsToShow = [
        { text: "Users", stat: "1.2K", description: "Total registered users" },
        { text: "Revenue", stat: "$12K", description: "Monthly revenue" },
        { text: "Conversions", stat: "8.5%", description: "Conversion rate" },
        { text: "Bounce Rate", stat: "42%", description: "Percentage of users leaving" },
      ];
      

    return (
        <div>
            <MiniStatBoxContainer stats={[{ text: "Overall Chance of Winning", stat: calculateOverallTeamWinRate() + "%", description: "Expected win rate of this team considering all variables"}]} />
            <MiniStatBoxContainer stats={statsToShow} />
        </div>
    )
};

export default TeamTab;