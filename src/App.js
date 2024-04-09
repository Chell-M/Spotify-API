import React, { useState } from "react";
import SearchBar from './components/SearchBar/SearchBar'
import SearchResults from './components/SearchResults/SearchResults'
import Playlist from './components/Playlist/Playlist'
import './App.css'

function App() {
  //state for search results
  const [searchResults, setSearchResults] = useState([
    { id: '1', name: 'Track 1', artist: 'Artist 1', album: 'Album 1' },
    { id: '2', name: 'Track 2', artist: 'Artist 2', album: 'Album 2' }
  ])

  //state for the playlist name and tracks
  const [playlistName, setPlaylistName] = useState('My Playlist')
  const [playlistTracks, setPlayListTracks] = useState([
    { id: '1', name: 'Track 1', artist: 'Artist 1', album: 'Album 1', uri: 'spotify:track:456' },
    { id: '2', name: 'Track 2', artist: 'Artist 2', album: 'Album 2', uri: 'spotify:track:456' }
  ])

  const savePlaylist = () => {
    const trackUris = playlistTracks.map(track => track.uri)
    console.log('saving Playlist with URIs', trackUris)

    setPlayListTracks([])
    setPlaylistName('New Playlist')
  }

  //function to add a track
  const addTrack = (track) => {
    if (!playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      setPlayListTracks([...playlistTracks, track])
    }
  }

  //function to remove track from playlist
  const removeTrack = (track) => {
    setPlayListTracks(playlistTracks.filter(savedTrack => savedTrack.id !== track.id))
  }

  //function to update playlist name 
  const updatePlaylistName = (name) => {
    setPlaylistName(name)
  }

  return (
    <div className="App">
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <SearchBar />
      <SearchResults searchResults={searchResults} onAdd={addTrack} />
      <Playlist
        playlistName={playlistName}
        playlistTracks={playlistTracks}
        onRemove={removeTrack}
        onNameChange={updatePlaylistName}
        onSave={savePlaylist}
      />
    </div>
  )
}

export default App
