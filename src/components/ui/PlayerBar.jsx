import { SkipBack, SkipForward, Pause, Play } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import VolumeControl from "./VolumeControl";
import ProgressBar from "./ProgressBar";
import song_details from "../Hooks/song_details";

export default function PlayerBar() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [progress, setProgress] = useState(0);

  const audioRef = useRef(null);
  const api_data = song_details();
  const song = api_data?.data?.[0];
  const duration = Number(song?.duration || 0);

  useEffect(() => {
    if (!song) return;

    const songUrl = song.downloadUrl?.[4]?.url;
    const audio = new Audio(songUrl);

    audioRef.current = audio;

    const updateProgress = () => {
      setProgress(audio.currentTime);
    };

    audio.addEventListener("timeupdate", updateProgress);

    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", updateProgress);
    };
  }, [song]);

  useEffect(() => {
    if (!audioRef.current) return;

    isPlaying ? audioRef.current.play() : audioRef.current.pause();
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  if (!song) return null;

  return (
    <div className="fixed bottom-0 lg:ml-64 lg:mb-0 mb-15 z-50 left-0 right-0 bg-card text-foreground border-t border-border">
      <div className="px-6 pt-2">
        <ProgressBar
          progress={progress}
          setProgress={setProgress}
          duration={duration}
          isPlaying={isPlaying}
          audioRef={audioRef}
        />
      </div>

      <div className="h-20 px-6 flex items-center justify-between">
        <div className="flex items-center w-1/3">
          <img
            src={song.image?.[0]?.url}
            alt="song"
            className="w-12 h-12 rounded"
          />
          <div className="ml-4">
            <p className="text-sm font-medium">{song.name}</p>
            <p className="text-xs text-foreground">
              {song.artists?.primary?.[0]?.name}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 lg:w-1/3 justify-center">
          <SkipBack className="hidden md:block dark:hover:bg-neon-green hover:bg-gray-200 rounded h-8 w-8 p-1.5" />
          <button
            onClick={() => setIsPlaying((p) => !p)}
            className="w-10 h-10 rounded-full bg-neon-green hover:bg-neon-green-hover flex items-center justify-center text-black cursor-pointer"
          >
            {isPlaying ? (
              <Pause size={24} />
            ) : (
              <Play size={24} />
            )}
          </button>
          <SkipForward className="hidden md:block dark:hover:bg-neon-green hover:bg-gray-200 rounded h-8 w-8 p-1.5"/>
        </div>

        <div className="hidden md:block w-1/3 md:flex justify-end">
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
