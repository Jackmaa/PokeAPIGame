import typeColors from '../utils/typeColors';
import typeEmojis from '../utils/typeEmojis';
import { useComparison } from '../context/ComparisonContext';
import StatRadar from './ui/StatRadar';

function ComparisonPanel({ pokemons }) {
  const { clearCompare } = useComparison();
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
        {pokemons.map(p => (
          <div className="comparison-card" key={p.id}>
            <img
              src={p.sprites.front_default}
              alt={p.name}
              className="comp-sprite"
            />
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
            <StatRadar stats={p.stats} type={p.types[0].type.name} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ComparisonPanel;
