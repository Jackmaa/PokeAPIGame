import React from 'react';

function RecentList({ recentSearches, onSearch }) {
  return (
    <div className="recent-searches">
      <h4>Recent Searches:</h4>
      <ul>
        {recentSearches.map(search => (
          <li key={search} onClick={() => onSearch(search)}>
            {search}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecentList;
