import React from 'react';
import './Track.css';
import Spotify from '../../utils/spotify'; // Make sure the path is correct

function Track({ track, onAdd, onRemove, isRemoval }) {
  const addTrack = () => {
    onAdd(track)
  }

  const removeTrack = () => {
    onRemove(track)
  }

  const playTrack = () => {
    Spotify.play(`spotify:track:${track.id}`); // Ensures the URI format is correct
  };

  return (
    <div className="Track">
      <div className="Track-information">
        <h3>{track.name}</h3>
        <p>{track.artist} | {track.album}</p>
      </div>
      {
        isRemoval ?
          <button className="Track-action" onClick={removeTrack}>-</button>
          :
          <button className="Track-action" onClick={addTrack}>+</button>
      }
      <button className="Track-action" onClick={playTrack}>Play</button> {/* Play button */}
    </div>
  );
}

export default Track;
