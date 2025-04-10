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

function StatRadar({ stats, type }) {
  const color = typeColors[type] || '#888';
  const data = stats.map(stat => ({
    stat: stat.stat.name.toUpperCase(),
    value: stat.base_stat,
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
            name={data.stat}
            dataKey="value"
            stroke={color}
            fill={color}
            fillOpacity={0.6}
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
};

export default StatRadar;
