import { useEffect, useRef } from "react";
import { FaPlay, FaPause, FaMusic } from "react-icons/fa";
import { usePlayer } from "../context/PlayerContext";
import "./AudioPlayer.css";

const AudioPlayer = () => {
  const { currentSong, isPlaying, setIsPlaying } = usePlayer();
  const audioRef = useRef(null);

  useEffect(() => {
    if (!audioRef.current || !currentSong) return;

    isPlaying ? audioRef.current.play() : audioRef.current.pause();
  }, [currentSong, isPlaying]);

  if (!currentSong) return null;

  return (
    <div className="audio-player">
      {/* LEFT — Track Info */}
      <div className="player-track-info">
        <div className="track-thumbnail">
          {currentSong.cover ? (
            <img src={currentSong.cover} alt={currentSong.title} />
          ) : (
            <FaMusic className="music-icon" />
          )}
        </div>

        <div className="track-info">
          <h3>{currentSong.title}</h3>
          <p>{currentSong.artist}</p>
        </div>
      </div>

      {/* CENTER — Controls */}
      <div className="player-controls-section">
        <div className="controls-row">
          <button
            className="player-btn play-pause-btn"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
        </div>
      </div>

      {/* RIGHT — Extras */}
      <div className="player-extras">
        <div className="queue-info">
          Queue <span className="queue-count">1</span>
        </div>
      </div>

      <audio ref={audioRef} src={currentSong.audioUrl} />
    </div>
  );
};

export default AudioPlayer;
