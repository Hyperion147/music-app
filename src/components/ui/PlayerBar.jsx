<<<<<<< HEAD
import { SkipBack, SkipForward, Pause, Play } from "lucide-react";
// import { useState, useRef, useEffect } from "react";
=======
import { SkipBack, SkipForward } from "lucide-react";
import { useState, useRef, useEffect } from "react";
>>>>>>> origin/main
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
<<<<<<< HEAD
    <div className="fixed bottom-0 left-0 right-0 border-t border-border bg-background lg:ml-64 lg:mb-0 mb-15 text-white z-50">
=======
    <div className="fixed bottom-0 left-0 right-0 bg-[#111] text-white">
>>>>>>> origin/main
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
        <div className="flex items-center gap-4 w-1/3">
<<<<<<< HEAD
          <div className="relative w-12 h-12 shrink-0">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={currentSong.name || currentSong.title}
                className="w-12 h-12 rounded object-cover"
                onError={(e) => {
                  // console.error("PlayerBar image failed to load:", imageUrl);
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
            ) : null}
            <div
              className={`absolute inset-0 w-12 h-12 rounded bg-muted flex items-center justify-center ${imageUrl ? "hidden" : ""}`}
            >
              <Play className="w-6 h-6 text-muted-foreground" />
            </div>
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium truncate text-foreground">
              {currentSong.name || currentSong.title}
            </p>
            <p className="text-xs  truncate text-muted-foreground">
              {currentSong.primaryArtists ||
                currentSong.artist ||
                currentSong.artists?.primary?.[0]?.name ||
                "Unknown Artist"}
=======
          <img
            src={song.image?.[0]?.url}
            alt="song"
            className="w-12 h-12 rounded"
          />
          <div>
            <p className="text-sm font-medium">{song.name}</p>
            <p className="text-xs text-gray-400">
              {song.artists?.primary?.[0]?.name}
>>>>>>> origin/main
            </p>
          </div>
        </div>

<<<<<<< HEAD
        <div className="flex items-center gap-6 lg:w-1/3 justify-center">
          <button
            onClick={skipPrevious}
            className=" hidden md:block text-muted-foreground hover:text-foreground transition-colors hover:bg-gray-200 hover:rounded-lg p-2 dark:hover:bg-green-600 dark:hover:text-black"
          >
            <SkipBack className="w-5 h-5" />
          </button>

          <button
            onClick={togglePlayPause}
            className="w-10 h-10 rounded-full bg-neon-green hover:bg-neon-green-hover flex items-center justify-center text-black cursor-pointer transition-colors"
=======
        <div className="flex items-center gap-6 w-1/3 justify-center">
          <SkipBack />
          <div
            onClick={() => setIsPlaying((p) => !p)}
            className="w-10 h-10 rounded-full bg-[#00FF88] flex items-center justify-center text-black cursor-pointer"
>>>>>>> origin/main
          >
            {isPlaying ? (
              <Pause size={24} />
            ) : (
              <Play size={24} />
            )}
<<<<<<< HEAD
          </button>

          <button
            onClick={skipNext}
            className="hidden md:block text-muted-foreground hover:text-foreground transition-colors hover:bg-gray-200 hover:rounded-lg p-2 dark:hover:bg-green-600 dark:hover:text-black"
          >
            <SkipForward className="w-5 h-5" />
          </button>
=======
          </div>
          <SkipForward />
>>>>>>> origin/main
        </div>

        <div className="hidden w-1/3 md:flex justify-end text-muted-foreground">
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
