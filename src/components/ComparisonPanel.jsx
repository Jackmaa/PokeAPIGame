import { useComparison } from '../context/ComparisonContext';
import typeColors from '../utils/typeColors';
import typeEmojis from '../utils/typeEmojis';
import radarColors from '../utils/radarColors';
import StatRadar from './ui/StatRadar';

function ComparisonPanel({ pokemons }) {
  const { clearCompare, removeFromCompare } = useComparison();
  const sortedPokemons = [...pokemons].sort((a, b) => {
    const totalA = a.stats.reduce((sum, s) => sum + s.base_stat, 0);
    const totalB = b.stats.reduce((sum, s) => sum + s.base_stat, 0);
    return totalB - totalA; // Descending
  });
  const bestId = sortedPokemons[0]?.id;
  const statKeys = [
    'hp',
    'attack',
    'defense',
    'special-attack',
    'special-defense',
    'speed',
  ];

  const maxStats = statKeys.reduce((acc, key) => {
    acc[key] = Math.max(
      ...pokemons.map(
        p => p.stats?.find(stat => stat.stat.name === key)?.base_stat || 0
      )
    );
    return acc;
  }, {});

  if (pokemons.length < 2) return null;

  return (
    <div className="comparison-panel">
      <div className="comparison-header">
        <h3>Comparison</h3>
        <div>
          <button onClick={clearCompare} className="reset-btn">
            Reset
          </button>
        </div>
      </div>

      <div className="comparison-grid">
        {pokemons.map((p, index) => (
          <div
            className={`comparison-card ${p.id === bestId ? 'best-card-glow' : ''}`}
            key={p.id}
            style={{ position: 'relative' }}
          >
            <img
              src={p.sprites.front_default}
              alt={p.name}
              className="comp-sprite"
            />
            <button
              onClick={() => removeFromCompare(p.id)}
              title={`Remove ${p.name} from comparison`}
              style={{
                position: 'absolute',
                top: '0.4rem',
                right: '0.4rem',
                background: 'transparent',
                border: 'none',
                color: '#c00',
                fontWeight: 'bold',
                fontSize: '1rem',
                cursor: 'pointer',
              }}
            >
              ❌
            </button>
            {p.id === bestId && (
              <div
                className="crown-badge"
                title="Top Pokémon"
                style={{
                  position: 'absolute',
                  top: '0rem',
                  left: '0.4rem',
                  fontSize: '1.5rem',
                  filter: 'drop-shadow(0 0 4px gold)',
                }}
              >
                👑
              </div>
            )}
            <h4>{p.name}</h4>

            <div
              className="comp-types"
              style={{
                display: 'flex',
                gap: '0.5rem',
                justifyContent: 'center',
                flexWrap: 'wrap',
              }}
            >
              {p.types.map(t => {
                const typeName = t.type.name;
                return (
                  <span
                    key={typeName}
                    style={{
                      backgroundColor: typeColors[typeName] + '22',
                      color: typeColors[typeName],
                      border: `1px solid ${typeColors[typeName]}`,
                      padding: '0.2rem 0.5rem',
                      borderRadius: '0.5rem',
                      fontSize: '0.75rem',
                      fontWeight: 'bold',
                    }}
                    title={typeName}
                  >
                    {typeEmojis[typeName]} {typeName.toUpperCase()}
                  </span>
                );
              })}
            </div>

            <StatRadar
              stats={p.stats}
              type={p.types[0].type.name}
              radarColor={radarColors[index] ?? '#ccc'}
              maxStats={maxStats}
              isBest={p.id === bestId}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ComparisonPanel;
