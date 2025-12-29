import { useRef, useState, useEffect } from "react";

/**
 * Custom Hook: useAudioPlayer
 * Handles all audio logic (play, pause, seek, volume, etc.)
 */
const useAudioPlayer = (audioSrc) => {
  const audioRef = useRef(new Audio(audioSrc));

  /* ===== STATE ===== */
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);

  /* ===== LOAD AUDIO ===== */
  useEffect(() => {
    audioRef.current.src = audioSrc;

    const audio = audioRef.current;

    const onLoaded = () => setDuration(audio.duration || 0);
    const onEnded = () => setIsPlaying(false);

    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.pause();
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("ended", onEnded);
    };
  }, [audioSrc]);

  /* ===== PROGRESS UPDATE ===== */
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentTime(audioRef.current.currentTime);
    }, 300);

    return () => clearInterval(interval);
  }, [isPlaying]);

  /* ===== VOLUME ===== */
  useEffect(() => {
    audioRef.current.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);

  /* ===== CONTROLS ===== */
  const play = () => {
    audioRef.current.play();
    setIsPlaying(true);
  };

  const pause = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const togglePlay = () => {
    isPlaying ? pause() : play();
  };

  const seek = (time) => {
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const changeVolume = (v) => setVolume(v);

  const toggleMute = () => setIsMuted((prev) => !prev);

  const changePlaybackRate = () => {
    const rates = [0.5, 1, 1.5, 2];
    const next = rates[(rates.indexOf(playbackRate) + 1) % rates.length];
    audioRef.current.playbackRate = next;
    setPlaybackRate(next);
  };

  /* ===== RETURN EVERYTHING UI NEEDS ===== */
  return {
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    playbackRate,
    play,
    pause,
    togglePlay,
    seek,
    changeVolume,
    toggleMute,
    changePlaybackRate
  };
};

export default useAudioPlayer;
