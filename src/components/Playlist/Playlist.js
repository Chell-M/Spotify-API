import React from 'react';
import Tracklist from '../Tracklist/Tracklist';
import './Playlist.css';

function Playlist() {
  const mockPlaylistTracks = [{ id: 2, name: 'Song Name 2', artist: 'Artist Name 2', album: 'Album Name 2' }];
  return (
    <div className="Playlist">
      <input defaultValue="New Playlist" />
      <Tracklist tracks={mockPlaylistTracks} />
      <button className="Playlist-save">SAVE TO SPOTIFY</button>
    </div>
  );
}

export default Playlist;
