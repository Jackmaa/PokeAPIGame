import SearchBar from './SearchBar';
import TypeFilter from './TypeFilter';
import RecentList from './RecentList';
import ComparisonPanel from './ComparisonPanel';
import { useState } from 'react';
import { useComparison } from '../context/ComparisonContext';

const getRecentSearches = () => {
  const recent = sessionStorage.getItem('recentSearches');
  return recent ? JSON.parse(recent) : [];
};

function SidebarPanel({ onSearch, onError, selectedType, onSelectType }) {
  const [recentSearches, setRecentSearches] = useState(getRecentSearches());
  const { comparisonList, clearCompare } = useComparison();
  return (
    <aside className="sidebar-panel">
      <h1 className="sidebar-title">Pokédex 🔎</h1>

      {/* 🔍 SearchBar */}
      <SearchBar onSearch={onSearch} onError={onError} />

      {/* 🎛️ Type Filtering */}
      <TypeFilter selectedType={selectedType} onSelectType={onSelectType} />

      {/* 📚 Recent Pokémon */}
      {recentSearches.length > 0 && (
        <RecentList recentSearches={recentSearches} onSearch={onSearch} />
      )}

      {/* 🔮 Placeholder for future stuff */}
      {/* <Favorites /> */}
      {/* <CompareBar /> */}
      <details open={comparisonList.length >= 2}>
        <summary>🔍 Compare ({comparisonList.length})</summary>
        <ComparisonPanel
          pokemons={comparisonList}
          onClear={() => setComparisonList([])}
        />
      </details>
    </aside>
  );
}

export default SidebarPanel;
