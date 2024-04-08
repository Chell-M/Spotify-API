import React, { useState } from "react";
import SearchBar from './components/SearchBar/SearchBar'
import SearchResults from './components/SearchResults/SearchResults'
import Playlist from './components/Playlist/Playlist'
import './App.css'

function App() {
  const [searchResults, setSearchResults] = useState([
    { id: '1', name: 'Track 1', artist: 'Artist 1', album: 'Album 1' },
    { id: '2', name: 'Track 2', artist: 'Artist 2', album: 'Album 2' }
  ])

  return (
    <div className="App">
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <SearchBar />
      <SearchResults searchResults={searchResults} />
      <Playlist />
    </div>
  )
}

export default App
