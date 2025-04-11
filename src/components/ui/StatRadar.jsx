import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import PropTypes from 'prop-types';
import typeColors from '../../utils/typeColors';

function StatRadar({ stats, type, radarColor, maxStats, isBest }) {
  const color = typeColors[type] || '#888';
  const strokeColor = isBest ? '#00ff88' : radarColor;
  const data = stats.map(s => ({
    stat: s.stat.name,
    value: s.base_stat,
    isMax: s.base_stat === maxStats?.[s.stat.name],
  }));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length > 0) {
      const { stat, value } = payload[0].payload;
      return (
        <div
          style={{
            background: '#222',
            color: '#fff',
            padding: '0.5rem',
            borderRadius: '0.5rem',
            fontSize: '0.8rem',
            boxShadow: '0 0 8px rgba(0,0,0,0.5)',
          }}
        >
          <strong>{stat}</strong>: {value}
        </div>
      );
    }

    return null;
  };

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '370px',
        height: '300px',
        margin: '0 auto',
      }}
    >
      <ResponsiveContainer>
        <RadarChart outerRadius={100} data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="stat" style={{ fontSize: '0.7rem' }} />
          <PolarRadiusAxis angle={30} domain={[0, 160]} />
          <Radar
            name="Stat"
            dataKey="value"
            stroke={strokeColor || color}
            fill={strokeColor || color}
            strokeWidth={data.some(d => d.isMax) ? 3 : 1}
            fillOpacity={0.6}
            dot={({ payload, cx, cy }) =>
              payload.isMax ? (
                <circle
                  cx={cx}
                  cy={cy}
                  r={4}
                  fill={strokeColor}
                  stroke="#000"
                  strokeWidth={1}
                />
              ) : null
            }
          />
          <Tooltip content={<CustomTooltip />} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

StatRadar.propTypes = {
  stats: PropTypes.arrayOf(
    PropTypes.shape({
      base_stat: PropTypes.number.isRequired,
      stat: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }),
    })
  ).isRequired,
  type: PropTypes.string.isRequired,
  radarColor: PropTypes.string,
  maxStats: PropTypes.object,
  isBest: PropTypes.bool,
};

export default StatRadar;
