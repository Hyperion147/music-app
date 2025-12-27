import { SkipBack, SkipForward, Play, Heart, Plus } from "lucide-react";
import { useState } from "react";
import VolumeControl from "./VolumeControl";
import ProgressBar from "./ProgressBar";
import PlaylistModal from "./PlaylistModal";
import { useMusicPlayer } from "../../context/MusicContext";
import { useLikedSongs } from "../../context/LikedSongsContext";

export default function PlayerBar() {
  const {
    currentSong,
    isPlaying,
    volume,
    progress,
    duration,
    togglePlayPause,
    seekTo,
    changeVolume,
    skipNext,
    skipPrevious,
    audioRef,
  } = useMusicPlayer();

  const { toggleLike, isLiked } = useLikedSongs();
  const [playlistModalOpen, setPlaylistModalOpen] = useState(false);

  const handleLikeClick = () => {
    if (currentSong) {
      toggleLike(currentSong);
    }
  };

  const handleAddToPlaylist = () => {
    if (currentSong) {
      setPlaylistModalOpen(true);
    }
  };

  const extractImageUrl = (song) => {
    if (!song || !song.image) return null;

    if (Array.isArray(song.image)) {
      // If image is an array, try to get the highest quality
      return (
        song.image[song.image.length - 1]?.link ||
        song.image[song.image.length - 1]?.url ||
        song.image[2]?.link ||
        song.image[1]?.link ||
        song.image[0]?.link ||
        song.image[2]?.url ||
        song.image[1]?.url ||
        song.image[0]?.url
      );
    } else if (typeof song.image === "string") {
      // If image is a direct string URL
      return song.image;
    } else if (song.image.link || song.image.url) {
      // If image is an object with link or url property
      return song.image.link || song.image.url;
    }

    return null;
  };

  if (!currentSong) return null;

  const imageUrl = extractImageUrl(currentSong);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-md border-t border-border/50 text-white z-50 shadow-2xl">
      <div className="px-3 sm:px-6 pt-2">
        <ProgressBar
          progress={progress}
          setProgress={seekTo}
          duration={duration}
          isPlaying={isPlaying}
          audioRef={audioRef}
        />
      </div>

      <div className="h-14 sm:h-16 px-3 sm:px-6 flex items-center justify-between gap-2 sm:gap-4">
        {/* Song Info - Left Side */}
        <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0 sm:w-1/3">
          <div className="relative w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={currentSong.name || currentSong.title}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl object-cover shadow-lg"
                onError={(e) => {
                  console.error("PlayerBar image failed to load:", imageUrl);
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
            ) : null}
            <div
              className={`absolute inset-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center shadow-lg ${imageUrl ? "hidden" : ""}`}
            >
              <Play className="w-4 h-4 sm:w-6 sm:h-6 text-gray-400" />
            </div>
          </div>
          <div className="min-w-0 flex-1 hidden sm:block">
            <p className="text-sm font-semibold truncate text-white">
              {currentSong.name || currentSong.title}
            </p>
            <p className="text-xs text-gray-400 truncate mt-0.5">
              {currentSong.primaryArtists ||
                currentSong.artist ||
                currentSong.artists?.primary?.[0]?.name ||
                "Unknown Artist"}
            </p>
          </div>
          <button
            onClick={handleLikeClick}
            className={`p-1.5 sm:p-2 rounded-full hover:bg-gray-800/50 transition-all duration-200 flex-shrink-0 ${
              isLiked(currentSong.id)
                ? "text-red-500 scale-110"
                : "text-gray-400 hover:text-white hover:scale-105"
            }`}
          >
            <Heart
              className={`w-4 h-4 sm:w-5 sm:h-5 ${isLiked(currentSong.id) ? "fill-current" : ""}`}
            />
          </button>
          <button
            onClick={handleAddToPlaylist}
            className="p-2 rounded-full hover:bg-gray-800/50 transition-all duration-200 text-gray-400 hover:text-white hover:scale-105"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {/* Controls - Center */}
        <div className="flex items-center gap-3 sm:gap-6 justify-center flex-shrink-0">
          <button
            onClick={skipPrevious}
            className="text-gray-400 hover:text-white transition-colors p-1.5 sm:p-2 rounded-full hover:bg-gray-800/50"
          >
            <SkipBack className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          <button
            onClick={togglePlayPause}
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-neon-green to-neon-green-hover hover:from-neon-green-hover hover:to-neon-green flex items-center justify-center text-black cursor-pointer transition-all duration-200 shadow-lg hover:shadow-neon-green/25 hover:scale-105"
          >
            {isPlaying ? (
              <svg
                width="16"
                height="16"
                className="sm:w-5 sm:h-5"
                fill="currentColor"
              >
                <rect x="4" y="3" width="2.5" height="10" rx="1" />
                <rect x="9.5" y="3" width="2.5" height="10" rx="1" />
              </svg>
            ) : (
              <svg
                width="16"
                height="16"
                className="sm:w-5 sm:h-5"
                fill="currentColor"
              >
                <polygon points="5,2 14,8 5,14" />
              </svg>
            )}
          </button>

          <button
            onClick={skipNext}
            className="text-gray-400 hover:text-white transition-colors p-1.5 sm:p-2 rounded-full hover:bg-gray-800/50"
          >
            <SkipForward className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Volume Control - Right Side */}
        <div className="hidden sm:flex sm:w-1/3 justify-end">
          <VolumeControl
            volume={volume}
            setVolume={changeVolume}
            audioRef={audioRef}
          />
        </div>

        {/* Mobile Add to Playlist Button */}
        <button
          onClick={() => setPlaylistModalOpen(true)}
          className="sm:hidden p-1.5 rounded-full hover:bg-gray-800/50 transition-colors text-gray-400 hover:text-white flex-shrink-0"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Playlist Modal */}
      <PlaylistModal
        isOpen={playlistModalOpen}
        onClose={() => setPlaylistModalOpen(false)}
        song={currentSong}
      />
    </div>
  );
}
