import MiniStatBoxContainer from "../MiniStatBoxContainer";

function TeamTab({ teamResults }) {

    const calculateOverallTeamWinRate = () => {
        const teamWinRates = teamResults.map((player) => {
            if (player && player.player && player.player.pokemon) {
                return player.player.pokemon[0].win_rate;
            }
            return 0;
        });
    
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
            <MiniStatBoxContainer stats={statsToShow} />
        </div>
    )
};

export default TeamTab;