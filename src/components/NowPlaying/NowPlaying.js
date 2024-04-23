import React, { useState, useEffect } from 'react';
import Spotify from '../../utils/spotify';

const NowPlaying = () => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const fetchCurrentTrack = async () => {
      const track = await Spotify.getCurrentTrack();
      if (track) {
        setCurrentTrack(track);
        setIsPlaying(track.is_playing)
      }
    }

    fetchCurrentTrack()
    const interval = setInterval(fetchCurrentTrack, 10000); // Update every second
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    // Effect to handle automatic toggling of play/pause
    const handlePlayback = async () => {
      if (isPlaying && currentTrack) {
        await Spotify.play(currentTrack?.uri).catch(console.error);
      } else {
        await Spotify.pause()(console.error);
      }
    };
    handlePlayback();
  }, [isPlaying, currentTrack]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  if (!currentTrack) {
    return <div className="NowPlaying">Loading current track...</div>;
  }

  return (
    <div className="NowPlaying">
      <div>
        <strong>Now Playing:</strong> {currentTrack.name} by {currentTrack.artist}
        <button onClick={handlePlayPause}>{isPlaying ? 'Pause' : 'Play'}</button>
      </div>
    </div>
  )
}

export default NowPlaying;

