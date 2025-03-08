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

    return (
        <div>
            <p>Team overall win rate: {calculateOverallTeamWinRate(teamResults)}%</p>
        </div>
    )
};

export default TeamTab;