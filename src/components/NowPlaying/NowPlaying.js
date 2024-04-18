
import React, { useState, useEffect } from 'react';
import Spotify from '../../utils/spotify';

const NowPlaying = () => {
  const [currentTrack, setCurrentTrack] = useState(null);

  useEffect(() => {
    const fetchCurrentTrack = async () => {
      const track = await Spotify.getCurrentTrack();
      setCurrentTrack(track);
    };

    fetchCurrentTrack();
    const interval = setInterval(fetchCurrentTrack, 1000); // Update every second

    return () => clearInterval(interval);
  }, []);

  const formatTime = ms => {
    if (ms == null) return "--:--";
    let seconds = Math.floor(ms / 1000);
    let minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  if (!currentTrack) {
    return <div className="NowPlaying">Loading current track...</div>;
  }

  const progressPercentage = (currentTrack.progress_ms / currentTrack.duration_ms) * 100;

  return (
    <div className="NowPlaying">
      <div>
        <strong>Now Playing:</strong> {currentTrack.name} by {currentTrack.artist}
      </div>
      <div className="progress-bar-background">
        <div className="timerWrap">
          <div className="progress-bar-foreground" style={{ width: `${progressPercentage}%` }}></div>
        </div>
        <div className="track-timing">
          {formatTime(currentTrack.progress_ms)} / {formatTime(currentTrack.duration_ms)}
        </div>
      </div>
    </div>
  );
};

export default NowPlaying;
