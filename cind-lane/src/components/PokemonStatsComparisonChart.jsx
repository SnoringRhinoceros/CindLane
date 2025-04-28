import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  LabelList,
  Cell,
  Text,
} from 'recharts';

export default function PokemonStatsComparisonChart({ playerStats, globalStats }) {
  if (!playerStats || !globalStats) return null;

  const rawPlayerStats = {
    Kills: playerStats.expectedStats.kills,
    Deaths: playerStats.expectedStats.deaths,
    Damage: playerStats.expectedStats.damage,
    Healing: playerStats.expectedStats.healing,
    Score: parseInt(playerStats.avgScore.replace(/,/g, '')),
  };

  const rawGlobalStats = {
    Kills: globalStats.kills,
    Deaths: globalStats.deaths,
    Damage: globalStats.damage,
    Healing: globalStats.healing,
    Score: globalStats.score,
  };

  const data = Object.keys(rawPlayerStats).map((stat) => {
    const percent = (rawPlayerStats[stat] / rawGlobalStats[stat]) * 100;
    return {
      stat,
      Player: percent,
      rawPlayer: rawPlayerStats[stat],
      rawGlobal: rawGlobalStats[stat],
    };
  });

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const { rawPlayer, rawGlobal } = payload[0].payload;
      return (
        <div className="bg-white p-2 border border-gray-300 rounded shadow">
          <p className="font-bold">{label}</p>
          <p>Player: {rawPlayer.toLocaleString()}</p>
          <p>Global Avg: {rawGlobal.toLocaleString()}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-96">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 30, right: 30, left: 0, bottom: 20 }}>
          <XAxis dataKey="stat" />
          <YAxis unit="%" domain={[0, 'dataMax + 20']} />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine
            y={100}
            stroke="rgba(0,0,0,0.5)"
            strokeWidth={2}
            strokeDasharray="4 4"
            isFront
            ifOverflow="extendDomain"
          />
          <text x="100%" y="30" textAnchor="end" fill="gray" fontSize={12}>
            ← Global Avg (100%)
          </text>

          <Bar dataKey="Player" name="Performance" isAnimationActive={false} radius={[5, 5, 0, 0]}>
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.Player >= 100 ? '#4caf50' : '#f44336'}
              />
            ))}
            <LabelList
              dataKey="Player"
              position="top"
              formatter={(val) => `${val.toFixed(0)}%`}
              style={{ fontWeight: 'bold', fill: '#333' }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
