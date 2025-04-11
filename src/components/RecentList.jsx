import { useNavigate } from 'react-router-dom';
import { useComparison } from '../context/ComparisonContext';
import MiniPokemonCard from './MiniPokemonCard';

function RecentList({ recentSearches, setRecentSearches }) {
  const navigate = useNavigate();
  const { toggleCompare, comparisonList } = useComparison();

  if (!recentSearches?.length) return null;

  const handleClear = () => {
    sessionStorage.removeItem('recentSearches');
    setRecentSearches([]);
  };

  return (
    <details open>
      <summary
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span>🕘 Recently Viewed</span>
        <button
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            handleClear();
          }}
          className="reset-btn"
        >
          Reset
        </button>
      </summary>

      <div className="recent-searches mini-list">
        {recentSearches.map(poke => {
          const isInComparison = comparisonList.some(p => p.id === poke.id);

          return (
            <div
              key={poke.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                position: 'relative',
                paddingRight: '2rem', // make space for button
              }}
            >
              <div
                onClick={() => navigate(`/pokemon/${poke.name}`)}
                style={{ flex: 1, cursor: 'pointer' }}
              >
                <MiniPokemonCard pokemon={poke} />
              </div>
              <button
                className="compare-btn"
                onClick={e => {
                  e.stopPropagation();
                  toggleCompare(poke);
                }}
                style={{
                  position: 'absolute',
                  top: '0.4rem',
                  right: '0.4rem',
                  fontSize: '0.65rem',
                  padding: '0.2rem 0.4rem',
                  background: '#111',
                  border: '1px solid #666',
                  borderRadius: '0.3rem',
                  color: isInComparison ? '#0f0' : '#ccc',
                  cursor: 'pointer',
                }}
                title={
                  isInComparison
                    ? 'Remove from comparison'
                    : 'Add to comparison'
                }
              >
                {isInComparison ? '✔' : '➕'}
              </button>
            </div>
          );
        })}
      </div>
    </details>
  );
}

export default RecentList;
