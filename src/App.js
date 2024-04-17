import React, { useState, useEffect } from "react";
import SearchBar from './components/SearchBar/SearchBar'
import SearchResults from './components/SearchResults/SearchResults'
import Playlist from './components/Playlist/Playlist'
import Spotify from './utils/spotify';
import './App.css'

function App() {
  const [searchResults, setSearchResults] = useState([])
  const [playlistName, setPlaylistName] = useState('My Playlist')
  const [playlistTracks, setPlayListTracks] = useState([])
  const [currentTrack, setCurrentTrack] = useState(null)

  useEffect(() => {
    const fetchCurrentTrack = async () => {
      const track = await Spotify.getCurrentTrack()
      setCurrentTrack(track)
    };

    fetchCurrentTrack()

    const interval = setInterval(fetchCurrentTrack, 1000)

    return () => clearInterval(interval)
  }, [])


  const addTrack = track => {
    if (!playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      setPlayListTracks([...playlistTracks, track])
    }
  }

  const removeTrack = track => {
    setPlayListTracks(playlistTracks.filter(savedTrack => savedTrack.id !== track.id))
  }

  const updatePlaylistName = name => {
    setPlaylistName(name)
  }

  const savePlaylist = () => {
    const trackUris = playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(playlistName, trackUris).then(() => {
      setPlaylistName('New Playlist');
      setPlayListTracks([]);
    });
  }

  const search = term => {
    Spotify.search(term).then(searchResults => {
      setSearchResults(searchResults)
    })
  }

  return (
    <div className="App">
      <div className='headerWrap'>

        {currentTrack && (
          <div className="CurrentTrack">
            <h1>Ja<span className="highlight">mmm</span>ing</h1>
            <p>Currently Playing: {currentTrack.name} - {currentTrack.artist}</p>
          </div>
        )}

        <SearchBar onSearch={search} />
      </div>
      <div className='wrap'>
        <SearchResults searchResults={searchResults} onAdd={addTrack} />
        <Playlist
          playlistName={playlistName}
          playlistTracks={playlistTracks}
          onRemove={removeTrack}
          onNameChange={updatePlaylistName}
          onSave={savePlaylist}
        />

      </div>
    </div >
  )
}

export default App
