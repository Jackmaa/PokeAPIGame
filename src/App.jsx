import { useState } from 'react';

import PokedexGrid from './components/PokedexGrid';
import SidebarPanel from './components/SidebarPanel';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState(null);
  const [limit, setLimit] = useState(20);
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
          setLimit(20);
        }}
      />

      <PokedexGrid
        selectedType={selectedType}
        searchTerm={searchTerm}
        onSelectType={type => {
          setSearchTerm('');
          setSelectedType(type);
        }}
        limit={limit}
        setLimit={setLimit}
      />
    </div>
  );
}

export default App;
