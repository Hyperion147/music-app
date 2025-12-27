import { useParams, useNavigate } from "react-router-dom";
import { Play, Music, ArrowLeft, Plus } from "lucide-react";
import { Sidebar } from "../components/sidebar";
import { usePlaylists } from "../context/PlaylistContext";
import SongList from "../components/ui/SongList";

export default function PlaylistDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getPlaylist, isLoaded, playlists } = usePlaylists();

  const playlist = getPlaylist(id);

  // Show loading state while playlists are being loaded from localStorage
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/10">
        <Sidebar />
        <div className="ml-64 pb-32">
          <div className="max-w-7xl mx-auto px-6 py-8 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted/50 mb-6">
              <Music className="w-10 h-10 text-muted-foreground animate-pulse" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Loading playlist...</h3>
            <p className="text-muted-foreground">
              Please wait while we load your playlist.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!playlist) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/10">
        <Sidebar />
        <div className="ml-64 pb-32">
          <div className="max-w-7xl mx-auto px-6 py-8 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted/50 mb-6">
              <Music className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Playlist not found</h3>
            <p className="text-muted-foreground mb-6">
              The playlist you're looking for doesn't exist or has been deleted.
            </p>
            <button
              onClick={() => navigate("/playlists")}
              className="px-6 py-3 bg-neon-green text-black rounded-xl hover:bg-neon-green-hover transition-colors font-medium shadow-lg"
            >
              Back to Playlists
            </button>
          </div>
        </div>
      </div>
    );
  }

  const generatePlaylistImage = (playlist) => {
    // Use first song's image if available, otherwise generate a gradient
    if (playlist.songs.length > 0 && playlist.songs[0].image) {
      const song = playlist.songs[0];
      if (Array.isArray(song.image)) {
        return song.image[song.image.length - 1]?.link || song.image[0]?.link;
      }
      return typeof song.image === "string" ? song.image : song.image?.link;
    }

    // Generate a gradient based on playlist name
    const colors = [
      "from-purple-500 to-pink-500",
      "from-blue-500 to-cyan-500",
      "from-green-500 to-teal-500",
      "from-orange-500 to-red-500",
      "from-indigo-500 to-purple-500",
      "from-pink-500 to-rose-500",
    ];
    const colorIndex = playlist.name.length % colors.length;
    return colors[colorIndex];
  };

  const playlistImage = generatePlaylistImage(playlist);
  const isGradient = !playlistImage.startsWith("http");

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/10">
      <Sidebar />
      <div className="lg:ml-64 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8 space-y-6 sm:space-y-8 pt-16 lg:pt-8">
          {/* Back Button */}
          <button
            onClick={() => navigate("/playlists")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Playlists
          </button>

          {/* Playlist Header */}
          <div className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl p-4 sm:p-8 shadow-lg">
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden shadow-xl flex-shrink-0">
                {isGradient ? (
                  <div
                    className={`w-full h-full bg-gradient-to-br ${playlistImage} flex items-center justify-center`}
                  >
                    <Music className="w-12 h-12 sm:w-16 sm:h-16 text-white/80" />
                  </div>
                ) : (
                  <img
                    src={playlistImage}
                    alt={playlist.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "flex";
                    }}
                  />
                )}

                {/* Fallback gradient if image fails */}
                <div
                  className={`w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 items-center justify-center ${isGradient ? "hidden" : "hidden"}`}
                >
                  <Music className="w-12 h-12 sm:w-16 sm:h-16 text-white/80" />
                </div>
              </div>

              <div className="flex-1 text-center sm:text-left">
                <p className="text-xs sm:text-sm text-muted-foreground uppercase tracking-wider mb-2">
                  Playlist
                </p>
                <h1 className="text-2xl sm:text-4xl font-bold mb-2 sm:mb-4">
                  {playlist.name}
                </h1>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-4 text-sm sm:text-base text-muted-foreground">
                  <span>
                    {playlist.songs.length} song
                    {playlist.songs.length !== 1 ? "s" : ""}
                  </span>
                  <span className="hidden sm:inline">•</span>
                  <span>
                    Created {new Date(playlist.createdAt).toLocaleDateString()}
                  </span>
                  {playlist.updatedAt !== playlist.createdAt && (
                    <>
                      <span className="hidden sm:inline">•</span>
                      <span className="w-full sm:w-auto">
                        Updated{" "}
                        {new Date(playlist.updatedAt).toLocaleDateString()}
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Play Button */}
              {playlist.songs.length > 0 && (
                <button className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-neon-green flex items-center justify-center shadow-lg hover:scale-105 transition-transform flex-shrink-0">
                  <Play className="w-5 h-5 sm:w-6 sm:h-6 text-black fill-black ml-0.5" />
                </button>
              )}
            </div>
          </div>

          {/* Playlist Songs */}
          {playlist.songs.length > 0 ? (
            <div className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl shadow-lg overflow-hidden">
              <SongList songs={playlist.songs} title="" />
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted/50 mb-4">
                <Music className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                No songs in this playlist
              </h3>
              <p className="text-muted-foreground mb-6">
                Add songs to this playlist by clicking the "+" button on any
                song.
              </p>
              <button
                onClick={() => navigate("/search")}
                className="flex items-center gap-2 px-6 py-3 bg-neon-green text-black rounded-xl hover:bg-neon-green-hover transition-colors font-medium shadow-lg mx-auto"
              >
                <Plus className="w-5 h-5" />
                Find Songs to Add
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
