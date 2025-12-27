import { Play, Pause, Heart, Plus } from "lucide-react";
import { useState } from "react";
import { useMusicPlayer } from "../../context/MusicContext";
import { useLikedSongs } from "../../context/LikedSongsContext";
import PlaylistModal from "./PlaylistModal";

export default function SongList({ songs, title = "Songs" }) {
  const { currentSong, isPlaying, playSelectedSong, togglePlayPause } =
    useMusicPlayer();
  const { toggleLike, isLiked } = useLikedSongs();
  const [playlistModalOpen, setPlaylistModalOpen] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);

  const extractImageUrl = (song) => {
    if (!song.image) {
      console.log("No image data for song:", song.name || song.title);
      return null;
    }

    let imageUrl = null;

    if (Array.isArray(song.image)) {
      // If image is an array, try to get the highest quality
      imageUrl =
        song.image[song.image.length - 1]?.link ||
        song.image[song.image.length - 1]?.url ||
        song.image[2]?.link ||
        song.image[1]?.link ||
        song.image[0]?.link ||
        song.image[2]?.url ||
        song.image[1]?.url ||
        song.image[0]?.url;

      // Debug logging for Rahat songs
      if (
        (song.name || song.title || "").toLowerCase().includes("rahat") ||
        (song.primaryArtists || song.artist || "")
          .toLowerCase()
          .includes("rahat")
      ) {
        console.log("🖼️ RAHAT IMAGE DEBUG:", {
          songName: song.name || song.title,
          imageArray: song.image,
          extractedUrl: imageUrl,
        });
      }
    } else if (typeof song.image === "string") {
      // If image is a direct string URL
      imageUrl = song.image;
    } else if (song.image.link || song.image.url) {
      // If image is an object with link or url property
      imageUrl = song.image.link || song.image.url;
    }

    return imageUrl;
  };

  const handleLikeClick = (e, song) => {
    e.stopPropagation(); // Prevent song from playing when clicking like button
    toggleLike(song);
  };

  const handleAddToPlaylist = (e, song) => {
    e.stopPropagation(); // Prevent song from playing when clicking playlist button
    setSelectedSong(song);
    setPlaylistModalOpen(true);
  };

  const handleSongClick = (song) => {
    console.log("Song clicked:", song.name || song.title);
    console.log("Current song:", currentSong?.name || currentSong?.title);
    console.log("Is same song?", currentSong?.id === song.id);

    if (currentSong?.id === song.id) {
      console.log("Toggling play/pause for current song");
      togglePlayPause();
    } else {
      console.log("Playing new song:", song.name || song.title);
      playSelectedSong(song);
    }
  };

  if (!songs || songs.length === 0) {
    return (
      <div className="p-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted/50 mb-4">
          <Play className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-2">No songs available</h3>
        <p className="text-muted-foreground">Check back later for new music</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      {title && (
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <Play className="w-5 h-5 text-neon-green" />
          {title}
        </h2>
      )}
      <div className="space-y-2">
        {songs.map((song, index) => {
          const isCurrentSong = currentSong?.id === song.id;
          const isCurrentlyPlaying = isCurrentSong && isPlaying;
          const imageUrl = extractImageUrl(song);

          return (
            <div
              key={song.id || index}
              onClick={() => handleSongClick(song)}
              className={`group flex items-center gap-4 p-4 rounded-xl hover:bg-muted/30 transition-all duration-200 cursor-pointer border border-transparent hover:border-border/50 ${
                isCurrentSong ? "bg-neon-green/5 border-neon-green/20" : ""
              }`}
            >
              <div className="relative flex-shrink-0">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={song.name || song.title}
                    className="w-14 h-14 rounded-xl object-cover shadow-md"
                    onError={(e) => {
                      console.error("Song image failed to load:", {
                        songName: song.name || song.title,
                        artist: song.primaryArtists || song.artist,
                        imageUrl: imageUrl,
                        error: e.target.error,
                      });
                      e.target.style.display = "none";
                      e.target.nextSibling.nextSibling.style.display = "flex";
                    }}
                    onLoad={() => {
                      // Debug successful image loads for Rahat songs
                      if (
                        (song.name || song.title || "")
                          .toLowerCase()
                          .includes("rahat") ||
                        (song.primaryArtists || song.artist || "")
                          .toLowerCase()
                          .includes("rahat")
                      ) {
                        console.log(
                          "✅ Rahat image loaded successfully:",
                          imageUrl,
                        );
                      }
                    }}
                  />
                ) : null}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
                  {isCurrentlyPlaying ? (
                    <div className="w-5 h-5 flex items-center justify-center">
                      <div className="flex gap-1">
                        <div className="w-1 h-4 bg-white rounded-full animate-pulse"></div>
                        <div
                          className="w-1 h-4 bg-white rounded-full animate-pulse"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-1 h-4 bg-white rounded-full animate-pulse"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  ) : (
                    <Play className="w-5 h-5 text-white fill-white" />
                  )}
                </div>
                <div
                  className={`absolute inset-0 w-14 h-14 rounded-xl bg-gradient-to-br from-muted/80 to-muted flex items-center justify-center shadow-md ${imageUrl ? "hidden" : ""}`}
                >
                  <Play className="w-7 h-7 text-muted-foreground" />
                </div>
                {isCurrentSong && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-neon-green rounded-full animate-pulse shadow-lg border-2 border-background" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <h3
                  className={`font-semibold truncate text-base ${isCurrentSong ? "text-neon-green" : "text-foreground"}`}
                >
                  {song.name || song.title}
                </h3>
                <p className="text-sm text-muted-foreground truncate mt-1">
                  {song.primaryArtists ||
                    song.artist ||
                    song.artists?.primary
                      ?.map((artist) => artist.name)
                      .join(", ") ||
                    "Unknown Artist"}
                </p>
              </div>

              <div className="text-sm text-muted-foreground font-mono">
                {song.duration
                  ? `${Math.floor(song.duration / 60)}:${(song.duration % 60).toString().padStart(2, "0")}`
                  : ""}
              </div>

              <button
                onClick={(e) => handleLikeClick(e, song)}
                className={`p-2 rounded-full hover:bg-accent/50 transition-all duration-200 ${
                  isLiked(song.id)
                    ? "text-red-500 scale-110"
                    : "text-muted-foreground hover:text-foreground hover:scale-105"
                }`}
              >
                <Heart
                  className={`w-5 h-5 ${isLiked(song.id) ? "fill-current" : ""}`}
                />
              </button>

              <button
                onClick={(e) => handleAddToPlaylist(e, song)}
                className="p-2 rounded-full hover:bg-accent/50 transition-all duration-200 text-muted-foreground hover:text-foreground hover:scale-105"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          );
        })}
      </div>

      {/* Playlist Modal */}
      <PlaylistModal
        isOpen={playlistModalOpen}
        onClose={() => {
          setPlaylistModalOpen(false);
          setSelectedSong(null);
        }}
        song={selectedSong}
      />
    </div>
  );
}
