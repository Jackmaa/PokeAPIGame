import SearchBar from './SearchBar';
import TypeFilter from './TypeFilter';

function SidebarPanel({ onSearch, onError, selectedType, onSelectType }) {
  return (
    <aside className="sidebar-panel">
      <h1 className="sidebar-title">Pokédex 🔎</h1>

      {/* 🔍 SearchBar */}
      <SearchBar onSearch={onSearch} onError={onError} />

      {/* 🎛️ Type Filtering */}
      <TypeFilter selectedType={selectedType} onSelectType={onSelectType} />

      {/* 📚 Recent Pokémon */}
      {/* <RecentList onSearch={onSearch} /> */}

      {/* 🔮 Placeholder for future stuff */}
      {/* <Favorites /> */}
      {/* <CompareBar /> */}
    </aside>
  );
}

export default SidebarPanel;
