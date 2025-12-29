import React from "react";
import "./AudioPlayer.css";
import useAudioPlayer from "../hooks/useAudioPlayer";
import ProgressBar from "./ProgressBar";
import VolumeControl from "./VolumeControl";

import {
  FaPlay,
  FaPause,
  FaStepBackward,
  FaStepForward,
  FaRandom,
  FaRedo,
  FaHeart,
  FaRegHeart,
  FaListUl
} from "react-icons/fa";

const AudioPlayer = ({
  audioSrc,
  title = "No song selected",
  artist = "Select a song to play",
  thumbnail = ""
}) => {
  const {
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    playbackRate,
    togglePlay,
    seek,
    changeVolume,
    toggleMute,
    changePlaybackRate
  } = useAudioPlayer(audioSrc);

  const format = (t) => {
    if (isNaN(t)) return "00:00";
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${m.toString().padStart(2, "0")}:${s
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="audio-player">
      {/* LEFT */}
      <div className="player-track-info">
        <div className="track-thumbnail">
          {thumbnail ? <img src={thumbnail} alt="cover" /> : "🎵"}
        </div>

        <div className="track-info">
          <h3>{title}</h3>
          <p>{artist}</p>
        </div>

        <button className="like-btn">
          <FaRegHeart />
        </button>
      </div>

      {/* CENTER */}
      <div className="player-controls-section">
        <div className="controls-row">
          <button className="player-btn playback-rate-btn" onClick={changePlaybackRate}>
            {playbackRate}x
          </button>

          <button className="player-btn">
            <FaRandom />
          </button>

          <button className="player-btn">
            <FaStepBackward />
          </button>

          <button className="player-btn play-pause-btn" onClick={togglePlay}>
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>

          <button className="player-btn">
            <FaStepForward />
          </button>

          <button className="player-btn">
            <FaRedo />
          </button>
        </div>

        <div className="progress-section">
          <span className="time-display">{format(currentTime)}</span>
          <ProgressBar
            currentTime={currentTime}
            duration={duration}
            onSeek={seek}
          />
          <span className="time-display">{format(duration)}</span>
        </div>
      </div>

      {/* RIGHT */}
      <div className="player-extras">
        <VolumeControl
          volume={volume}
          isMuted={isMuted}
          onVolumeChange={changeVolume}
          onToggleMute={toggleMute}
        />

        <div className="queue-info">
          <span className="queue-count">1/1</span>
          <span>in queue</span>
        </div>

        <button className="player-btn">
          <FaListUl />
        </button>
      </div>
    </div>
  );
};

export default AudioPlayer;
