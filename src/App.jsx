import { useState } from 'react';

import PokedexGrid from './components/PokedexGrid';
import SidebarPanel from './components/SidebarPanel';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState(null);
  const [error, setError] = useState(null);
  return (
    <div className="main-layout">
      <SidebarPanel
        onSearch={value => {
          setSearchTerm(value);
          setSelectedType(null);
        }}
        onError={setError}
        selectedType={selectedType}
        onSelectType={type => {
          setSearchTerm('');
          setSelectedType(type);
        }}
      />

      <PokedexGrid
        selectedType={selectedType}
        searchTerm={searchTerm}
        onSelectType={type => {
          setSearchTerm('');
          setSelectedType(type);
        }}
      />
    </div>
  );
}

export default App;
