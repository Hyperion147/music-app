import { SkipBack, SkipForward } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import VolumeControl from "./VolumeControl";
import ProgressBar from "./ProgressBar";
import Song_details from "../Hooks/song_details";

export default function PlayerBar({
  mainId,
  value,
  isPlay,
  setIsPlay,
  setMainId,
}) {
  const [volume, setVolume] = useState(50);
  const [id, setId] = useState(null);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    if (mainId === null || !value?.length) return;
    setId(value[mainId]);
  }, [mainId, value]);

  const NextSong = () =>
    setMainId(mainId === value.length - 1 ? 0 : mainId + 1);
  const BackSong = () =>
    setMainId(mainId === 0 ? value.length - 1 : mainId - 1);

  const api_data = Song_details(id);
  const song = api_data?.data?.[0];
  const duration = Number(song?.duration || 0);

  useEffect(() => {
    if (!song) return;
    const songUrl = song.downloadUrl?.[4]?.url;
    if (!songUrl) return;

    const audio = new Audio(songUrl);
    audio.volume = volume / 100;
    audioRef.current = audio;

    const updateProgress = () => setProgress(audio.currentTime);
    const handleEnded = () =>
      setMainId((prev) => (prev === value.length - 1 ? 0 : prev + 1));

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("ended", handleEnded);

    if (isPlay) audio.play();

    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [song]);

  useEffect(() => {
    if (!audioRef.current) return;
    isPlay ? audioRef.current.play() : audioRef.current.pause();
  }, [isPlay]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume / 100;
  }, [volume]);

  if (!song) return null;

  return (
    <div className="fixed bottom-14 md:bottom-0 left-0 md:left-64 right-0 bg-card text-card-foreground z-30 shadow-inner">
      <div className="px-4 md:px-6 pt-2">
        <ProgressBar
          progress={progress}
          setProgress={setProgress}
          duration={duration}
          audioRef={audioRef}
        />
      </div>

      <div className="h-14 px-4 md:px-6 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 w-1/3 min-w-0">
          <img
            src={song.image?.[0]?.url}
            alt={song.name}
            className="w-10 h-10 rounded"
          />
          <div className="truncate">
            <p className="text-sm font-medium truncate">{song.name}</p>
            <p className="text-xs text-muted-foreground truncate">
              {song.artists?.primary?.[0]?.name}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 w-1/3 justify-center">
          <SkipBack
            onClick={BackSong}
            size={18}
            className="text-muted-foreground hover:text-foreground cursor-pointer"
          />

          <div
            onClick={() => setIsPlay(!isPlay)}
            className="w-9 h-9 rounded-full bg-neon-green flex items-center justify-center text-black cursor-pointer transition"
          >
            {isPlay ? (
              <svg width="18" height="18" fill="currentColor">
                <rect x="4" y="3" width="3" height="12" />
                <rect x="11" y="3" width="3" height="12" />
              </svg>
            ) : (
              <svg width="18" height="18" fill="currentColor">
                <polygon points="4,3 15,9 4,15" />
              </svg>
            )}
          </div>

          <SkipForward
            onClick={NextSong}
            size={18}
            className="text-muted-foreground hover:text-foreground cursor-pointer"
          />
        </div>

        {/* Volume */}
        <div className="hidden md:flex w-1/3 justify-end">
          <VolumeControl
            volume={volume}
            setVolume={setVolume}
            audioRef={audioRef}
          />
        </div>
      </div>
    </div>
  );
}
