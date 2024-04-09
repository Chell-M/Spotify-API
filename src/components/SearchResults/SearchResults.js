import React from 'react'
import Tracklist from '../Tracklist/Tracklist'
import './SearchResults.css'

function SearchResults({ searchResults, onAdd }) {
  return (
    <div className="SearchResults">
      <h2>Results</h2>
      <Tracklist tracks={searchResults} onAdd={onAdd} />
    </div>
  );
}

export default SearchResults;

