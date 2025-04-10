import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';
import PropTypes from 'prop-types';
import typeColors from '../../utils/typeColors';

function StatRadar({ stats, type }) {
  const color = typeColors[type] || '#888';
  const data = stats.map(stat => ({
    stat: stat.stat.name.toUpperCase(),
    value: stat.base_stat,
  }));

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
            name="Stats"
            dataKey="value"
            stroke={color}
            fill={color}
            fillOpacity={0.6}
          />
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
