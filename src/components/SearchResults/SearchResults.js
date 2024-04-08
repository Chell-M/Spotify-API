import React from 'react'
import Tracklist from '../Tracklist/Tracklist'
import './SearchResults.css'

function SearchResults({ searchResults }) {
  return (
    <div className="SearchResults">
      <h2>Results</h2>
      <Tracklist tracks={searchResults} />
    </div>
  );
}

export default SearchResults;

