import React from 'react';
import Tracklist from '../Tracklist/Tracklist';
import './Playlist.css';

function Playlist({ playlistName, playlistTracks, onRemove, onNameChange, onSave }) {
  const handleNameChange = event => {
    onNameChange(event.target.value)
  }

  return (
    <div className="Playlist">
      <div className="saveWrapper">
        <input
          value={playlistName}
          onChange={handleNameChange}
          placeholder="New Playlist Name" />
        <button className="Playlist-save" onClick={onSave}>SAVE TO SPOTIFY</button>
      </div>
      <Tracklist tracks={playlistTracks} onRemove={onRemove} isRemoval={true} />
    </div>
  );
}

export default Playlist;
