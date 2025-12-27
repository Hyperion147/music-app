import { Heart, Play, MoreHorizontal } from "lucide-react";
import { Sidebar } from "../components/sidebar";
import { useLikedSongs } from "../context/LikedSongsContext";
import { useMusicPlayer } from "../context/MusicContext";

export default function LikedSongs() {
  const { likedSongs, toggleLike } = useLikedSongs();
  const { playSelectedSong, currentSong, isPlaying, togglePlayPause } =
    useMusicPlayer();

  const handlePlayAll = () => {
    if (likedSongs.length > 0) {
      playSelectedSong(likedSongs[0]);
    }
  };

  const handlePlaySong = (song) => {
    if (currentSong?.id === song.id) {
      togglePlayPause();
    } else {
      playSelectedSong(song);
    }
  };

  const handleLikeClick = (e, song) => {
    e.stopPropagation();
    toggleLike(song);
  };

  const extractImageUrl = (song) => {
    if (!song.image) return null;

    if (Array.isArray(song.image)) {
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
      return song.image;
    } else if (song.image.link || song.image.url) {
      return song.image.link || song.image.url;
    }

    return null;
  };

  return (
    <div className="lg:ml-64 pb-32 pt-16 lg:pt-8 px-4 sm:px-6 lg:px-8">
      <Sidebar />

      <div className="mb-8">
        <div className="flex items-end gap-6 mb-6">
          <div className="w-48 h-48 rounded-lg bg-linear-to-br from-[#00ff88] to-[#00cc6f] flex items-center justify-center shadow-2xl">
            <Heart className="w-24 h-24 text-white" />
          </div>

          <div>
            <p className="text-sm mb-2">PLAYLIST</p>
            <h1 className="mb-4 text-4xl font-bold">Liked Songs</h1>
            <p className="text-muted-foreground">{likedSongs.length} songs</p>
          </div>
        </div>

        <button
          onClick={handlePlayAll}
          disabled={likedSongs.length === 0}
          className={`flex items-center gap-2 h-10 px-6 rounded-full font-medium transition ${
            likedSongs.length === 0
              ? "bg-muted text-muted-foreground cursor-not-allowed"
              : "bg-[#00ff88] hover:bg-[#00cc6f] text-black"
          }`}
        >
          <Play className="w-5 h-5 fill-current" />
          Play
        </button>
      </div>

      <div className="space-y-1">
        {likedSongs.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No liked songs yet</h3>
            <p className="text-muted-foreground">
              Songs you like will appear here. Start exploring and like some
              songs!
            </p>
          </div>
        ) : (
          likedSongs.map((song, index) => {
            const isCurrentSong = currentSong?.id === song.id;
            const isCurrentlyPlaying = isCurrentSong && isPlaying;
            const imageUrl = extractImageUrl(song);

            return (
              <div
                key={song.id || index}
                className="group flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition cursor-pointer"
              >
                <div className="relative w-12 h-12 rounded-md overflow-hidden shrink-0">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={song.name || song.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.nextSibling.style.display = "flex";
                      }}
                    />
                  ) : null}
                  <div
                    className={`absolute inset-0 w-full h-full bg-muted flex items-center justify-center ${imageUrl ? "hidden" : ""}`}
                  >
                    <Play className="w-6 h-6 text-muted-foreground" />
                  </div>

                  <div
                    onClick={() => handlePlaySong(song)}
                    className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  >
                    {isCurrentlyPlaying ? (
                      <Play className="w-5 h-5 text-white fill-white" />
                    ) : (
                      <Play className="w-5 h-5 text-white fill-white" />
                    )}
                  </div>

                  {isCurrentSong && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-neon-green rounded-full animate-pulse" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p
                    className={`truncate text-sm font-medium ${isCurrentSong ? "text-neon-green" : ""}`}
                  >
                    {song.name || song.title}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {song.primaryArtists ||
                      song.artist ||
                      song.artists?.primary
                        ?.map((artist) => artist.name)
                        .join(", ") ||
                      "Unknown Artist"}
                  </p>
                </div>

                <span className="text-xs text-muted-foreground">
                  {song.duration
                    ? `${Math.floor(song.duration / 60)}:${(song.duration % 60).toString().padStart(2, "0")}`
                    : ""}
                </span>

                <button
                  onClick={(e) => handleLikeClick(e, song)}
                  className="size-9 rounded-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-accent flex items-center justify-center"
                >
                  <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                </button>

                <button className="size-9 rounded-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-accent flex items-center justify-center">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
